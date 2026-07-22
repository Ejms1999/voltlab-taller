import { useState } from "react";
import actualizarDB from "../../lib/actualizarDB.js";
import generarPDF from "../../utils/pdf.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, diasEnTaller, urgenciaBadge } from "../../utils/fechas.js";
import Inp from "../../components/ui/Inp.jsx";
import TA from "../../components/ui/TA.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function ModalCompletar({r,onConfirmar,onCerrar}) {
  const [detalle,setDetalle]=useState(r.detalle_reparacion||r.presupuesto_trabajo||"");
  const [valor,setValor]=useState(r.valor_cobrado||r.presupuesto_valor||"");
  const [repuestos,setRepuestos]=useState(r.costo_repuestos||"");
  const [fechaComp,setFechaComp]=useState(new Date().toISOString().split("T")[0]);
  const confirmar=async()=>{
    if(!detalle.trim()||!valor){alert("Completa todos los campos");return;}
    const datos={estado:"completado",detalle_reparacion:detalle,valor_cobrado:Number(valor),costo_repuestos:repuestos?Number(repuestos):null,fecha_completado:new Date(fechaComp+"T12:00:00").toISOString()};
    await actualizarDB(r.id,datos);
    onConfirmar({...r,...datos});
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#22d07a",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>✅ Completar</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <div style={{color:"#7a8aaa",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Cliente: <strong style={{color:"#e8edf5"}}>{r.cliente}</strong></div>
        <TA label="Detalle de lo reparado *" value={detalle} onChange={setDetalle} placeholder="Ej: Cambio de batería, ajuste de frenos..." rows={3}/>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Valor cobrado *</label>
          <input type="number" min="0" value={valor} onChange={e=>setValor(e.target.value)} placeholder="Ej: 45000" style={INP}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Costo repuestos (opcional)</label>
          <input type="number" min="0" value={repuestos} onChange={e=>setRepuestos(e.target.value)} placeholder="Ej: 12000" style={INP}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Fecha de completado</label>
          <input type="date" value={fechaComp} onChange={e=>setFechaComp(e.target.value)} style={{...INP,colorScheme:"dark"}}/>
        </div>
        <button onClick={confirmar} style={{background:"linear-gradient(135deg,#22d07a,#4f8cff)",border:"none",borderRadius:12,padding:14,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>✅ Confirmar y completar</button>
      </div>
    </div>
  );
}

export default ModalCompletar;
