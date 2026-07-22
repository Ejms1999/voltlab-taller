import FormIngreso from "./FormIngreso.jsx";
function ModalFormIngreso({ onGuardar, onCerrar, prefill }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",borderRadius:"20px 20px 0 0",padding:"20px 16px 40px",width:"100%",maxWidth:480,maxHeight:"95vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{color:"#e8edf5",fontWeight:800,fontSize:17,fontFamily:"'DM Sans',sans-serif"}}>➕ Nuevo Ingreso</div>
          <button onClick={onCerrar} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"6px 12px",color:"#7a8aaa",fontSize:14,cursor:"pointer"}}>✕</button>
        </div>
        <FormIngreso onGuardar={onGuardar} prefill={prefill}/>
      </div>
    </div>
  );
}

export default ModalFormIngreso;
