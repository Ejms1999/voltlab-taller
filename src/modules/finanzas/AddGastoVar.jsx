import { useState, useEffect } from "react";
import { sb } from "../../lib/supabaseClient.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, enRango, calcularDiasTrabajados, diasHabilesEnPeriodo, getHorasDia } from "../../utils/fechas.js";
import FiltroBar from "../../components/ui/FiltroBar.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function AddGastoVar({ onGuardar, onCancelar }) {
  const descRef = useRef();
  const montoRef = useRef();
  const fechaRef = useRef();
  const hoy = new Date().toISOString().split("T")[0];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      <input ref={descRef} placeholder="Ej: IVA enero, herramienta..." defaultValue=""
        style={{...INP,padding:"10px 12px",fontSize:14}}/>
      <div style={{display:"flex",gap:8}}>
        <input ref={montoRef} type="number" placeholder="Monto" defaultValue=""
          style={{flex:1,...INP,padding:"10px 12px",fontSize:14}}/>
        <input ref={fechaRef} type="date" defaultValue={hoy}
          style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"10px 10px",color:"#e8edf5",fontSize:14,outline:"none",colorScheme:"dark"}}/>
        <button onClick={()=>onGuardar(descRef.current?.value, montoRef.current?.value, fechaRef.current?.value||hoy)}
          style={{background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:8,padding:"10px 16px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>💾</button>
        <button onClick={onCancelar}
          style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px 12px",color:"#7a8aaa",fontSize:13,cursor:"pointer"}}>✕</button>
      </div>
    </div>
  );
}



export default AddGastoVar;
