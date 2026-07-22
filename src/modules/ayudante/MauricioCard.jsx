import { useState } from "react";
import { fmt } from "../../utils/fechas.js";
import { LBL, INP } from "../../components/ui/styles.js";
function MauricioCard({ r, onActualizar }) {
  const [monto, setMonto] = useState(r.ayudante_monto||"");
  const [pagado, setPagado] = useState(r.ayudante_pagado||false);
  const [editMonto, setEditMonto] = useState(false);
  const [fechaPago, setFechaPago] = useState(r.ayudante_fecha_pago?new Date(r.ayudante_fecha_pago).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]);

  const guardar = async () => {
    const datos = {
      ayudante_monto: monto?Number(monto):null,
      ayudante_pagado: pagado,
      ayudante_fecha_pago: pagado ? new Date(fechaPago+"T12:00:00").toISOString() : null
    };
    await onActualizar(datos);
    setEditMonto(false);
  };

  return (
    <div style={{background:"rgba(79,140,255,0.04)",border:"1px solid rgba(79,140,255,0.15)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{color:"#e8edf5",fontWeight:700,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
          <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace"}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{r.fecha_completado?new Date(r.fecha_completado).toLocaleDateString("es-CL"):""}</div>
          {r.ayudante_trabajo&&<div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginTop:3}}>{r.ayudante_trabajo}</div>}
        </div>
        <div style={{background:"rgba(79,140,255,0.15)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"6px 12px",textAlign:"center",cursor:"pointer"}} onClick={()=>setEditMonto(p=>!p)}>
          <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace"}}>MONTO</div>
          <div style={{color:"#4f8cff",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{r.ayudante_monto?fmt(r.ayudante_monto):"—"}</div>
        </div>
      </div>
      {editMonto&&(
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <input type="number" min="0" value={monto} onChange={e=>setMonto(e.target.value)} placeholder="Monto" style={{flex:1,...INP,padding:"9px 12px",fontSize:13}}/>
        </div>
      )}
      {pagado&&(
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>FECHA DE PAGO</label>
          <input type="date" value={fechaPago} onChange={e=>setFechaPago(e.target.value)}
            style={{...INP,padding:"9px 12px",fontSize:13,colorScheme:"dark"}}/>
        </div>
      )}
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{setPagado(p=>!p);}} style={{flex:1,padding:"10px",borderRadius:10,border:"1.5px solid",borderColor:pagado?"#22d07a":"rgba(255,255,255,0.15)",background:pagado?"rgba(34,208,122,0.15)":"transparent",color:pagado?"#22d07a":"#7a8aaa",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
          {pagado?"✅ Pagado":"⬜ Marcar pagado"}
        </button>
        <button onClick={guardar} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:10,padding:"10px 18px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>💾</button>
      </div>
    </div>
  );
}

export default MauricioCard;
