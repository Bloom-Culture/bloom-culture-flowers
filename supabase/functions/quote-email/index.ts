// =============================================================================
//  quote-email — Supabase Edge Function
//  Bloom Culture Flowers · DIY Quote Builder
// =============================================================================
//  Handles two submission types:
//    type: 'lead'   → send the flower plan to the customer (Integration 3)
//    type: 'tailor' → email the tailor request to Alison +
//                     send a confirmation copy to the customer (Integration 4)
//
//  Environment variables (set via: npx supabase secrets set KEY=value)
//    RESEND_API_KEY  — Resend API key
//    RESEND_FROM     — Verified sender address (e.g. hello@bloomcultureflowers.com)
//
//  TODO (Integration 5): add FLOWERBUDDY_API_KEY when available and push tailor
//  submissions to FlowerBuddy via POST /v1/events/ with recipe in the notes field.
// =============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/* ── Config ──────────────────────────────────────────────────────────────── */
const RESEND_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM       = Deno.env.get("RESEND_FROM") || "onboarding@resend.dev";
const TAILOR_TO  = "quotes@bloomcultureflowers.com";
const RESEND_URL = "https://api.resend.com/emails";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/* ── Types ───────────────────────────────────────────────────────────────── */
interface Summary {
  pieces: string[]; // plain-text plan lines from buildSummary()
  shop: string[];   // e.g. ["4 bunch Rose - White ($220)", ...]
  total: number;    // wholesale total in dollars
}
interface LeadBody {
  type: "lead";
  name: string;
  email: string;
  order: Summary;
}
interface TailorBody {
  type: "tailor";
  name: string;
  email: string;
  weddingDate: string;
  colors: string;
  budget: string;
  needs: string[];
  note: string;
  summary: Summary;
}

/* ── HTML helpers ────────────────────────────────────────────────────────── */
function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function money(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

/**
 * Parse the plain-text `pieces` array from buildSummary() into branded HTML.
 *  - Empty lines        → skipped
 *  - ALL-CAPS line      → category/section header
 *  - "   - qty flower"  → ingredient row inside the current piece card
 *  - Anything else      → piece name (opens a new card)
 */
function renderPlan(pieces: string[]): string {
  let html = "";
  let inCard = false;

  for (const raw of pieces) {
    if (!raw.trim()) continue;

    if (raw.startsWith("   - ")) {
      // ── Ingredient line ──
      const txt = raw.replace(/^   - /, "");
      // Split "8 stems Rose - White" → qty | name
      const m = txt.match(/^(.+?(?:bunch(?:es)?|stems?))\s+(.+)$/i);
      const qty  = esc(m ? m[1] : "");
      const name = esc(m ? m[2] : txt);
      html +=
        `<div style="display:flex;justify-content:space-between;gap:12px;` +
        `font-size:13.5px;color:#2c352a;padding:5px 0;border-bottom:1px dotted #e2e0d4;">` +
        `<span>${name}</span>` +
        `<span style="color:#5d685a;white-space:nowrap;">${qty}</span>` +
        `</div>`;
    } else if (raw === raw.toUpperCase() && /[A-Z]/.test(raw)) {
      // ── Category header ──
      if (inCard) { html += "</div>"; inCard = false; }
      html +=
        `<div style="font-size:11px;font-weight:700;letter-spacing:.14em;` +
        `text-transform:uppercase;color:#aa2138;margin:20px 0 10px;` +
        `font-family:'Courier New',monospace;">${esc(raw)}</div>`;
    } else {
      // ── Piece name → new card ──
      if (inCard) { html += "</div>"; }
      const qm   = raw.match(/^(\d+x\s+)?(.+)$/);
      const qtyP = qm?.[1]?.trim() ?? "";
      const nameP = esc(qm?.[2] ?? raw);
      const qtyTag = qtyP
        ? `<span style="font-family:'Courier New',monospace;font-size:11.5px;` +
          `font-weight:700;color:#aa2138;">${esc(qtyP)}</span>`
        : "";
      html +=
        `<div style="background:#fff;border:1px solid #e2e0d4;border-radius:12px;` +
        `padding:14px 16px;margin-bottom:10px;">` +
        `<div style="font-family:'Georgia',serif;font-weight:600;font-size:16px;` +
        `color:#2c352a;display:flex;justify-content:space-between;gap:10px;">` +
        `${nameP}${qtyTag}</div>`;
      inCard = true;
    }
  }
  if (inCard) html += "</div>";
  return html;
}

/** Render the wholesale bunch shopping list from buildSummary().shop */
function renderShop(shop: string[], total: number): string {
  let rows = "";
  for (const line of shop) {
    // "N bunch FlowerName ($price)"
    const m = line.match(/^(\d+) bunch (.+?) \((\$[\d,]+)\)$/);
    if (m) {
      rows +=
        `<div style="display:flex;justify-content:space-between;gap:12px;` +
        `padding:9px 0;border-bottom:1px solid #e2e0d4;font-size:13.5px;">` +
        `<span><b style="font-family:'Courier New',monospace;color:#aa2138;` +
        `margin-right:7px;">${esc(m[1])}</b>${esc(m[2])}</span>` +
        `<span style="font-variant-numeric:tabular-nums;font-weight:600;">${esc(m[3])}</span>` +
        `</div>`;
    }
  }
  const totalRow =
    `<div style="display:flex;justify-content:space-between;gap:12px;` +
    `padding:11px 0 9px;border-top:2px solid #2c352a;font-weight:700;font-size:14.5px;">` +
    `<span>Estimated total</span>` +
    `<span style="color:#2b3c2c;">${money(total)}</span></div>`;
  return (
    `<div style="background:#eeece1;border-radius:12px;padding:6px 16px;margin-top:6px;">` +
    rows + totalRow + `</div>`
  );
}

/* ── Email templates ─────────────────────────────────────────────────────── */

/** Integration 3: Plan email sent to the customer after lead capture */
function planHtml(name: string, order: Summary): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>Your DIY flower quote</title></head>
<body style="background:#d9d6c9;font-family:'Montserrat',system-ui,sans-serif;color:#2c352a;margin:0;padding:30px 16px;">
<div style="max-width:600px;margin:0 auto;">

  <div style="background:#2b3c2c;color:#fff;border-radius:14px 14px 0 0;padding:22px 26px;">
    <div style="font-family:'Courier New',monospace;font-size:10.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;opacity:.85;">DIY Package · Build Your Own</div>
    <h1 style="font-family:'Georgia',serif;font-weight:600;font-size:24px;line-height:1.15;margin:6px 0 0;">
      Here's your saved plan, <em style="font-style:italic;color:#cdd8c4;">${esc(name)}</em>
    </h1>
  </div>

  <div style="background:#f7f6f0;border:1px solid #e2e0d4;border-top:0;border-radius:0 0 14px 14px;overflow:hidden;">
    <div style="padding:24px 26px 8px;">
      <p style="font-size:15px;line-height:1.6;color:#2c352a;margin-bottom:22px;">
        Your flower plan is ready — here's everything you built, stem by stem.
        When you're ready to order, use the button below to add your bunches straight to cart.
      </p>

      <div style="background:#2b3c2c;color:#f7f6f0;border-radius:12px;padding:16px 18px;margin-bottom:18px;">
        <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;">
          <span style="font-family:'Courier New',monospace;font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.8;">Estimated wholesale total</span>
          <span style="font-family:'Georgia',serif;font-weight:600;font-size:28px;">${money(order.total)}</span>
        </div>
        <div style="font-size:11.5px;font-weight:700;color:#f7f6f0;opacity:.85;margin-top:9px;padding-top:9px;border-top:1px solid rgba(247,246,240,.18);">
          Wholesale bulk pricing · Delivery not included · Prices may vary
        </div>
      </div>

      <div style="text-align:center;margin:16px 0 4px;">
        <a href="https://bloomcultureflowers.com/pages/diy-flower-builder"
           style="display:inline-block;text-decoration:none;background:#aa2138;color:#fff;font-family:'Georgia',serif;font-weight:600;font-size:16px;border-radius:11px;padding:14px 28px;">
          Add my flowers to cart →
        </a>
        <div style="font-size:12px;color:#5d685a;margin-top:9px;">Your build is saved — use the button to open your cart.</div>
      </div>

      <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#aa2138;margin:26px 0 12px;">Your flower plan</div>
      ${renderPlan(order.pieces)}

      <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#aa2138;margin:26px 0 12px;">Wholesale bunches needed</div>
      ${renderShop(order.shop, order.total)}

      <div style="background:#eeece1;border-radius:12px;padding:13px 16px;font-size:12.5px;color:#5d685a;line-height:1.6;margin-top:18px;">
        Prices shown are wholesale bulk rates and may vary. Quantities are our recommended minimums — actual needs may differ slightly. Bloom Culture is not responsible for shortfalls if you adjust the recommended quantities.
      </div>
    </div>
    <div style="background:#eeece1;border-top:1px solid #e2e0d4;text-align:center;padding:20px 24px;margin-top:22px;">
      <div style="font-size:11.5px;line-height:1.6;color:#5d685a;max-width:480px;margin:0 auto;">
        © Bloom Culture Flowers™ · This quote was generated using the DIY Package Builder. Not for distribution.
      </div>
    </div>
  </div>

</div>
</body></html>`;
}

/** Integration 4: Internal tailor-request email sent to Alison */
function tailorInternalHtml(p: TailorBody): string {
  const dateStr = p.weddingDate
    ? new Date(p.weddingDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : p.weddingDate;
  const needsTags = (p.needs ?? [])
    .map((n) =>
      `<span style="background:#fff;border:1.5px solid #aa2138;color:#8c1a2e;font-size:13px;font-weight:600;border-radius:999px;padding:7px 14px;">${esc(n)}</span>`
    )
    .join(" ");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>Tailor Request</title></head>
<body style="background:#d9d6c9;font-family:'Montserrat',system-ui,sans-serif;color:#2c352a;margin:0;padding:30px 16px;">
<div style="max-width:600px;margin:0 auto;">

  <div style="background:#aa2138;color:#fff;border-radius:14px 14px 0 0;padding:22px 26px;">
    <div style="font-family:'Courier New',monospace;font-size:10.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;opacity:.85;">Tailor Request · Build Your Own Package</div>
    <h1 style="font-family:'Georgia',serif;font-weight:600;font-size:24px;line-height:1.15;margin:6px 0 0;">
      ${esc((p.name ?? "").split(" ")[0])} would like help tailoring their quote
    </h1>
  </div>

  <div style="background:#f7f6f0;border:1px solid #e2e0d4;border-top:0;border-radius:0 0 14px 14px;overflow:hidden;">
    <div style="padding:24px 26px 8px;">

      <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#aa2138;margin:4px 0 12px;">Couple &amp; event</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#e2e0d4;border:1px solid #e2e0d4;border-radius:12px;overflow:hidden;margin-bottom:16px;">
        <div style="background:#fff;padding:12px 14px;">
          <div style="font-family:'Courier New',monospace;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8a9384;">Name</div>
          <div style="font-size:15px;font-weight:600;margin-top:3px;">${esc(p.name)}</div>
        </div>
        <div style="background:#fff;padding:12px 14px;">
          <div style="font-family:'Courier New',monospace;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8a9384;">Email</div>
          <div style="font-size:15px;margin-top:3px;"><a href="mailto:${esc(p.email)}" style="color:#aa2138;text-decoration:none;">${esc(p.email)}</a></div>
        </div>
        <div style="background:#fff;padding:12px 14px;">
          <div style="font-family:'Courier New',monospace;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8a9384;">Wedding date</div>
          <div style="font-size:15px;margin-top:3px;">${esc(dateStr)}</div>
        </div>
        <div style="background:#fff;padding:12px 14px;">
          <div style="font-family:'Courier New',monospace;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8a9384;">Colors / vibe</div>
          <div style="font-size:15px;margin-top:3px;">${esc(p.colors || "—")}</div>
        </div>
        <div style="background:#fff;padding:12px 14px;grid-column:1/-1;">
          <div style="font-family:'Courier New',monospace;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8a9384;">Budget range</div>
          <div style="font-size:15px;font-weight:600;margin-top:3px;">${esc(p.budget)}</div>
        </div>
      </div>

      <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#aa2138;margin:20px 0 10px;">What they need help with</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">${needsTags}</div>

      <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#aa2138;margin:20px 0 10px;">In their words</div>
      <div style="background:#f5e2e4;border-radius:12px;padding:14px 16px;font-size:14.5px;line-height:1.55;color:#2c352a;margin-bottom:16px;">${esc(p.note)}</div>

      <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#aa2138;margin:20px 0 10px;">The package they built</div>
      <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;background:#2b3c2c;color:#f7f6f0;border-radius:12px;padding:14px 18px;margin-bottom:14px;">
        <span style="font-family:'Courier New',monospace;font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.8;">Their running total</span>
        <span style="font-family:'Georgia',serif;font-weight:600;font-size:26px;">${money(p.summary.total)}</span>
      </div>
      ${renderPlan(p.summary.pieces)}

      <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#aa2138;margin:20px 0 10px;">Wholesale bunches needed</div>
      ${renderShop(p.summary.shop, p.summary.total)}

    </div>
    <div style="background:#eeece1;border-top:1px solid #e2e0d4;text-align:center;padding:20px;margin-top:22px;font-size:12px;color:#8a9384;">
      Sent automatically from your DIY Quote Builder · Bloom Culture™
    </div>
  </div>

</div>
</body></html>`;
}

/** Integration 4: Customer confirmation copy */
function tailorCopyHtml(p: TailorBody): string {
  const firstName = (p.name ?? "").split(" ")[0];
  const dateStr = p.weddingDate
    ? new Date(p.weddingDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : p.weddingDate;

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>Your tailor request — Bloom Culture</title></head>
<body style="background:#d9d6c9;font-family:'Montserrat',system-ui,sans-serif;color:#2c352a;margin:0;padding:30px 16px;">
<div style="max-width:600px;margin:0 auto;">

  <div style="background:#2b3c2c;color:#fff;border-radius:14px 14px 0 0;padding:22px 26px;">
    <div style="font-family:'Courier New',monospace;font-size:10.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;opacity:.85;">Build Your Own Package</div>
    <h1 style="font-family:'Georgia',serif;font-weight:600;font-size:24px;line-height:1.15;margin:6px 0 0;">
      Your request is on its way, <em style="font-style:italic;color:#cdd8c4;">${esc(firstName)}</em> 🌿
    </h1>
  </div>

  <div style="background:#f7f6f0;border:1px solid #e2e0d4;border-top:0;border-radius:0 0 14px 14px;overflow:hidden;">
    <div style="padding:24px 26px 8px;">
      <p style="font-size:15px;line-height:1.6;color:#2c352a;margin-bottom:22px;">
        We've received your tailor request and have everything you built. We'll review your plan and be in touch soon with your personalised quote.
      </p>

      <div style="background:#2b3c2c;color:#f7f6f0;border-radius:12px;padding:16px 18px;margin-bottom:18px;">
        <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;">
          <span style="font-family:'Courier New',monospace;font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.8;">Your running estimate</span>
          <span style="font-family:'Georgia',serif;font-weight:600;font-size:28px;">${money(p.summary.total)}</span>
        </div>
        <div style="font-size:11px;font-weight:700;color:#f7f6f0;opacity:.7;margin-top:9px;padding-top:9px;border-top:1px solid rgba(247,246,240,.18);">
          ⚠️ Prices are estimates only and may change based on tailoring, availability, and market rates at time of order.
        </div>
      </div>

      <div style="text-align:center;margin:16px 0 20px;">
        <a href="https://bloomcultureflowers.com/pages/diy-flower-builder"
           style="display:inline-block;text-decoration:none;background:#aa2138;color:#fff;font-family:'Georgia',serif;font-weight:600;font-size:15px;border-radius:11px;padding:13px 26px;">
          View your build →
        </a>
      </div>

      <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#aa2138;margin:4px 0 12px;">Your request details</div>
      <div style="background:#eeece1;border-radius:12px;padding:13px 16px;font-size:13.5px;color:#2c352a;line-height:1.8;margin-bottom:16px;">
        <div><b>Wedding date:</b> ${esc(dateStr)}</div>
        <div><b>Colors / vibe:</b> ${esc(p.colors || "—")}</div>
        <div><b>Budget:</b> ${esc(p.budget)}</div>
        <div><b>Help needed:</b> ${esc((p.needs ?? []).join(", "))}</div>
        <div><b>Your note:</b> ${esc(p.note)}</div>
      </div>

      <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#aa2138;margin:20px 0 10px;">Your flower plan</div>
      ${renderPlan(p.summary.pieces)}

      <div style="font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#aa2138;margin:20px 0 10px;">Wholesale bunches (your estimate)</div>
      ${renderShop(p.summary.shop, p.summary.total)}

      <div style="background:#eeece1;border-radius:12px;padding:13px 16px;font-size:12px;color:#5d685a;line-height:1.6;margin-top:16px;">
        ™ Bloom Culture Flowers · This quote was generated using the DIY Package Builder and is for planning purposes only.
        Do not distribute. Prices are estimates and may change based on availability, tailoring adjustments, and market conditions at time of order.
      </div>
    </div>
    <div style="background:#eeece1;border-top:1px solid #e2e0d4;text-align:center;padding:20px 24px;margin-top:22px;">
      <div style="font-size:11.5px;line-height:1.6;color:#5d685a;max-width:480px;margin:0 auto;">
        © Bloom Culture Flowers™ · All rights reserved.
      </div>
    </div>
  </div>

</div>
</body></html>`;
}

/* ── Send via Resend ─────────────────────────────────────────────────────── */
async function sendEmail(opts: {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_KEY}`,
    },
    body: JSON.stringify({
      from: FROM,
      to: opts.to,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      subject: opts.subject,
      html: opts.html,
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Resend ${res.status}: ${txt}`);
  }
}

/* ── Handlers ────────────────────────────────────────────────────────────── */
async function handleLead(body: LeadBody) {
  await sendEmail({
    to: body.email,
    subject: "Your DIY flower quote is saved 🌸",
    html: planHtml(body.name, body.order),
  });
}

async function handleTailor(body: TailorBody) {
  const firstName = (body.name ?? "").split(" ")[0];
  const dateStr   = body.weddingDate
    ? new Date(body.weddingDate + "T00:00:00").toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      })
    : body.weddingDate;

  await Promise.all([
    // 1. Internal request to Alison
    sendEmail({
      to: TAILOR_TO,
      replyTo: body.email,
      subject: `New tailor request — ${body.name} (${dateStr})`,
      html: tailorInternalHtml(body),
    }),
    // 2. Confirmation copy to the customer
    sendEmail({
      to: body.email,
      subject: `Your tailor request is on its way, ${firstName} 🌿`,
      html: tailorCopyHtml(body),
    }),
  ]);

  // TODO (Integration 5): Push to FlowerBuddy
  // const FB_KEY = Deno.env.get("FLOWERBUDDY_API_KEY");
  // if (FB_KEY) { ... POST /v1/events/ with recipe in the `notes` field ... }
}

/* ── Main ────────────────────────────────────────────────────────────────── */
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const body = await req.json();

    if (body.type === "lead") {
      await handleLead(body as LeadBody);
    } else if (body.type === "tailor") {
      await handleTailor(body as TailorBody);
    } else {
      return new Response(
        JSON.stringify({ error: "Unknown type: " + body.type }),
        { status: 400, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[quote-email]", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
