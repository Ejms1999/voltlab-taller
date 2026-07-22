import { useState } from "react";
import actualizarDB from "../../lib/actualizarDB.js";
import generarPDF from "../../utils/pdf.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, diasEnTaller, urgenciaBadge } from "../../utils/fechas.js";
import Inp from "../../components/ui/Inp.jsx";
import TA from "../../components/ui/TA.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function ModalGarantia({r,onGuardar,onCerrar}) {
  const [desc,setDesc]=useState(r.garantia_desc||"");
  const [tipo,setTipo]=useState(r.garantia_tipo||null);
  const [monto,setMonto]=useState(r.garantia_monto||"");
  const guardar=async()=>{
    if(!desc.trim()){alert("Describe el problema");return;}
    if(!tipo){alert("Selecciona el tipo");return;}
    if((tipo==="cobro"||tipo==="devolucion")&&!monto){alert("Ingresa el monto");return;}
    const datos={garantia_activa:true,garantia_desc:desc,garantia_tipo:tipo,garantia_monto:monto?Number(monto):0,garantia_fecha:new Date().toISOString()};
    await actualizarDB(r.id,datos);
    onGuardar({...r,...datos});
  };
  const tipos=[{v:"cobro",l:"💰 Cobro adicional",c:"#22d07a",bg:"rgba(34,208,122,0.15)"},{v:"devolucion",l:"🔄 Devolución al cliente",c:"#ff5a5a",bg:"rgba(255,90,90,0.15)"},{v:"gratis",l:"✅ Sin costo",c:"#7a8aaa",bg:"rgba(255,255,255,0.08)"}];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:16,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#a78bfa",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>🛡 Garantía / Ajuste</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <TA label="Descripción del problema *" value={desc} onChange={setDesc} placeholder="Ej: Volvió con el mismo problema..." rows={3}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <label style={LBL}>Tipo *</label>
          {tipos.map(t=>(
            <button key={t.v} onClick={()=>setTipo(t.v)} style={{padding:"11px 14px",borderRadius:10,border:"1.5px solid",borderColor:tipo===t.v?t.c:"rgba(255,255,255,0.1)",background:tipo===t.v?t.bg:"transparent",color:tipo===t.v?t.c:"rgba(255,255,255,0.4)",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textAlign:"left"}}>{t.l}</button>
          ))}
        </div>
        {(tipo==="cobro"||tipo==="devolucion")&&(
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={LBL}>{tipo==="cobro"?"Monto adicional":"Monto devuelto"}</label>
            <input type="number" min="0" value={monto} onChange={e=>setMonto(e.target.value)} placeholder="Ej: 15000" style={INP}/>
          </div>
        )}
        <button onClick={guardar} style={{background:"linear-gradient(135deg,#a78bfa,#4f8cff)",border:"none",borderRadius:12,padding:14,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>🛡 Guardar garantía</button>
      </div>
    </div>
  );
}

export default ModalGarantia;
