import { E, LBL, INP } from "./styles.js";

const Badge=({val})=>{
  if(!val)return<span style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace"}}>—</span>;
  const m={SI:{c:"#22d07a",bg:"rgba(34,208,122,0.12)"},NO:{c:"#ff5a5a",bg:"rgba(255,90,90,0.12)"},NA:{c:"#7a8aaa",bg:"rgba(255,255,255,0.06)"}}[val]||{c:"#7a8aaa",bg:"rgba(255,255,255,0.06)"};
  return<span style={{background:m.bg,color:m.c,borderRadius:5,padding:"2px 7px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{val==="NA"?"N/A":val}</span>;
};

export default Badge;
