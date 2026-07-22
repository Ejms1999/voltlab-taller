import { useState, useEffect } from "react";
import { sb } from "../../lib/supabaseClient.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, enRango, calcularDiasTrabajados, diasHabilesEnPeriodo, getHorasDia } from "../../utils/fechas.js";
import FiltroBar from "../../components/ui/FiltroBar.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function GastoFijoRow({ g, onEditar, onEliminar }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(String(g.monto));
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
      <span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif",flex:1}}>{g.descripcion}</span>
      {editing
        ? <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <input type="number" value={val} onChange={e=>setVal(e.target.value)}
              autoFocus
              style={{width:110,...INP,padding:"6px 8px",fontSize:13}}/>
            <button onClick={()=>{onEditar(g.id,val);setEditing(false);}} style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:6,padding:"6px 10px",color:"#22d07a",fontSize:12,cursor:"pointer"}}>✓</button>
            <button onClick={()=>setEditing(false)} style={{background:"transparent",border:"none",color:"#7a8aaa",cursor:"pointer",fontSize:13}}>✕</button>
          </div>
        : <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{color:"#ff8a8a",fontWeight:700,fontSize:13,fontFamily:"'DM Mono',monospace"}}>{fmt(g.monto)}</span>
            <button onClick={()=>{setVal(String(g.monto));setEditing(true);}} style={{background:"transparent",border:"none",color:"#7a8aaa",cursor:"pointer",fontSize:13}}>✏️</button>
            <button onClick={()=>onEliminar(g.id,"fijo")} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:13}}>🗑</button>
          </div>
      }
    </div>
  );
}

export default GastoFijoRow;
