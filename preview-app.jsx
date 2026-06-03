/* preview-app.jsx — public test-drive: Module 1 unlocked, rest paywalled. */
const { useState: useStateP, useEffect: useEffectP } = React;
const SPARK_P = "\u2726";
const PRODUCT_URL = "https://bloomcultureflowers.com/products/diy-wedding-flower-planner";
const UNLOCKED = "needs"; // the one free module

/* ── unlock modal ── */
function UnlockModal({ open, onClose, moduleName }){
  if(!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(44,53,42,.55)",
      backdropFilter:"blur(4px)", display:"grid", placeItems:"center", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:"100%", maxWidth:460, background:"var(--sage-deep)", color:"var(--cream)",
        borderRadius:"var(--radius-lg)", padding:"40px 38px", boxShadow:"var(--shadow-lg)", textAlign:"center", position:"relative" }}>
        <button onClick={onClose} className="mono" style={{ position:"absolute", top:16, right:18, fontSize:10, color:"rgba(247,246,240,.6)", background:"none", border:"none", cursor:"pointer" }}>✕ CLOSE</button>
        <div style={{ width:54, height:54, borderRadius:"50%", background:"rgba(255,255,255,.12)", margin:"0 auto 20px", display:"grid", placeItems:"center" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <div className="mono" style={{ color:"var(--rose)", fontSize:10.5, marginBottom:12 }}>{SPARK_P} THAT'S THE END OF YOUR TEST DRIVE</div>
        <h2 style={{ color:"var(--cream)", fontSize:27, lineHeight:1.1, marginBottom:14 }}>
          {moduleName ? <>Unlock <span style={{fontStyle:"italic"}}>{moduleName}</span> + 8 more modules</> : "Unlock the full planner"}
        </h2>
        <p style={{ color:"rgba(247,246,240,.82)", fontSize:15.5, lineHeight:1.6, marginBottom:20 }}>
          You just explored Module 1 free. The full planner has all 10 modules — timelines, tutorials, recipes, helper coordination, printable worksheets, and a calm plan for every petal. Yours for the whole journey.
        </p>
        <div style={{ background:"rgba(255,255,255,.12)", borderRadius:"var(--radius-sm)", padding:"11px 14px", marginBottom:22, fontSize:13.5, color:"var(--cream)" }}>
          ✦ <strong>Free with any flower order or consultation</strong> — already booked with us? It's yours.
        </div>
        <a href={PRODUCT_URL} target="_blank" rel="noopener" style={{ display:"block", background:"var(--cream)", color:"var(--sage-deep)",
          padding:"15px", borderRadius:999, fontWeight:600, fontSize:16, textDecoration:"none", marginBottom:12 }}>
          Get the full planner — $49 →
        </a>
      </div>
    </div>
  );
}

/* ── persistent preview ribbon ── */
function PreviewBar({ onUnlock }){
  return (
    <div className="no-print" style={{ flexShrink:0, height:46, background:"var(--rose-deep)", color:"var(--cream)",
      display:"flex", alignItems:"center", gap:14, padding:"0 18px", fontSize:13.5 }}>
      <span className="mono" style={{ fontSize:10, background:"rgba(255,255,255,.16)", padding:"4px 10px", borderRadius:999, flexShrink:0 }}>{SPARK_P} FREE PREVIEW</span>
      <span className="preview-tagline" style={{ flex:1, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
        You're test-driving Module 1. Love it? Unlock all 10 modules.
      </span>
      <button onClick={onUnlock} style={{ flexShrink:0, background:"var(--cream)", color:"var(--rose-deep)", border:"none",
        padding:"8px 16px", borderRadius:999, fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
        <span className="preview-cta-full">Get the full planner →</span><span className="preview-cta-short">Unlock all 10 →</span>
      </button>
    </div>
  );
}

function PreviewApp(){
  if (typeof window !== "undefined") window.BC_PREVIEW = true;
  const [view, setView] = useStateP("home");
  const [modal, setModal] = useStateP({ open:false, name:"" });
  const progress = useAllProgress();

  useEffectP(() => {
    const r = document.documentElement.style;
    r.setProperty("--accent", "var(--sage)");
    r.setProperty("--accent-deep", "var(--sage-deep)");
    r.setProperty("--accent-tint", "var(--sage-tint)");
  }, []);

  const isLocked = (id) => id !== UNLOCKED && id !== "home";
  window.BC_LOCKED = isLocked;
  const go = (v) => {
    if(isLocked(v)){
      const m = window.BC.byId[v];
      setModal({ open:true, name: m ? m.label : "" });
      return;
    }
    setView(v);
  };
  const openUnlock = () => setModal({ open:true, name:"" });
  const [menuOpen, setMenuOpen] = React.useState(false);
  const goM = (v) => { go(v); setMenuOpen(false); try { history.pushState({ bcView: v }, ""); } catch(e){} };
  React.useEffect(() => {
    const onPop = (e) => {
      const v = (e.state && e.state.bcView) || "home";
      if(!isLocked(v)) setView(v);
      setMenuOpen(false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const curLabel = view === "home" ? "Start Here" : (window.BC.byId[view] ? window.BC.byId[view].nav : "");

  const previewFooter = (
    <div style={{ padding:"16px 18px 18px", borderTop:"1px solid var(--line)" }}>
      <button onClick={openUnlock} style={{ width:"100%", background:"var(--sage-deep)", color:"var(--cream)", border:"none",
        borderRadius:"var(--radius-sm)", padding:"13px", fontSize:13.5, fontWeight:600, cursor:"pointer", marginBottom:8 }}>
        🔓 Unlock all 10 modules
      </button>
      <div style={{ fontSize:11, color:"var(--ink-faint)", textAlign:"center" }}>Free with any flower order or consultation</div>
      <div style={{ fontSize:10, color:"var(--ink-faint)", textAlign:"center", marginTop:10, lineHeight:1.4 }}>© 2026 Bloom Culture™. All rights reserved.</div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="preview-root" style={{ display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden" }}>
        <PreviewBar onUnlock={openUnlock} />
        <div className={"app-shell" + (menuOpen ? " menu-open" : "")} style={{ display:"flex", flex:1, minHeight:0, overflow:"hidden" }}>
          <div className="mobile-bar no-print">
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu"
              style={{ width:40, height:40, borderRadius:10, display:"grid", placeItems:"center", background:"var(--cream-deep)", color:"var(--ink)", flexShrink:0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
            <span style={{ fontFamily:"var(--serif)", fontSize:18, fontWeight:600, flex:1, minWidth:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{curLabel}</span>
            <button onClick={() => goM("home")} aria-label="Home"
              style={{ width:40, height:40, borderRadius:10, display:"grid", placeItems:"center", background:"transparent", color:"var(--sage-deep)", flexShrink:0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9.5h12V10"/></svg>
            </button>
          </div>
          <div className="sidebar-scrim no-print" onClick={() => setMenuOpen(false)} />
          <Sidebar view={view} go={goM} progress={progress} locked={isLocked} footer={previewFooter} />
          <main style={{ flex:1, minWidth:0, height:"100%", overflow:"hidden", background:"var(--cream)" }}>
            {view === "home"
              ? <div className="content-scroll" style={{ height:"100%", overflowY:"auto" }}>
                  <Home layout="editorial" go={goM} progress={progress} />
                  <ClosingBand progress={progress} go={goM} />
                </div>
              : <ModulePage m={window.BC.byId[view]} go={goM} progress={progress} />}
          </main>
        </div>
      </div>
      <UnlockModal open={modal.open} onClose={()=>setModal({ open:false, name:"" })} moduleName={modal.name} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PreviewApp />);
