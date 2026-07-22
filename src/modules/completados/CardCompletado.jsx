import { useState } from "react";
import actualizarDB from "../../lib/actualizarDB.js";
import generarPDF from "../../utils/pdf.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, diasEnTaller, urgenciaBadge } from "../../utils/fechas.js";
import Inp from "../../components/ui/Inp.jsx";
import TA from "../../components/ui/TA.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function CardCompletado({r,onEliminar,onGarantia,onAyudante,onFotoClick,onEditar,onRevertir,onRepetir}) {
  const wa="56"+r.telefono.replace(/\D/g,"");
  const fechaC=r.fecha_completado?new Date(r.fecha_completado).toLocaleDateString("es-CL"):"—";
  const dias=r.fecha&&r.fecha_completado?Math.round(Math.abs((new Date(r.fecha_completado)-new Date(r.fecha))/86400000)):null;
  const montoBase=Number(r.valor_cobrado)||0;
  const ajuste=r.garantia_activa?(r.garantia_tipo==="cobro"?Number(r.garantia_monto)||0:r.garantia_tipo==="devolucion"?-(Number(r.garantia_monto)||0):0):0;
  const montoFinal=montoBase+ajuste;
  return(
    <div style={{background:"rgba(34,208,122,0.04)",border:"1px solid rgba(34,208,122,0.15)",borderRadius:16,padding:18,display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{color:"#e8edf5",fontWeight:700,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
          <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace",marginTop:1}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{fechaC}{dias!==null?" · "+dias+"d":""}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <div style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:6,padding:"3px 9px",color:"#22d07a",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>✅ COMPLETADO</div>
          {r.garantia_activa&&<div style={{background:"rgba(167,139,250,0.15)",border:"1px solid rgba(167,139,250,0.3)",borderRadius:6,padding:"3px 9px",color:"#a78bfa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:700}}>🛡 GARANTÍA</div>}
        </div>
      </div>
      {r.foto_url&&<img src={r.foto_url} alt="eq" onClick={()=>onFotoClick&&onFotoClick(r.foto_url)} style={{width:"100%",borderRadius:10,maxHeight:220,objectFit:"contain",background:"rgba(0,0,0,0.3)",cursor:"zoom-in"}}/>}
      {r.detalle_reparacion&&<div style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"10px 12px",borderLeft:"3px solid rgba(34,208,122,0.4)"}}><div style={{color:"#22d07a",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,marginBottom:4}}>TRABAJO REALIZADO</div><div style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{r.detalle_reparacion}</div></div>}
      {r.garantia_activa&&<div style={{background:"rgba(167,139,250,0.07)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:8,padding:"10px 12px",borderLeft:"3px solid rgba(167,139,250,0.5)"}}>
        <div style={{color:"#a78bfa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,marginBottom:4}}>🛡 {r.garantia_tipo==="cobro"?"Cobro adicional":r.garantia_tipo==="devolucion"?"Devolución":"Sin costo"}</div>
        <div style={{color:"#c8d0e0",fontSize:12,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5,marginBottom:r.garantia_monto?4:0}}>{r.garantia_desc}</div>
        {r.garantia_monto>0&&<div style={{color:r.garantia_tipo==="devolucion"?"#ff5a5a":"#22d07a",fontWeight:700,fontSize:14,fontFamily:"'DM Mono',monospace"}}>{r.garantia_tipo==="devolucion"?"-":"+"}{fmt(r.garantia_monto)}</div>}
      </div>}


      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{background:"rgba(34,208,122,0.12)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:8,padding:"6px 12px"}}>
          <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>{r.garantia_activa&&ajuste!==0?"TOTAL FINAL":"COBRADO"}</div>
          <div style={{color:"#22d07a",fontWeight:800,fontSize:16,fontFamily:"'DM Mono',monospace"}}>{fmt(montoFinal)}</div>
          {r.garantia_activa&&ajuste!==0&&<div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace"}}>Base: {fmt(montoBase)}</div>}
        </div>
        {r.costo_repuestos>0&&<div style={{background:"rgba(255,180,50,0.1)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:8,padding:"6px 12px"}}>
          <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>REPUESTOS</div>
          <div style={{color:"#ffb432",fontWeight:800,fontSize:14,fontFamily:"'DM Mono',monospace"}}>{fmt(r.costo_repuestos)}</div>
        </div>}
        <a href={"https://wa.me/"+wa} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",background:"rgba(34,208,122,0.08)",border:"1px solid rgba(34,208,122,0.2)",borderRadius:8,padding:"6px 10px",color:"#22d07a",fontSize:13,textDecoration:"none"}}>💬</a>
        <button onClick={onEditar} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"6px 10px",color:"#c8d0e0",fontSize:12,cursor:"pointer",fontWeight:600}}>✏️ Editar</button>
        <button onClick={onRevertir} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(255,180,50,0.1)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:8,padding:"6px 10px",color:"#ffb432",fontSize:12,cursor:"pointer",fontWeight:600}}>↩ Revertir</button>
        <button onClick={onGarantia} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(167,139,250,0.1)",border:"1px solid rgba(167,139,250,0.3)",borderRadius:8,padding:"6px 10px",color:"#a78bfa",fontSize:12,cursor:"pointer",fontWeight:700}}>🛡 {r.garantia_activa?"Editar":"Garantía"}</button>
        <button onClick={onRepetir} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(79,140,255,0.1)",border:"1px solid rgba(79,140,255,0.25)",borderRadius:8,padding:"6px 10px",color:"#4f8cff",fontSize:12,cursor:"pointer",fontWeight:600}}>🔁 Repetir</button>
        <button onClick={onEliminar} style={{background:"transparent",border:"1px solid rgba(255,90,90,0.2)",borderRadius:8,padding:"6px 10px",color:"rgba(255,90,90,0.5)",fontSize:12,cursor:"pointer"}}>🗑</button>
      </div>
    </div>
  );
}

export default CardCompletado;
