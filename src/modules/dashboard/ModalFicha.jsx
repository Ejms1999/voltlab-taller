import { fmt } from "../../utils/fechas.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import Badge from "../../components/ui/Badge.jsx";
function ModalFicha({ r, onCerrar, onAyudante, onEditar, onPresupuesto, onCompletar }) {
  const dias = diasEnTaller(r.fecha);
  const u = urgenciaBadge(dias);
  const wa = "56"+r.telefono.replace(/\D/g,"");
  const estadoLabel = {pendiente:"⏳ Pendiente", presupuesto:"📋 Presupuesto", completado:"✅ Completado"}[r.estado]||r.estado;
  const estadoColor = {pendiente:"#ffb432", presupuesto:"#4f8cff", completado:"#22d07a"}[r.estado]||"#7a8aaa";

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:400,backdropFilter:"blur(6px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",borderRadius:"20px 20px 0 0",padding:"20px 16px 40px",width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:14}}>
        
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{color:"#e8edf5",fontWeight:800,fontSize:18,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
            <div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Mono',monospace",marginTop:2}}>
              {r.n_orden?"N° "+r.n_orden+" · ":""}{new Date(r.fecha).toLocaleDateString("es-CL")}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
            <button onClick={onCerrar} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"5px 11px",color:"#7a8aaa",fontSize:16,cursor:"pointer"}}>✕</button>
            <div style={{background:estadoColor==="#ffb432"?"rgba(255,180,50,0.15)":estadoColor==="#4f8cff"?"rgba(79,140,255,0.15)":"rgba(34,208,122,0.15)",border:"1px solid "+estadoColor+"44",borderRadius:6,padding:"2px 9px",color:estadoColor,fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{estadoLabel}</div>
            {r.estado==="pendiente"&&<div style={{background:u.bg,border:"1px solid "+u.border,borderRadius:6,padding:"2px 9px",color:u.color,fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{dias}d hábiles</div>}
          </div>
        </div>

        {/* Foto */}
        {r.foto_url&&<img src={r.foto_url} alt="equipo" style={{width:"100%",borderRadius:12,maxHeight:220,objectFit:"contain",background:"rgba(0,0,0,0.4)"}}/>}

        {/* Contacto */}
        <div style={{display:"flex",gap:8}}>
          <a href={"https://wa.me/"+wa} target="_blank" rel="noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"rgba(34,208,122,0.12)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:10,padding:"11px",color:"#22d07a",fontSize:14,fontWeight:700,textDecoration:"none",fontFamily:"'DM Sans',sans-serif"}}>
            💬 WhatsApp
          </a>
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,padding:"11px",color:"#7a8aaa",fontSize:13,fontFamily:"'DM Mono',monospace"}}>
            +56 {r.telefono}
          </div>
        </div>

        {/* Fallas */}
        <div style={{background:"rgba(255,90,90,0.07)",border:"1px solid rgba(255,90,90,0.18)",borderRadius:12,padding:"12px 14px"}}>
          <div style={{color:"#ff8a8a",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1,marginBottom:8}}>FALLA REPORTADA</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:r.motivo_ingreso?8:0}}>
            {(r.tipos_falla||[]).map(id=>{const tf=TIPOS_FALLA.find(t=>t.id===id);return tf?<span key={id} style={{background:"rgba(255,90,90,0.15)",border:"1px solid rgba(255,138,138,0.3)",borderRadius:6,padding:"3px 8px",color:"#ff8a8a",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>{tf.icon} {tf.label}</span>:null;})}
          </div>
          {r.motivo_ingreso&&<div style={{color:"#d0a0a0",fontSize:12,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{r.motivo_ingreso}</div>}
        </div>

        {/* Revisión */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[{icon:"⚡",label:"Motor",val:r.motor_funciona},{icon:"🔦",label:"Luces",val:r.luces_bocina},{icon:"🛞",label:"Neumát.",val:r.neumaticos}].map(it=>(
            <div key={it.label} style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"8px 6px",textAlign:"center",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:15}}>{it.icon}</div>
              <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",marginBottom:3}}>{it.label}</div>
              <Badge val={it.val}/>
            </div>
          ))}
        </div>

        {/* Observaciones */}
        {r.comentario&&<div style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"10px 12px",color:"#a0a8bc",fontSize:13,fontFamily:"'DM Sans',sans-serif",borderLeft:"3px solid rgba(79,140,255,0.4)"}}>{r.comentario}</div>}

        {/* Presupuesto si existe */}
        {r.presupuesto_problema&&<div style={{background:"rgba(255,180,50,0.07)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:12,padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
          <div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>PRESUPUESTO</div>
          <div><div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",marginBottom:2}}>PROBLEMA</div><div style={{color:"#e0d0a0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{r.presupuesto_problema}</div></div>
          <div><div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",marginBottom:2}}>TRABAJO</div><div style={{color:"#e0d0a0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{r.presupuesto_trabajo}</div></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace"}}>VALOR</span>
            <span style={{color:"#ffb432",fontWeight:800,fontSize:17,fontFamily:"'DM Mono',monospace"}}>{fmt(r.presupuesto_valor)}</span>
          </div>
        </div>}

        {/* Ayudante */}
        {r.ayudante==="con_ayudante"&&<div style={{background:"rgba(79,140,255,0.06)",border:"1px solid rgba(79,140,255,0.15)",borderRadius:12,padding:"10px 14px"}}>
          <div style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>👥 {r.ayudante_nombre||"Mauricio"}</div>
          {r.ayudante_trabajo&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:3}}>{r.ayudante_trabajo}</div>}
          <div style={{display:"flex",gap:7,marginTop:4,alignItems:"center"}}>
            {r.ayudante_monto?<span style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{fmt(r.ayudante_monto)}</span>:null}
            <span style={{background:r.ayudante_pagado?"rgba(34,208,122,0.15)":"rgba(255,90,90,0.12)",color:r.ayudante_pagado?"#22d07a":"#ff8a8a",borderRadius:5,padding:"2px 7px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{r.ayudante_pagado?"✅ Pagado":"⚠ Sin pagar"}</span>
          </div>
        </div>}

        {/* Acciones según estado */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={onEditar} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"12px",color:"#c8d0e0",fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>✏️ Editar</button>
          <button onClick={onAyudante} style={{flex:1,background:"rgba(79,140,255,0.1)",border:"1px solid rgba(79,140,255,0.25)",borderRadius:10,padding:"12px",color:"#4f8cff",fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>👥 Ayudante</button>
          {r.estado==="pendiente"&&<button onClick={onPresupuesto} style={{flex:1,background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:10,padding:"12px",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>📋 Presupuesto</button>}
          {(r.estado==="pendiente"||r.estado==="presupuesto")&&<button onClick={onCompletar} style={{flex:1,background:"linear-gradient(135deg,#22d07a,#4f8cff)",border:"none",borderRadius:10,padding:"12px",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>✅ Completar</button>}
        </div>
      </div>
    </div>
  );
}

export default ModalFicha;
