/* module.jsx — module page template. */
const { useState: useStateM, useEffect: useEffectM, useRef: useRefM } = React;
const SPARK_M = "\u2726";

/* ── print just one element (a worksheet), not the whole module ── */
function printOnlyEl(el) {
  if (!el) return;
  el.classList.add("print-only-target");
  document.body.classList.add("print-only");
  const cleanup = () => {
    el.classList.remove("print-only-target");
    document.body.classList.remove("print-only");
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);
  setTimeout(() => window.print(), 40);
}
function PrintableBadge({ targetRef, tint, accent }) {
  return (
    <button onClick={() => printOnlyEl(targetRef.current)} className="no-print mono"
    title="Print just this worksheet"
    style={{ display: "inline-flex", alignItems: "center", gap: 6, background: tint, color: accent,
      padding: "5px 11px", borderRadius: 999, fontSize: 10.5, cursor: "pointer" }}>
      <Icon name="print" size={12} /> PRINTABLE
    </button>);

}

/* ── Budget Estimator (Paperform) config ──
   Paste your Paperform address below to embed the live form inline.
   Accepts either the slug ("yourname") or the full URL ("https://yourname.paperform.co").
   Leave blank to show the branded launcher fallback. */
const PAPERFORM = "comj9sqy";
const ESTIMATOR_URL = "https://bloomcultureflowers.com/pages/budget-estimator";
function paperformSrc() {
  if (!PAPERFORM) return null;
  if (/^https?:\/\//.test(PAPERFORM)) return PAPERFORM;
  return `https://${PAPERFORM}.paperform.co/`;
}

function ModulePage({ m, go, progress }) {
  const clay = m.accent === "clay";
  const accent = clay ? "var(--clay)" : "var(--accent-deep)";
  const tint = clay ? "var(--clay-tint)" : "var(--sage-tint)";
  const scrollRef = useRefM();
  useEffectM(() => {if (scrollRef.current) scrollRef.current.scrollTop = 0;}, [m.id]);

  const idx = window.BC.modules.findIndex((x) => x.id === m.id);
  const next = window.BC.modules[idx + 1];
  const prev = window.BC.modules[idx - 1];

  return (
    <div ref={scrollRef} className="content-scroll" style={{ height: "100vh", overflowY: "auto" }}>
      {/* sticky action bar */}
      <div className="no-print" style={{ position: "sticky", top: 0, zIndex: 5, background: "rgba(247,246,240,.86)",
        backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)", padding: "13px 52px",
        display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={() => go("home")} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "var(--ink-soft)", fontWeight: 500 }}>
          <Icon name="home" size={15} /> All modules
        </button>
        <span className="mono" style={{ color: "var(--ink-faint)", fontSize: 10 }}>/ {m.label}</span>
        <div style={{ flex: 1 }} />
        <button onClick={() => window.print()} style={{ display: "inline-flex", alignItems: "center", gap: 8,
          fontSize: 13.5, fontWeight: 600, color: accent, padding: "9px 16px", borderRadius: 999, background: tint }}>
          <Icon name="print" size={16} /> Print
        </button>
      </div>

      <div className="print-area" style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 52px 80px" }}>
        {/* header */}
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 22 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, flexShrink: 0, display: "grid", placeItems: "center",
            background: clay ? "var(--clay)" : "var(--sage)", color: "#fff", boxShadow: "var(--shadow-md)" }}>
            <Icon name={MODULE_ICON[m.id]} size={28} stroke={1.6} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ color: clay ? "var(--clay)" : "var(--rose-deep)", marginBottom: 9 }}>{SPARK_M} MODULE {m.num}</div>
            <h1 style={{ fontSize: "clamp(32px,3.6vw,46px)", lineHeight: 1.04, letterSpacing: "-.02em", marginBottom: 8 }}>{m.label}</h1>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 19, color: "var(--ink-soft)" }}>{m.kicker}</p>
          </div>
        </div>

        <p style={{ fontSize: 17.5, lineHeight: 1.62, color: "var(--ink)", maxWidth: 760, marginBottom: 34 }}>{
          m.introLink
            ? m.intro.split(m.introLink.text).flatMap((seg, i) => i === 0 ? [seg] : [
                <a key={i} href={m.introLink.href} style={{ color: accent, fontWeight: 600, textDecoration: "underline", textDecorationColor: "var(--line-strong)" }}>{m.introLink.text}</a>,
                seg
              ])
            : m.intro
        }</p>

        {/* reassurance banner */}
        {m.banner && (
          <div style={{ display:"flex", gap:13, alignItems:"center", padding:"16px 20px", marginBottom:30,
            background:"var(--sage-tint)", borderRadius:"var(--radius)", maxWidth:760 }}>
            <Icon name="heart" size={20} style={{ color:"var(--sage-deep)", flexShrink:0 }}/>
            <span style={{ fontFamily:"var(--serif)", fontSize:18, fontStyle:"italic", color:"var(--sage-deep)" }}>{m.banner}</span>
          </div>
        )}

        {/* simple flower prep steps (visual + checkable) */}
        {m.flowSteps && <StepFlow flow={m.flowSteps} moduleId={m.id} accent={accent} />}

        {/* more quick fixes (list) */}
        {m.moreFixes && <MoreFixes data={m.moreFixes} accent={accent} />}

        {/* normal vs report split */}
        {m.normalVsReport && <NormalVsReport data={m.normalVsReport} accent={accent} />}

        {/* flower terminology glossary (thumbnail rows) */}
        {m.families && <FamilyGlossary families={m.families} accent={accent} />}

        {/* flower recipe card (dynamic) */}
        {m.recipe && <RecipeCard recipe={m.recipe} accent={accent} />}

        {/* design tutorials gallery (image + watch link) */}
        {m.tutorials && <TutorialGrid tutorials={m.tutorials} accent={accent} />}

        {/* order of operations (process strip) */}
        {m.orderOfOps && <OrderFlow flow={m.orderOfOps} accent={accent} />}

        {/* crew / hero photo slot */}
        {m.photo && <PhotoSlot photo={m.photo} accent={accent} />}

        {/* helper-count chart */}
        {m.helperChart && <HelperChart chart={m.helperChart} accent={accent} />}

        {/* jobs for helpers */}
        {m.jobs && <JobBoard jobs={m.jobs} accent={accent} />}

        {/* before / after image slots */}
        {m.beforeAfter && <BeforeAfter ba={m.beforeAfter} accent={accent} />}

        {/* time-scale infographic */}
        {m.scale && <ScaleStrip scale={m.scale} accent={accent} />}

        {/* full content — always shown */}
        {m.steps && <Steps steps={m.steps} accent={accent} tint={tint} />}
        {m.full && <FullSections sections={m.full} accent={accent} moduleId={m.id} collapsible={m.collapsibleFull} />}

        {/* shop grid (clickable labeled product cards) */}
        {m.shop && <ShopGrid shop={m.shop} accent={accent} />}

        {/* venue placement diagram */}
        {m.venueDiagram && <VenueDiagram vd={m.venueDiagram} accent={accent} />}

        {/* venue questions checklist */}
        {m.venueQuestions && <VenueQuestions vq={m.venueQuestions} moduleId={m.id} accent={accent} tint={tint} />}

        {/* day-of contact list */}
        {m.contacts && <ContactList contacts={m.contacts} accent={accent} tint={tint} />}

        {/* vessel-size guide + centerpiece chart */}
        {m.vessels && <VesselGuide vessels={m.vessels} accent={accent} />}
        {m.cpChart && <CenterpieceChart chart={m.cpChart} accent={accent} go={go} />}
        {m.vaseTally && <VaseTally tally={m.vaseTally} accent={accent} tint={tint} />}

        {/* worksheet (printable) */}
        {m.worksheet && <Worksheet kind={m.worksheet} accent={accent} tint={tint} />}

        {/* TL;DR recap — the short version, above the checklist */}
        {m.quick && <div style={{ marginTop: 48 }}>
          <TLDR m={m} accent={accent} tint={tint} clay={clay} />
        </div>}

        {/* optional photo above the checklist */}
        {m.checklistPhoto && <div style={{ marginTop: 46 }}><PhotoSlot photo={m.checklistPhoto} accent={accent} /></div>}

        {/* checklist + notes side by side */}
        <div style={{ marginTop: 46, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, alignItems: "start" }} className="cl-grid">
          <Card><Checklist moduleId={m.id} items={m.checklist} note={m.checklistNote} /></Card>
          <Card><NotesBox moduleId={m.id} /></Card>
        </div>

        {/* helpful links */}
        {m.links && m.links.length > 0 &&
        <div style={{ marginTop: 38 }}>
            <h3 style={{ fontSize: 22, display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Icon name="link" size={18} style={{ color: accent }} /> Helpful links
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
              {m.links.map((l, i) => <LinkCard key={i} link={l} accent={accent} go={go} />)}
            </div>
          </div>
        }

        {/* imagery placeholders */}
        {m.images && m.images.length > 0 &&
        <div className="no-print" style={{ marginTop: 38, display: "grid",
          gridTemplateColumns: `repeat(${Math.min(m.images.length, 2)},1fr)`, gap: 16 }}>
            {m.images.map((im, i) => <Placeholder key={i} label={im.label} note={im.note} height={200} />)}
          </div>
        }

        {/* prev / next */}
        <div className="no-print" style={{ marginTop: 48, display: "flex", justifyContent: "space-between", gap: 16, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
          {prev ?
          <NavCard dir="prev" m={prev} go={go} /> :
          <span />}
          {next ? <NavCard dir="next" m={next} go={go} /> :
          <button onClick={() => go("home")} style={{ textAlign:"right", padding:"14px 20px", borderRadius:"var(--radius)",
            background:"transparent", border:"1px solid transparent", maxWidth:300 }}
            onMouseEnter={e=>{ e.currentTarget.style.background="var(--paper)"; e.currentTarget.style.borderColor="var(--line)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="transparent"; }}>
            <span className="mono" style={{ fontSize:9.5, color:"var(--ink-faint)" }}>YOU'VE REACHED THE END ✦</span>
            <span style={{ display:"flex", alignItems:"center", gap:9, justifyContent:"flex-end", marginTop:5 }}>
              <span style={{ fontFamily:"var(--serif)", fontSize:18, color:"var(--ink)" }}>Back to Start</span>
              <Icon name="home" size={16} style={{ color:"var(--sage-deep)" }} />
            </span>
          </button>}
        </div>
        {!next && (
          <div className="no-print" style={{ marginTop:24, textAlign:"center", padding:"22px 20px",
            background:"var(--sage-tint)", borderRadius:"var(--radius)" }}>
            <span style={{ fontFamily:"var(--serif)", fontStyle:"italic", fontSize:18, color:"var(--sage-deep)" }}>
              That's everything, friend — you're going to do beautifully. 🌸
            </span>
          </div>
        )}
      </div>
    </div>);

}

/* ── TLDR card ── */
function TLDR({ m, accent, tint, clay }) {
  return (
    <div style={{ background: "var(--paper)", border: `1px solid var(--line)`, borderLeft: `4px solid ${accent}`,
      borderRadius: "var(--radius)", padding: "26px 30px", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span className="mono" style={{ background: tint, color: accent, padding: "5px 11px", borderRadius: 999, fontSize: 10.5 }}>TL;DR</span>
        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 17, color: "var(--ink-soft)" }}>the short version — keep this handy</span>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 13 }}>
        {m.quick.map((q, i) =>
        <li key={i} style={{ display: "flex", gap: 13, alignItems: "flex-start", fontSize: 16, lineHeight: 1.5 }}>
            <span style={{ color: clay ? "var(--clay)" : "var(--rose)", fontSize: 13, marginTop: 4, flexShrink: 0 }}>{SPARK_M}</span>
            <span>{q}</span>
          </li>
        )}
      </ul>
    </div>);

}

/* ── Steps (numbered) ── */
function Steps({ steps, accent, tint }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h3 style={{ fontSize: 24, marginBottom: 20 }}>Step by step</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {steps.map((s, i) =>
        <div key={i} style={{ display: "flex", gap: 20, padding: "18px 0", borderBottom: i < steps.length - 1 ? "1px solid var(--line)" : "none" }}>
            <div style={{ flexShrink: 0, width: 42, height: 42, borderRadius: "50%", border: `1.5px solid ${accent}`,
            display: "grid", placeItems: "center", fontFamily: "var(--serif)", fontSize: 18, color: accent }}>{i + 1}</div>
            <div style={{ flex: 1, paddingTop: 2 }}>
              <h4 style={{ fontSize: 18.5, marginBottom: 6 }}>{s.t}</h4>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>{s.d}</p>
            </div>
          </div>
        )}
      </div>
    </div>);

}

/* ── Full prose sections ── */
function FullSections({ sections, accent, moduleId, collapsible }) {
  if (collapsible) {
    return (
      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 10 }}>
        {sections.map((s, i) => <CollapsibleSection key={i} s={s} accent={accent} defaultOpen={i === 0} />)}
      </div>);
  }
  return (
    <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 30 }}>
      {sections.map((s, i) =>
      <div key={i}>
          {s.h && <h3 style={{ fontSize: 23, marginBottom: s.p ? 10 : 14, display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent, flexShrink: 0 }} />{s.h}</h3>}
          {s.p && <p style={{ fontSize: 16, lineHeight: 1.66, color: "var(--ink)", maxWidth: 760, paddingLeft: s.h ? 18 : 0 }}>{s.p}</p>}
          {s.embed === "estimator" && <EstimatorEmbed ranges={s.ranges} accent={accent} />}
          {s.days && <DayAccordion days={s.days} note={s.note} moduleId={moduleId} sectionIdx={i} accent={accent} />}
          {s.palettes && <PaletteGallery palettes={s.palettes} accent={accent} />}
          {s.moodboard && <MoodBoard board={s.moodboard} accent={accent} />}
          {s.image &&
        <div style={{ marginTop: 16, paddingLeft: s.h ? 18 : 0, maxWidth: 560 }}>
              <Placeholder label={s.image.label} note={s.image.note} height={200} />
            </div>
        }
          {s.list && s.checkable &&
        <CheckableList storeKey={`${moduleId}.s${i}`} items={s.list} accent={accent} />
        }
          {s.list && !s.checkable &&
        <ul style={{ margin: s.p ? "14px 0 0" : 0, padding: 0, paddingLeft: s.h ? 18 : 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
              {s.list.map((it, j) =>
          <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15.5, lineHeight: 1.5, color: "var(--ink)" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ink-faint)", marginTop: 9, flexShrink: 0 }} />
                  <span>{it}</span>
                </li>
          )}
            </ul>
        }
        </div>
      )}
    </div>);

}

/* ── collapsible reference section (e.g. Supplies Explained) ── */
function CollapsibleSection({ s, accent, defaultOpen }) {
  const [open, setOpen] = useStateM(!!defaultOpen);
  return (
    <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)",
      overflow: "hidden", boxShadow: open ? "var(--shadow-sm)" : "none", transition: "box-shadow .2s" }}>
      <button onClick={() => setOpen((o) => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12,
        padding: "16px 20px", textAlign: "left", color: "var(--ink)", background: open ? "var(--sage-tint)" : "transparent", transition: "background .2s" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, flexShrink: 0 }} />
        <span style={{ flex: 1, fontFamily: "var(--serif)", fontSize: 19, lineHeight: 1.1 }}>{s.h}</span>
        <Icon name="chevron" size={18} style={{ color: open ? accent : "var(--ink-faint)", flexShrink: 0,
          transform: open ? "rotate(90deg)" : "none", transition: "transform .22s" }} />
      </button>
      {open &&
      <div style={{ padding: "4px 22px 20px" }}>
          {s.p && <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--ink)", maxWidth: 720, fontWeight: "400", whiteSpace: "pre-line" }}>{s.p}</p>}
          {s.list &&
        <ul style={{ margin: s.p ? "12px 0 0" : 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
              {s.list.map((it, j) =>
          <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, lineHeight: 1.5, color: "var(--ink)" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ink-faint)", marginTop: 9, flexShrink: 0 }} />
                  <span>{it}</span>
                </li>
          )}
            </ul>
        }
        </div>
      }
    </div>);

}

/* ── day-by-day accordion (wedding week) — vertical timeline style ── */
function DayAccordion({ days, note, moduleId, sectionIdx, accent }) {
  const [open, setOpen] = useStateM(0);
  return (
    <div style={{ marginTop: 18, paddingLeft: 18, maxWidth: 760 }}>
      {note &&
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 18, padding: "14px 16px",
        background: "var(--cream-deep)", borderRadius: "var(--radius-sm)" }}>
          <Icon name="calendar" size={17} style={{ color: "var(--sage)", flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)" }}>{note}</span>
        </div>
      }
      <div style={{ position: "relative" }}>
        {/* the rail */}
        <div style={{ position: "absolute", left: 21, top: 22, bottom: 22, width: 2, background: "var(--line-strong)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {days.map((d, i) =>
          <DayCard key={i} d={d} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)}
          storeKey={`${moduleId}.s${sectionIdx}.${d.day.toLowerCase()}`} accent={accent} index={i} />
          )}
        </div>
      </div>
    </div>);

}

function DayCard({ d, isOpen, onToggle, storeKey, accent, index }) {
  const [checked, setChecked] = useLocal("phase." + storeKey, {});
  const toggle = (j) => setChecked((c) => ({ ...c, [j]: !c[j] }));
  const doneCount = d.items.filter((_, j) => checked[j]).length;
  const allDone = doneCount === d.items.length;
  return (
    <div style={{ position: "relative", display: "flex", gap: 18, alignItems: "flex-start" }}>
      {/* timeline node */}
      <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, zIndex: 1,
        display: "grid", placeItems: "center", transition: "all .2s",
        background: allDone ? accent : "var(--paper)",
        border: `2px solid ${allDone ? accent : isOpen ? accent : "var(--line-strong)"}`,
        boxShadow: isOpen ? `0 0 0 4px var(--sage-tint)` : "none",
        color: allDone ? "#fff" : isOpen ? accent : "var(--ink-faint)" }}>
        {allDone ? <Icon name="check" size={20} stroke={2.4} /> :
        <span className="mono" style={{ fontSize: 11, letterSpacing: ".05em" }}>{d.day.slice(0, 3).toUpperCase()}</span>}
      </div>

      {/* card */}
      <div style={{ flex: 1, minWidth: 0, background: "var(--paper)", border: "1px solid var(--line)",
        borderRadius: "var(--radius)", overflow: "hidden", boxShadow: isOpen ? "var(--shadow-md)" : "var(--shadow-sm)", transition: "box-shadow .2s" }}>
        <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14,
          padding: "15px 18px", textAlign: "left", color: "var(--ink)",
          background: isOpen ? "var(--sage-tint)" : "transparent", transition: "background .2s" }}>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span className="mono" style={{ display: "block", fontSize: 9, color: isOpen ? "var(--sage-deep)" : "var(--ink-faint)", marginBottom: 3 }}>
              DAY {index + 1} · {d.theme.toUpperCase()}
            </span>
            <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 23, lineHeight: 1.02, letterSpacing: ".04em" }}>{d.day}</span>
          </span>
          <span className="mono" style={{ fontSize: 9.5, color: allDone ? accent : "var(--ink-faint)" }}>{doneCount}/{d.items.length}</span>
          <Icon name="chevron" size={18} style={{ color: isOpen ? accent : "var(--ink-faint)", flexShrink: 0,
            transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .22s" }} />
        </button>

        {isOpen &&
        <div style={{ padding: "6px 14px 16px" }}>
            {d.items.map((raw, j) => {
            const it = typeof raw === "string" ? { t: raw, d: "" } : raw;
            return (
              <button key={j} onClick={() => toggle(j)} style={{
                display: "flex", alignItems: "flex-start", gap: 13, textAlign: "left", width: "100%",
                padding: "11px 12px", borderRadius: 9, background: checked[j] ? "var(--sage-tint)" : "transparent",
                transition: "background .16s", color: "var(--ink)", marginTop: j === 0 ? 4 : 0 }}
              onMouseEnter={(e) => {if (!checked[j]) e.currentTarget.style.background = "var(--cream)";}}
              onMouseLeave={(e) => {if (!checked[j]) e.currentTarget.style.background = "transparent";}}>
                  <span style={{ width: 21, height: 21, borderRadius: 7, flexShrink: 0, marginTop: 1,
                  border: checked[j] ? "none" : "1.6px solid var(--line-strong)",
                  background: checked[j] ? accent : "var(--paper)",
                  display: "grid", placeItems: "center", color: "#fff", transition: "all .16s" }}>
                    {checked[j] && <Icon name="check" size={13} stroke={2.6} />}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 15.5, fontWeight: 600, lineHeight: 1.4,
                    color: checked[j] ? "var(--ink-soft)" : "var(--ink)",
                    textDecoration: checked[j] ? "line-through" : "none", textDecorationColor: "var(--ink-faint)" }}>{it.t}</span>
                    {it.d && <span style={{ display: "block", fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-faint)", marginTop: 3 }}>{it.d}</span>}
                  </span>
                </button>);

          })}
            {(d.tips || (d.tip ? [d.tip] : [])).length > 0 &&
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", margin: "14px 6px 2px", padding: "15px 17px",
            background: "var(--rose-tint)", borderRadius: "var(--radius-sm)" }}>
                <Icon name="spark" size={17} style={{ color: "var(--rose-deep)", flexShrink: 0, marginTop: 2 }} />
                <div style={{ flex: 1 }}>
                  <span className="mono" style={{ display: "block", fontSize: 9.5, color: "var(--rose-deep)", marginBottom: 8 }}>PRO TIPS</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {(d.tips || [d.tip]).map((tp, k) =>
                <span key={k} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 14, lineHeight: 1.55, color: "var(--ink)" }}>
                        <span style={{ color: "var(--rose)", fontSize: 12, marginTop: 3, flexShrink: 0 }}>{"\u2726"}</span>
                        <span>{tp}</span>
                      </span>
                )}
                  </div>
                </div>
              </div>
          }
          </div>
        }
      </div>
    </div>);

}

/* ── inline checkable list (persistent) for timeline phases etc. ── */
function CheckableList({ storeKey, items, accent }) {
  const [checked, setChecked] = useLocal("phase." + storeKey, {});
  const toggle = (i) => setChecked((c) => ({ ...c, [i]: !c[i] }));
  const doneCount = items.filter((_, i) => checked[i]).length;
  return (
    <div style={{ marginTop: 14, marginLeft: 18, background: "var(--paper)", border: "1px solid var(--line)",
      borderRadius: "var(--radius-sm)", padding: "8px 10px", maxWidth: 680 }}>
      {items.map((it, j) =>
      <button key={j} onClick={() => toggle(j)} style={{
        display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left", width: "100%",
        padding: "9px 11px", borderRadius: 8, background: checked[j] ? "var(--sage-tint)" : "transparent",
        transition: "background .16s", color: "var(--ink)" }}
      onMouseEnter={(e) => {if (!checked[j]) e.currentTarget.style.background = "var(--cream)";}}
      onMouseLeave={(e) => {if (!checked[j]) e.currentTarget.style.background = "transparent";}}>
          <span style={{ width: 19, height: 19, borderRadius: 6, flexShrink: 0, marginTop: 1,
          border: checked[j] ? "none" : "1.6px solid var(--line-strong)",
          background: checked[j] ? accent : "var(--paper)",
          display: "grid", placeItems: "center", color: "#fff", transition: "all .16s" }}>
            {checked[j] && <Icon name="check" size={12} stroke={2.6} />}</span>
          <span style={{ fontSize: 15.5, lineHeight: 1.5,
          color: checked[j] ? "var(--ink-soft)" : "var(--ink)",
          textDecoration: checked[j] ? "line-through" : "none", textDecorationColor: "var(--ink-faint)" }}>{it}</span>
        </button>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 11px 6px" }}>
        <span className="mono" style={{ fontSize: 9.5, color: doneCount === items.length ? accent : "var(--ink-faint)" }}>
          {doneCount}/{items.length} done
        </span>
      </div>
    </div>);

}

function Card({ children }) {
  return <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)",
    padding: "24px 26px", boxShadow: "var(--shadow-sm)" }}>{children}</div>;
}

/* ── Budget Estimator embed (Paperform) with launcher fallback ── */
function EstimatorEmbed({ ranges, accent }) {
  const [open, setOpen] = useStateM(false);
  const src = paperformSrc();
  return (
    <div style={{ marginTop: 18, paddingLeft: 18 }}>
      {src ?
      <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden",
        boxShadow: "var(--shadow-md)", background: "var(--paper)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 18px", borderBottom: "1px solid var(--line)", background: "var(--paper)" }}>
            <Icon name="palette" size={16} style={{ color: accent }} />
            <span style={{ fontFamily: "var(--serif)", fontSize: 16 }}>Bloom Culture Budget Estimator</span>
            <span className="mono" style={{ marginLeft: "auto", fontSize: 9, color: "var(--ink-faint)" }}>LIVE TOOL</span>
          </div>
          <iframe title="Budget Estimator" src={src}
        style={{ width: "100%", height: 780, border: "none", display: "block", background: "var(--paper)" }}
        loading="lazy" allow="clipboard-write"></iframe>
        </div> :

      <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius)",
        background: "var(--sage-deep)", color: "var(--cream)", padding: "30px 32px", boxShadow: "var(--shadow-md)" }}>
          <div style={{ position: "absolute", right: -30, top: -40, width: 150, height: 150, borderRadius: "50%", border: "1px solid rgba(255,255,255,.12)" }} />
          <div className="mono" style={{ color: "var(--rose)", fontSize: 10.5, marginBottom: 12 }}>{SPARK_M} INTERACTIVE TOOL</div>
          <h4 style={{ color: "var(--cream)", fontSize: 24, marginBottom: 9, maxWidth: 480 }}>Price out your whole wish list</h4>
          <p style={{ color: "rgba(247,246,240,.8)", fontSize: 15, lineHeight: 1.55, maxWidth: 460, marginBottom: 22 }}>
            Pick your arrangements, enter quantities, and get a real price range based on current wholesale pricing — in just a few clicks.
          </p>
          <a href={ESTIMATOR_URL} target="_blank" rel="noopener" style={{ textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 9, background: "var(--cream)", color: "var(--sage-deep)",
          padding: "13px 22px", borderRadius: 999, fontWeight: 600, fontSize: 14.5, boxShadow: "0 4px 14px rgba(0,0,0,.18)" }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
            Open the Budget Estimator <Icon name="arrow" size={17} />
          </a>
        </div>
      }

      {/* ballpark ranges (collapsible) */}
      {ranges && ranges.length > 0 &&
      <div style={{ marginTop: 14, border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", background: "var(--paper)", overflow: "hidden" }}>
          <button onClick={() => setOpen((o) => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10,
          padding: "14px 18px", textAlign: "left", color: "var(--ink)" }}>
            <Icon name="list" size={16} style={{ color: accent }} />
            <span style={{ fontSize: 14.5, fontWeight: 600 }}>Quick ballpark — typical per-piece price ranges</span>
            <Icon name="chevron" size={16} style={{ marginLeft: "auto", color: "var(--ink-faint)", transform: open ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
          </button>
          {open &&
        <React.Fragment>
              <ul style={{ listStyle: "none", margin: 0, padding: "4px 18px 12px", display: "flex", flexDirection: "column", gap: 9 }}>
                {ranges.map((it, j) =>
            <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-soft)" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ink-faint)", marginTop: 8, flexShrink: 0 }} />
                    <span>{it}</span>
                  </li>
            )}
              </ul>
              <div style={{ margin: "0 18px 16px", padding: "13px 15px", background: "var(--cream)", borderRadius: "var(--radius-sm)",
            display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Icon name="spark" size={15} style={{ color: "var(--accent-deep)", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--ink-soft)" }}>
                  These are ballpark figures only. Actual pricing fluctuates with the flowers you choose — some varieties cost more than others — and with the size and fullness of each arrangement. Use the estimator above for a range based on your real selections.
                </span>
              </div>
            </React.Fragment>
        }
        </div>
      }
    </div>);

}

function LinkCard({ link, accent, go }) {
  const [hov, setHov] = useStateM(false);
  const isModule = !!link.module;
  const isExternal = !isModule && link.href && link.href !== "#";
  const onClick = (e) => {if (isModule) {e.preventDefault();if (go) go(link.module);} else if (!isExternal) {e.preventDefault();}};
  return (
    <a href={isExternal ? link.href : "#"} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener" : undefined}
    onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 13, padding: "15px 18px",
      background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)",
      boxShadow: hov ? "var(--shadow-md)" : "none", transform: hov ? "translateY(-1px)" : "none", transition: "all .18s" }}>
      <span style={{ width: 34, height: 34, borderRadius: 9, background: "var(--cream-deep)", display: "grid", placeItems: "center", color: accent, flexShrink: 0 }}>
        <Icon name={isModule ? MODULE_ICON[link.module] || "arrowSm" : "link"} size={16} /></span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 14.5, fontWeight: 600, color: "var(--ink)" }}>{link.label}</span>
        {link.note && <span style={{ display: "block", fontSize: 12.5, color: "var(--ink-faint)" }}>{link.note}</span>}
      </span>
      <Icon name={isModule ? "arrowSm" : "link"} size={16} style={{ color: "var(--ink-faint)" }} />
    </a>);

}

/* ── time-scale infographic (how long will design take?) ── */
function ScaleStrip({ scale, accent }) {
  return (
    <div style={{ marginTop: 30 }}>
      <h3 style={{ fontSize: 23, marginBottom: 6 }}>{scale.heading}</h3>
      <p style={{ fontSize: 14.5, color: "var(--ink-soft)", marginBottom: 18, maxWidth: 620 }}>{scale.sub}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="scale-grid">
        {scale.tiers.map((t, i) =>
        <div key={i} style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)",
          padding: "20px 20px 22px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 12 }}>
            {/* level bars */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 30 }}>
              {[1, 2, 3].map((n) =>
            <span key={n} style={{ flex: 1, borderRadius: 3, height: `${n / 3 * 100}%`,
              background: n <= t.level ? accent : "var(--cream-deep)", transition: "background .2s" }} />
            )}
            </div>
            <div>
              <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-faint)", marginBottom: 4 }}>TIER {i + 1}</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 21, lineHeight: 1.05 }}>{t.name}</div>
            </div>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, flex: 1 }}>{t.detail}</p>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>
                <Icon name="calendar" size={15} style={{ color: accent }} />{t.time}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-soft)" }}>
                <Icon name="users" size={15} style={{ color: "var(--ink-faint)" }} />{t.helpers}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>);

}

function NavCard({ dir, m, go }) {
  const [hov, setHov] = useStateM(false);
  const isNext = dir === "next";
  return (
    <button onClick={() => go(m.id)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    style={{ textAlign: isNext ? "right" : "left", padding: "14px 20px", borderRadius: "var(--radius)",
      background: hov ? "var(--paper)" : "transparent", border: "1px solid", borderColor: hov ? "var(--line)" : "transparent",
      boxShadow: hov ? "var(--shadow-sm)" : "none", transition: "all .18s", maxWidth: 300 }}>
      <span className="mono" style={{ fontSize: 9.5, color: "var(--ink-faint)" }}>{isNext ? "NEXT MODULE" : "PREVIOUS"}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 9, justifyContent: isNext ? "flex-end" : "flex-start", marginTop: 5 }}>
        {!isNext && <Icon name="arrow" size={16} style={{ color: "var(--sage-deep)", transform: "rotate(180deg)" }} />}
        <span style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)" }}>{m.label}</span>
        {isNext && <Icon name="arrow" size={16} style={{ color: "var(--sage-deep)" }} />}
      </span>
    </button>);

}

/* ── printable worksheet ── */
function Worksheet({ kind, accent, tint }) {
  if (kind === "needs") return <NeedsWorksheet accent={accent} tint={tint} />;
  if (kind === "supplies") return <SuppliesWorksheet accent={accent} tint={tint} />;
  if (kind === "helper") return <HelperWorksheet accent={accent} tint={tint} />;
  if (kind === "transport") return <TransportWorksheet accent={accent} tint={tint} />;
  const blank = (w = "100%") => <span style={{ display: "inline-block", width: w, borderBottom: "1.5px solid var(--line-strong)", height: 18 }} />;
  const rows = kind === "helper" ?
  ["Helper name", "Job assignment", "Arrangement(s) assigned", "Tutorials to watch", "Location", "Time", "Special notes"] :
  ["Arrangement", "Destination", "Loaded? (Y/N)", "Quantity", "Handling notes"];
  const ref = useRefM();
  return (
    <div ref={ref} style={{ marginTop: 42, background: "var(--paper)", border: `1px dashed var(--line-strong)`, borderRadius: "var(--radius)", padding: "28px 30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
        <PrintableBadge targetRef={ref} tint={tint} accent={accent} />
        <h3 style={{ fontSize: 22 }}>{kind === "helper" ? "Helper Assignment Sheet" : "Transportation Worksheet"}</h3>
      </div>
      <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 20 }}>
        {kind === "helper" ? "Print one for each helper and hand it out with their recipes." : "Print one per driver, along with your venue diagram."}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {rows.map((r, i) =>
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", width: 160, flexShrink: 0 }}>{r}</span>
            {blank()}
          </div>
        )}
      </div>
    </div>);

}

/* ── pretty printable Flower Needs Worksheet ── */
const NEEDS_GROUPS = [
{ h: "Personal Flowers", icon: "heart", items: [
  "Bridal bouquet", "Bridesmaid bouquets", "Boutonnieres", "Corsages", "Flower crown / hair florals", "Flower girl pieces"]
},
{ h: "Ceremony", icon: "spark", items: [
  "Ceremony arrangements", "Arch / arbor / pergola", "Aisle markers", "Head Table / Sweetheart florals"]
},
{ h: "Reception", icon: "vase", items: [
  "Centerpieces — small", "Centerpieces — medium", "Centerpieces — large", "Bud vases", "Table garland", "Cake flowers", "Bar · sign · extras"]
}];


function NeedsWorksheet({ accent, tint }) {
  const ref = useRefM();
  const Field = ({ label, prefix }) =>
  <div style={{ flex: 1, minWidth: 0 }}>
      <div className="mono" style={{ fontSize: 9, color: "var(--ink-faint)", marginBottom: 7 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, borderBottom: "1.5px solid var(--line-strong)", paddingBottom: 5, height: 24, boxSizing: "content-box" }}>
        {prefix && <span style={{ fontFamily: "var(--serif)", fontSize: 16, lineHeight: "24px", color: "var(--ink-faint)" }}>{prefix}</span>}
      </div>
    </div>;

  return (
    <div ref={ref} style={{ marginTop: 42, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)",
      padding: "30px 32px 34px", boxShadow: "var(--shadow-sm)" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
        <PrintableBadge targetRef={ref} tint={tint} accent={accent} />
        <h3 style={{ fontSize: 23 }}>Flower Needs Worksheet</h3>
      </div>
      <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 24, maxWidth: 620 }}>
        Dream it out on paper — jot a quantity beside everything you'd love, then plug your numbers into the Budget Estimator above to see your range.
      </p>

      {/* top fields */}
      <div style={{ display: "flex", gap: 26, marginBottom: 30, flexWrap: "wrap" }}>
        <Field label="WEDDING DATE" />
        <Field label="COLOR PALETTE" />
        <Field label="BUDGET GOAL" prefix="$" />
      </div>

      {/* groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        {NEEDS_GROUPS.map((g, gi) =>
        <div key={gi}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, background: tint, color: accent, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name={g.icon} size={16} />
              </span>
              <span style={{ fontFamily: "var(--serif)", fontSize: 18 }}>{g.h}</span>
              <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
              <span className="mono" style={{ fontSize: 9, color: "var(--ink-faint)" }}>QTY</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {g.items.map((it, ii) =>
            <div key={ii} style={{ display: "flex", alignItems: "center", gap: 16, padding: "9px 4px 9px 40px",
              borderBottom: ii < g.items.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <span style={{ flex: 1, fontSize: 15 }}>{it}</span>
                  <span style={{ flex: 1.1, borderBottom: "1px dotted var(--line-strong)", height: 16, minWidth: 80 }} />
                  <span style={{ width: 46, height: 34, borderRadius: 8, border: "1.5px solid var(--line-strong)", flexShrink: 0, background: "var(--cream)" }} />
                </div>
            )}
            </div>
          </div>
        )}
      </div>

      {/* footer note line */}
      <div style={{ marginTop: 26, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
        <div className="mono" style={{ fontSize: 9, color: "var(--ink-faint)", marginBottom: 9 }}>NOTES &amp; MUST-HAVES</div>
        <div style={{ borderBottom: "1px dotted var(--line-strong)", height: 20, marginBottom: 14 }} />
        <div style={{ borderBottom: "1px dotted var(--line-strong)", height: 20 }} />
      </div>
    </div>);

}

/* ── color palette gallery (in-workspace, tap to pick) ── */
function PaletteGallery({ palettes, accent }) {
  const [pick, setPick] = useLocal("palettePick", "");
  return (
    <div style={{ marginTop: 18, paddingLeft: 18 }}>
      <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-faint)", marginBottom: 12 }}>
        ✦ TAP THE ONE THAT MAKES YOU GO OOOOH
      </div>
      <div className="palette-grid">
        {palettes.map((p, i) => {
          const sel = pick === p.name;
          return (
            <button key={i} onClick={() => setPick(sel ? "" : p.name)} style={{
              position: "relative", display: "flex", flexDirection: "column", gap: 11, textAlign: "left", width: "100%",
              padding: "15px 15px 16px", borderRadius: "var(--radius-sm)",
              background: sel ? "var(--sage-tint)" : "var(--paper)",
              border: "1.5px solid", borderColor: sel ? accent : "var(--line)",
              boxShadow: sel ? "var(--shadow-sm)" : "none", transition: "all .16s" }}
            onMouseEnter={(e) => {if (!sel) {e.currentTarget.style.borderColor = "var(--line-strong)";e.currentTarget.style.background = "var(--cream)";}}}
            onMouseLeave={(e) => {if (!sel) {e.currentTarget.style.borderColor = "var(--line)";e.currentTarget.style.background = "var(--paper)";}}}>
              {/* color chips */}
              <span style={{ display: "flex" }}>
                {p.colors.map((c, j) =>
                <span key={j} style={{ width: 24, height: 24, borderRadius: "50%", background: c,
                  border: "2px solid var(--paper)", marginLeft: j === 0 ? 0 : -8,
                  boxShadow: "0 0 0 1px rgba(0,0,0,.05)" }} />
                )}
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.15 }}>{p.name}</span>
                <span style={{ display: "block", fontSize: 12.5, color: "var(--ink-faint)", marginTop: 3 }}>{p.mood}</span>
              </span>
              {sel &&
              <span style={{ position: "absolute", top: 12, right: 12, width: 22, height: 22, borderRadius: "50%",
                background: accent, color: "#fff", display: "grid", placeItems: "center" }}>
                  <Icon name="check" size={13} stroke={2.6} />
                </span>
              }
            </button>);

        })}
      </div>
      {pick &&
      <p style={{ marginTop: 14, fontSize: 13.5, color: "var(--ink-soft)" }}>
          Lovely choice — <strong style={{ color: "var(--ink)" }}>{pick}</strong> is saved as your color direction (you'll see it on your Home page too). Bring it to your consult and we'll translate it into real flower varieties. ✦
        </p>
      }
    </div>);

}

/* ── mood board: grid of user-fillable image slots ── */
function MoodBoard({ board, accent }) {
  const count = board.count || 6;
  return (
    <div style={{ marginTop: 26, paddingLeft: 18 }}>
      <h4 style={{ fontSize: 19, marginBottom: 6, display: "flex", alignItems: "center", gap: 9 }}>
        <Icon name="heart" size={17} style={{ color: accent }} /> {board.heading}
      </h4>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 640, marginBottom: 16 }}>{board.sub}</p>
      <div className="moodboard-grid">
        {Array.from({ length: count }).map((_, i) =>
        React.createElement("image-slot", {
          key: i,
          id: "moodboard-" + (i + 1),
          shape: "rounded",
          radius: "14",
          placeholder: "Drop inspo",
          style: { width: "100%", aspectRatio: "4 / 3", display: "block" }
        })
        )}
      </div>
    </div>);

}

/* ── vessel-size guide: thumbnail + spec rows ── */
function VesselGuide({ vessels, accent }){
  return (
    <div style={{ marginTop:8, marginBottom:8 }}>
      <h3 style={{ fontSize:24, marginBottom:6 }}>{vessels.heading}</h3>
      {vessels.sub && <p style={{ fontSize:15, lineHeight:1.6, color:"var(--ink-soft)", maxWidth:700, marginBottom:18 }}>{vessels.sub}</p>}
      <div style={{ display:"flex", flexDirection:"column", gap:10, maxWidth:760 }}>
        {vessels.items.map((v, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:15, background:"var(--paper)",
            border:"1px solid var(--line)", borderRadius:"var(--radius)", padding:"12px 16px 12px 12px", boxShadow:"var(--shadow-sm)" }}>
            {React.createElement("image-slot", {
              id: v.id, shape:"rounded", radius:"10", placeholder:"photo",
              style:{ width:"68px", height:"68px", flexShrink:0, display:"block" }
            })}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:10, flexWrap:"wrap" }}>
                <span style={{ fontFamily:"var(--serif)", fontSize:19 }}>{v.name}</span>
                <span className="mono" style={{ fontSize:10, color:accent, background:"var(--sage-tint)", padding:"3px 9px", borderRadius:999 }}>{v.spec}</span>
              </div>
              <div style={{ fontSize:13, color:"var(--ink-soft)", marginTop:5, lineHeight:1.45 }}>{v.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── centerpiece size & recipe chart ── */
function CenterpieceChart({ chart, accent, go }){
  return (
    <div style={{ marginTop:44 }}>
      <h3 style={{ fontSize:24, marginBottom:6 }}>{chart.heading}</h3>
      {chart.sub && <p style={{ fontSize:15, lineHeight:1.6, color:"var(--ink-soft)", maxWidth:720, marginBottom:18 }}>{chart.sub}</p>}
      {/* size silhouette cue */}
      {chart.sizeCue && (
        <div style={{ display:"flex", gap:14, alignItems:"flex-end", justifyContent:"flex-start",
          maxWidth:680, marginBottom:22, padding:"18px 20px 14px", background:"var(--paper)",
          border:"1px solid var(--line)", borderRadius:"var(--radius)", boxShadow:"var(--shadow-sm)" }}>
          {chart.sizeCue.map((s,i)=>(
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:9 }}>
              <div style={{ display:"flex", alignItems:"flex-end", height:96 }}>
                {/* simple vessel silhouette */}
                <div style={{ width:s.w, height:s.h, background:"var(--sage-tint)", border:`1.5px solid ${accent}`,
                  borderRadius:"6px 6px 14px 14px", position:"relative" }}>
                  <div style={{ position:"absolute", top:-6, left:"50%", transform:"translateX(-50%)", width:s.w*0.5,
                    height:8, borderRadius:999, background:accent, opacity:.5 }}/>
                </div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"var(--serif)", fontSize:16, color:"var(--ink)" }}>{s.label}</div>
                <div style={{ fontSize:11.5, color:"var(--ink-faint)" }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ border:"1px solid var(--line)", borderRadius:"var(--radius)", overflow:"hidden", boxShadow:"var(--shadow-sm)", maxWidth:680 }}>
        {/* header */}
        <div className="cp-row" style={{ background:"var(--sage-deep)" }}>
          <div className="mono" style={{ padding:"12px 16px", fontSize:9.5, color:"var(--cream)" }}>INGREDIENT</div>
          {chart.sizes.map((s,i)=>(
            <div key={i} className="mono" style={{ padding:"12px 8px", fontSize:9.5, color:"var(--cream)", textAlign:"center" }}>{s.label}</div>
          ))}
        </div>
        {/* rows */}
        {chart.rows.map((r,ri)=>(
          <div key={ri} className="cp-row" style={{ background: ri%2?"var(--cream)":"var(--paper)", borderTop:"1px solid var(--line)" }}>
            <div style={{ padding:"11px 16px", fontSize:14, fontWeight:600, color:"var(--ink)" }}>{r}</div>
            {chart.sizes.map((s,si)=>(
              <div key={si} style={{ padding:"11px 8px", fontSize:14, textAlign:"center",
                color: s.vals[ri]==="—"?"var(--ink-faint)":"var(--ink-soft)" }}>{s.vals[ri]}</div>
            ))}
          </div>
        ))}
      </div>
      {chart.note && (
        <div style={{ display:"flex", gap:10, alignItems:"flex-start", marginTop:14, padding:"13px 16px",
          background:"var(--rose-tint)", borderRadius:"var(--radius-sm)", maxWidth:680 }}>
          <Icon name="spark" size={15} style={{ color:"var(--rose-deep)", flexShrink:0, marginTop:2 }}/>
          <span style={{ fontSize:13.5, lineHeight:1.55, color:"var(--ink)" }}>{chart.note}</span>
        </div>
      )}
      {chart.glossaryNote && go && (
        <button onClick={()=>go("design")} style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:13,
          fontSize:13.5, fontWeight:600, color:accent, background:"none" }}>
          {chart.glossaryNote} <Icon name="arrowSm" size={15}/>
        </button>
      )}
    </div>
  );
}

/* ── vase tally (editable + printable count) ── */
function VaseTally({ tally, accent, tint }){
  const ref = useRefM();
  const [data, setData] = useLocal("vasetally", {});
  const set = (i, v) => setData(d => ({ ...d, [i]: v.replace(/[^0-9]/g, "") }));
  const total = tally.rows.reduce((sum, _, i) => sum + (parseInt(data[i]) || 0), 0);
  return (
    <div ref={ref} style={{ marginTop:44, background:"var(--paper)", border:"1px solid var(--line)", borderRadius:"var(--radius)",
      padding:"30px 32px 30px", boxShadow:"var(--shadow-sm)", maxWidth:620 }}>
      <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:6 }}>
        <PrintableBadge targetRef={ref} tint={tint} accent={accent}/>
        <h3 style={{ fontSize:23 }}>{tally.heading}</h3>
      </div>
      {tally.sub && <p style={{ fontSize:14, color:"var(--ink-soft)", marginBottom:20, lineHeight:1.55 }}>{tally.sub}</p>}
      <div style={{ display:"flex", flexDirection:"column" }}>
        {tally.rows.map((r,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 4px",
            borderBottom:"1px solid var(--line)" }}>
            <span style={{ flex:1, fontSize:15, color:"var(--ink)" }}>{r}</span>
            <input value={data[i]||""} onChange={e=>set(i,e.target.value)} inputMode="numeric" placeholder="0"
              style={{ width:56, textAlign:"center", border:"1.5px solid var(--line-strong)", borderRadius:8,
                background:"var(--cream)", fontSize:15, padding:"7px 4px", color:"var(--ink)", outline:"none", fontFamily:"var(--sans)" }}
              onFocus={e=>e.target.style.borderColor="var(--accent)"} onBlur={e=>e.target.style.borderColor="var(--line-strong)"}/>
          </div>
        ))}
        <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 4px 2px" }}>
          <span className="mono" style={{ flex:1, fontSize:10, color:"var(--ink-faint)" }}>TOTAL VESSELS</span>
          <span style={{ width:56, textAlign:"center", fontFamily:"var(--serif)", fontSize:22, color:accent }}>{total}</span>
        </div>
      </div>
      {tally.shopHref && (
        <a href={tally.shopHref} target="_blank" rel="noopener" className="no-print"
          style={{ textDecoration:"none", display:"inline-flex", alignItems:"center", gap:9, marginTop:18,
            padding:"12px 20px", borderRadius:999, background:"var(--accent-deep)", color:"#fff", fontSize:14, fontWeight:600 }}>
          <Icon name="link" size={16}/> {tally.shopLabel} <Icon name="arrowSm" size={15}/>
        </a>
      )}
    </div>
  );
}

/* ── venue questions checklist (persistent, printable) ── */
function VenueQuestions({ vq, moduleId, accent, tint }){
  const ref = useRefM();
  const [checked, setChecked] = useLocal("venueq." + moduleId, {});
  const toggle = (i) => setChecked(c => ({ ...c, [i]: !c[i] }));
  return (
    <div ref={ref} style={{ marginTop:44, background:"var(--paper)", border:"1px solid var(--line)", borderRadius:"var(--radius)",
      padding:"28px 30px 30px", boxShadow:"var(--shadow-sm)", maxWidth:680 }}>
      <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:6 }}>
        <PrintableBadge targetRef={ref} tint={tint} accent={accent}/>
        <h3 style={{ fontSize:23 }}>{vq.heading}</h3>
      </div>
      {vq.sub && <p style={{ fontSize:14, color:"var(--ink-soft)", marginBottom:18, lineHeight:1.55 }}>{vq.sub}</p>}
      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        {vq.items.map((q,i)=>(
          <button key={i} onClick={()=>toggle(i)} style={{ display:"flex", alignItems:"flex-start", gap:13, textAlign:"left",
            width:"100%", padding:"11px 12px", borderRadius:"var(--radius-sm)", background: checked[i]?"var(--sage-tint)":"transparent",
            transition:"background .16s", color:"var(--ink)" }}
            onMouseEnter={e=>{ if(!checked[i]) e.currentTarget.style.background="var(--cream)"; }}
            onMouseLeave={e=>{ if(!checked[i]) e.currentTarget.style.background="transparent"; }}>
            <span style={{ width:21, height:21, borderRadius:7, flexShrink:0, marginTop:1,
              border: checked[i]?"none":"1.6px solid var(--line-strong)", background: checked[i]?accent:"var(--paper)",
              display:"grid", placeItems:"center", color:"#fff" }}>{checked[i] && <Icon name="check" size={13} stroke={2.6}/>}</span>
            <span style={{ fontSize:15, lineHeight:1.5, color: checked[i]?"var(--ink-soft)":"var(--ink)" }}>{q}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── day-of contact list (editable, printable) ── */
function ContactList({ contacts, accent, tint }){
  const ref = useRefM();
  const [data, setData] = useLocal("dayofcontacts", {});
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const fieldStyle = { border:"none", borderBottom:"1px dotted var(--line-strong)", background:"transparent",
    fontSize:14.5, padding:"5px 2px", color:"var(--ink)", outline:"none", fontFamily:"var(--sans)", width:"100%" };
  const onF = e => e.target.style.borderBottomColor = "var(--accent)";
  const onB = e => e.target.style.borderBottomColor = "var(--line-strong)";
  return (
    <div ref={ref} style={{ marginTop:30, background:"var(--paper)", border:"1px solid var(--line)", borderRadius:"var(--radius)",
      padding:"28px 30px 30px", boxShadow:"var(--shadow-sm)", maxWidth:680 }}>
      <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:6 }}>
        <PrintableBadge targetRef={ref} tint={tint} accent={accent}/>
        <h3 style={{ fontSize:23 }}>{contacts.heading}</h3>
      </div>
      {contacts.sub && <p style={{ fontSize:14, color:"var(--ink-soft)", marginBottom:18, lineHeight:1.55 }}>{contacts.sub}</p>}
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {contacts.rows.map((r,i)=>(
          <div key={i} style={{ display:"flex", gap:16, alignItems:"flex-end", flexWrap:"wrap" }}>
            <div style={{ flex:"1 1 180px", minWidth:0 }}>
              <div className="mono" style={{ fontSize:9, color:"var(--ink-faint)", marginBottom:6 }}>{r}</div>
              <input value={data[`${i}.name`]||""} onChange={e=>set(`${i}.name`,e.target.value)} onFocus={onF} onBlur={onB}
                placeholder="Name" style={fieldStyle}/>
            </div>
            <div style={{ flex:"1 1 140px", minWidth:0 }}>
              <div className="mono" style={{ fontSize:9, color:"var(--ink-faint)", marginBottom:6 }}>PHONE</div>
              <input value={data[`${i}.phone`]||""} onChange={e=>set(`${i}.phone`,e.target.value)} onFocus={onF} onBlur={onB}
                style={fieldStyle}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── venue placement diagram (clean example + legend + how-to + drop slot) ── */
function VenueDiagram({ vd, accent }){
  return (
    <div style={{ marginTop:44 }}>
      <h3 style={{ fontSize:24, marginBottom:6 }}>{vd.heading}</h3>
      {vd.sub && <p style={{ fontSize:15, lineHeight:1.6, color:"var(--ink-soft)", maxWidth:700, marginBottom:22 }}>{vd.sub}</p>}

      {/* clean example diagram + legend */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:22, alignItems:"stretch", marginBottom:30 }}>
        <div style={{ flex:"2 1 340px", minWidth:0 }}>
          <div className="mono" style={{ fontSize:9, color:"var(--ink-faint)", marginBottom:8 }}>✦ EXAMPLE DIAGRAM</div>
          <ExampleFloorPlan accent={accent}/>
        </div>
        {vd.legend && (
          <div style={{ flex:"1 1 220px", minWidth:0 }}>
            <div className="mono" style={{ fontSize:9, color:"var(--ink-faint)", marginBottom:8 }}>LEGEND</div>
            <div style={{ background:"var(--paper)", border:"1px solid var(--line)", borderRadius:"var(--radius)", padding:"14px 16px", boxShadow:"var(--shadow-sm)" }}>
              {vd.legend.map((it,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:11, padding:"7px 0",
                  borderBottom: i<vd.legend.length-1?"1px solid var(--line)":"none" }}>
                  <span style={{ width:24, height:24, borderRadius:"50%", flexShrink:0, display:"grid", placeItems:"center",
                    background:"var(--sage-deep)", color:"#fff", fontFamily:"var(--serif)", fontSize:13 }}>{it.k}</span>
                  <span style={{ fontSize:13.5, color:"var(--ink)" }}>{it.v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* make your own: how-to + drop slot */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:24, alignItems:"flex-start", borderTop:"1px solid var(--line)", paddingTop:26 }}>
        <div style={{ flex:"1 1 280px", minWidth:0 }}>
          <h4 style={{ fontSize:18, marginBottom:14 }}>Make your own</h4>
          <ol style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:14 }}>
            {vd.steps.map((s,i)=>(
              <li key={i} style={{ display:"flex", gap:13, alignItems:"flex-start" }}>
                <span style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, display:"grid", placeItems:"center",
                  background:"var(--sage-tint)", color:"var(--sage-deep)", fontFamily:"var(--serif)", fontSize:15 }}>{i+1}</span>
                <span style={{ fontSize:15, lineHeight:1.5, color:"var(--ink)", paddingTop:3 }}>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div style={{ flex:"1 1 300px", minWidth:0 }}>
          <div style={{ borderRadius:"var(--radius)", overflow:"hidden", border:"1px solid var(--line)", boxShadow:"var(--shadow-sm)" }}>
            {React.createElement("image-slot", {
              id: vd.imgId, shape:"rect", placeholder:"Drop your venue diagram",
              style:{ width:"100%", aspectRatio:"4 / 3", display:"block" }
            })}
          </div>
          {vd.caption && <p style={{ fontSize:12.5, color:"var(--ink-faint)", marginTop:8, textAlign:"center" }}>{vd.caption}</p>}
        </div>
      </div>
    </div>
  );
}

/* ── clean schematic example floor plan ── */
function ExampleFloorPlan({ accent }){
  const tables = [
    { l:"A", x:22, y:34 }, { l:"B", x:50, y:30 }, { l:"C", x:78, y:34 },
    { l:"A", x:22, y:72 }, { l:"B", x:50, y:76 }, { l:"C", x:78, y:72 }
  ];
  const zone = (label, style) => (
    <div className="mono" style={{ position:"absolute", fontSize:8, letterSpacing:".12em", color:"var(--ink-faint)",
      background:"var(--cream-deep)", padding:"4px 7px", borderRadius:5, whiteSpace:"nowrap", transform:"translate(-50%,-50%)", ...style }}>{label}</div>
  );
  const badge = (l, style) => (
    <span style={{ position:"absolute", width:22, height:22, borderRadius:"50%", transform:"translate(-50%,-50%)",
      background:accent, color:"#fff", display:"grid", placeItems:"center", fontFamily:"var(--serif)", fontSize:12,
      boxShadow:"0 0 0 2px var(--paper)", ...style }}>{l}</span>
  );
  return (
    <div style={{ position:"relative", width:"100%", aspectRatio:"4 / 3", background:"var(--paper)",
      border:"1.5px solid var(--line-strong)", borderRadius:"var(--radius)", boxShadow:"var(--shadow-sm)", overflow:"hidden" }}>
      {/* dance floor */}
      <div className="mono" style={{ position:"absolute", left:"50%", top:"53%", transform:"translate(-50%,-50%)",
        width:"30%", height:"20%", border:"1.5px dashed var(--line-strong)", borderRadius:8, display:"grid", placeItems:"center",
        fontSize:9, letterSpacing:".1em", color:"var(--ink-soft)", textAlign:"center", lineHeight:1.15 }}>DANCE FLOOR</div>
      {/* sweetheart table */}
      <div style={{ position:"absolute", left:"50%", top:"12%", transform:"translate(-50%,-50%)", width:"22%", height:"8%",
        background:"var(--sage-tint)", border:"1px solid var(--sage)", borderRadius:6, display:"grid", placeItems:"center" }}>
        <span className="mono" style={{ fontSize:7.5, color:"var(--sage-deep)", letterSpacing:".08em" }}>SWEETHEART</span>
      </div>
      {/* guest tables */}
      {tables.map((t,i)=>(
        <div key={i} style={{ position:"absolute", left:`${t.x}%`, top:`${t.y}%`, transform:"translate(-50%,-50%)",
          width:38, height:38, borderRadius:"50%", background:"var(--cream)", border:"1.5px solid var(--line-strong)",
          display:"grid", placeItems:"center" }}>
          <span style={{ width:21, height:21, borderRadius:"50%", background:accent, color:"#fff", display:"grid", placeItems:"center",
            fontFamily:"var(--serif)", fontSize:12 }}>{t.l}</span>
        </div>
      ))}
      {/* extra arrangement + repurposed badges */}
      {badge("D", { left:"13%", top:"88%" })}
      {badge("E", { left:"63%", top:"10%" })}
      {badge("F", { left:"50%", top:"5%" })}
      {/* zone labels */}
      {zone("CAKE", { left:"85%", top:"10%" })}
      {zone("BUFFET", { left:"10%", top:"53%" })}
      {zone("BAR", { left:"90%", top:"53%" })}
      {zone("DJ", { left:"85%", top:"90%" })}
      {zone("ENTRY", { left:"50%", top:"95%" })}
    </div>
  );
}

/* ── editable + printable Transportation Checklist ── */
function TransportWorksheet({ accent, tint }){
  const ref = useRefM();
  const [data, setData] = useLocal("transportlist", {});
  const rows = Array.from({ length: 12 });
  const get = (i, f) => data[`${i}.${f}`] || "";
  const set = (i, f, v) => setData(d => ({ ...d, [`${i}.${f}`]: v }));
  const toggle = (i) => setData(d => ({ ...d, [`${i}.loaded`]: !d[`${i}.loaded`] }));
  const inputStyle = { border:"none", borderBottom:"1px dotted var(--line-strong)", background:"transparent",
    fontSize:14.5, padding:"4px 2px", color:"var(--ink)", outline:"none", fontFamily:"var(--sans)", width:"100%" };
  const onF = e => e.target.style.borderBottomColor = "var(--accent)";
  const onB = e => e.target.style.borderBottomColor = "var(--line-strong)";
  return (
    <div ref={ref} style={{ marginTop:42, background:"var(--paper)", border:"1px solid var(--line)", borderRadius:"var(--radius)",
      padding:"30px 32px 34px", boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:6 }}>
        <PrintableBadge targetRef={ref} tint={tint} accent={accent}/>
        <h3 style={{ fontSize:23 }}>Transportation Checklist</h3>
      </div>
      <p style={{ fontSize:14, color:"var(--ink-soft)", marginBottom:22, maxWidth:640 }}>
        List every arrangement, where it's headed, and check it off as it's loaded. It saves as you type — print one per driver (with your venue diagram) using the <strong>Printable</strong> tag.
      </p>
      <div style={{ display:"flex", alignItems:"center", gap:14, padding:"0 4px 8px", borderBottom:"1px solid var(--line)" }}>
        <span className="mono" style={{ flex:1.6, fontSize:9, color:"var(--ink-faint)" }}>ARRANGEMENT</span>
        <span className="mono" style={{ width:54, flexShrink:0, fontSize:9, color:"var(--ink-faint)" }}>QTY</span>
        <span className="mono" style={{ flex:1.2, fontSize:9, color:"var(--ink-faint)" }}>DESTINATION</span>
        <span className="mono" style={{ width:60, flexShrink:0, fontSize:9, color:"var(--ink-faint)", textAlign:"center" }}>LOADED</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column" }}>
        {rows.map((_, i) => {
          const loaded = !!data[`${i}.loaded`];
          return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"10px 4px",
              borderBottom: i < rows.length-1 ? "1px solid var(--line)" : "none" }}>
              <input value={get(i,"arr")} onChange={e=>set(i,"arr",e.target.value)} onFocus={onF} onBlur={onB}
                placeholder={i===0?"e.g. Tall centerpiece":""} style={{ ...inputStyle, flex:1.6,
                  textDecoration: loaded?"line-through":"none", color: loaded?"var(--ink-faint)":"var(--ink)" }}/>
              <input value={get(i,"qty")} onChange={e=>set(i,"qty",e.target.value)} onFocus={onF} onBlur={onB} style={{ ...inputStyle, width:54, flexShrink:0 }}/>
              <input value={get(i,"dest")} onChange={e=>set(i,"dest",e.target.value)} onFocus={onF} onBlur={onB} style={{ ...inputStyle, flex:1.2 }}/>
              <div style={{ width:60, flexShrink:0, display:"flex", justifyContent:"center" }}>
                <button onClick={()=>toggle(i)} style={{ width:24, height:24, borderRadius:7,
                  border: loaded?"none":"1.5px solid var(--line-strong)", background: loaded?accent:"var(--cream)",
                  display:"grid", placeItems:"center", color:"#fff" }}>{loaded && <Icon name="check" size={13} stroke={2.6}/>}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── editable + printable Helper Assignment Sheet ── */
function HelperWorksheet({ accent, tint }){
  const [helpers, setHelpers] = useLocal("helperlist", [{}]);
  const updateH = (i, k, v) => setHelpers(hs => hs.map((h, x) => x === i ? { ...h, [k]: v } : h));
  const toggleH = (i, k) => setHelpers(hs => hs.map((h, x) => x === i ? { ...h, [k]: !h[k] } : h));
  const addHelper = () => setHelpers(hs => [...hs, {}]);
  const removeHelper = (i) => setHelpers(hs => hs.length > 1 ? hs.filter((_, x) => x !== i) : hs);
  return (
    <div style={{ marginTop:42 }}>
      <h3 style={{ fontSize:23, marginBottom:6 }}>Helper Assignment Sheets</h3>
      <p style={{ fontSize:14, color:"var(--ink-soft)", marginBottom:22, maxWidth:660 }}>
        Add a sheet for each helper — they save as you type. Tap <strong>Printable</strong> on any card to print just that one and hand it out with their recipes.
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        {helpers.map((h, i) => (
          <HelperCard key={i} h={h} i={i} count={helpers.length} update={updateH} onToggle={toggleH} onRemove={removeHelper} accent={accent} tint={tint} />
        ))}
      </div>
      <button onClick={addHelper} style={{ marginTop:16, display:"inline-flex", alignItems:"center", gap:8,
        padding:"11px 18px", borderRadius:999, border:"1.5px solid var(--line-strong)", background:"var(--paper)",
        color:"var(--ink)", fontSize:14, fontWeight:600, cursor:"pointer" }}>
        <span style={{ fontSize:18, lineHeight:1 }}>+</span> Add another helper
      </button>
    </div>
  );
}

function HelperCard({ h, i, count, update, onToggle, onRemove, accent, tint }){
  const ref = useRefM();
  const get = (k) => h[k] || "";
  const set = (k, v) => update(i, k, v);
  const toggle = (k) => onToggle(i, k);
  const fieldStyle = { border:"none", borderBottom:"1px dotted var(--line-strong)", background:"transparent",
    fontSize:14.5, padding:"5px 2px", color:"var(--ink)", outline:"none", fontFamily:"var(--sans)", width:"100%" };
  const onF = e => e.target.style.borderBottomColor = "var(--accent)";
  const onB = e => e.target.style.borderBottomColor = "var(--line-strong)";
  const jobs = [
    ["j1", "Job 1 — Receive & Process"],
    ["j2b", "Job 2 — Bridal Party / Bouquets"],
    ["j2c", "Job 2 — Centerpieces"],
    ["j2cer", "Job 2 — Ceremony Flowers"],
    ["j3cer", "Job 3 — Ceremony Set-up"],
    ["j3rec", "Job 3 — Reception Set-up"]
  ];
  const Field = ({ label, k, flex }) => (
    <div style={{ flex: flex || "1 1 180px", minWidth:0 }}>
      <div className="mono" style={{ fontSize:9, color:"var(--ink-faint)", marginBottom:5 }}>{label}</div>
      <input value={get(k)} onChange={e=>set(k,e.target.value)} onFocus={onF} onBlur={onB} style={fieldStyle}/>
    </div>
  );
  return (
    <div ref={ref} style={{ background:"var(--paper)", border:"1px solid var(--line)", borderRadius:"var(--radius)",
      padding:"24px 26px 28px", boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:18 }}>
        <span style={{ width:30, height:30, borderRadius:"50%", background:"var(--sage-deep)", color:"#fff",
          display:"grid", placeItems:"center", fontFamily:"var(--serif)", fontSize:15, flexShrink:0 }}>{i+1}</span>
        <h4 style={{ fontSize:19, flex:1 }}>Helper {i+1}</h4>
        <PrintableBadge targetRef={ref} tint={tint} accent={accent}/>
        {count > 1 && <button onClick={()=>onRemove(i)} title="Remove helper" style={{ width:30, height:30, borderRadius:"50%",
          display:"grid", placeItems:"center", color:"var(--ink-faint)", background:"var(--cream)", flexShrink:0 }}><Icon name="x" size={15}/></button>}
      </div>
      {/* top fields */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"18px 24px", marginBottom:24 }}>
        <Field label="HELPER NAME" k="name" flex="1 1 240px"/>
        <Field label="DATE" k="date" flex="1 1 120px"/>
        <Field label="LOCATION" k="location" flex="1 1 200px"/>
        <Field label="TIME" k="time" flex="1 1 120px"/>
      </div>
      {/* job assignment checkboxes */}
      <div className="mono" style={{ fontSize:9, color:"var(--ink-faint)", marginBottom:10 }}>JOB ASSIGNMENT</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, minmax(0,1fr))", gap:"8px 18px", marginBottom:24 }} className="helper-jobs">
        {jobs.map(([k,label])=>{
          const on = !!h[k];
          return (
            <button key={k} onClick={()=>toggle(k)} style={{ display:"flex", alignItems:"center", gap:11, textAlign:"left",
              padding:"9px 12px", borderRadius:"var(--radius-sm)", background: on?"var(--sage-tint)":"transparent",
              border:"1px solid", borderColor: on?"transparent":"var(--line)", color:"var(--ink)", transition:"all .15s" }}>
              <span style={{ width:20, height:20, borderRadius:6, flexShrink:0, border: on?"none":"1.6px solid var(--line-strong)",
                background: on?accent:"var(--paper)", display:"grid", placeItems:"center", color:"#fff" }}>
                {on && <Icon name="check" size={12} stroke={2.6}/>}</span>
              <span style={{ fontSize:14, fontWeight: on?600:400 }}>{label}</span>
            </button>
          );
        })}
      </div>
      {/* detail fields */}
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        {[["arr","ARRANGEMENTS TO MAKE"],["tut","TUTORIALS TO WATCH"]].map(([prefix,label])=>(
          <div key={prefix} style={{ width:"100%" }}>
            <div className="mono" style={{ fontSize:9, color:"var(--ink-faint)", marginBottom:9 }}>{label}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
              {[0,1,2,3,4].map(i=>{
                const dk = `${prefix}${i}_d`, on = !!h[dk];
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:11 }}>
                    <button onClick={()=>toggle(dk)} style={{ width:20, height:20, borderRadius:6, flexShrink:0,
                      border: on?"none":"1.6px solid var(--line-strong)", background: on?accent:"var(--paper)",
                      display:"grid", placeItems:"center", color:"#fff" }}>{on && <Icon name="check" size={12} stroke={2.6}/>}</button>
                    <input value={get(`${prefix}${i}`)} onChange={e=>set(`${prefix}${i}`,e.target.value)} onFocus={onF} onBlur={onB}
                      style={{ ...fieldStyle, textDecoration: on?"line-through":"none", color: on?"var(--ink-faint)":"var(--ink)" }}/>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div style={{ width:"100%" }}>
          <div className="mono" style={{ fontSize:9, color:"var(--ink-faint)", marginBottom:7 }}>SPECIAL NOTES</div>
          <textarea value={get("notes")} onChange={e=>set("notes",e.target.value)} onFocus={onF} onBlur={onB}
            style={{ ...fieldStyle, minHeight:64, resize:"vertical", borderBottom:"1px dotted var(--line-strong)", lineHeight:1.6 }}/>
        </div>
      </div>
    </div>
  );
}

/* ── editable + printable Supply Shopping List ── */
function SuppliesWorksheet({ accent, tint }) {
  const ref = useRefM();
  const [data, setData] = useLocal("supplylist", {});
  const rows = Array.from({ length: 14 });
  const get = (i, f) => data[`${i}.${f}`] || "";
  const set = (i, f, v) => setData((d) => ({ ...d, [`${i}.${f}`]: v }));
  const toggle = (i) => setData((d) => ({ ...d, [`${i}.done`]: !d[`${i}.done`] }));
  const inputStyle = { border: "none", borderBottom: "1px dotted var(--line-strong)", background: "transparent",
    fontSize: 14.5, padding: "4px 2px", color: "var(--ink)", outline: "none", fontFamily: "var(--sans)" };
  const onFocus = (e) => e.target.style.borderBottomColor = "var(--accent)";
  const onBlur = (e) => e.target.style.borderBottomColor = "var(--line-strong)";
  return (
    <div ref={ref} style={{ marginTop: 42, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)",
      padding: "30px 32px 34px", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
        <PrintableBadge targetRef={ref} tint={tint} accent={accent} />
        <h3 style={{ fontSize: 23 }}>Supply Shopping List</h3>
      </div>
      <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 22, maxWidth: 640 }}>
        Type your list right here — it saves automatically. Look over the suggested supplies at the bottom of each flower recipe, add them below, then print it to take shopping (or print it blank and fill it by hand). Tap the <strong>Printable</strong> tag above to print just this list.
      </p>
      {/* column headers */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "0 4px 8px", borderBottom: "1px solid var(--line)" }}>
        <span style={{ width: 24, flexShrink: 0 }} />
        <span className="mono" style={{ flex: 1, fontSize: 9, color: "var(--ink-faint)" }}>ITEM</span>
        <span className="mono" style={{ width: 70, flexShrink: 0, fontSize: 9, color: "var(--ink-faint)" }}>QTY</span>
        <span className="mono" style={{ width: 130, flexShrink: 0, fontSize: 9, color: "var(--ink-faint)" }}>SOURCE / LINK</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {rows.map((_, i) => {
          const done = !!data[`${i}.done`];
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 4px",
              borderBottom: i < rows.length - 1 ? "1px solid var(--line)" : "none" }}>
              <button onClick={() => toggle(i)} title="Got it" style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                border: done ? "none" : "1.5px solid var(--line-strong)", background: done ? accent : "var(--cream)",
                display: "grid", placeItems: "center", color: "#fff" }}>
                {done && <Icon name="check" size={13} stroke={2.6} />}
              </button>
              <input value={get(i, "item")} onChange={(e) => set(i, "item", e.target.value)} onFocus={onFocus} onBlur={onBlur}
              placeholder={i === 0 ? "e.g. Floral snips" : ""} style={{ ...inputStyle, flex: 1,
                textDecoration: done ? "line-through" : "none", color: done ? "var(--ink-faint)" : "var(--ink)" }} />
              <input value={get(i, "qty")} onChange={(e) => set(i, "qty", e.target.value)} onFocus={onFocus} onBlur={onBlur}
              style={{ ...inputStyle, width: 70, flexShrink: 0 }} />
              <input value={get(i, "source")} onChange={(e) => set(i, "source", e.target.value)} onFocus={onFocus} onBlur={onBlur}
              style={{ ...inputStyle, width: 130, flexShrink: 0 }} />
            </div>);

        })}
      </div>
    </div>);

}

/* ── more quick fixes (clean list) ── */
function MoreFixes({ data, accent }){
  return (
    <div style={{ marginTop:44 }}>
      <h3 style={{ fontSize:24, marginBottom:6 }}>{data.heading}</h3>
      {data.sub && <p style={{ fontSize:15, lineHeight:1.6, color:"var(--ink-soft)", maxWidth:700, marginBottom:18 }}>{data.sub}</p>}
      <div style={{ display:"flex", flexDirection:"column", gap:2, maxWidth:760 }}>
        {data.items.map((it,i)=>(
          <div key={i} style={{ display:"flex", gap:15, alignItems:"flex-start", padding:"15px 0",
            borderBottom: i<data.items.length-1?"1px solid var(--line)":"none" }}>
            <span style={{ width:9, height:9, borderRadius:"50%", background:accent, flexShrink:0, marginTop:7 }}/>
            <div style={{ flex:1 }}>
              <h4 style={{ fontSize:17, marginBottom:4 }}>{it.t}</h4>
              <p style={{ fontSize:14.5, lineHeight:1.55, color:"var(--ink-soft)" }}>{it.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── normal vs. worth-an-email split ── */
function NormalVsReport({ data, accent }){
  const col = (label, items, tone) => (
    <div style={{ flex:"1 1 280px", minWidth:0, background:"var(--paper)", border:"1px solid var(--line)",
      borderRadius:"var(--radius)", overflow:"hidden", boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 18px",
        background: tone==="ok"?"var(--sage-tint)":"var(--rose-tint)" }}>
        <Icon name={tone==="ok"?"leaf":"note"} size={17} style={{ color: tone==="ok"?"var(--sage-deep)":"var(--rose-deep)" }}/>
        <span style={{ fontFamily:"var(--serif)", fontSize:18, color: tone==="ok"?"var(--sage-deep)":"var(--rose-deep)" }}>{label}</span>
      </div>
      <ul style={{ listStyle:"none", margin:0, padding:"14px 18px", display:"flex", flexDirection:"column", gap:11 }}>
        {items.map((it,i)=>(
          <li key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", fontSize:14, lineHeight:1.5, color:"var(--ink)" }}>
            <Icon name={tone==="ok"?"check":"arrowSm"} size={14} stroke={2.2} style={{ color: tone==="ok"?"var(--sage)":"var(--rose)", flexShrink:0, marginTop:3 }}/>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div style={{ marginTop:44 }}>
      <h3 style={{ fontSize:24, marginBottom:16 }}>{data.heading}</h3>
      <div style={{ display:"flex", flexWrap:"wrap", gap:16, maxWidth:760 }}>
        {col(data.normalLabel, data.normal, "ok")}
        {col(data.reportLabel, data.report, "report")}
      </div>
    </div>
  );
}

/* ── simple flower prep steps: visual cards w/ infographic slot + checkable ── */
function StepFlow({ flow, moduleId, accent }) {
  const [checked, setChecked] = useLocal("flowsteps." + moduleId, {});
  const toggle = (i) => setChecked((c) => ({ ...c, [i]: !c[i] }));
  const done = flow.steps.filter((_, i) => checked[i]).length;
  return (
    <div style={{ marginTop: 6, marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
        <h3 style={{ fontSize: 24 }}>{flow.heading}</h3>
        <span className="mono" style={{ color: done === flow.steps.length ? accent : "var(--ink-faint)" }}>{done}/{flow.steps.length} done</span>
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 680, marginBottom: 20 }}>{flow.sub}</p>
      <div className="steps-grid">
        {flow.steps.map((s, i) => {
          const on = !!checked[i];
          return (
            <div key={i} style={{ position: "relative", background: "var(--paper)", border: "1.5px solid",
              borderColor: on ? accent : "var(--line)", borderRadius: "var(--radius)", overflow: "hidden",
              boxShadow: "var(--shadow-sm)", transition: "border-color .18s", display: "flex", flexDirection: "column" }}>
              {React.createElement("image-slot", {
                id: `${flow.slotPrefix || "prep-step"}-${i + 1}`, shape: "rect", placeholder: "Drop step illustration",
                ...(s.img ? { src: s.img } : {}),
                style: { width: "100%", aspectRatio: "3 / 2", display: "block" }
              })}
              <div style={{ padding: "15px 17px 17px", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center",
                    background: on ? accent : "var(--sage-tint)", color: on ? "#fff" : "var(--sage)",
                    fontFamily: "var(--serif)", fontSize: 14 }}>{i + 1}</span>
                  <h4 style={{ fontSize: 18 }}>{s.t}</h4>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)", flex: 1 }}>{s.d}</p>
                {s.tip &&
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "10px 12px",
                  background: "var(--rose-tint)", borderRadius: "var(--radius-sm)" }}>
                    <Icon name="spark" size={14} style={{ color: "var(--rose-deep)", flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--ink)" }}>{s.tip}</span>
                  </div>
                }
                <button onClick={() => toggle(i)} style={{ display: "inline-flex", alignItems: "center", gap: 8,
                  alignSelf: "flex-start", marginTop: 2, fontSize: 12.5, fontWeight: 600,
                  color: on ? accent : "var(--ink-soft)" }}>
                  <span style={{ width: 19, height: 19, borderRadius: 6, flexShrink: 0,
                    border: on ? "none" : "1.6px solid var(--line-strong)", background: on ? accent : "var(--paper)",
                    display: "grid", placeItems: "center", color: "#fff" }}>{on && <Icon name="check" size={12} stroke={2.6} />}</span>
                  {on ? "Done!" : "Mark done"}
                </button>
              </div>
            </div>);

        })}
      </div>
    </div>);

}

/* ── before / after hydration drop pair ── */
function BeforeAfter({ ba, accent }) {
  const slot = (s) =>
  <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ position: "relative" }}>
        {React.createElement("image-slot", {
        id: s.id, shape: "rounded", radius: "14", placeholder: s.label,
        style: { width: "100%", aspectRatio: "4 / 3", display: "block" }
      })}
        <span className="mono" style={{ position: "absolute", top: 8, left: 8, zIndex: 2, fontSize: 8.5,
          background: "rgba(44,53,42,.82)", color: "var(--cream)", padding: "4px 8px", borderRadius: 999,
          letterSpacing: ".14em", pointerEvents: "none" }}>EXAMPLE</span>
      </div>
      <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-faint)", marginTop: 8, textAlign: "center" }}>{s.label}</div>
    </div>;

  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ fontSize: 24, marginBottom: 6 }}>{ba.heading}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 680, marginBottom: 18 }}>{ba.sub}</p>
      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", maxWidth: 620 }}>
        {slot(ba.before)}
        <div style={{ alignSelf: "center", color: accent, flexShrink: 0, paddingTop: 10 }}><Icon name="arrow" size={22} /></div>
        {slot(ba.after)}
      </div>
    </div>);

}

/* ── order of operations: numbered process strip ── */
function OrderFlow({ flow, accent }){
  return (
    <div style={{ marginTop:8, marginBottom:8 }}>
      <h3 style={{ fontSize:24, marginBottom:6 }}>{flow.heading}</h3>
      {flow.sub && <p style={{ fontSize:15, lineHeight:1.6, color:"var(--ink-soft)", maxWidth:700, marginBottom:18 }}>{flow.sub}</p>}
      <div style={{ display:"flex", flexWrap:"wrap", alignItems:"stretch", gap:10 }}>
        {flow.steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display:"flex", alignItems:"center", gap:11, background:"var(--paper)", border:"1px solid var(--line)",
              borderRadius:999, padding:"9px 18px 9px 10px", boxShadow:"var(--shadow-sm)" }}>
              <span style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, display:"grid", placeItems:"center",
                background:"var(--sage-tint)", color:"var(--sage-deep)", fontFamily:"var(--serif)", fontSize:15 }}>{i+1}</span>
              <span style={{ fontSize:14.5, fontWeight:600, whiteSpace:"nowrap" }}>{s}</span>
            </div>
            {i < flow.steps.length-1 && (
              <span style={{ display:"flex", alignItems:"center", color:accent, flexShrink:0 }}><Icon name="arrowSm" size={18}/></span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ── crew / hero photo slot ── */
function PhotoSlot({ photo, accent }){
  return (
    <div style={{ marginTop:8, marginBottom:8 }}>
      <div style={{ position:"relative", borderRadius:"var(--radius-lg)", overflow:"hidden", boxShadow:"var(--shadow-md)" }}>
        {React.createElement("image-slot", {
          id: photo.id, shape:"rect", fit: photo.fit || "contain",
          placeholder: photo.placeholder || "Drop a photo here",
          style:{ width:"100%", aspectRatio: photo.ratio || "3 / 1", display:"block", background:"var(--cream-deep)" }
        })}
      </div>
      {photo.caption && <p style={{ fontSize:13.5, fontStyle:"italic", fontFamily:"var(--serif)", color:"var(--ink-soft)", textAlign:"center", marginTop:10 }}>{photo.caption}</p>}
    </div>
  );
}

/* ── helper-count chart (table infographic) ── */
function HelperChart({ chart, accent }){
  return (
    <div style={{ marginTop:8, marginBottom:8 }}>
      <h3 style={{ fontSize:24, marginBottom:6 }}>{chart.heading}</h3>
      {chart.sub && <p style={{ fontSize:15, lineHeight:1.6, color:"var(--ink-soft)", maxWidth:700, marginBottom:18 }}>{chart.sub}</p>}
      <div style={{ border:"1px solid var(--line)", borderRadius:"var(--radius)", overflow:"hidden", boxShadow:"var(--shadow-sm)", maxWidth:760 }}>
        {/* header */}
        <div className="hchart-row" style={{ background:"var(--sage-deep)" }}>
          {chart.cols.map((c,i)=>(
            <div key={i} className="mono" style={{ padding:"12px 16px", fontSize:9.5, color:"var(--cream)",
              textAlign: i===chart.cols.length-1?"center":"left" }}>{c}</div>
          ))}
        </div>
        {/* rows */}
        {chart.rows.map((r,ri)=>(
          <div key={ri} className="hchart-row" style={{ background: ri%2 ? "var(--cream)" : "var(--paper)",
            borderTop:"1px solid var(--line)" }}>
            {r.c.map((cell,ci)=>(
              <div key={ci} style={{ padding:"13px 16px", fontSize:14, display:"flex", alignItems:"center",
                justifyContent: ci===r.c.length-1?"center":"flex-start",
                color: ci===0?"var(--ink)":"var(--ink-soft)", fontWeight: ci===0?600:400 }}>
                {ci===r.c.length-1
                  ? <span style={{ fontFamily:"var(--serif)", fontSize:18, color:"#fff", background:accent,
                      borderRadius:999, padding:"3px 14px", minWidth:54, textAlign:"center" }}>{cell}</span>
                  : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── jobs for helpers (organized cards) ── */
function JobBoard({ jobs, accent }){
  return (
    <div style={{ marginTop:44 }}>
      <h3 style={{ fontSize:24, marginBottom:6 }}>{jobs.heading}</h3>
      {jobs.sub && <p style={{ fontSize:15, lineHeight:1.6, color:"var(--ink-soft)", maxWidth:720, marginBottom:20 }}>{jobs.sub}</p>}
      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
        {jobs.items.map((j,i)=>(
          <div key={i} style={{ background:"var(--paper)", border:"1px solid var(--line)", borderRadius:"var(--radius)",
            padding:"22px 24px", boxShadow:"var(--shadow-sm)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:13, marginBottom: j.team?6:14 }}>
              <span style={{ width:38, height:38, borderRadius:"50%", flexShrink:0, display:"grid", placeItems:"center",
                background:"var(--sage-deep)", color:"#fff", fontFamily:"var(--serif)", fontSize:18 }}>{j.n}</span>
              <div>
                <span className="mono" style={{ display:"block", fontSize:9, color:"var(--ink-faint)", marginBottom:2 }}>JOB {j.n}</span>
                <h4 style={{ fontSize:21, lineHeight:1.05 }}>{j.title}</h4>
              </div>
            </div>
            {j.team && <p style={{ fontSize:13.5, color:"var(--rose-deep)", fontWeight:600, margin:"0 0 14px 51px" }}>{j.team}</p>}
            <ul style={{ listStyle:"none", margin:0, padding:0, paddingLeft:51, display:"flex", flexDirection:"column", gap:9 }}>
              {j.steps.map((s,k)=>(
                <li key={k} style={{ display:"flex", gap:11, alignItems:"flex-start", fontSize:15, lineHeight:1.5, color:"var(--ink)" }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:accent, marginTop:8, flexShrink:0 }}/>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:16, paddingLeft:51 }}>
              {j.homework && (
                <div style={{ flex:"1 1 240px", display:"flex", gap:9, alignItems:"flex-start", padding:"11px 14px",
                  background:"var(--sage-tint)", borderRadius:"var(--radius-sm)" }}>
                  <Icon name="check" size={15} stroke={2.2} style={{ color:"var(--sage-deep)", flexShrink:0, marginTop:2 }}/>
                  <span style={{ fontSize:13, lineHeight:1.5, color:"var(--ink)" }}><strong>Homework: </strong>{j.homework}</span>
                </div>
              )}
              {j.fun && (
                <div style={{ flex:"1 1 240px", display:"flex", gap:9, alignItems:"flex-start", padding:"11px 14px",
                  background:"var(--rose-tint)", borderRadius:"var(--radius-sm)" }}>
                  <Icon name="spark" size={15} style={{ color:"var(--rose-deep)", flexShrink:0, marginTop:2 }}/>
                  <span style={{ fontSize:13, lineHeight:1.5, color:"var(--ink)" }}><strong>Fun part: </strong>{j.fun}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── design tutorials gallery: image + WATCH link cards ── */
function TutorialGrid({ tutorials, accent }){
  return (
    <div style={{ marginTop:44 }}>
      <h3 style={{ fontSize:24, marginBottom:6 }}>{tutorials.heading}</h3>
      {tutorials.sub && <p style={{ fontSize:15, lineHeight:1.6, color:"var(--ink-soft)", maxWidth:680, marginBottom:24 }}>{tutorials.sub}</p>}
      <div className="shop-grid">
        {tutorials.items.map((it, i) => <TutorialCard key={i} item={it} accent={accent}/>)}
      </div>
    </div>
  );
}
function TutorialCard({ item, accent }){
  const [hov, setHov] = useStateM(false);
  const live = item.href && item.href !== "#";
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", flexDirection:"column", background:"var(--paper)", border:"1px solid var(--line)",
        borderRadius:"var(--radius)", overflow:"hidden", boxShadow: hov?"var(--shadow-md)":"var(--shadow-sm)",
        transform: hov?"translateY(-2px)":"none", transition:"all .18s" }}>
      <div style={{ position:"relative" }}>
        {React.createElement("image-slot", {
          id: item.id, shape:"rect", placeholder:"Tutorial thumbnail",
          style:{ width:"100%", aspectRatio:"16 / 9", display:"block" }
        })}
        <span style={{ position:"absolute", inset:0, display:"grid", placeItems:"center", pointerEvents:"none" }}>
          <span style={{ width:46, height:46, borderRadius:"50%", background:"rgba(44,53,42,.55)", color:"#fff",
            display:"grid", placeItems:"center", backdropFilter:"blur(2px)" }}><Icon name="play" size={24}/></span>
        </span>
      </div>
      <a href={item.href || "#"} target={live?"_blank":undefined} rel={live?"noopener":undefined}
        onClick={e=>{ if(!live) e.preventDefault(); }}
        style={{ textDecoration:"none", padding:"13px 15px", display:"flex", alignItems:"center", justifyContent:"space-between",
          gap:8, borderTop:"1px solid var(--line)" }}>
        <span style={{ fontSize:15, fontWeight:600, color:"var(--ink)" }}>{item.label}</span>
        <span className="mono" style={{ fontSize:9, color:accent, display:"inline-flex", alignItems:"center", gap:5 }}>
          WATCH <Icon name="play" size={12}/>
        </span>
      </a>
    </div>
  );
}

/* ── flower recipe card (dynamic) ── */
function RecipeCard({ recipe, accent }){
  return (
    <div style={{ marginTop:44 }}>
      <h3 style={{ fontSize:24, marginBottom:6 }}>{recipe.heading}</h3>
      <p style={{ fontSize:15, lineHeight:1.6, color:"var(--ink-soft)", maxWidth:700, marginBottom:22 }}>{recipe.intro}</p>
      <div style={{ display:"flex", gap:0, flexWrap:"wrap", background:"var(--paper)", border:"1px solid var(--line)",
        borderRadius:"var(--radius)", overflow:"hidden", boxShadow:"var(--shadow-sm)", maxWidth:760 }} className="recipe-card">
        {/* photo */}
        <div style={{ flex:"1 1 260px", minWidth:0, position:"relative", background:"var(--cream-deep)" }}>
          {React.createElement("image-slot", {
            id: recipe.imgId, shape:"rect", placeholder:"Labeled bouquet diagram",
            style:{ width:"100%", height:"100%", minHeight:"260px", display:"block" }
          })}
        </div>
        {/* ingredients */}
        <div style={{ flex:"1 1 300px", minWidth:0, padding:"24px 26px" }}>
          <div className="mono" style={{ fontSize:9.5, color:accent, marginBottom:5 }}>RECIPE</div>
          <h4 style={{ fontSize:21, marginBottom:18 }}>{recipe.cardTitle}</h4>

          <div className="mono" style={{ fontSize:9, color:"var(--ink-faint)", marginBottom:8 }}>GREENERY</div>
          <ul style={{ listStyle:"none", margin:"0 0 16px", padding:0, display:"flex", flexDirection:"column", gap:6 }}>
            {recipe.greenery.map((g,i)=>(
              <li key={i} style={{ display:"flex", gap:10, alignItems:"baseline", fontSize:14.5, color:"var(--ink)" }}>
                <Icon name="leaf" size={14} style={{ color:"var(--sage)", flexShrink:0 }}/>{g}
              </li>
            ))}
          </ul>

          <div className="mono" style={{ fontSize:9, color:"var(--ink-faint)", marginBottom:8 }}>FLOWERS</div>
          <ul style={{ listStyle:"none", margin:"0 0 16px", padding:0, display:"flex", flexDirection:"column", gap:7 }}>
            {recipe.flowers.map((f,i)=>(
              <li key={i} style={{ display:"flex", gap:11, alignItems:"baseline", fontSize:14.5, color:"var(--ink)" }}>
                <span style={{ minWidth:26, fontFamily:"var(--serif)", fontSize:16, color:accent, flexShrink:0 }}>{f.q}</span>
                <span>{f.n}</span>
              </li>
            ))}
          </ul>

          <div style={{ display:"flex", alignItems:"baseline", gap:10, paddingTop:14, borderTop:"1px solid var(--line)" }}>
            <span className="mono" style={{ fontSize:9, color:"var(--ink-faint)" }}>VESSEL</span>
            <span style={{ fontSize:14.5, fontFamily:"var(--serif)" }}>{recipe.vessel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── flower terminology glossary: thumbnail rows ── */
function FamilyGlossary({ families, accent }){
  return (
    <div style={{ marginTop:8, marginBottom:8 }}>
      <h3 style={{ fontSize:24, marginBottom:6 }}>{families.heading}</h3>
      <p style={{ fontSize:15, lineHeight:1.6, color:"var(--ink-soft)", maxWidth:680, marginBottom:18 }}>{families.sub}</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10, maxWidth:720 }}>
        {families.items.map((f, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:15, background:"var(--paper)",
            border:"1px solid var(--line)", borderRadius:"var(--radius)", padding:"12px 16px 12px 12px", boxShadow:"var(--shadow-sm)" }}>
            {React.createElement("image-slot", {
              id: f.id, shape:"rounded", radius:"10", placeholder:"photo",
              style:{ width:"68px", height:"68px", flexShrink:0, display:"block" }
            })}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:10, flexWrap:"wrap" }}>
                <span style={{ fontFamily:"var(--serif)", fontSize:19 }}>{f.name}</span>
                <span style={{ fontSize:13.5, color:"var(--ink-soft)" }}>{f.desc}</span>
              </div>
              <div style={{ fontSize:12.5, color:"var(--ink-faint)", marginTop:5, lineHeight:1.45 }}>{f.examples}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── shop grid: clickable labeled product cards (PDF "Our Fave Supplies") ── */
function ShopGrid({ shop, accent }) {
  return (
    <div style={{ marginTop: 44 }}>
      <h3 style={{ fontSize: 24, marginBottom: 6 }}>{shop.heading}</h3>
      {shop.sub && <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 680, marginBottom: 24 }}>{shop.sub}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {shop.groups.map((g, gi) =>
        <div key={gi}>
            {g.h &&
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--ink-faint)" }}>{g.h}</span>
                <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
              </div>
          }
            <div className="shop-grid">
              {g.items.map((it, i) => <ShopCard key={i} item={it} accent={accent} />)}
            </div>
          </div>
        )}
      </div>
    </div>);

}

function ShopCard({ item, accent }) {
  const [hov, setHov] = useStateM(false);
  const live = item.href && item.href !== "#";
  const slotId = "shop-" + item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    style={{ display: "flex", flexDirection: "column", background: "var(--paper)",
      border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden",
      boxShadow: hov ? "var(--shadow-md)" : "var(--shadow-sm)", transform: hov ? "translateY(-2px)" : "none", transition: "all .18s" }}>
      {/* user-fillable product photo */}
      {React.createElement("image-slot", {
        id: slotId,
        shape: "rect",
        placeholder: "Drop product photo",
        style: { width: "100%", aspectRatio: "4 / 3", display: "block" }
      })}
      {/* clickable shop link */}
      <a href={item.href || "#"} target={live ? "_blank" : undefined} rel={live ? "noopener" : undefined}
      onClick={(e) => {if (!live) e.preventDefault();}}
      style={{ textDecoration: "none", padding: "13px 15px", display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 8, borderTop: "1px solid var(--line)", background: "var(--paper)" }}>
        <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ink)" }}>{item.label}</span>
        <span className="mono" style={{ fontSize: 9, color: accent, display: "inline-flex", alignItems: "center", gap: 4 }}>
          SHOP <Icon name="arrowSm" size={12} />
        </span>
      </a>
    </div>);

}

Object.assign(window, { ModulePage });