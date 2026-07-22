import { useState } from "react";
import actualizarDB from "../../lib/actualizarDB.js";
import generarPDF from "../../utils/pdf.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, diasEnTaller, urgenciaBadge } from "../../utils/fechas.js";
import Inp from "../../components/ui/Inp.jsx";
import TA from "../../components/ui/TA.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function ModalPresupuesto({r,onConfirmar,onCerrar}) {
  const [problema,setProblema]=useState(r.presupuesto_problema||"");
  const [trabajo,setTrabajo]=useState(r.presupuesto_trabajo||"");
  const [valor,setValor]=useState(r.presupuesto_valor||"");
  const [loading,setLoading]=useState(false);
  const guardar=async()=>{
    if(!problema.trim()||!trabajo.trim()||!valor){alert("Completa todos los campos");return;}
    setLoading(true);
    const datos={estado:"presupuesto",presupuesto_problema:problema,presupuesto_trabajo:trabajo,presupuesto_valor:Number(valor),fecha_presupuesto:new Date().toISOString()};
    await actualizarDB(r.id,datos);
    onConfirmar({...r,...datos});
    setLoading(false);
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:16,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#ffb432",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>📋 Registrar Presupuesto</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <div style={{color:"#7a8aaa",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Cliente: <strong style={{color:"#e8edf5"}}>{r.cliente}</strong></div>
        <TA label="Problema encontrado *" value={problema} onChange={setProblema} placeholder="Ej: Celda 3 de batería en cortocircuito..." rows={3}/>
        <TA label="Lo que se hará *" value={trabajo} onChange={setTrabajo} placeholder="Ej: Reemplazo de celda defectuosa..." rows={3}/>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Valor *</label>
          <input type="number" min="0" value={valor} onChange={e=>setValor(e.target.value)} placeholder="Ej: 45000" style={INP}/>
        </div>
        <button onClick={guardar} disabled={loading} style={{background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:12,padding:14,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1}}>
          {loading?"⏳ Guardando...":"💾 Guardar Presupuesto"}
        </button>
      </div>
    </div>
  );
}

export default ModalPresupuesto;
