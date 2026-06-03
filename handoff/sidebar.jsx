/* sidebar.jsx — fixed left navigation with live progress. */
const { useState: useStateSB, useEffect: useEffectSB } = React;

/* progress hook: reads each module's checklist completion from localStorage,
   recomputes on the custom 'bcf-progress' event + storage events. */
function useAllProgress(){
  const compute = () => {
    const map = {};
    let totalItems = 0, totalDone = 0;
    for(const m of window.BC.modules){
      const checked = lsGet("check." + m.id, {});
      const n = m.checklist.length;
      const done = m.checklist.filter((_, i) => checked[i]).length;
      map[m.id] = n ? done / n : 0;
      totalItems += n; totalDone += done;
    }
    map.__overall = totalItems ? totalDone / totalItems : 0;
    map.__done = totalDone; map.__total = totalItems;
    return map;
  };
  const [prog, setProg] = useStateSB(compute);
  useEffectSB(() => {
    const h = () => setProg(compute());
    window.addEventListener("bcf-progress", h);
    window.addEventListener("storage", h);
    return () => { window.removeEventListener("bcf-progress", h); window.removeEventListener("storage", h); };
  }, []);
  return prog;
}

function Sidebar({ view, go, progress, onPrint }){
  const modules = window.BC.modules;
  return (
    <aside className="no-print" style={{
      width:"var(--sidebar-w)", flexShrink:0, height:"100vh", background:"var(--paper)",
      borderRight:"1px solid var(--line)", display:"flex", flexDirection:"column"
    }}>
      {/* brand */}
      <button onClick={() => go("home")} style={{ padding:"24px 22px 20px", textAlign:"left" }}>
        <Logo />
      </button>

      {/* home / start here */}
      <div style={{ padding:"4px 14px 10px" }}>
        <NavItem active={view==="home"} onClick={() => go("home")}
          icon="home" label="Start Here" sub="Home & your progress" />
      </div>

      <div style={{ padding:"4px 22px 8px" }}>
        <div className="mono" style={{ color:"var(--ink-faint)", fontSize:9.5 }}>The Module Library</div>
      </div>

      {/* module list */}
      <nav style={{ flex:1, overflowY:"auto", padding:"0 14px 14px", display:"flex", flexDirection:"column", gap:1 }}>
        {modules.map(m => (
          <NavItem key={m.id} active={view===m.id} onClick={() => go(m.id)}
            icon={MODULE_ICON[m.id]} label={m.nav} num={m.num}
            ring={progress[m.id]} clay={m.accent==="clay"} />
        ))}
      </nav>

      {/* footer */}
      <div style={{ padding:"14px 18px 18px", borderTop:"1px solid var(--line)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:11, padding:"8px 6px" }}>
          <div style={{ width:34, height:34, borderRadius:"50%", background:"var(--sage-tint)",
            display:"grid", placeItems:"center", color:"var(--sage-deep)", fontFamily:"var(--serif)", fontSize:16, flexShrink:0 }}>A</div>
          <div style={{ lineHeight:1.3, minWidth:0 }}>
            <div style={{ fontSize:13.5, fontWeight:600 }}>Your Workspace</div>
            <div style={{ fontSize:11.5, color:"var(--ink-faint)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>Private · paid customer</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ active, onClick, icon, label, sub, num, ring, clay }){
  const [hov, setHov] = useStateSB(false);
  const accentVar = clay ? "var(--clay)" : "var(--accent-deep)";
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        display:"flex", alignItems:"center", gap:12, width:"100%", textAlign:"left",
        padding: sub ? "11px 12px" : "9.5px 12px", borderRadius:"var(--radius-sm)",
        background: active ? "var(--sage-tint)" : (hov ? "var(--cream)" : "transparent"),
        transition:"background .16s", position:"relative", color:"var(--ink)"
      }}>
      {active && <span style={{ position:"absolute", left:0, top:"50%", transform:"translateY(-50%)",
        width:3, height:18, borderRadius:3, background:accentVar }}/>}
      <span style={{ width:30, height:30, borderRadius:9, flexShrink:0, display:"grid", placeItems:"center",
        background: active ? (clay?"var(--clay)":"var(--sage)") : "var(--cream-deep)",
        color: active ? "#fff" : (clay ? "var(--clay)" : "var(--sage)"), transition:"all .16s" }}>
        <Icon name={icon} size={16} stroke={1.7}/>
      </span>
      <span style={{ flex:1, minWidth:0 }}>
        <span style={{ display:"block", fontSize:14, fontWeight: active?600:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{label}</span>
        {sub && <span style={{ display:"block", fontSize:11.5, color:"var(--ink-faint)", marginTop:1 }}>{sub}</span>}
      </span>
      {num && <span style={{ display:"flex", alignItems:"center", gap:8 }}>
        {ring > 0
          ? <ProgressRing value={ring} size={18} stroke={2.2} color={clay?"var(--clay)":"var(--accent-deep)"} />
          : <span className="mono" style={{ fontSize:10, color: active?"var(--sage-deep)":"var(--ink-faint)" }}>{num}</span>}
      </span>}
    </button>
  );
}

Object.assign(window, { Sidebar, useAllProgress });
