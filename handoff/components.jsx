/* components.jsx — shared building blocks for the Command Center.
   Exports to window at the bottom. */
const { useState, useEffect, useRef, useCallback } = React;

/* ───────────────────── persistence ───────────────────── */
const LS_PREFIX = "bcf.v1.";
function lsGet(key, fallback){
  try { const v = localStorage.getItem(LS_PREFIX + key); return v == null ? fallback : JSON.parse(v); }
  catch(e){ return fallback; }
}
function lsSet(key, val){
  try { localStorage.setItem(LS_PREFIX + key, JSON.stringify(val)); } catch(e){}
}
function useLocal(key, initial){
  const [val, setVal] = useState(() => lsGet(key, initial));
  useEffect(() => { lsSet(key, val); }, [key, val]);
  return [val, setVal];
}

/* ───────────────────── tiny line icons (simple strokes only) ───────────────────── */
function Icon({ name, size = 18, stroke = 1.6, style }){
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", style };
  const paths = {
    home:    <><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9.5h12V10"/></>,
    arrow:   <><path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></>,
    arrowSm: <><path d="M7 12h9"/><path d="M12 8l4 4-4 4"/></>,
    check:   <><path d="M5 12.5l4.2 4.2L19 7"/></>,
    print:   <><path d="M7 9V4h10v5"/><path d="M7 18H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/><rect x="7" y="15" width="10" height="6" rx="1"/></>,
    link:    <><path d="M10 14a4 4 0 0 0 5.66 0l2.83-2.83a4 4 0 0 0-5.66-5.66L11 7"/><path d="M14 10a4 4 0 0 0-5.66 0L5.5 12.83a4 4 0 0 0 5.66 5.66L13 17"/></>,
    note:    <><path d="M5 4h14v12l-4 4H5z"/><path d="M15 20v-4h4"/><path d="M8 9h8M8 13h5"/></>,
    list:    <><path d="M8 7h11M8 12h11M8 17h11"/><circle cx="4.2" cy="7" r="1.1"/><circle cx="4.2" cy="12" r="1.1"/><circle cx="4.2" cy="17" r="1.1"/></>,
    spark:   <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/></>,
    leaf:    <><path d="M5 19c0-7 5-12 14-13 1 9-4 14-11 14-2 0-3-1-3-1z"/><path d="M9 15c2-3 4-4.5 7-6"/></>,
    snips:   <><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M20 4 8.2 15.8"/><path d="M14.4 14.4 20 20"/><path d="M8.2 8.2 12 12"/></>,
    calendar:<><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/></>,
    heart:   <><path d="M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 6.5C19 15.5 12 20 12 20z"/></>,
    play:    <><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z"/></>,
    truck:   <><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17.5" cy="17.5" r="1.6"/></>,
    drop:    <><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></>,
    bucket:  <><path d="M5 7h14l-1.4 12.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8z"/><path d="M4 7h16"/><path d="M6.4 12.5c1.8-1 3.4-1 5.2 0s3.4 1 5.2 0"/></>,
    flower:  <><circle cx="12" cy="7" r="2.4"/><circle cx="7.1" cy="10.6" r="2.4"/><circle cx="9" cy="16.4" r="2.4"/><circle cx="15" cy="16.4" r="2.4"/><circle cx="16.9" cy="10.6" r="2.4"/><circle cx="12" cy="12" r="2"/></>,
    vase:    <><path d="M8 4h8M9 4c0 3-3 4-3 9a6 6 0 0 0 12 0c0-5-3-6-3-9"/></>,
    palette: <><circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="9.5" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="16.5" cy="13.5" r="1"/><path d="M12 21a3 3 0 0 1 0-6c1.5 0 2-1 2-2"/></>,
    users:   <><circle cx="9" cy="9" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M16 7a3 3 0 0 1 0 6M21 19c0-2.5-1.5-4.2-3.5-4.8"/></>,
    flag:    <><path d="M6 21V4M6 4h11l-2 4 2 4H6"/></>,
    x:       <><path d="M6 6l12 12M18 6L6 18"/></>,
    chevron: <><path d="M9 6l6 6-6 6"/></>,
    wallet:  <><path d="M4 7a2 2 0 0 1 2-2h11v4M4 7v10a2 2 0 0 0 2 2h13V11H6a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="14" r="1.1"/></>,
    tag:     <><path d="M4 4h7l9 9-7 7-9-9z"/><circle cx="8" cy="8" r="1.4"/></>,
    clipboard:<><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4a3 3 0 0 1 6 0M9 11h6M9 15h4"/></>,
    coins:   <><ellipse cx="9" cy="7" rx="5" ry="2.4"/><path d="M4 7v4c0 1.3 2.2 2.4 5 2.4s5-1.1 5-2.4V7"/><ellipse cx="15" cy="14" rx="5" ry="2.4"/><path d="M10 14.5V17c0 1.3 2.2 2.4 5 2.4s5-1.1 5-2.4v-3"/></>,
    sketch:  <><path d="M5 3h11l3 3v15H5z"/><path d="M9 3v18M9 8h10M9 13h10"/></>,
  };
  return <svg {...common}>{paths[name] || paths.spark}</svg>;
}

const MODULE_ICON = {
  needs:"clipboard", timeline:"calendar", supplies:"snips", arrival:"bucket",
  design:"flower", helpers:"users", transport:"truck", vases:"vase",
  tutorials:"play", etiquette:"heart", emergency:"drop"
};

/* ───────────────────── Logo / wordmark (placeholder — swap with real brand mark) ───────────────────── */
function Logo({ size = 1, mono = false }){
  return (
    <div style={{ display:"flex", alignItems:"center", gap:11 }}>
      <img src="assets/logo-mark.png" alt="Bloom Culture"
        style={{ width:40*size, height:40*size, objectFit:"contain", flexShrink:0,
          filter: mono ? "drop-shadow(0 1px 4px rgba(0,0,0,.25))" : "none" }} />
      <div style={{ lineHeight:1 }}>
        <div style={{ fontFamily:"var(--serif)", fontSize:19*size, letterSpacing:"-.01em", color: mono ? "var(--paper)" : "var(--ink)" }}>Bloom Culture</div>
        <div className="mono" style={{ fontSize:8.5*size, color: mono ? "rgba(247,246,240,.6)" : "var(--ink-faint)", marginTop:3 }}>DIY WEDDING FLOWER PLANNER</div>
      </div>
    </div>
  );
}

/* ───────────────────── Progress ring ───────────────────── */
function ProgressRing({ value = 0, size = 22, stroke = 2.4, color = "var(--accent-deep)", track = "var(--line-strong)" }){
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const done = value >= 1;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform:"rotate(-90deg)", flexShrink:0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, value))} strokeLinecap="round"
        style={{ transition:"stroke-dashoffset .5s cubic-bezier(.4,0,.2,1)" }}/>
      {done && <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} opacity=".18"/>}
    </svg>
  );
}

/* ───────────────────── Pill / chip ───────────────────── */
function Pill({ children, tone = "default", style }){
  const tones = {
    default: { bg:"var(--paper)", bd:"var(--line-strong)", fg:"var(--ink-soft)" },
    sage:    { bg:"var(--sage-tint)", bd:"transparent", fg:"var(--sage-deep)" },
    rose:    { bg:"var(--rose-tint)", bd:"transparent", fg:"var(--rose-deep)" },
    clay:    { bg:"var(--clay-tint)", bd:"transparent", fg:"#8c1a2e" },
  };
  const t = tones[tone] || tones.default;
  return <span className="mono" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 10px",
    borderRadius:999, background:t.bg, border:`1px solid ${t.bd}`, color:t.fg, fontSize:10, ...style }}>{children}</span>;
}

/* ───────────────────── Placeholder image ───────────────────── */
function Placeholder({ label = "image", note = "", height = 180, style }){
  return (
    <div style={{
      height, borderRadius:"var(--radius)", border:"1.5px dashed var(--line-strong)",
      background:"repeating-linear-gradient(45deg, var(--cream-deep), var(--cream-deep) 11px, var(--cream) 11px, var(--cream) 22px)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6,
      color:"var(--ink-faint)", textAlign:"center", padding:16, ...style
    }}>
      <span className="mono" style={{ fontSize:10.5, color:"var(--ink-soft)" }}>{label}</span>
      {note && <span style={{ fontFamily:"var(--serif)", fontStyle:"italic", fontSize:14, color:"var(--ink-faint)" }}>{note}</span>}
    </div>
  );
}

/* ───────────────────── Checklist (persistent) ───────────────────── */
function Checklist({ moduleId, items, note }){
  const [checked, setChecked] = useLocal("check." + moduleId, {});
  const toggle = (i) => { setChecked(c => ({ ...c, [i]: !c[i] })); setTimeout(()=>window.dispatchEvent(new Event("bcf-progress")), 0); };
  const doneCount = items.filter((_, i) => checked[i]).length;
  return (
    <div>
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:14 }}>
        <h3 style={{ fontSize:22, display:"flex", alignItems:"center", gap:10 }}>
          <Icon name="check" size={18} stroke={2} style={{ color:"var(--accent-deep)" }}/> Checklist
        </h3>
        <span className="mono" style={{ color:"var(--ink-faint)" }}>{doneCount}/{items.length} done</span>
      </div>
      {note && <p style={{ fontSize:13, color:"var(--ink-soft)", lineHeight:1.5, marginTop:-4, marginBottom:14 }}>{note}</p>}
      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        {items.map((it, i) => (
          <button key={i} onClick={() => toggle(i)} style={{
            display:"flex", alignItems:"flex-start", gap:13, textAlign:"left",
            padding:"12px 14px", borderRadius:"var(--radius-sm)", width:"100%",
            background: checked[i] ? "var(--accent-tint)" : "transparent",
            transition:"background .18s", color:"var(--ink)"
          }}
          onMouseEnter={e=>{ if(!checked[i]) e.currentTarget.style.background="var(--cream-deep)"; }}
          onMouseLeave={e=>{ if(!checked[i]) e.currentTarget.style.background="transparent"; }}>
            <span style={{
              width:21, height:21, borderRadius:7, flexShrink:0, marginTop:1,
              border: checked[i] ? "none" : "1.6px solid var(--line-strong)",
              background: checked[i] ? "var(--accent-deep)" : "var(--paper)",
              display:"grid", placeItems:"center", color:"#fff", transition:"all .18s"
            }}>{checked[i] && <Icon name="check" size={13} stroke={2.6}/>}</span>
            <span style={{ fontSize:15.5, lineHeight:1.45, paddingTop:1,
              color: checked[i] ? "var(--ink-soft)" : "var(--ink)",
              textDecoration: checked[i] ? "line-through" : "none",
              textDecorationColor:"var(--ink-faint)" }}>{it}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── Notes box (persistent + printable) ───────────────────── */
function NotesBox({ moduleId, placeholder = "Brain-dump anything here — ideas, questions, who's bringing what…" }){
  const [text, setText] = useLocal("notes." + moduleId, "");
  const [saved, setSaved] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if(!text) return;
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1400);
    return () => clearTimeout(t);
  }, [text]);
  const autosize = useCallback((el) => {
    if(!el) return; el.style.height = "auto"; el.style.height = Math.max(120, el.scrollHeight) + "px";
  }, []);
  useEffect(() => { autosize(ref.current); }, []);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:13 }}>
        <h3 style={{ fontSize:22, display:"flex", alignItems:"center", gap:10 }}>
          <Icon name="note" size={18} style={{ color:"var(--accent-deep)" }}/> My Notes
        </h3>
        <span className="mono" style={{ color: saved ? "var(--accent-deep)" : "var(--ink-faint)", transition:"color .3s" }}>
          {saved ? "saved ✓" : "auto-saves"}
        </span>
      </div>
      <textarea ref={ref} value={text}
        onChange={e => { setText(e.target.value); autosize(e.target); }}
        placeholder={placeholder}
        style={{
          width:"100%", minHeight:128, resize:"none", padding:"12px 20px",
          borderRadius:"var(--radius)", border:"1.5px solid var(--line)",
          background:"var(--paper)", color:"var(--ink)", fontSize:15.5,
          boxShadow:"var(--shadow-sm)", outline:"none",
          lineHeight:"32px",
          backgroundImage:"linear-gradient(to bottom, transparent 0, transparent 31px, var(--line) 31px, var(--line) 32px)",
          backgroundSize:"100% 32px",
          backgroundPosition:"0 12px",
          backgroundRepeat:"repeat",
          backgroundAttachment:"local"
        }}
        onFocus={e=> e.target.style.borderColor="var(--accent)"}
        onBlur={e=> e.target.style.borderColor="var(--line)"} />
    </div>
  );
}

/* ───────────────────── Button ───────────────────── */
function Btn({ children, variant = "solid", icon, onClick, style, ...rest }){
  const base = { display:"inline-flex", alignItems:"center", gap:9, padding:"12px 20px",
    borderRadius:999, fontSize:14.5, fontWeight:600, letterSpacing:".005em",
    transition:"all .18s cubic-bezier(.4,0,.2,1)", whiteSpace:"nowrap" };
  const variants = {
    solid:   { background:"var(--accent-deep)", color:"#fff", boxShadow:"var(--shadow-sm)" },
    soft:    { background:"var(--accent-tint)", color:"var(--accent-deep)" },
    outline: { background:"var(--paper)", color:"var(--ink)", border:"1.5px solid var(--line-strong)" },
    ghost:   { background:"transparent", color:"var(--ink-soft)" },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="var(--shadow-md)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=variant==="solid"?"var(--shadow-sm)":"none"; }}
      {...rest}>
      {icon && <Icon name={icon} size={17}/>}{children}
    </button>
  );
}

Object.assign(window, {
  useLocal, lsGet, lsSet, Icon, MODULE_ICON, Logo, ProgressRing, Pill, Placeholder, Checklist, NotesBox, Btn
});
