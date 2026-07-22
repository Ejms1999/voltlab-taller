import { useState } from "react";
import { sb } from "../../lib/supabaseClient.js";
import { LOGO_B64 } from "../../utils/constants.js";
import Inp from "../../components/ui/Inp.jsx";
function Login({onLogin}) {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const entrar=async()=>{
    if(!email||!pass){setErr("Completa todos los campos");return;}
    setLoading(true);setErr("");
    const{error}=await sb.auth.signInWithPassword({email,password:pass});
    if(error){setErr("Email o contraseña incorrectos");setLoading(false);return;}
    onLogin();
  };

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1117 0%,#111827 50%,#0d1117 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:380,display:"flex",flexDirection:"column",alignItems:"center",gap:28}}>
        <img src={LOGO_B64} alt="VoltLab" style={{height:90,width:"auto"}}/>
        <div style={{textAlign:"center"}}>
          <div style={{color:"#e8edf5",fontWeight:800,fontSize:22,fontFamily:"'DM Sans',sans-serif",letterSpacing:-0.5}}>VoltLab</div>
          <div style={{color:"#4f8cff",fontSize:11,fontFamily:"'DM Mono',monospace",letterSpacing:2,marginTop:4}}>SISTEMA DE INGRESOS</div>
        </div>
        <div style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:20,padding:28,display:"flex",flexDirection:"column",gap:16}}>
          <Inp label="Email" value={email} onChange={setEmail} type="email" placeholder="tu@email.com"/>
          <Inp label="Contraseña" value={pass} onChange={setPass} type="password" placeholder="••••••••"/>
          {err&&<div style={{background:"rgba(255,90,90,0.1)",border:"1px solid rgba(255,90,90,0.3)",borderRadius:8,padding:"10px 14px",color:"#ff5a5a",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{err}</div>}
          <button onClick={entrar} disabled={loading} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:12,padding:"14px",color:"#fff",fontSize:16,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1,marginTop:4}}>
            {loading?"⏳ Entrando...":"🔐 Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
