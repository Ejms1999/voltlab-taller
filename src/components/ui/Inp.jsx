import { E, LBL, INP } from "./styles.js";

const Inp=({label,value,onChange,type="text",placeholder,err})=>(
  <div style={{display:"flex",flexDirection:"column",gap:6}}>
    <label style={LBL}>{label}</label>
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{...INP,border:"1px solid "+(err?"#ff5a5a":"rgba(255,255,255,0.09)")}}
      onFocus={e=>e.target.style.borderColor="#4f8cff"}
      onBlur={e=>e.target.style.borderColor=err?"#ff5a5a":"rgba(255,255,255,0.09)"}/>
    {err&&<span style={E}>{err}</span>}
  </div>
);

export default Inp;
