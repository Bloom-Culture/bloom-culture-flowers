/* home.jsx, Start Here / Home. Three layout directions via the `layout` prop. */
const { useState: useStateH, useRef: useRefH } = React;

const SPARK = "\u2726";

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d)) return null;
  return Math.ceil((d - new Date(new Date().toDateString())) / 86400000);
}

/* ── shared: tagline strip with brand ✦ separators ── */
function TaglineStrip() {
  const items = ["No wilted flowers", "No stress", "No surprises", "Just beautiful blooms", "You've got this"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 14px",
      color: "var(--sage-deep)", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 16 }}>
      {items.map((it, i) =>
      <React.Fragment key={i}>
          {i > 0 && <span style={{ color: "var(--rose)", fontStyle: "normal", fontSize: 13 }}>{SPARK}</span>}
          <span>{it}</span>
        </React.Fragment>
      )}
    </div>);

}

/* ── shared: wedding date chip ── */
function DateChip() {
  const [date, setDate] = useLocal("weddingDate", "");
  const days = daysUntil(date);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--paper)",
      border: "1px solid var(--line-strong)", borderRadius: 999, padding: "6px 14px 6px 12px", boxShadow: "var(--shadow-sm)" }}>
      <Icon name="heart" size={15} style={{ color: "var(--rose)", flexShrink: 0 }} />
      <span className="mono" style={{ fontSize: 9, color: "var(--ink-faint)", whiteSpace: "nowrap" }}>YOUR DAY</span>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Wedding date"
        style={{ border: "none", background: "transparent", fontSize: 13.5, fontFamily: "var(--sans)",
          color: date ? "var(--ink)" : "var(--ink-faint)", cursor: "pointer", outline: "none", colorScheme: "light", padding: "2px 0" }} />
      {date && days != null && days >= 0 &&
      <span className="mono" style={{ color: "var(--rose-deep)", fontSize: 10, whiteSpace: "nowrap" }}>{days} DAYS</span>}
    </div>);

}

/* ── shared: saved color-direction pick ── */
function getPalette(name) {
  if (!name) return null;
  const needs = window.BC.byId.needs;
  for (const s of needs.full || []) {
    if (s.palettes) {const p = s.palettes.find((x) => x.name === name);if (p) return p;}
  }
  return null;
}
function ColorDirectionChip({ go, align = "flex-start" }) {
  const [pick] = useLocal("palettePick", "");
  const pal = getPalette(pick);
  if (!pal) return null;
  return (
    <button onClick={() => go("needs")} style={{ display: "inline-flex", alignItems: "center", gap: 11,
      background: "var(--paper)", border: "1px solid var(--line-strong)", borderRadius: 999,
      padding: "7px 10px 7px 12px", boxShadow: "var(--shadow-sm)", color: "var(--ink)", alignSelf: align }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "var(--shadow-md)"}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "var(--shadow-sm)"}>
      <span style={{ display: "flex", flexShrink: 0 }}>
        {pal.colors.map((c, j) =>
        <span key={j} style={{ width: 16, height: 16, borderRadius: "50%", background: c,
          border: "1.5px solid var(--paper)", marginLeft: j === 0 ? 0 : -6, boxShadow: "0 0 0 1px rgba(0,0,0,.05)" }} />
        )}
      </span>
      <span style={{ fontSize: 13.5 }}>
        <span style={{ color: "var(--ink-soft)" }}>Your colors · </span><strong>{pal.name}</strong>
      </span>
      <span className="mono" style={{ fontSize: 9, color: "var(--ink-faint)", padding: "5px 9px", borderRadius: 999, background: "var(--cream)" }}>CHANGE</span>
    </button>);

}

/* ── shared: overall progress meter ── */
function OverallProgress({ progress, big }) {
  const pct = Math.round(progress.__overall * 100);
  const days = daysUntil(lsGet("weddingDate", ""));
  const soon = days != null && days >= 0 && days <= 21;
  const nearish = days != null && days > 21 && days <= 56;
  const behind = pct < 40;
  let msg;
  if (pct === 100) msg = "You did it, every step complete. So proud of you! 🌸";
  else if (soon) msg = behind
    ? "Short timeline, but totally doable. Start with your Timeline. 🌸"
    : `${pct}% done with your day close, you're in great shape. 🌸`;
  else if (nearish) msg = behind
    ? "Getting closer, let's be efficient. Your Timeline shows what's next."
    : `You're ${pct}% there and ahead of the game, lovely work.`;
  else if (pct === 0) msg = "No rush, work through it at your own pace, a little at a time. 🌸";
  else msg = `You're ${pct}% of the way there, beautifully on track.`;
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 }}>
        <span className="mono" style={{ color: "var(--ink-faint)" }}>Your overall progress</span>
        <span style={{ fontFamily: "var(--serif)", fontSize: big ? 26 : 18, color: "var(--sage-deep)" }}>{pct}<span style={{ fontSize: big ? 16 : 13 }}>%</span></span>
      </div>
      <div style={{ height: big ? 10 : 8, borderRadius: 999, background: "var(--cream-deep)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.max(pct, 2)}%`, borderRadius: 999,
          background: "linear-gradient(90deg, var(--sage), var(--sage-deep))", transition: "width .6s cubic-bezier(.4,0,.2,1)" }} />
      </div>
      <div style={{ marginTop: 8, fontSize: 13, color: "var(--ink-soft)" }}>
        {msg}
      </div>
    </div>);

}

/* ── shared: next-step card ── */
function NextStepCard({ progress, go, style }) {
  const modules = window.BC.modules;
  const next = modules.find((m) => progress[m.id] < 1) || modules[0];
  const allDone = progress.__overall >= 1;
  return (
    <div style={{ background: "var(--sage-deep)", color: "var(--cream)", borderRadius: "var(--radius-lg)",
      padding: "30px 32px", boxShadow: "var(--shadow-lg)", position: "relative", overflow: "hidden", ...style }}>
      <div className="mono" style={{ color: "var(--rose)", fontSize: 10.5, marginBottom: 14 }}>
        {allDone ? "✦ ALL CAUGHT UP" : "✦ PICK UP WHERE YOU LEFT OFF"}
      </div>
      <h2 style={{ color: "var(--cream)", fontSize: 30, lineHeight: 1.12, marginBottom: 10, maxWidth: 440 }}>
        {allDone ? "You're flower-ready, friend." : next.kicker + "."}
      </h2>
      <p style={{ color: "rgba(247,246,240,.78)", fontSize: 15.5, lineHeight: 1.55, maxWidth: 430, marginBottom: 22 }}>
        {allDone ? "Every module's checklist is complete. Take a breath, you did the hard part. Now go enjoy your day." :
        "Next up: " + next.label + ". " + next.intro.split(".")[0] + "."}
      </p>
      <button onClick={() => go(next.id)} style={{
        display: "inline-flex", alignItems: "center", gap: 9, background: "var(--cream)", color: "var(--sage-deep)",
        padding: "13px 22px", borderRadius: 999, fontWeight: 600, fontSize: 14.5, boxShadow: "0 4px 14px rgba(0,0,0,.18)" }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
        {allDone ? "Revisit a module" : "Open " + next.label} <Icon name="arrow" size={17} />
      </button>
    </div>);

}

/* ── shared: module card ── */
function ModuleCard({ m, progress, go, withImage }) {
  const [hov, setHov] = useStateH(false);
  const clay = m.accent === "clay";
  const ring = progress[m.id] || 0;
  const locked = typeof window.BC_LOCKED === "function" && window.BC_LOCKED(m.id);
  return (
    <button onClick={() => go(m.id)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    style={{ textAlign: "left", background: "var(--paper)", border: "1px solid var(--line)",
      borderRadius: "var(--radius)", padding: 0, overflow: "hidden", boxShadow: hov ? "var(--shadow-md)" : "var(--shadow-sm)",
      transform: hov ? "translateY(-2px)" : "none", transition: "all .2s cubic-bezier(.4,0,.2,1)",
      display: "flex", flexDirection: "column", opacity: locked ? 0.74 : 1 }}>
      {withImage &&
      <div style={{ height: 104, background: "repeating-linear-gradient(45deg, var(--cream-deep), var(--cream-deep) 10px, var(--cream) 10px, var(--cream) 20px)",
        borderBottom: "1px solid var(--line)", display: "grid", placeItems: "center" }}>
          <span className="mono" style={{ fontSize: 9, color: "var(--ink-faint)" }}>{m.id} image</span>
        </div>
      }
      <div style={{ padding: "18px 19px 19px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center",
            background: clay ? "var(--clay-tint)" : "var(--sage-tint)", color: clay ? "var(--clay)" : "var(--sage)" }}>
            <Icon name={MODULE_ICON[m.id]} size={18} />
          </span>
          {locked
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
            : (ring > 0 ?
          <ProgressRing value={ring} size={22} color={clay ? "var(--clay)" : "var(--accent-deep)"} /> :
          <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>{m.num}</span>)}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 18.5, marginBottom: 5 }}>{m.label}</h3>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.45 }}>{m.kicker}</p>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600,
          color: locked ? "var(--ink-faint)" : (clay ? "var(--clay)" : "var(--sage-deep)") }}>
          {locked
            ? <React.Fragment>Unlock to open <Icon name="arrowSm" size={14} /></React.Fragment>
            : <React.Fragment>{ring >= 1 ? "Complete" : ring > 0 ? "In progress" : "Open module"} <Icon name="arrowSm" size={14} /></React.Fragment>}
        </span>
      </div>
    </button>);

}

/* ════════════════════ HOME ════════════════════ */
function Home({ layout = "editorial", go, progress }) {
  const modules = window.BC.modules;
  const pageWrap = { maxWidth: 1120, margin: "0 auto", padding: "46px 52px 90px" };
  const pageWrapCls = "page-pad";

  /* greeting */
  const hour = new Date().getHours();
  const tod = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  /* ---------- EDITORIAL ---------- */
  if (layout === "editorial") {
    return (
      <div style={pageWrap} className={pageWrapCls}>
        <div className="mono" style={{ color: "var(--rose-deep)", marginBottom: 18 }}>{SPARK} WELCOME TO YOUR FLOWER PLANNER</div>
        <div className="hero-split" style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 54, alignItems: "end", marginBottom: 30 }}>
          <div>
            <h1 style={{ fontSize: "clamp(40px,5vw,62px)", lineHeight: 1.02, letterSpacing: "-.02em", marginBottom: 20 }}>
              Hi friend -<br />let's DIY these<br /><span style={{ fontStyle: "italic", color: "var(--sage-deep)" }}>flowers together.</span>
            </h1>
            <p style={{ fontSize: 17.5, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 480 }}>This is your private, calm planning space for all things DIY wedding flowers.

Work through the modules in order or jump around as needed. Your notes, checklists, and progress save automatically along the way. 
</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
            <div style={{ width: "100%", position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
              {React.createElement("image-slot", { id: "home-alison", static: "true", shape: "rect", fit: "cover", src: "data:image/webp;base64,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", "data-baked": "home-alison-baked",
                  placeholder: "Drop a photo of your flowers",
                  style: { width: "100%", aspectRatio: "4 / 3", display: "block" }
                })}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "22px 18px 14px",
                background: "linear-gradient(180deg, rgba(44,53,42,0) 0%, rgba(44,53,42,.72) 100%)" }}>
                <div className="mono" style={{ color: "var(--cream)", opacity: .85, fontSize: 9 }}>{SPARK} MADE WITH LOVE</div>
                <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 17, color: "var(--cream)", marginTop: 3 }}>
                  Let's make something beautiful, together.
                </div>
              </div>
            </div>
            <DateChip />
            <ColorDirectionChip go={go} />
            <div style={{ width: "100%", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "20px 22px", boxShadow: "var(--shadow-sm)" }}>
              <OverallProgress progress={progress} />
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 26, marginBottom: 40 }}><TaglineStrip /></div>
        <NextStepCard progress={progress} go={go} style={{ marginBottom: 48 }} />
        <SectionLabel>The Module Library</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))", gap: 16 }}>
          {modules.map((m) => <ModuleCard key={m.id} m={m} progress={progress} go={go} />)}
        </div>
      </div>);

  }

  /* ---------- DASHBOARD ---------- */
  if (layout === "dashboard") {
    const inProgress = modules.filter((m) => progress[m.id] > 0 && progress[m.id] < 1).length;
    const done = modules.filter((m) => progress[m.id] >= 1).length;
    return (
      <div style={pageWrap}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap", marginBottom: 30 }}>
          <div>
            <div className="mono" style={{ color: "var(--rose-deep)", marginBottom: 12 }}>{SPARK} {tod.toUpperCase()}, FRIEND</div>
            <h1 style={{ fontSize: "clamp(32px,3.6vw,46px)", lineHeight: 1.05, letterSpacing: "-.02em" }}>Your DIY Wedding Flower Planner</h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
            <DateChip />
            <ColorDirectionChip go={go} align="flex-end" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 24 }}>
          <NextStepCard progress={progress} go={go} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "22px 24px", boxShadow: "var(--shadow-sm)" }}>
              <OverallProgress progress={progress} big />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, flex: 1 }}>
              <Stat n={done} label="modules complete" tone="sage" />
              <Stat n={inProgress} label="in progress" tone="rose" />
            </div>
          </div>
        </div>

        <div style={{ background: "var(--cream-deep)", borderRadius: "var(--radius)", padding: "16px 24px", marginBottom: 40 }}><TaglineStrip /></div>

        <SectionLabel>Jump into a module</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(228px,1fr))", gap: 16 }}>
          {modules.map((m) => <ModuleCard key={m.id} m={m} progress={progress} go={go} />)}
        </div>
      </div>);

  }

  /* ---------- COZY (image-led) ---------- */
  return (
    <div style={pageWrap}>
      <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 34,
        background: "repeating-linear-gradient(45deg, var(--cream-deep), var(--cream-deep) 14px, #eae7da 14px, #eae7da 28px)",
        minHeight: 340, display: "flex", alignItems: "flex-end", padding: "40px 44px", boxShadow: "var(--shadow-md)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(247,246,240,.1), rgba(44,53,42,.62))" }} />
        <span className="mono" style={{ position: "absolute", top: 18, left: 20, color: "var(--ink-faint)", fontSize: 9.5 }}>hero image · bride + bridesmaids arranging</span>
        <div style={{ position: "relative", color: "var(--cream)" }}>
          <div className="mono" style={{ color: "var(--cream)", opacity: .85, marginBottom: 14 }}>{SPARK} YOUR PRIVATE WORKSPACE</div>
          <h1 style={{ color: "var(--cream)", fontSize: "clamp(34px,4.4vw,54px)", lineHeight: 1.04, letterSpacing: "-.02em", marginBottom: 14, maxWidth: 560 }}>
            Welcome, friend.<br />Let's make something <span style={{ fontStyle: "italic" }}>beautiful.</span>
          </h1>
          <p style={{ color: "rgba(247,246,240,.9)", fontSize: 16.5, lineHeight: 1.55, maxWidth: 480 }}>
            Everything you need to DIY your wedding flowers like a pro, calm, organized, and always one tap away.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 42 }}>
        <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "22px 24px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
          <DateChip />
          <ColorDirectionChip go={go} />
          <OverallProgress progress={progress} />
        </div>
        <NextStepCard progress={progress} go={go} />
      </div>

      <SectionLabel>The Module Library</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))", gap: 18 }}>
        {modules.map((m) => <ModuleCard key={m.id} m={m} progress={progress} go={go} withImage />)}
      </div>
    </div>);

}

function Stat({ n, label, tone }) {
  return (
    <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)",
      padding: "20px 22px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: 42, lineHeight: 1, color: tone === "rose" ? "var(--rose-deep)" : "var(--sage-deep)" }}>{n}</div>
      <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>{label}</div>
    </div>);

}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
      <h2 style={{ fontSize: 22 }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
    </div>);

}

/* ── warm closing band (greets always, celebrates when 100% done) ── */
function ClosingBand({ progress, go }) {
  const done = progress.__overall >= 1;
  const brand = window.BC.brand;
  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 52px 70px" }} className="page-pad">
      <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-lg)",
        background: "var(--sage-deep)", color: "var(--cream)", padding: "54px 56px", boxShadow: "var(--shadow-lg)" }}>

        <div className="mono" style={{ color: "var(--rose)", fontSize: 10.5, marginBottom: 16 }}>
          {done ? "✦ YOU DID IT, FRIEND" : "✦ A LITTLE NOTE FOR YOU"}
        </div>
        <h2 style={{ color: "var(--cream)", fontSize: "clamp(28px,3.2vw,40px)", lineHeight: 1.08, letterSpacing: "-.01em", marginBottom: 18, maxWidth: 560 }}>
          {done ?
          "You're officially flower-ready. We're so proud of you." :
          "You are so much more capable than you think."}
        </h2>
        {done ?
        <p style={{ color: "rgba(247,246,240,.82)", fontSize: 16.5, lineHeight: 1.62, maxWidth: 540, marginBottom: 14 }}>
              Every checklist is complete and every worksheet is filled, you did the hard part. Now take a deep breath, trust your prep, and go soak up every gorgeous, petal-filled moment of your day.
            </p> :
        <div style={{ maxWidth: 540, marginBottom: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
          "DIY wedding flowers can feel overwhelming at first. That's normal.",
          "This space was designed to walk you through the process step by step, with guidance, checklists, tutorials, and support along the way.",
          "Move through this planner at your own pace, revisit things whenever you need to, and remember: flowers are forgiving. This doesn't have to be perfect to be beautiful."].
          map((line, i) =>
          <p key={i} style={{ color: "rgba(247,246,240,.82)", fontSize: 16.5, lineHeight: 1.62 }}>{line}</p>
          )}
            </div>}
        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 18, color: "var(--cream)", marginBottom: 26 }}>
          xo, {brand.founder.split(" ")[0]} &amp; the {brand.name} team
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <button onClick={() => go(done ? "needs" : "needs")} style={{ display: "inline-flex", alignItems: "center", gap: 9,
            background: "var(--cream)", color: "var(--sage-deep)", padding: "13px 22px", borderRadius: 999, fontWeight: 600, fontSize: 14.5,
            boxShadow: "0 4px 14px rgba(0,0,0,.18)" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
            {done ? "Revisit any module" : "Start at the beginning"} <Icon name="arrow" size={17} />
          </button>
          <a href={`https://instagram.com/${window.BC.brand.handle.replace("@", "")}`} target="_blank" rel="noopener"
          style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 20px", borderRadius: 999,
            border: "1px solid rgba(255,255,255,.3)", color: "var(--cream)", fontSize: 14.5, fontWeight: 600 }}>
            <Icon name="heart" size={16} /> Tag us {window.BC.brand.handle}
          </a>
        </div>
      </div>
    </div>);

}

Object.assign(window, { Home, ClosingBand });