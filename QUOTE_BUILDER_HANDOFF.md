# DIY Quote Builder — Developer Handoff (Kirunda)

**File:** `DIY Quote Builder.html` (front end) + `quote-recipes.js` (data)
**Status:** Front end complete and working. Three back-end integrations remain (below).
**Stack note:** This is the same Bloom Culture site / Shopify store as the DIY Planner you already deployed.

---

## ⭐ Division of labor (this saves you time)

Mapping ~60 flowers to roles, stem counts, and the right close-up photo is tedious, and it needs Bloom Culture product knowledge you'd have to ask Alison about anyway. So Alison is **taking that piece off your plate**: she'll populate the product data herself as quality control, since she knows exactly which flower is which and which photo represents it best.

- **You (Kirunda) build the system:** create the product **metafields** (role, stems-per-bunch, builder photo), wire the tool to **read** them live, build add-to-cart, and wire the emails. You own all the code and Shopify setup.
- **Alison handles the product data:** she fills in each flower's role, stems, and chosen photo in the Shopify admin. You don't have to chase down what goes with what — she owns accuracy on that.

**So all that's needed from you on the mapping:** set the metafields up as clean, labeled fields on the products (role as a **dropdown** of the seven roles, so the data stays consistent), and a quick note on where they live so Alison can run with it. A short screen-grab of one product filled in is plenty. Then she takes it from there — and going forward she can add or update any flower herself with no dev time from you.

---

## What the tool does (so you have context)

A 3-step, public-facing tool that lets a DIY bride:
1. **Pick pieces + quantities** (bouquets, centerpieces, arbor, etc.)
2. **Build a flower palette** (two-step picker: flower type → color), which flows into every arrangement
3. **See generated recipes** (stem-by-stem), edit them (swap flowers, add stems, opt optional items in/out — amounts can only go **up** from the recipe floor), and see a **live wholesale price** that rounds shared bunches up to whole bunches.

The running **price** and **Add to Cart** are intentionally **open** (no email). There is **no email gate** — the shopping list and total are always visible. A small optional "email it to myself" field captures non-buyers as leads (see Integration 3).

---

## Data model (how flowers + recipes are stored)

Everything lives in **`quote-recipes.js`**:

- `window.BCF_PRODUCTS` — array of `{ name, role, bunch, stems }`
  - `role`: one of `greenery, line, large, focal, spray, detail, filler`
  - `bunch`: price per wholesale bunch (currently a static snapshot of Shopify prices)
  - `stems`: stems per wholesale bunch (NOT in Shopify — see metafields below)
- `window.BCF_CATEGORIES` — the arrangements, each with a `recipe` array of slots `[role, amount, unit('s'|'b'), optional(0|1), defaultFlower]`
- `window.BCF_PHOTOS` — image URL map keyed by flower name (used by BOTH the Step 2 picker and the Step 3 recipe thumbnails — one shared source). `window.BCF_PIECE_PHOTOS` — optional per-arrangement images. Currently placeholder/empty; see Integration 1 for wiring these to live product photos.

The tool reads only `name`, `role`, `bunch`, `stems`. **Prices + names should come from Shopify live; `role` + `stems` are Bloom-Culture-specific and must come from a lookup (metafields).**

---

## Integration 1 — Live Shopify price/name/photo sync ⭐ (the "auto-update" ask)

**Goal:** when Alison updates a product's **price or photo** in Shopify, the Quote Builder reflects it automatically — no hand-editing `quote-recipes.js`.

**Approach (preferred — live):** on load, fetch the relevant products from Shopify (Storefront API or a products JSON endpoint), and build `BCF_PRODUCTS` from the live data, merging in `role` + `stems` from metafields (below). Fall back to the baked snapshot if the fetch fails.

**Approach (simpler — scheduled):** a nightly job regenerates `quote-recipes.js` from Shopify. Current within ~24h.

**Mapping:** each tool flower must map to its Shopify product/variant (by handle or variant ID). **This is the same mapping Integration 2 needs**, so build it once.

**Role + stems live as product metafields** (recommended):
- `custom.bcf_role` (single line) → greenery / line / large / focal / spray / detail / filler
- `custom.bcf_stems_per_bunch` (integer)
- Alison will be given the full role + stems list to populate these (I can export it as a CSV keyed by product title/handle).

**Set these up as proper metafield DEFINITIONS** (Settings → Custom data → Products), so they render as labeled fields on every product. Make `bcf_role` a **list/choice** metafield (a dropdown of the seven roles) so the data stays consistent. Alison is handling the actual population as quality control (see Division of Labor above) — you just need the fields set up cleanly and a quick note on where they live.

Flowers **without** a `bcf_role` metafield should be treated as "not offered in the builder" (e.g. specialty/custom-only: Anthurium, orchids, Peony, Nigella, Dahlia, all bleached/dried, collections, supplies).

**Product photos (Step 2 picker + Step 3 recipe thumbnails) — link to live product images too.** Step 2 and Step 3 share one image map (`window.BCF_PHOTOS`, keyed by flower name). When you build `BCF_PRODUCTS` from live Shopify data, populate `BCF_PHOTOS[name]` from the **same product** so a photo swapped in Shopify updates everywhere in the builder automatically.
- ⚠️ **Do NOT default to the featured image.** Alison's featured image is a flowers-in-a-bucket product shot; the builder needs a **close-up of the single bloom** so couples can visualize their recipe. In practice that is usually the product's **2nd gallery image**.
- **Recommended (precise) mechanism:** image-picker metafield `custom.bcf_quote_image` (type: File / image) per product, where Alison explicitly chooses the close-up bloom image for the builder. Builder uses this when set.
- **Fallback when the metafield is empty:** use the **2nd gallery image** (`product.images[1]`) if it exists, otherwise the featured image. (So even before she fills metafields, most flowers show the close-up; she only needs the metafield for products whose 2nd image isn't the right one.)
- Step 1's lifestyle photos are hard-coded estimator images (finished) and are NOT part of this sync.

---

## Integration 2 — Add to Cart (bunches as line items) + carry the recipe with the order

**Goal:** the open **"Add my flowers to cart →"** button adds the bride's **wholesale bunch order** to the Shopify cart so she can check out and you deliver — **and the recipe/plan travels with the order so it is never severed from the bunches.**

- The tool already computes the master bunch list (flower → whole-bunch quantity). Wire `cartBtn` to call Shopify AJAX `/cart/add.js` with `{ items: [{ id: <variantId>, quantity: <bunches> }, ...] }`.
- Uses the **same product mapping** as Integration 1 (flower → Shopify variant ID).
- Hook point in code: `document.getElementById('cartBtn')` handler (currently shows a "checkout is being connected" placeholder note). Call `buildSummary()` to get the full plan (`{ pieces:[…recipe lines…], shop:[…bunch lines…], total }`).

**Add-to-cart behavior (Alison's decision — Option A):** on click, add the bunches to the Shopify cart and **redirect straight to the Shopify cart page** (`/cart`). No interstitial. Rationale: it's decisive and gets them to checkout; if they panic or want to keep editing, the **Back button returns them to the builder with all their work intact** (state is in localStorage). For that promise to hold, Kirunda MUST follow these rules:
- **Adding to cart must NOT clear the builder's saved state** (`localStorage` key `bcf_quote_state_v1`). Back from the cart = full build still there.
- **Re-adding must update, not duplicate.** If they add, go back, tweak, and add again, replace/refresh their bunch line items rather than stacking a second set (e.g. clear the builder's previously-added lines first, keyed by a cart attribute, then re-add).
- **Never auto-clear or "Start over" on their behalf.** Only the explicit Start-over button resets the build.

**⚠️ Carry the recipe with the order (critical — do not skip).** Right now, once they add to cart it's just loose bunches; the "which flower goes in which arrangement" recipe context is lost, both for the bride and for Bloom Culture. Fix it by attaching the plan to the order:
- Add the recipe summary as a **cart attribute** (`/cart/update.js` with `attributes: { "DIY Recipe Plan": <buildSummary text> }`). Cart attributes surface **on the order in Shopify admin** and can be injected into the **order confirmation email**, so Bloom Culture sees the full plan and the bride keeps her assembly map.
- ⚠️ **Do NOT attach a link back to the editable quote on the order.** Once purchased, the order is locked to what they bought — no "reopen and edit" path post-purchase. The recipe travels as a static record only (text/summary), not an interactive re-entry point.
- Optionally also attach key context as **line-item properties** per bunch (e.g. which arrangement(s) a flower serves) if useful for fulfillment.
- Goal: an order is always traceable back to the recipe that generated it.

**⚠️ Shortfall protection (brand/liability).** Customers can edit cart quantities after adding (Shopify carts are always editable). To protect Bloom Culture if a customer reduces amounts and then runs short:
- Add a **cart note / attribute** at add-to-cart with this exact wording (Alison-approved): *"Your cart is based on the recommended quantities from your Build Your Own Package recipes, designed to give you everything you need. If you change these amounts, your results may differ from the recipes, and we will not be held responsible for adjustments that deviate from our recommendations."*
- Coordinate with Alison's **Terms & Conditions** (the existing T&C checkout app): add language that **flower quantities are customer-determined**, and Bloom Culture is not responsible for shortfalls when a customer alters the recommended amounts.
- The emailed plan + the recipe-on-order attribute together form the timestamped record of *what was recommended*.
- **Active warning on quantity reduction (Alison-requested, cart page).** Keep add-to-cart frictionless (no extra reading), but fire a one-time popup the moment a customer reduces a line **below its recommended quantity** on the cart page. Mechanism:
  - At add-to-cart, tag each line item with a property holding its **recommended qty** (e.g. line-item property `_bcf_recommended_qty`, prefixed with `_` so it stays hidden from the customer-facing cart display).
  - Add cart-page theme JS that, on any quantity change, compares the new qty against `_bcf_recommended_qty`. If `new < recommended`, show a modal with the Alison-approved disclaimer wording above (same text as the cart note). Show once per line per session so it isn't naggy.
  - Cart page is themable on the Basic plan, so this works without Shopify Plus. **Checkout steps are NOT customizable on Basic** — do not attempt the popup there; the cart-page trigger + standing cart note + T&C cover it, since virtually all quantity edits happen on the cart page before checkout.

---

## Integration 3 — Email the plan + capture the lead (soft, optional)

**Goal:** the bride can optionally enter her email to be sent her plan. **This is NOT a gate** — the shopping list and total are always fully visible. The email field is a small "Not ready to buy yet? Email me my plan" prompt below the CTAs. On submit, (a) email her the plan and (b) save the lead.

- Hook point: the `leadForm` submit handler in `DIY Quote Builder.html` — search the code for **`TODO(Kirunda)`**. It collects **first name + email** (both required) and shows a "Sent!" confirmation. You receive `{ name:leadName, email:leadEmail }` + can call `buildSummary()` for the full order (`{ pieces:[…], shop:[…], total }`).
- Actions:
  1. **Save the lead** to Alison's email platform (**Flodesk**) — same tool used for the planner launch. Flodesk is the right home for the *lead/subscriber* and runs in parallel.
  2. **Email her the plan** (DECISION — Alison wants the email, it's her soft lead-capture): send a branded email with a warm note, her quote, the total, and a **link back to her cart**. This is a **transactional** email (unique per person), so send it from the **app backend (Supabase) via a transactional email service — e.g. Resend or Postmark** (free at this volume). **Do NOT try to send this through Flodesk** (Flodesk = the lead only). The on-brand template is built: see **`Flower Plan Email (sample).html`** in the project root — use it as the layout.
- Keep it spam-light; this is a lead magnet, not a newsletter signup (though an opt-in checkbox to join the list is fine).
- **Deliverability (do this once):** send from **hello@bloomcultureflowers.com** via the transactional service with **SPF, DKIM, and DMARC** configured on the domain. This is the main thing that keeps these emails out of spam — the customer should never have to authenticate or whitelist anything. Mostly-text + one button (already the case) also helps.
- **Note:** most buyer emails are captured automatically at Shopify checkout (Integration 2). This soft field exists to capture **non-buyers / browsers** who want the takeaway.

---

## Integration 4 — "Have us tailor it" request (custom-tailor)

**Goal:** on the result page, the **"Have us tailor it for you"** button opens an in-page form (no second questionnaire — the bride already built everything). On submit, email the **whole build + her note** to Bloom Culture so the team can tailor it.

- Hook point: the `tlrForm` submit handler in `DIY Quote Builder.html` — search for **`TODO(Kirunda)`** (there are two; this is the one inside `openTailor()`).
- On submit you receive a `payload` object: `{ name, email, weddingDate, colors, budget, needs:[…], note, summary }` where `summary = { pieces:[…lines…], shop:[…bunch lines…], total }` — i.e. her full plan already assembled, plus the form fields (budget is a required dropdown; needs is the checked "what do you need help with" list).
- Actions:
  1. **Email the request to Alison** (quotes@bloomcultureflowers.com), formatted per **`Tailor Request (sample).html`**.
  2. **Email the couple a confirmation copy** to `payload.email` — the same details + their build, plus a **"View my cart" button linking to their saved Shopify cart** (same cart link as Integration 2), so they have a record and a path back. The shopping list is truncated in the email with a subtle **"See your full list in cart →"** link — point it at the **same cart URL** as the main button. Layout: **`Tailor Request - Your Copy (sample).html`** (includes ™ + copyright/no-distribute footer **and a pricing-may-change note** — that note belongs on the couple's copy ONLY, not on Alison's internal version).
  3. **Save the lead** to Flodesk (same as Integration 3).
- This is distinct from Integration 3: #3 emails the plan **to the bride**; #4 emails her build **to the florist** AND a copy back to the bride. Same email plumbing.

---

## Integration 5 — Push build into FlowerBuddy via API (now possible)

**Status:** FlowerBuddy launched a **public API** (June 2026). Alison uses FlowerBuddy as her recipe/proposal system, so a finished build should be able to flow straight in as an event/proposal instead of being re-keyed by hand. **Dependency, not a delay:** this hooks into the tailor-request flow (Integration 4), so #4 has to exist first — but once it does, this can ship *with* launch if the Zapier path is clean.

**Goal:** when a tailor request is submitted (Integration 4), in addition to the emails, **create a draft recipe/proposal in FlowerBuddy** from the `payload` so the team picks up tailoring inside the tool they already use.

- **First step (required):** Kirunda pulls the FlowerBuddy API docs and gets an API key.
  - **Generate key:** FlowerBuddy → **Workspace Settings → Integrations tab → FlowerBuddy API → Generate API Key** (copy it immediately, it's shown once; store in a password manager). Regenerate invalidates the old key; Revoke disables it permanently. Alison generates this from her account and shares it securely.
  - **Docs:** the same panel has **"FlowerBuddy API Docs"** for auth + endpoints.
- **Endpoints available:** list events, **create event**, retrieve event, update event. In FlowerBuddy a wedding job = an **"event"**, so a tailor request should **create an event** (with the recipes/proposal attached).
- **Mapping:** the builder's `payload.summary.pieces` is a structured per-arrangement recipe (piece → ingredients → quantities), and `payload.summary.shop` is the wholesale bunch list + total. Map the request to a new FlowerBuddy **event**: couple fields (name, email, wedding date, colors, budget, note) → the event/client record; each arrangement → a recipe line; each flower → an ingredient.
- **Easiest path — no custom code may be needed:** FlowerBuddy's API **works with Zapier / workflow tools**. So Kirunda can likely wire **tailor-request webhook → Zapier → "Create FlowerBuddy event"** instead of hand-coding the API calls. Prefer this if it covers the field mapping cleanly.
- **Scope note:** **Include this in the initial scope if the Zapier path is straightforward** — it's a low-effort, isolated add (only fires on a tailor submission, never touches the build → cart → buy path). Only push it to a fast-follow if it turns out to need significant custom work. **It must never block launch:** the quotes@ email already captures every tailor request in full, so nothing is lost if this slips. Confirm scope/price with Alison.

---

## One-line brief

> Connect the DIY Quote Builder to **live Shopify products** so prices/names/**photos** auto-sync; use that **same product→variant mapping** to power **Add-to-Cart** (bunches as line items); wire the optional **email-it-to-myself** field to email the bride her plan + save the lead to Flodesk; and wire **"Have us tailor it"** to email her build to quotes@bloomcultureflowers.com. Role + stems-per-bunch (and an optional builder-image override) come from product metafields / a lookup CSV. **Also:** push the build into **FlowerBuddy via its public API** (likely via Zapier) as a new event/proposal — include in initial scope if the Zapier path is clean, never let it block launch.

---

## ⭐ Deliverables back to Alison (required at handoff)

Get it fully up and running, then hand back a short owner's guide written against **how you actually built it** (not generic theory). Alison will own day-to-day updates herself, so she needs your real steps for:

1. **Add a flower** to the builder — exactly where the metafields live and what to fill in (role, stems-per-bunch, builder photo) for a new product.
2. **Swap or retire a flower** — how to take one out of the builder and put another in (seasonal changes).
3. **Update a price** — confirm it's just the Shopify product price and how long until the tool reflects it.
4. **Change a photo** — how to set/replace the builder image for a flower (the close-up bloom shot).
5. **Edit copy / recipes / design** safely — how she (working in her own master copy) can re-paste an updated build **without breaking your live price/cart/email wiring**. To make this painless, **keep your integration code in a clearly-marked, separate block** (or a separate file/snippet) so a design re-paste doesn't wipe it.
6. **Where everything lives** — a short map: the master code (GitHub), the deployment (Netlify), the data (Supabase), the metafields (Shopify), and which email service sends the auto-emails.

A couple of short screen recordings covering 1–5 is ideal. The bar: **after handoff, Alison can add/swap/update flowers, prices, and photos herself with zero developer time**, and knows how to request bigger changes safely.

---

## Notes / gotchas

- **Whole-bunch rounding is intentional.** The bride buys whole bunches shared across arrangements; the tool rounds total demand per flower up to whole bunches. Don't change this to per-stem pricing.
- **Recipe amounts are a floor, not a target.** The UI prevents going below the recipe minimum (brand protection — so couples don't under-buy and blame us). Keep this rule.
- **Plural/typo normalization** (Carnation/Carnations, Wax Flower/Waxflower, dash-spacing) is handled in `splitName()` in the HTML — if you move grouping server-side, replicate it.
