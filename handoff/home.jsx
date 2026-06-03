/* home.jsx — Start Here / Home. Three layout directions via the `layout` prop. */
const { useState: useStateH } = React;

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
  const [editing, setEditing] = useStateH(false);
  const days = daysUntil(date);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--paper)",
      border: "1px solid var(--line-strong)", borderRadius: 999, padding: "7px 8px 7px 16px", boxShadow: "var(--shadow-sm)" }}>
      <Icon name="heart" size={15} style={{ color: "var(--rose)" }} />
      {editing || !date ?
      <input type="date" value={date} autoFocus={editing}
      onChange={(e) => setDate(e.target.value)} onBlur={() => setEditing(false)}
      style={{ border: "none", background: "transparent", fontSize: 13.5, color: "var(--ink)", fontFamily: "var(--sans)", outline: "none" }} /> :

      <span style={{ fontSize: 13.5 }}>
          <span style={{ color: "var(--ink-soft)" }}>Your day · </span>
          <strong>{new Date(date + "T00:00:00").toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</strong>
          {days != null && days >= 0 && <span className="mono" style={{ marginLeft: 10, color: "var(--rose-deep)", fontSize: 10.5 }}>{days} DAYS</span>}
        </span>
      }
      <button onClick={() => setEditing((e) => !e)} className="mono" style={{ fontSize: 9.5, color: "var(--ink-faint)",
        padding: "5px 9px", borderRadius: 999, background: "var(--cream)" }}>{date ? "EDIT" : "SET DATE"}</button>
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
        {progress.__done} of {progress.__total} steps checked off across {window.BC.modules.length} modules.
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
        {allDone ? "Every module's checklist is complete. Take a breath — you did the hard part. Now go enjoy your day." :
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
  return (
    <button onClick={() => go(m.id)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    style={{ textAlign: "left", background: "var(--paper)", border: "1px solid var(--line)",
      borderRadius: "var(--radius)", padding: 0, overflow: "hidden", boxShadow: hov ? "var(--shadow-md)" : "var(--shadow-sm)",
      transform: hov ? "translateY(-2px)" : "none", transition: "all .2s cubic-bezier(.4,0,.2,1)",
      display: "flex", flexDirection: "column" }}>
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
          {ring > 0 ?
          <ProgressRing value={ring} size={22} color={clay ? "var(--clay)" : "var(--accent-deep)"} /> :
          <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>{m.num}</span>}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 18.5, marginBottom: 5 }}>{m.label}</h3>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.45 }}>{m.kicker}</p>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600,
          color: clay ? "var(--clay)" : "var(--sage-deep)" }}>
          {ring >= 1 ? "Complete" : ring > 0 ? "In progress" : "Open module"} <Icon name="arrowSm" size={14} />
        </span>
      </div>
    </button>);

}

/* ════════════════════ HOME ════════════════════ */
function Home({ layout = "editorial", go, progress }) {
  const modules = window.BC.modules;
  const pageWrap = { maxWidth: 1120, margin: "0 auto", padding: "46px 52px 90px" };

  /* greeting */
  const hour = new Date().getHours();
  const tod = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  /* ---------- EDITORIAL ---------- */
  if (layout === "editorial") {
    return (
      <div style={pageWrap}>
        <div className="mono" style={{ color: "var(--rose-deep)", marginBottom: 18 }}>{SPARK} WELCOME TO YOUR FLOWER PLANNER</div>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 54, alignItems: "end", marginBottom: 30 }}>
          <div>
            <h1 style={{ fontSize: "clamp(40px,5vw,62px)", lineHeight: 1.02, letterSpacing: "-.02em", marginBottom: 20 }}>
              Hi friend —<br />let's DIY these<br /><span style={{ fontStyle: "italic", color: "var(--sage-deep)" }}>flowers together.</span>
            </h1>
            <p style={{ fontSize: 17.5, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 480 }}>This is your private, calm planning space for all things DIY wedding flowers.

Work through the modules in order or jump around as needed. Your notes, checklists, and progress save automatically along the way. 
</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
            <div style={{ width: "100%", position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
              {React.createElement("image-slot", { id: "home-alison", shape: "rect", fit: "cover",
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
            Everything you need to DIY your wedding flowers like a pro — calm, organized, and always one tap away.
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
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 52px 70px" }}>
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
              Every checklist is complete and every worksheet is filled — you did the hard part. Now take a deep breath, trust your prep, and go soak up every gorgeous, petal-filled moment of your day.
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