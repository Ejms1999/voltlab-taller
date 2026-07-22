import { useState } from "react";
import actualizarDB from "../../lib/actualizarDB.js";
import generarPDF from "../../utils/pdf.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, diasEnTaller, urgenciaBadge } from "../../utils/fechas.js";
import Inp from "../../components/ui/Inp.jsx";
import TA from "../../components/ui/TA.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function CardPresupuesto({r,onEliminar,onEditar,onEditarPresupuesto,onAyudante,onCompletar,onReenviar,onRevertir,onFotoClick}) {
  const wa="56"+r.telefono.replace(/\D/g,"");
  const fecha=r.fecha_presupuesto?new Date(r.fecha_presupuesto).toLocaleDateString("es-CL"):new Date(r.fecha).toLocaleDateString("es-CL");
  return(
    <div style={{background:"rgba(255,180,50,0.04)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:16,padding:18,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{color:"#e8edf5",fontWeight:700,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
          <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace",marginTop:2}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{fecha}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <div style={{background:"rgba(255,180,50,0.15)",border:"1px solid rgba(255,180,50,0.4)",borderRadius:6,padding:"3px 9px",color:"#ffb432",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>📋 PRESUPUESTO</div>
          {(()=>{const d=diasEnTaller(r.fecha);const u=urgenciaBadge(d);return <div style={{background:u.bg,border:"1px solid "+u.border,borderRadius:6,padding:"2px 8px",color:u.color,fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{d}d en taller</div>;})()} 
          {r.fecha_presupuesto&&(()=>{const dp=diasEnTaller(r.fecha_presupuesto);return <div style={{background:"rgba(255,180,50,0.1)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:6,padding:"2px 8px",color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{dp}d en presup.</div>;})()} 
        </div>
      </div>
      {r.foto_url&&<img src={r.foto_url} alt="eq" onClick={()=>onFotoClick&&onFotoClick(r.foto_url)} style={{width:"100%",borderRadius:10,maxHeight:220,objectFit:"contain",background:"rgba(0,0,0,0.3)",cursor:"zoom-in"}}/>}
      <div style={{background:"rgba(255,180,50,0.07)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:10,padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
        <div><div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,marginBottom:3}}>PROBLEMA</div><div style={{color:"#e0d0a0",fontSize:13,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{r.presupuesto_problema}</div></div>
        <div><div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,marginBottom:3}}>LO QUE SE HARÁ</div><div style={{color:"#e0d0a0",fontSize:13,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{r.presupuesto_trabajo}</div></div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>VALOR COTIZADO</div>
          <div style={{color:"#ffb432",fontWeight:800,fontSize:18,fontFamily:"'DM Mono',monospace"}}>{fmt(r.presupuesto_valor)}</div>
        </div>
      </div>
      <div style={{background:"rgba(79,140,255,0.06)",border:"1px solid rgba(79,140,255,0.15)",borderRadius:12,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <div>
          {r.ayudante==="con_ayudante"?(<div>
            <div style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>👥 {r.ayudante_nombre||"Ayudante"}</div>
            <div style={{display:"flex",gap:7,marginTop:3,alignItems:"center"}}>
              {r.ayudante_monto?<span style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{fmt(r.ayudante_monto)}</span>:null}
              <span style={{background:r.ayudante_pagado?"rgba(34,208,122,0.15)":"rgba(255,90,90,0.12)",color:r.ayudante_pagado?"#22d07a":"#ff8a8a",borderRadius:5,padding:"2px 7px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{r.ayudante_pagado?"✅ Pagado":"⚠ Sin pagar"}</span>
            </div>
          </div>):(<span style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>👤 Sin ayudante</span>)}
        </div>
        <button onClick={onAyudante} style={{background:"rgba(79,140,255,0.12)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"7px 12px",color:"#4f8cff",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontWeight:600}}>{r.ayudante==="con_ayudante"?"✏️":"➕"}</button>
      </div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        <button onClick={onReenviar} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(255,180,50,0.12)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:8,padding:"8px 10px",color:"#ffb432",fontSize:11,cursor:"pointer",fontWeight:700}}>📤 Reenviar</button>
        <a href={"https://wa.me/"+wa} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",background:"rgba(34,208,122,0.1)",border:"1px solid rgba(34,208,122,0.25)",borderRadius:8,padding:"8px 10px",color:"#22d07a",fontSize:13,textDecoration:"none"}}>💬</a>
        <button onClick={onEditar} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"8px 10px",color:"#c8d0e0",fontSize:13,cursor:"pointer"}}>✏️ Registro</button>
        <button onClick={onEditarPresupuesto} style={{background:"rgba(255,180,50,0.1)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:8,padding:"8px 10px",color:"#ffb432",fontSize:12,cursor:"pointer",fontWeight:600}}>✏️ Presup.</button>
        <button onClick={onCompletar} style={{flex:1,background:"linear-gradient(135deg,#22d07a,#4f8cff)",border:"none",borderRadius:8,padding:"8px 12px",color:"#fff",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontWeight:700}}>✅ Completar</button>
        <button onClick={onRevertir} style={{background:"rgba(255,180,50,0.1)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:8,padding:"8px 10px",color:"#ffb432",fontSize:12,cursor:"pointer",fontWeight:600}}>↩</button>
        <button onClick={onEliminar} style={{background:"transparent",border:"1px solid rgba(255,90,90,0.2)",borderRadius:8,padding:"8px 10px",color:"rgba(255,90,90,0.5)",fontSize:12,cursor:"pointer"}}>🗑</button>
      </div>
    </div>
  );
}

export default CardPresupuesto;
