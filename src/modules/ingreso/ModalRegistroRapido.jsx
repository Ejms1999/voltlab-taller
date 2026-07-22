import { useState, useRef } from "react";
import { sb } from "../../lib/supabaseClient.js";
import getNextOrden from "../../lib/getNextOrden.js";
import comprimirImagen from "../../utils/imagenes.js";
import { LBL, INP } from "../../components/ui/styles.js";
function ModalRegistroRapido({ onGuardar, onCerrar }) {
  const [detalle, setDetalle] = useState("");
  const [valor, setValor] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleFoto = async (e) => {
    const file = e.target.files[0]; if(!file) return;
    const rd = new FileReader();
    rd.onload = async ev => {
      const comprimida = await comprimirImagen(ev.target.result);
      setFotoPreview(comprimida);
      const res = await fetch(comprimida);
      const blob = await res.blob();
      setFotoFile(new File([blob],"foto.jpg",{type:"image/jpeg"}));
    };
    rd.readAsDataURL(file);
  };

  const guardar = async () => {
    if(!detalle.trim()) { alert("Ingresa una descripción"); return; }
    if(!valor) { alert("Ingresa el valor cobrado"); return; }
    setLoading(true);
    const nOrden = await getNextOrden();
    const { data: { user } } = await sb.auth.getUser();
    let foto_url = null;

    if(fotoFile) {
      const path = user.id+"/"+Date.now()+".jpg";
      const { error } = await sb.storage.from("fotos").upload(path, fotoFile);
      if(!error) {
        const { data: signed } = await sb.storage.from("fotos").createSignedUrl(path, 60*60*24*365*5);
        foto_url = signed?.signedUrl || null;
      }
    }

    const registro = {
      user_id: user.id,
      n_orden: nOrden,
      cliente: "Registro rápido",
      telefono: "",
      foto_url,
      tipos_falla: [],
      motivo_ingreso: detalle,
      motor_funciona: null,
      luces_bocina: null,
      neumaticos: null,
      comentario: "",
      estado: "completado",
      detalle_reparacion: detalle,
      valor_cobrado: Number(valor),
      fecha: new Date(fecha+"T12:00:00").toISOString(),
      fecha_completado: new Date(fecha+"T12:00:00").toISOString(),
      ayudante: null,
      ayudante_nombre: "",
      ayudante_trabajo: "",
      ayudante_monto: null,
      ayudante_pagado: false,
    };

    const { data, error } = await sb.from("registros").insert([registro]).select().single();
    if(error) { alert("Error: "+error.message); setLoading(false); return; }
    onGuardar(data);
    setLoading(false);
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",borderRadius:"20px 20px 0 0",padding:"20px 16px 40px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:14}}>
        
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#ffb432",fontWeight:800,fontSize:17,fontFamily:"'DM Sans',sans-serif"}}>⚡ Registro Rápido</div>
          <button onClick={onCerrar} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"6px 12px",color:"#7a8aaa",fontSize:14,cursor:"pointer"}}>✕</button>
        </div>

        {/* Foto opcional */}
        <div>
          <label style={LBL}>Foto (opcional)</label>
          <div onClick={()=>fotoPreview&&setFotoPreview(null)} style={{marginTop:6,border:"1.5px dashed rgba(255,255,255,0.12)",borderRadius:12,minHeight:80,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"rgba(255,255,255,0.02)"}}>
            {fotoPreview
              ?<img src={fotoPreview} alt="prev" style={{width:"100%",maxHeight:160,objectFit:"contain"}}/>
              :<div style={{textAlign:"center",color:"rgba(255,255,255,0.3)",padding:16}}><div style={{fontSize:24}}>📷</div><div style={{fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Opcional</div></div>}
          </div>
          <div style={{display:"flex",gap:8,marginTop:6}}>
            <button onClick={()=>{fileRef.current.removeAttribute("capture");fileRef.current.click();}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"9px",color:"#c8d0e0",fontSize:12,cursor:"pointer"}}>🖼 Galería</button>
            <button onClick={()=>{fileRef.current.setAttribute("capture","environment");fileRef.current.click();}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"9px",color:"#c8d0e0",fontSize:12,cursor:"pointer"}}>📷 Cámara</button>
            {fotoPreview&&<button onClick={()=>{setFotoPreview(null);setFotoFile(null);}} style={{background:"rgba(255,90,90,0.1)",border:"1px solid rgba(255,90,90,0.2)",borderRadius:8,padding:"9px 12px",color:"#ff5a5a",fontSize:12,cursor:"pointer"}}>✕</button>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFoto}/>
        </div>

        {/* Descripción */}
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Descripción del trabajo *</label>
          <textarea value={detalle} onChange={e=>setDetalle(e.target.value)} placeholder="Ej: Cambio de batería, ajuste de frenos..." rows={3}
            style={{...INP,fontSize:14,resize:"vertical"}}/>
        </div>

        {/* Valor y fecha */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={LBL}>Valor cobrado *</label>
            <input type="number" value={valor} onChange={e=>setValor(e.target.value)} placeholder="Ej: 25000" style={{...INP,fontSize:14}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={LBL}>Fecha</label>
            <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={{...INP,fontSize:14,colorScheme:"dark"}}/>
          </div>
        </div>

        <button onClick={guardar} disabled={loading} style={{background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:12,padding:"15px",color:"#fff",fontSize:16,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1,marginTop:4}}>
          {loading?"⏳ Guardando...":"⚡ Registrar Trabajo"}
        </button>
      </div>
    </div>
  );
}

export default ModalRegistroRapido;
