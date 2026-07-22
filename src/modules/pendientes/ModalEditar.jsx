import { useState } from "react";
import actualizarDB from "../../lib/actualizarDB.js";
import generarPDF from "../../utils/pdf.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, diasEnTaller, urgenciaBadge } from "../../utils/fechas.js";
import Inp from "../../components/ui/Inp.jsx";
import TA from "../../components/ui/TA.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function ModalEditar({r,onGuardar,onCerrar}) {
  const [d,setD]=useState({...r});
  const s=(k,v)=>setD(p=>({...p,[k]:v}));
  const tog=id=>s("tipos_falla",d.tipos_falla.includes(id)?d.tipos_falla.filter(f=>f!==id):[...d.tipos_falla,id]);
  const guardar=async()=>{
    const datos={cliente:d.cliente,telefono:d.telefono,tipos_falla:d.tipos_falla,motivo_ingreso:d.motivo_ingreso,motor_funciona:d.motor_funciona,luces_bocina:d.luces_bocina,neumaticos:d.neumaticos,comentario:d.comentario};
    await actualizarDB(r.id,datos);
    onGuardar({...r,...datos});
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"flex-start",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)",overflowY:"auto",padding:"20px 0"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:24,width:"calc(100% - 32px)",maxWidth:480,display:"flex",flexDirection:"column",gap:14,margin:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#e8edf5",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>✏️ Editar</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <Inp label="Nombre" value={d.cliente} onChange={v=>s("cliente",v)}/>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>WhatsApp</label>
          <div style={{display:"flex",alignItems:"center"}}>
            <div style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.09)",borderRight:"none",borderRadius:"10px 0 0 10px",padding:"12px 12px",color:"#22d07a",fontSize:14,fontFamily:"'DM Mono',monospace",fontWeight:700,flexShrink:0}}>+56</div>
            <input type="tel" value={d.telefono} onChange={e=>s("telefono",e.target.value.replace(/\D/g,"").slice(0,9))} placeholder="912345678" style={{...INP,borderRadius:"0 10px 10px 0"}}/>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Fallas</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            {TIPOS_FALLA.map(tf=>{const a=(d.tipos_falla||[]).includes(tf.id);return<button key={tf.id} onClick={()=>tog(tf.id)} style={{padding:"8px",borderRadius:8,border:"1.5px solid",borderColor:a?"#ff8a8a":"rgba(255,255,255,0.09)",background:a?"rgba(255,90,90,0.18)":"rgba(255,255,255,0.03)",color:a?"#ff8a8a":"rgba(255,255,255,0.4)",fontWeight:a?700:500,fontSize:11,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:5}}><span>{tf.icon}</span><span>{tf.label}</span></button>;})}
          </div>
        </div>
        <TA label="Motivo" value={d.motivo_ingreso} onChange={v=>s("motivo_ingreso",v)} rows={2}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <label style={LBL}>Revisión</label>
          <Check3 label="Motor" icon="⚡" value={d.motor_funciona} onChange={v=>s("motor_funciona",v)}/>
          <Check3 label="Luces y bocina" icon="🔦" value={d.luces_bocina} onChange={v=>s("luces_bocina",v)}/>
          <Check3 label="Neumáticos" icon="🛞" value={d.neumaticos} onChange={v=>s("neumaticos",v)}/>
        </div>
        <TA label="Observaciones" value={d.comentario} onChange={v=>s("comentario",v)} rows={2}/>
        <button onClick={guardar} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:12,padding:13,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>💾 Guardar</button>
      </div>
    </div>
  );
}

export default ModalEditar;
