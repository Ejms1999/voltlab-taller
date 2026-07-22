import { useState, useEffect } from "react";
import { sb } from "../../lib/supabaseClient.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, enRango, calcularDiasTrabajados, diasHabilesEnPeriodo, getHorasDia } from "../../utils/fechas.js";
import FiltroBar from "../../components/ui/FiltroBar.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function AddGastoFijo({ onGuardar, onCancelar }) {
  const descRef = useRef();
  const montoRef = useRef();
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      <input ref={descRef} placeholder="Ej: Arriendo" defaultValue=""
        style={{...INP,padding:"10px 12px",fontSize:14}}/>
      <div style={{display:"flex",gap:8}}>
        <input ref={montoRef} type="number" placeholder="Monto mensual" defaultValue=""
          style={{flex:1,...INP,padding:"10px 12px",fontSize:14}}/>
        <button onClick={()=>onGuardar(descRef.current?.value, montoRef.current?.value)}
          style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:8,padding:"10px 16px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>💾</button>
        <button onClick={onCancelar}
          style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px 14px",color:"#7a8aaa",fontSize:13,cursor:"pointer"}}>✕</button>
      </div>
    </div>
  );
}



export default AddGastoFijo;
