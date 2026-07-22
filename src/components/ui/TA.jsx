import { E, LBL, INP } from "./styles.js";

const TA=({label,value,onChange,placeholder,rows=3,err})=>(
  <div style={{display:"flex",flexDirection:"column",gap:6}}>
    {label&&<label style={LBL}>{label}</label>}
    <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
      style={{...INP,fontSize:13,resize:"vertical",border:"1px solid "+(err?"#ff5a5a":"rgba(255,255,255,0.09)")}}/>
    {err&&<span style={E}>{err}</span>}
  </div>
);

export default TA;
