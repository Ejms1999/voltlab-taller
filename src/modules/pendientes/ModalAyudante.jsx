import { useState } from "react";
import actualizarDB from "../../lib/actualizarDB.js";
import generarPDF from "../../utils/pdf.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, diasEnTaller, urgenciaBadge } from "../../utils/fechas.js";
import Inp from "../../components/ui/Inp.jsx";
import TA from "../../components/ui/TA.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function ModalAyudante({r,onGuardar,onCerrar}) {
  const [con,setCon]=useState(r.ayudante==="con_ayudante");
  const [nombre,setNombre]=useState(r.ayudante_nombre||"Mauricio");
  const [trabajo,setTrabajo]=useState(r.ayudante_trabajo||"");
  const [monto,setMonto]=useState(r.ayudante_monto||"");
  const [pagado,setPagado]=useState(r.ayudante_pagado||false);
  const guardar=async()=>{
    const datos=con
      ?{ayudante:"con_ayudante",ayudante_nombre:nombre,ayudante_trabajo:trabajo,ayudante_monto:monto?Number(monto):null,ayudante_pagado:pagado}
      :{ayudante:null,ayudante_nombre:"",ayudante_trabajo:"",ayudante_monto:null,ayudante_pagado:false};
    if(con){if(!nombre.trim()){alert("Ingresa el nombre");return;}}
    await actualizarDB(r.id,datos);
    onGuardar({...r,...datos});
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#4f8cff",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>👥 Ayudante</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <div style={{display:"flex",gap:10}}>
          {[{v:true,l:"👥 Con ayudante"},{v:false,l:"👤 Sin ayudante"}].map(o=>(
            <button key={String(o.v)} onClick={()=>setCon(o.v)} style={{flex:1,padding:"10px 8px",borderRadius:10,border:"1.5px solid",borderColor:con===o.v?"#4f8cff":"rgba(255,255,255,0.1)",background:con===o.v?"rgba(79,140,255,0.18)":"transparent",color:con===o.v?"#4f8cff":"rgba(255,255,255,0.4)",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{o.l}</button>
          ))}
        </div>
        {con&&<>
          <Inp label="Nombre *" value={nombre} onChange={setNombre} placeholder="Ej: Pedro"/>
          <TA label="¿Qué realizó?" value={trabajo} onChange={setTrabajo} placeholder="Desmontaje, cambio de batería..." rows={2}/>
          <div style={{display:"flex",gap:12,alignItems:"flex-end"}}>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
              <label style={LBL}>Monto pagado</label>
              <input type="number" min="0" value={monto} onChange={e=>setMonto(e.target.value)} placeholder="Ej: 8000" style={INP}/>
            </div>
            <button onClick={()=>setPagado(p=>!p)} style={{padding:"12px 14px",borderRadius:10,border:"1.5px solid",borderColor:pagado?"#22d07a":"rgba(255,255,255,0.15)",background:pagado?"rgba(34,208,122,0.15)":"transparent",color:pagado?"#22d07a":"#7a8aaa",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>
              {pagado?"✅ Pagado":"⬜ Sin pagar"}
            </button>
          </div>
        </>}
        <button onClick={guardar} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:12,padding:13,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>💾 Guardar</button>
      </div>
    </div>
  );
}

export default ModalAyudante;
