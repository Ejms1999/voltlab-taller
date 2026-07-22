import { useState, useEffect } from "react";
import { sb } from "./lib/supabaseClient.js";
import actualizarDB from "./lib/actualizarDB.js";
import { LOGO_B64 } from "./utils/constants.js";
import { fmt, enRango } from "./utils/fechas.js";
import Login from "./modules/auth/Login.jsx";
import ModalFormIngreso from "./modules/ingreso/ModalFormIngreso.jsx";
import ModalRegistroRapido from "./modules/ingreso/ModalRegistroRapido.jsx";
import CardPendiente from "./modules/pendientes/CardPendiente.jsx";
import ModalAyudante from "./modules/pendientes/ModalAyudante.jsx";
import ModalEditar from "./modules/pendientes/ModalEditar.jsx";
import CardPresupuesto from "./modules/presupuestos/CardPresupuesto.jsx";
import ModalPresupuesto from "./modules/presupuestos/ModalPresupuesto.jsx";
import ModalEditarPresupuesto from "./modules/presupuestos/ModalEditarPresupuesto.jsx";
import CardCompletado from "./modules/completados/CardCompletado.jsx";
import ModalCompletar from "./modules/completados/ModalCompletar.jsx";
import ModalGarantia from "./modules/completados/ModalGarantia.jsx";
import ModalEditarCompletado from "./modules/completados/ModalEditarCompletado.jsx";
import PestañaFinanzas from "./modules/finanzas/PestañaFinanzas.jsx";
import PestañaBalance from "./modules/balance/PestañaBalance.jsx";
import PestañaRepuestos from "./modules/repuestos/PestañaRepuestos.jsx";
import PestañaCatalogo from "./modules/repuestos/PestañaCatalogo.jsx";
import PestañaAyudantePagos from "./modules/ayudante/PestañaAyudantePagos.jsx";
import Dashboard from "./modules/dashboard/Dashboard.jsx";
import ModalFicha from "./modules/dashboard/ModalFicha.jsx";
import FiltroBar from "./components/ui/FiltroBar.jsx";

export default function App() {
  const [session,setSession]=useState(null);
  const [loading,setLoading]=useState(true);
  const [registros,setRegistros]=useState([]);
  const [tab,setTab]=useState("nuevo");
  const [subPend,setSubPend]=useState("sinPagar");
  const [toast,setToast]=useState(null);
  const [asistenciaData,setAsistenciaData]=useState([]);
  const [mPresupuesto,setMPresupuesto]=useState(null);
  const [mEditarPresupuesto,setMEditarPresupuesto]=useState(null);
  const [mCompletar,setMCompletar]=useState(null);
  const [mEditar,setMEditar]=useState(null);
  const [mAyudante,setMAyudante]=useState(null);
  const [mAyudanteComp,setMAyudanteComp]=useState(null);
  const [mEditarComp,setMEditarComp]=useState(null);
  const [mGarantia,setMGarantia]=useState(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const [filtroPend,setFiltroPend]=useState("todo");
  const [filtroPresup,setFiltroPresup]=useState("hoy");
  const [filtroComp,setFiltroComp]=useState("hoy");
  const [showFormIngreso,setShowFormIngreso]=useState(false);
  const [prefillIngreso,setPrefillIngreso]=useState(null);
  const [showRegistroRapido,setShowRegistroRapido]=useState(false);
  const [fichaRegistro,setFichaRegistro]=useState(null);
  const [fotoViewer,setFotoViewer]=useState(null);

  // ── Auth ──────────────────────────────────────────────────────────────────
  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setLoading(false);});
    const{data:{subscription}}=sb.auth.onAuthStateChange((_,session)=>setSession(session));
    return()=>subscription.unsubscribe();
  },[]);

  // ── Cargar registros ──────────────────────────────────────────────────────
  useEffect(()=>{
    if(!session)return;
    cargarRegistros();
  },[session]);

  const cargarRegistros=async()=>{
    const{data,error}=await sb.from("registros").select("*").order("fecha",{ascending:false});
    if(!error&&data)setRegistros(data);
    // Load asistencia
    const{data:asist}=await sb.from("asistencia").select("*").order("hora",{ascending:false}).limit(500);
    if(asist)setAsistenciaData(asist);
  };

  const tk=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),2800);};

  const guardar=async(r)=>{
    setRegistros(prev=>[r,...prev]);
    tk("✅ Registro guardado");
    setTab("pendientes");
  };

  const eliminar=async(id)=>{
    if(!window.confirm("¿Eliminar este registro?"))return;
    await sb.from("registros").delete().eq("id",id);
    setRegistros(prev=>prev.filter(r=>r.id!==id));
    tk("🗑 Eliminado",false);
  };

  const actualizarLocal=(id,datos)=>setRegistros(prev=>prev.map(r=>r.id===id?{...r,...datos}:r));

  const pendientesTodas=registros.filter(r=>r.estado==="pendiente").sort((a,b)=>new Date(b.fecha)-new Date(a.fecha));
  const pendientes=filtroPend==="todo"?pendientesTodas:pendientesTodas.filter(r=>enRango(r.fecha,filtroPend));
  const pSinPagar=pendientes.filter(r=>!(r.ayudante==="con_ayudante"&&r.ayudante_pagado));
  const pConAyPagado=pendientes.filter(r=>r.ayudante==="con_ayudante"&&r.ayudante_pagado);
  const presupuestosTodas=registros.filter(r=>r.estado==="presupuesto").sort((a,b)=>new Date(b.fecha)-new Date(a.fecha));
  const presupuestos=filtroPresup==="todo"?presupuestosTodas:presupuestosTodas.filter(r=>enRango(r.fecha,filtroPresup));
  const completadosTodas=registros.filter(r=>r.estado==="completado").sort((a,b)=>new Date(b.fecha_completado||b.fecha)-new Date(a.fecha_completado||a.fecha));
  const completados=filtroComp==="todo"?completadosTodas:completadosTodas.filter(r=>enRango(r.fecha_completado||r.fecha,filtroComp));

  const repetirCliente=(r)=>{
    // Abrir formulario prellenado con datos del cliente
    setPrefillIngreso({ cliente: r.cliente, telefono: r.telefono });
    setShowFormIngreso(true);
  };

  const revertirCompletado=async(r)=>{
    // Vuelve al paso anterior: si tenía presupuesto → presupuesto, si no → pendiente
    const tienePresupuesto = r.presupuesto_problema || r.presupuesto_trabajo || r.presupuesto_valor;
    const nuevoEstado = tienePresupuesto ? "presupuesto" : "pendiente";
    const datos = {
      estado: nuevoEstado,
      fecha_completado: null,
      detalle_reparacion: null,
      valor_cobrado: null,
      costo_repuestos: null,
      garantia_activa: false,
      garantia_desc: null,
      garantia_tipo: null,
      garantia_monto: null,
      garantia_fecha: null,
    };
    await actualizarDB(r.id, datos);
    actualizarLocal(r.id, datos);
    tk("↩ Vuelto a "+(nuevoEstado==="presupuesto"?"Presupuesto":"Pendiente"));
  };

  const revertirPendiente=async(r)=>{
    const datos={estado:"pendiente",fecha_presupuesto:null,presupuesto_problema:"",presupuesto_trabajo:"",presupuesto_valor:null};
    await actualizarDB(r.id,datos);
    actualizarLocal(r.id,datos);
    tk("↩ Vuelto a Pendiente");
  };

  const reenviarPresupuesto=(r)=>{
    const wa="56"+r.telefono.replace(/\D/g,"");
    const msg="Hola "+r.cliente+" \uD83D\uDC4B\n\nTe reenviamos el presupuesto:\n\n\uD83D\uDD0D Problema: "+r.presupuesto_problema+"\n\n\uD83D\uDD27 Trabajo: "+r.presupuesto_trabajo+"\n\n\uD83D\uDCB0 Valor: "+fmt(r.presupuesto_valor)+"\n\n\u00BFApruebas? \u26A1";
    window.open("https://wa.me/"+wa+"?text="+encodeURIComponent(msg),"_blank");
  };

  const cerrarSesion=async()=>{await sb.auth.signOut();};



  if(loading)return(
    <div style={{minHeight:"100vh",background:"#0d1117",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{color:"#4f8cff",fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>⏳ Cargando...</div>
    </div>
  );

  if(!session)return<Login onLogin={()=>{}}/>;

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=DM+Mono:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{touch-action:manipulation;-webkit-text-size-adjust:100%;}
        body{background:#0d1117}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px}
        input,textarea,select{font-size:16px !important;}
        input[type=number]::-webkit-inner-spin-button{opacity:0.4}
        textarea{box-sizing:border-box;width:100%}
      `}</style>
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1117 0%,#111827 50%,#0d1117 100%)",color:"#e8edf5",fontFamily:"'DM Sans',sans-serif",paddingBottom:90}}>

        <div style={{background:"rgba(13,17,23,0.93)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"14px 18px 10px",position:"sticky",top:0,zIndex:10}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <img src={LOGO_B64} alt="VoltLab" style={{height:58,width:"auto",flexShrink:0}}/>
              <div>
                <div style={{fontWeight:800,fontSize:16,letterSpacing:-0.3}}>VoltLab</div>
                <div style={{color:"#4f8cff",fontSize:10,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>SISTEMA DE INGRESOS</div>
              </div>
            </div>
            <button onClick={cerrarSesion} style={{background:"rgba(255,90,90,0.1)",border:"1px solid rgba(255,90,90,0.2)",borderRadius:8,padding:"6px 12px",color:"rgba(255,90,90,0.7)",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Salir</button>
          </div>
        </div>

        {toast&&<div style={{position:"fixed",bottom:88,left:"50%",transform:"translateX(-50%)",background:toast.ok?"rgba(34,208,122,0.95)":"rgba(70,70,80,0.95)",color:"#fff",padding:"11px 20px",borderRadius:12,fontWeight:700,fontSize:13,fontFamily:"'DM Sans',sans-serif",zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.4)",whiteSpace:"nowrap"}}>{toast.msg}</div>}

        {mPresupuesto&&<ModalPresupuesto r={mPresupuesto} onConfirmar={r=>{actualizarLocal(r.id,r);setMPresupuesto(null);tk("📋 Presupuesto enviado");setTab("presupuestos");}} onCerrar={()=>setMPresupuesto(null)}/>}
        {mCompletar&&<ModalCompletar r={mCompletar} onConfirmar={r=>{actualizarLocal(r.id,r);setMCompletar(null);tk("✅ Completado");}} onCerrar={()=>setMCompletar(null)}/>}
        {mEditar&&<ModalEditar r={mEditar} onGuardar={r=>{actualizarLocal(r.id,r);setMEditar(null);tk("💾 Actualizado");}} onCerrar={()=>setMEditar(null)}/>}
        {mAyudante&&<ModalAyudante r={mAyudante} onGuardar={r=>{actualizarLocal(r.id,r);setMAyudante(null);tk("👥 Ayudante guardado");}} onCerrar={()=>setMAyudante(null)}/>}
        {mGarantia&&<ModalGarantia r={mGarantia} onGuardar={r=>{actualizarLocal(r.id,r);setMGarantia(null);tk("🛡 Garantía guardada");}} onCerrar={()=>setMGarantia(null)}/>}
        {fichaRegistro&&<ModalFicha r={fichaRegistro} onCerrar={()=>setFichaRegistro(null)} onAyudante={()=>{setMAyudante(fichaRegistro);setFichaRegistro(null);}} onEditar={()=>{setMEditar(fichaRegistro);setFichaRegistro(null);}} onPresupuesto={()=>{setMPresupuesto(fichaRegistro);setFichaRegistro(null);}} onCompletar={()=>{setMCompletar(fichaRegistro);setFichaRegistro(null);}}/>}
        {fotoViewer&&<div onClick={()=>setFotoViewer(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}} >
          <img src={fotoViewer} alt="foto" style={{maxWidth:"100%",maxHeight:"85vh",objectFit:"contain"}}/>
          <button onClick={()=>setFotoViewer(null)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"10px 24px",color:"#fff",fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>✕ Cerrar</button>
        </div>}
        {mEditarPresupuesto!==null&&registros[mEditarPresupuesto]&&<ModalEditarPresupuesto r={registros[mEditarPresupuesto]} onGuardar={r=>{actualizarLocal(r.id,r);setMEditarPresupuesto(null);tk("💾 Presupuesto actualizado");}} onCerrar={()=>setMEditarPresupuesto(null)}/>}
        {mAyudanteComp!==null&&registros[mAyudanteComp]&&<ModalAyudante r={registros[mAyudanteComp]} onGuardar={r=>{actualizarLocal(r.id,r);setMAyudanteComp(null);tk("👥 Ayudante guardado");}} onCerrar={()=>setMAyudanteComp(null)}/>}
        {mEditarComp&&<ModalEditarCompletado r={mEditarComp} onGuardar={r=>{actualizarLocal(r.id,r);setMEditarComp(null);tk("💾 Completado actualizado");}} onCerrar={()=>setMEditarComp(null)}/>}

        {/* Nav bar - sticky */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px 8px",position:"sticky",top:64,zIndex:9,background:"rgba(13,17,23,0.95)",backdropFilter:"blur(8px)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
          <button onClick={()=>setMenuOpen(p=>!p)} style={{background:menuOpen?"rgba(79,140,255,0.2)":"rgba(255,255,255,0.06)",border:"1px solid "+(menuOpen?"rgba(79,140,255,0.4)":"rgba(255,255,255,0.1)"),borderRadius:10,padding:"8px 14px",color:menuOpen?"#4f8cff":"#c8d0e0",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6}}>
            ☰ Menú
          </button>
          <button onClick={()=>{setShowFormIngreso(true);setMenuOpen(false);}} style={{padding:"8px 18px",borderRadius:10,border:"none",background:tab==="nuevo"?"rgba(79,140,255,0.2)":"rgba(255,255,255,0.06)",color:tab==="nuevo"?"#4f8cff":"#c8d0e0",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>
            ➕ Nuevo Ingreso
          </button>
        </div>

        {/* Slide-in menu from left */}
        {menuOpen&&(
          <>
            <div onClick={()=>setMenuOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:50,backdropFilter:"blur(2px)"}}/>
            <div style={{position:"fixed",top:0,left:0,bottom:0,width:280,background:"#0d1117",borderRight:"1px solid rgba(255,255,255,0.1)",zIndex:51,display:"flex",flexDirection:"column",boxShadow:"4px 0 24px rgba(0,0,0,0.5)"}}>
              {/* Menu header */}
              <div style={{padding:"20px 18px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <img src={LOGO_B64} alt="VoltLab" style={{height:36,width:"auto"}}/>
                  <div style={{color:"#e8edf5",fontWeight:800,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>VoltLab</div>
                </div>
                <button onClick={()=>setMenuOpen(false)} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
              </div>
              {/* Menu items */}
              <div style={{flex:1,overflowY:"auto",padding:"8px 0"}}>
                {[
                  {k:"nuevo",l:"🏠 Inicio",badge:null},
                  {k:"pendientes",l:"⏳ Pendientes",badge:pendientes.length},
                  {k:"presupuestos",l:"📋 Presupuestos",badge:presupuestos.length},
                  {k:"completados",l:"✅ Completados",badge:completados.length},
                  {k:"finanzas",l:"📊 Finanzas",badge:null},
                  {k:"repuestos",l:"🔩 Repuestos",badge:null},
                  {k:"ayudante_pagos",l:"👥 Ayudante",badge:null},
                  {k:"catalogo",l:"📦 Catálogo",badge:null},
                  {k:"balance",l:"💼 Balance",badge:null},
                ].map((item,i)=>(
                  <button key={item.k} onClick={()=>{setTab(item.k);setMenuOpen(false);}} style={{
                    width:"100%",padding:"15px 20px",border:"none",
                    background:tab===item.k?"rgba(79,140,255,0.15)":"transparent",
                    color:tab===item.k?"#4f8cff":"#c8d0e0",
                    fontWeight:tab===item.k?700:500,fontSize:15,cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif",textAlign:"left",
                    display:"flex",justifyContent:"space-between",alignItems:"center",
                    borderLeft:tab===item.k?"3px solid #4f8cff":"3px solid transparent",
                    transition:"all 0.15s",
                  }}>
                    <span>{item.l}</span>
                    {item.badge>0&&<span style={{background:"rgba(79,140,255,0.2)",color:"#4f8cff",borderRadius:20,padding:"2px 10px",fontSize:12,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{item.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={{padding:"16px 14px"}}>
          {tab==="nuevo"&&<Dashboard registros={registros} onNuevoIngreso={()=>setShowFormIngreso(true)} onRegistroRapido={()=>setShowRegistroRapido(true)} completados={completadosTodas} pendientes={pendientesTodas} pendientesTodas={pendientesTodas} presupuestos={presupuestosTodas} onVerFicha={setFichaRegistro}/>}
          {showRegistroRapido&&<ModalRegistroRapido onGuardar={r=>{guardar(r);setShowRegistroRapido(false);}} onCerrar={()=>setShowRegistroRapido(false)}/>}
          {showFormIngreso&&<ModalFormIngreso onGuardar={r=>{guardar(r);setShowFormIngreso(false);setPrefillIngreso(null);}} onCerrar={()=>{setShowFormIngreso(false);setPrefillIngreso(null);}} prefill={prefillIngreso}/>}

          {tab==="pendientes"&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
            {pendientesTodas.length===0
              ?<div style={{textAlign:"center",padding:"50px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:40,marginBottom:10}}>🛵</div><div style={{fontSize:14}}>Sin equipos pendientes</div></div>
              :<>{pendientesTodas.map(r=>{const ri=registros.indexOf(r);return <CardPendiente key={ri} r={r} idx={ri} onEliminar={()=>eliminar(ri)} onPresupuesto={()=>setMPresupuesto(r)} onEditar={()=>setMEditar(r)} onAyudante={()=>setMAyudante(r)} onCompletar={()=>setMCompletar(r)} onFotoClick={setFotoViewer}/>;})}</>
            }
          </div>}

          {tab==="presupuestos"&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {presupuestosTodas.length===0
                ?<div style={{textAlign:"center",padding:"50px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:40,marginBottom:10}}>📋</div><div style={{fontSize:14}}>Sin presupuestos enviados</div></div>
                :<div style={{display:"flex",flexDirection:"column",gap:14}}>
                  {presupuestosTodas.map(r=>(
                    <CardPresupuesto key={r.id} r={r} onEliminar={()=>eliminar(r.id)} onEditar={()=>setMEditar(r)} onEditarPresupuesto={()=>setMEditarPresupuesto(registros.indexOf(r))} onAyudante={()=>setMAyudante(r)} onCompletar={()=>setMCompletar(r)} onReenviar={()=>reenviarPresupuesto(r)} onRevertir={()=>revertirPendiente(r)} onFotoClick={setFotoViewer}/>
                  ))}
                </div>
              }
            </div>
          )}

          {tab==="completados"&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <FiltroBar filtro={filtroComp} setFiltro={setFiltroComp}/>
              {completadosTodas.length===0
                ?<div style={{textAlign:"center",padding:"50px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:40,marginBottom:10}}>📭</div><div style={{fontSize:14}}>Sin trabajos completados aún</div></div>
                :completados.length===0
                  ?<div style={{textAlign:"center",padding:"30px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif",fontSize:13}}>Sin completados en este período</div>
                  :<div style={{display:"flex",flexDirection:"column",gap:14}}>
                    {completados.map(r=>(
                      <CardCompletado key={r.id} r={r} onEliminar={()=>eliminar(r.id)} onGarantia={()=>setMGarantia(r)} onAyudante={()=>setMAyudanteComp(registros.indexOf(r))} onFotoClick={setFotoViewer} onEditar={()=>setMEditarComp(r)} onRevertir={()=>revertirCompletado(r)} onRepetir={()=>repetirCliente(r)}/>
                    ))}
                  </div>
              }
            </div>
          )}

          {tab==="ayudante_pagos"&&<PestañaAyudantePagos/>}
          {tab==="finanzas"&&<PestañaFinanzas registros={registros} asistenciaData={asistenciaData}/>}
          {tab==="repuestos"&&<PestañaRepuestos/>}
          {tab==="balance"&&<PestañaBalance registros={registros} asistenciaData={asistenciaData}/>}
          {tab==="catalogo"&&<PestañaCatalogo/>}
        </div>
      </div>
    </>
  );
}
