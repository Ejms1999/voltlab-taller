import { useState, useRef } from "react";
import { sb } from "../../lib/supabaseClient.js";
import getNextOrden from "../../lib/getNextOrden.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import comprimirImagen from "../../utils/imagenes.js";
import generarPDF from "../../utils/pdf.js";
import Inp from "../../components/ui/Inp.jsx";
import TA from "../../components/ui/TA.jsx";
import Check3 from "../../components/ui/Check3.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function FormIngreso({onGuardar, prefill}) {
  const [f,setF]=useState({cliente:(prefill&&prefill.cliente)||"" ,telefono:(prefill&&prefill.telefono)||"" ,fotoPreview:null,fotoFile:null,tiposFalla:[],motivoIngreso:"",motorFunciona:null,lucesBocina:null,neumaticos:null,comentario:"",fechaIngreso:new Date().toISOString().split("T")[0]});
  const [err,setErr]=useState({});
  const [loading,setLoading]=useState(false);
  const fileRef=useRef();
  const s=(k,v)=>setF(p=>({...p,[k]:v}));

  const handleFoto=async(e)=>{
    const file=e.target.files[0]; if(!file)return;
    const rd=new FileReader();
    rd.onload=async ev=>{
      const comprimida=await comprimirImagen(ev.target.result);
      s("fotoPreview",comprimida);
      // Convert back to blob for upload
      const res=await fetch(comprimida);
      const blob=await res.blob();
      s("fotoFile",new File([blob],"foto.jpg",{type:"image/jpeg"}));
    };
    rd.readAsDataURL(file);
  };

  const toggleFalla=id=>s("tiposFalla",f.tiposFalla.includes(id)?f.tiposFalla.filter(x=>x!==id):[...f.tiposFalla,id]);

  const validate=()=>{
    const e={};
    if(!f.cliente.trim())e.cliente="Obligatorio";
    if(!f.telefono.trim())e.telefono="Obligatorio";
    if(f.tiposFalla.length===0)e.tiposFalla="Selecciona al menos una";
    if(!f.motivoIngreso.trim())e.motivoIngreso="Obligatorio";
    if(!f.motorFunciona)e.motorFunciona=true;
    if(!f.lucesBocina)e.lucesBocina=true;
    if(!f.neumaticos)e.neumaticos=true;
    setErr(e); return Object.keys(e).length===0;
  };

  const submit=async()=>{
    if(!validate())return;
    setLoading(true);
    const nOrden=await getNextOrden();
    const{data:{user}}=await sb.auth.getUser();
    let foto_url=null;

    // Subir foto a Storage
    if(f.fotoFile){
      const path=user.id+"/"+Date.now()+".jpg";
      const{error:upErr}=await sb.storage.from("fotos").upload(path,f.fotoFile);
      if(!upErr){
        const{data:urlData}=sb.storage.from("fotos").getPublicUrl(path);
        foto_url=urlData?.publicUrl||null;
        // Use signed URL instead for private bucket
        const{data:signed}=await sb.storage.from("fotos").createSignedUrl(path,60*60*24*365*5);
        foto_url=signed?.signedUrl||foto_url;
      }
    }

    const registro={
      user_id:user.id,
      n_orden:nOrden,
      cliente:f.cliente,
      telefono:f.telefono,
      foto_url,
      tipos_falla:f.tiposFalla,
      motivo_ingreso:f.motivoIngreso,
      motor_funciona:f.motorFunciona,
      luces_bocina:f.lucesBocina,
      neumaticos:f.neumaticos,
      comentario:f.comentario,
      estado:"pendiente",
      ayudante:null,
      ayudante_nombre:"",
      ayudante_trabajo:"",
      ayudante_monto:null,
      ayudante_pagado:false,
      fecha:new Date(f.fechaIngreso+"T12:00:00").toISOString(),
    };

    const{data,error}=await sb.from("registros").insert([registro]).select().single();
    if(error){alert("Error guardando: "+error.message);setLoading(false);return;}

    // Generar PDF con preview local (foto ya comprimida)
    const rParaPDF={...data,tiposFalla:data.tipos_falla,fotoPreview:f.fotoPreview,nOrden,motorFunciona:data.motor_funciona,lucesBocina:data.luces_bocina,neumaticos:data.neumaticos};
    try{await generarPDF(rParaPDF,{descargar:true,nOrdenParam:nOrden});}catch(e){}

    onGuardar(data);
    setF({cliente:"",telefono:"",fotoPreview:null,fotoFile:null,tiposFalla:[],motivoIngreso:"",motorFunciona:null,lucesBocina:null,neumaticos:null,comentario:"",fechaIngreso:new Date().toISOString().split("T")[0]});
    setErr({});setLoading(false);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div>
        <Inp label="Nombre del Cliente *" value={f.cliente} onChange={v=>s("cliente",v)} placeholder="Ej: Juan Pérez" err={err.cliente}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <label style={LBL}>WhatsApp *</label>
        <div style={{display:"flex",alignItems:"center"}}>
          <div style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.09)",borderRight:"none",borderRadius:"10px 0 0 10px",padding:"12px 12px",color:"#22d07a",fontSize:14,fontFamily:"'DM Mono',monospace",fontWeight:700,flexShrink:0}}>+56</div>
          <input type="tel" value={f.telefono} onChange={e=>s("telefono",e.target.value.replace(/\D/g,"").slice(0,9))} placeholder="912345678" maxLength={9}
            style={{...INP,borderRadius:"0 10px 10px 0",border:"1px solid "+(err.telefono?"#ff5a5a":"rgba(255,255,255,0.09)")}}
            onFocus={e=>e.target.style.borderColor="#4f8cff"}
            onBlur={e=>e.target.style.borderColor=err.telefono?"#ff5a5a":"rgba(255,255,255,0.09)"}/>
        </div>
        {err.telefono&&<span style={E}>{err.telefono}</span>}
        {f.telefono&&<a href={"https://wa.me/56"+f.telefono} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:4,color:"#22d07a",fontSize:13,textDecoration:"none"}}>💬 Abrir chat</a>}
      </div>

      <div>
        <label style={LBL}>Foto del equipo</label>
        <div onClick={()=>fileRef.current.click()} style={{marginTop:6,border:"1.5px dashed rgba(255,255,255,0.15)",borderRadius:12,minHeight:85,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden",background:"rgba(255,255,255,0.02)"}}>
          {f.fotoPreview?<img src={f.fotoPreview} alt="prev" style={{width:"100%",maxHeight:160,objectFit:"cover"}}/>:<div style={{textAlign:"center",color:"rgba(255,255,255,0.3)"}}><div style={{fontSize:26}}>📷</div><div style={{fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Toca para agregar foto</div></div>}
        </div>
        <div style={{display:"flex",gap:8,marginTop:6}}>
          <button onClick={()=>{fileRef.current.removeAttribute("capture");fileRef.current.click();}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"9px",color:"#c8d0e0",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>🖼 Galería</button>
          <button onClick={()=>{fileRef.current.setAttribute("capture","environment");fileRef.current.click();}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"9px",color:"#c8d0e0",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>📷 Cámara</button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFoto}/>
      </div>

      <div style={{background:"rgba(255,90,90,0.05)",border:"1.5px solid "+(err.tiposFalla?"#ff5a5a":"rgba(255,90,90,0.2)"),borderRadius:16,padding:16,display:"flex",flexDirection:"column",gap:12}}>
        <div><label style={{...LBL,color:"#ff8a8a"}}>🔧 Tipo de falla *</label><p style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginTop:3}}>Selecciona uno o más</p></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {TIPOS_FALLA.map(tf=>{const a=f.tiposFalla.includes(tf.id);return(
            <button key={tf.id} onClick={()=>toggleFalla(tf.id)} style={{padding:"9px 8px",borderRadius:10,border:"1.5px solid",borderColor:a?"#ff8a8a":"rgba(255,255,255,0.09)",background:a?"rgba(255,90,90,0.18)":"rgba(255,255,255,0.03)",color:a?"#ff8a8a":"rgba(255,255,255,0.4)",fontWeight:a?700:500,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6,transition:"all 0.15s"}}>
              <span style={{fontSize:15}}>{tf.icon}</span><span>{tf.label}</span>
            </button>
          );})}
        </div>
        {err.tiposFalla&&<span style={E}>{err.tiposFalla}</span>}
        <TA label="¿Por qué lo trae? *" value={f.motivoIngreso} onChange={v=>s("motivoIngreso",v)} placeholder="Describe la falla..." err={err.motivoIngreso}/>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <label style={LBL}>Revisión del equipo * <span style={{color:"#7a8aaa",fontWeight:400,fontSize:10,letterSpacing:0,textTransform:"none"}}>(N/A si no aplica)</span></label>
        <Check3 label="¿Motor funciona?" icon="⚡" value={f.motorFunciona} onChange={v=>s("motorFunciona",v)} err={err.motorFunciona}/>
        <Check3 label="¿Luces y bocina?" icon="🔦" value={f.lucesBocina} onChange={v=>s("lucesBocina",v)} err={err.lucesBocina}/>
        <Check3 label="¿Neumáticos con aire?" icon="🛞" value={f.neumaticos} onChange={v=>s("neumaticos",v)} err={err.neumaticos}/>
      </div>

      <TA label="Observaciones del técnico" value={f.comentario} onChange={v=>s("comentario",v)} placeholder="Notas internas, piezas, advertencias..."/>

      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <label style={LBL}>Fecha de ingreso</label>
        <input type="date" value={f.fechaIngreso} onChange={e=>s("fechaIngreso",e.target.value)}
          style={{...INP,colorScheme:"dark"}}/>
      </div>

      <button onClick={submit} disabled={loading} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:12,padding:16,color:"#fff",fontSize:16,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1,marginTop:4}}>
        {loading?"⏳ Guardando y subiendo foto...":"✅ Registrar Ingreso"}
      </button>
    </div>
  );
}

export default FormIngreso;
