import { useState } from "react";
import actualizarDB from "../../lib/actualizarDB.js";
import generarPDF from "../../utils/pdf.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, diasEnTaller, urgenciaBadge } from "../../utils/fechas.js";
import Inp from "../../components/ui/Inp.jsx";
import TA from "../../components/ui/TA.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function CardPendiente({r,onEliminar,onPresupuesto,onEditar,onAyudante,onCompletar,onFotoClick}) {
  const [genPDF,setGenPDF]=useState(false);
  const wa="56"+r.telefono.replace(/\D/g,"");
  const fecha=new Date(r.fecha).toLocaleDateString("es-CL");
  const pdfWA=async()=>{
    setGenPDF(true);
    try{
      const{nOrden}=await generarPDF({...r,tiposFalla:r.tipos_falla,fotoPreview:r.foto_url,nOrden:r.n_orden,motorFunciona:r.motor_funciona,lucesBocina:r.luces_bocina,neumaticos:r.neumaticos},{descargar:true,nOrdenParam:r.n_orden});
      const fallas=(r.tipos_falla||[]).map(id=>{const t=TIPOS_FALLA.find(x=>x.id===id);return t?t.label:"";}).filter(Boolean).join(", ");
      const msg="Hola "+r.cliente+" \uD83D\uDC4B\n\nAdjuntamos tu comprobante N\u00B0 "+r.n_orden+".\nFalla: "+fallas+"\n\nTe avisamos pronto. \u26A1";
      setTimeout(()=>window.open("https://wa.me/"+wa+"?text="+encodeURIComponent(msg),"_blank"),600);
    }catch(e){alert("Error generando PDF.");}
    setGenPDF(false);
  };
  return(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:16,padding:18,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{color:"#e8edf5",fontWeight:700,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
          <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace",marginTop:2}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{fecha}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <div style={{background:"rgba(255,180,50,0.15)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:6,padding:"3px 9px",color:"#ffb432",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>⏳ PENDIENTE</div>
          {(()=>{const d=diasEnTaller(r.fecha);const u=urgenciaBadge(d);return <div style={{background:u.bg,border:"1px solid "+u.border,borderRadius:6,padding:"2px 8px",color:u.color,fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{d}d en taller</div>;})()} 
        </div>
      </div>
      {r.foto_url&&<img src={r.foto_url} alt="eq" onClick={()=>onFotoClick&&onFotoClick(r.foto_url)} style={{width:"100%",borderRadius:10,maxHeight:220,objectFit:"contain",background:"rgba(0,0,0,0.3)",cursor:"zoom-in"}}/>}
      <div style={{background:"rgba(255,90,90,0.07)",border:"1px solid rgba(255,90,90,0.18)",borderRadius:10,padding:"10px 12px"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{(r.tipos_falla||[]).map(id=>{const tf=TIPOS_FALLA.find(t=>t.id===id);return tf?<span key={id} style={{background:"rgba(255,90,90,0.15)",border:"1px solid rgba(255,138,138,0.3)",borderRadius:6,padding:"3px 8px",color:"#ff8a8a",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>{tf.icon} {tf.label}</span>:null;})}</div>
        {r.motivo_ingreso&&<div style={{color:"#d0a0a0",fontSize:12,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5,marginTop:6}}>{r.motivo_ingreso}</div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        {[{icon:"⚡",label:"Motor",val:r.motor_funciona},{icon:"🔦",label:"Luces",val:r.luces_bocina},{icon:"🛞",label:"Neumát.",val:r.neumaticos}].map(it=>(
          <div key={it.label} style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"8px 6px",textAlign:"center",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{fontSize:15}}>{it.icon}</div>
            <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",marginBottom:3}}>{it.label}</div>
            <Badge val={it.val}/>
          </div>
        ))}
      </div>
      {r.comentario&&<div style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"10px 12px",color:"#a0a8bc",fontSize:13,fontFamily:"'DM Sans',sans-serif",borderLeft:"3px solid rgba(79,140,255,0.4)"}}>{r.comentario}</div>}
      <div style={{background:"rgba(79,140,255,0.06)",border:"1px solid rgba(79,140,255,0.15)",borderRadius:12,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <div>
          {r.ayudante==="con_ayudante"?(<div>
            <div style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>👥 {r.ayudante_nombre||"Ayudante"}</div>
            {r.ayudante_trabajo&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{r.ayudante_trabajo}</div>}
            <div style={{display:"flex",gap:7,marginTop:4,alignItems:"center",flexWrap:"wrap"}}>
              {r.ayudante_monto?<span style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{fmt(r.ayudante_monto)}</span>:null}
              <span style={{background:r.ayudante_pagado?"rgba(34,208,122,0.15)":"rgba(255,90,90,0.12)",color:r.ayudante_pagado?"#22d07a":"#ff8a8a",borderRadius:5,padding:"2px 7px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{r.ayudante_pagado?"✅ Pagado":"⚠ Sin pagar"}</span>
            </div>
          </div>):(<span style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>👤 Sin ayudante</span>)}
        </div>
        <button onClick={onAyudante} style={{background:"rgba(79,140,255,0.12)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"7px 12px",color:"#4f8cff",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontWeight:600}}>
          {r.ayudante==="con_ayudante"?"✏️ Editar":"➕ Agregar"}
        </button>
      </div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        <button onClick={pdfWA} disabled={genPDF} style={{display:"inline-flex",alignItems:"center",gap:4,background:genPDF?"rgba(255,255,255,0.05)":"rgba(255,100,50,0.15)",border:"1px solid rgba(255,100,50,0.35)",borderRadius:8,padding:"8px 10px",color:genPDF?"#7a8aaa":"#ff6432",fontSize:11,cursor:genPDF?"not-allowed":"pointer",fontWeight:700}}>
          {genPDF?"⏳":"📄"} PDF+WA
        </button>
        <a href={"https://wa.me/"+wa} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",background:"rgba(34,208,122,0.1)",border:"1px solid rgba(34,208,122,0.25)",borderRadius:8,padding:"8px 10px",color:"#22d07a",fontSize:13,textDecoration:"none"}}>💬</a>
        <button onClick={onEditar} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"8px 10px",color:"#c8d0e0",fontSize:13,cursor:"pointer"}}>✏️</button>
        <button onClick={onPresupuesto} style={{flex:1,background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:8,padding:"8px 10px",color:"#fff",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontWeight:700}}>📋 Presupuesto</button>
        <button onClick={onCompletar} style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:8,padding:"8px 10px",color:"#22d07a",fontSize:12,cursor:"pointer",fontWeight:700}}>✅</button>
        <button onClick={onEliminar} style={{background:"transparent",border:"1px solid rgba(255,90,90,0.2)",borderRadius:8,padding:"8px 10px",color:"rgba(255,90,90,0.5)",fontSize:12,cursor:"pointer"}}>🗑</button>
      </div>
    </div>
  );
}

export default CardPendiente;
