import { E, LBL, INP } from "./styles.js";

const Check3=({label,icon,value,onChange,err})=>{
  const opts=[{v:"SI",c:"#22d07a",bg:"rgba(34,208,122,0.15)"},{v:"NO",c:"#ff5a5a",bg:"rgba(255,90,90,0.15)"},{v:"NA",c:"#7a8aaa",bg:"rgba(255,255,255,0.08)"}];
  return(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid "+(err?"#ff5a5a":"rgba(255,255,255,0.09)"),borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:17}}>{icon}</span><span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{label}</span></div>
      <div style={{display:"flex",gap:5}}>
        {opts.map(o=>(
          <button key={o.v} onClick={()=>onChange(o.v)} style={{padding:"5px 10px",borderRadius:7,border:"1.5px solid",borderColor:value===o.v?o.c:"rgba(255,255,255,0.13)",background:value===o.v?o.bg:"transparent",color:value===o.v?o.c:"rgba(255,255,255,0.3)",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"'DM Mono',monospace",transition:"all 0.15s"}}>
            {o.v==="NA"?"N/A":o.v}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Check3;
