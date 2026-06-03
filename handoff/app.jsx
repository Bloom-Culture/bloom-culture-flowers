/* app.jsx — root: access gate, routing, tweaks, mount. */
const { useState: useStateA, useEffect: useEffectA } = React;
const SPARK_A = "\u2726";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeLayout": "editorial",
  "primary": "green",
  "fontScale": 100,
  "showGate": true
}/*EDITMODE-END*/;

/* ───────── access gate ───────── */
function Gate({ onEnter }){
  const [email, setEmail] = useStateA("");
  return (
    <div style={{ height:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
      {/* left: brand panel */}
      <div style={{ background:"var(--sage-deep)", color:"var(--cream)", padding:"56px 60px",
        display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-80, top:-60, width:280, height:280, borderRadius:"50%", border:"1px solid rgba(255,255,255,.1)" }}/>
        <div style={{ position:"absolute", right:30, bottom:-90, width:240, height:240, borderRadius:"50%", border:"1px solid rgba(255,255,255,.08)" }}/>
        <Logo mono/>
        <div>
          <div className="mono" style={{ color:"var(--rose)", marginBottom:18, opacity:.95 }}>{SPARK_A} PRIVATE CUSTOMER WORKSPACE</div>
          <h1 style={{ color:"var(--cream)", fontSize:"clamp(32px,3.4vw,46px)", lineHeight:1.05, letterSpacing:"-.02em", marginBottom:18 }}>
            Everything you need to DIY like a pro — <span style={{ fontStyle:"italic" }}>without the overwhelm.</span>
          </h1>
          <p style={{ color:"rgba(247,246,240,.8)", fontSize:16.5, lineHeight:1.6, maxWidth:440 }}>
            Your calm, step-by-step planner for the big day. Timelines, tutorials, recipes, checklists, and a place for every note — all in one private space.
          </p>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"6px 12px", color:"rgba(247,246,240,.7)", fontFamily:"var(--serif)", fontStyle:"italic", fontSize:15 }}>
          {["No wilted flowers","No stress","No surprises"].map((t,i)=>(
            <React.Fragment key={i}>{i>0 && <span style={{color:"var(--rose)",fontStyle:"normal"}}>{SPARK_A}</span>}<span>{t}</span></React.Fragment>
          ))}
        </div>
      </div>
      {/* right: enter */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"40px" }}>
        <div style={{ width:"100%", maxWidth:380 }}>
          <h2 style={{ fontSize:30, marginBottom:8 }}>Welcome back, friend.</h2>
          <p style={{ fontSize:15.5, color:"var(--ink-soft)", lineHeight:1.55, marginBottom:30 }}>
            This workspace is included with your Bloom Culture flower order. Sign in with the email from your purchase.
          </p>
          <label className="mono" style={{ fontSize:10, color:"var(--ink-faint)", display:"block", marginBottom:8 }}>EMAIL ADDRESS</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"
            onKeyDown={e=>{ if(e.key==="Enter") onEnter(); }}
            style={{ width:"100%", padding:"14px 16px", borderRadius:"var(--radius-sm)", border:"1.5px solid var(--line-strong)",
              fontSize:15, background:"var(--paper)", color:"var(--ink)", outline:"none", marginBottom:16 }}
            onFocus={e=>e.target.style.borderColor="var(--accent)"} onBlur={e=>e.target.style.borderColor="var(--line-strong)"}/>
          <Btn onClick={onEnter} icon="arrow" style={{ width:"100%", justifyContent:"center", padding:"15px" }}>Enter my workspace</Btn>
          <p style={{ fontSize:12.5, color:"var(--ink-faint)", textAlign:"center", marginTop:18, lineHeight:1.5 }}>
            Demo preview — any email works. Forgot which email you used? <a href="#" onClick={e=>e.preventDefault()} style={{ color:"var(--rose-deep)", fontWeight:600 }}>Contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────── App ───────── */
function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [entered, setEntered] = useLocal("entered", false);
  const [view, setView] = useLocal("view", "home");
  const progress = useAllProgress();

  /* apply primary-accent + font-scale tweaks to :root */
  useEffectA(() => {
    const r = document.documentElement.style;
    if(t.primary === "rose"){
      r.setProperty("--accent", "var(--rose)");
      r.setProperty("--accent-deep", "var(--rose-deep)");
      r.setProperty("--accent-tint", "var(--rose-tint)");
    } else {
      r.setProperty("--accent", "var(--sage)");
      r.setProperty("--accent-deep", "var(--sage-deep)");
      r.setProperty("--accent-tint", "var(--sage-tint)");
    }
  }, [t.primary]);
  useEffectA(() => {
    document.documentElement.style.fontSize = (16 * (t.fontScale/100)) + "px";
  }, [t.fontScale]);

  const go = (v) => { setView(v); };

  const showGate = t.showGate && !entered;

  return (
    <React.Fragment>
      {showGate ? (
        <Gate onEnter={() => setEntered(true)} />
      ) : (
        <div className="app-shell" style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
          <Sidebar view={view} go={go} progress={progress} />
          <main style={{ flex:1, minWidth:0, height:"100vh", overflow:"hidden", background:"var(--cream)" }}>
            {view === "home"
              ? <div className="content-scroll" style={{ height:"100vh", overflowY:"auto" }}>
                  <Home layout="editorial" go={go} progress={progress} />
                  <ClosingBand progress={progress} go={go} />
                </div>
              : <ModulePage m={window.BC.byId[view]} go={go} progress={progress} />}
          </main>
        </div>
      )}

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio label="Primary accent" value={t.primary}
          options={["green","rose"]}
          onChange={v => setTweak("primary", v)} />
        <TweakSlider label="Text size" value={t.fontScale} min={90} max={115} step={5} unit="%"
          onChange={v => setTweak("fontScale", v)} />
        <TweakSection label="Access" />
        <TweakToggle label="Show login gate" value={t.showGate}
          onChange={v => setTweak("showGate", v)} />
        <TweakButton label="Reset progress & notes" onClick={() => {
          if(confirm("Clear all checklists, notes, and saved date? This can't be undone.")){
            Object.keys(localStorage).filter(k=>k.startsWith("bcf.v1.")).forEach(k=>localStorage.removeItem(k));
            window.dispatchEvent(new Event("bcf-progress"));
            location.reload();
          }
        }} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
