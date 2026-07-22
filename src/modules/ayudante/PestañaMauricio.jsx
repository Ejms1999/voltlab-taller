import { useState } from "react";
import { sb } from "../../lib/supabaseClient.js";
import actualizarDB from "../../lib/actualizarDB.js";
import { fmt, enRango, calcularDiasTrabajados, getLunes, getSabado } from "../../utils/fechas.js";
import MauricioCard from "./MauricioCard.jsx";
function PestañaMauricio({ registros, asistenciaData }) {
  const [subTab, setSubTab] = useState("porPagar");
  const [filtro, setFiltro] = useState("mes");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [loadingAsist, setLoadingAsist] = useState(false);
  const [horaManual, setHoraManual] = useState({ persona: null, tipo: null, hora: "" });

  const FILTROS = [{k:"hoy",l:"Hoy"},{k:"ayer",l:"Ayer"},{k:"semana",l:"Esta sem."},{k:"semana_pasada",l:"Sem. pasada"},{k:"mes",l:"Este mes"},{k:"mes_pasado",l:"Mes ant."},{k:"custom",l:"📅"}];

  // asistencia loaded from App

  const marcarAsistencia = async (persona, tipo, horaOverride) => {
    setLoadingAsist(true);
    const { data: { user } } = await sb.auth.getUser();
    const hora = horaOverride ? new Date(horaOverride).toISOString() : new Date().toISOString();
    const { data } = await sb.from("asistencia").insert([{
      user_id: user.id, persona, tipo, hora,
      hora_manual: !!horaOverride, fecha: new Date().toISOString().split("T")[0]
    }]).select().single();
    if(data) setAsistencia(prev => [data, ...prev]);
    setHoraManual({ persona: null, tipo: null, hora: "" });
    setLoadingAsist(false);
  };

  const conMauricio = registros.filter(r => r.ayudante === "con_ayudante");
  const enRangoData = conMauricio.filter(r => enRango(r.fecha_completado || r.fecha, filtro, desde, hasta));
  const completadosConAy = registros.filter(r => r.estado === "completado" && r.ayudante === "con_ayudante");
  const porPagar = completadosConAy.filter(r => !r.ayudante_pagado);
  const pagados = completadosConAy.filter(r => r.ayudante_pagado);

  const totalPagado = enRangoData.reduce((s,r) => s + (Number(r.ayudante_monto)||0), 0);
  const totalGenerado = enRangoData.filter(r=>r.estado==="completado").reduce((s,r) => s + (Number(r.valor_cobrado)||0), 0);
  const trabajos = enRangoData.filter(r=>r.estado==="completado").length;
  const promXTrabajo = trabajos > 0 ? Math.round(totalPagado / trabajos) : 0;

  // Horas trabajadas Mauricio en período
  const asistMauricio = (asistenciaData||[]).filter(a => a.persona === "mauricio" && enRango(a.hora, filtro, desde, hasta));
  let horasTrabajadas = 0;
  const dias = {};
  asistMauricio.forEach(a => {
    const fecha = new Date(a.hora).toDateString();
    if(!dias[fecha]) dias[fecha] = {};
    if(a.tipo === "entrada") dias[fecha].entrada = new Date(a.hora);
    if(a.tipo === "salida") dias[fecha].salida = new Date(a.hora);
  });
  Object.values(dias).forEach(d => {
    if(d.entrada && d.salida) {
      horasTrabajadas += (d.salida - d.entrada) / 3600000;
    }
  });
  const promXHora = horasTrabajadas > 0 ? Math.round(totalPagado / horasTrabajadas) : 0;

  const diasHabiles = diasHabilesRestantesMes();
  const diasConTrabajosM = calcularDiasTrabajados(
    registros.filter(r=>r.ayudante==="con_ayudante"),
    asistenciaData, filtro, desde, hasta
  );
  const promDiario = diasConTrabajosM > 0 ? Math.round(totalPagado / diasConTrabajosM) : 0;
  const promSemanal = promDiario * 6;
  const proyeccion = promDiario * diasHabiles + totalPagado;
  const Card2 = ({label,val,color,sub}) => (
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
      <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{color:color||"#e8edf5",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{val}</div>
      {sub&&<div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{sub}</div>}
    </div>
  );

  const Sec = ({title,color,children}) => (
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{color:color||"#7a8aaa",fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {/* Filtros */}
      <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,border:"1px solid rgba(255,255,255,0.07)",gap:2,flexWrap:"wrap"}}>
        {FILTROS.map(f=>(
          <button key={f.k} onClick={()=>setFiltro(f.k)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",background:filtro===f.k?"rgba(79,140,255,0.2)":"transparent",color:filtro===f.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",borderBottom:filtro===f.k?"2px solid #4f8cff":"2px solid transparent"}}>{f.l}</button>
        ))}
      </div>
      {filtro==="custom"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>DESDE</label>
            <input type="date" value={desde} onChange={e=>setDesde(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",width:"100%",colorScheme:"dark"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>HASTA</label>
            <input type="date" value={hasta} onChange={e=>setHasta(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",width:"100%",colorScheme:"dark"}}/>
          </div>
        </div>
      )}

      {/* Resumen Mauricio */}
      <Sec title="👥 Mauricio" color="#4f8cff">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="TRABAJOS" val={trabajos} color="#e8edf5"/>
          <Card2 label="TOTAL PAGADO" val={fmt(totalPagado)} color="#4f8cff"/>
          <Card2 label="PROM. X TRABAJO" val={fmt(promXTrabajo)} color="#e8edf5"/>
          <Card2 label="PROM. X HORA" val={horasTrabajadas>0?fmt(promXHora):"—"} color="#4f8cff" sub={horasTrabajadas>0?Math.round(horasTrabajadas*10)/10+"h trabaj.":null}/>
          <Card2 label="PROM. DIARIO" val={fmt(promDiario)} color="#22d07a" sub={"Base: "+diasConTrabajosM+" días c/trabajo"}/>
          <Card2 label="PROM. SEMANAL" val={fmt(promSemanal)} color="#22d07a"/>
          <Card2 label="DÍAS HÁB. REST." val={diasHabiles} color="#e8edf5"/>
          <Card2 label="PROYECCIÓN MES" val={fmt(proyeccion)} color="#22d07a" sub="incl. lo ya pagado"/>
        </div>
      </Sec>

      {/* Por pagar */}
      {porPagar.length>0&&<Sec title={"⚠ Por pagar ("+porPagar.length+")"} color="#ffb432">
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {porPagar.map(r=>(
            <MauricioCard key={r.id} r={r} onActualizar={async(datos)=>{await actualizarDB(r.id,datos);}}/>
          ))}
        </div>
      </Sec>}

      {/* Pagados */}
      {pagados.length>0&&<Sec title={"✅ Pagados ("+pagados.length+")"} color="#22d07a">
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {pagados.map(r=>(
            <div key={r.id} style={{background:"rgba(34,208,122,0.04)",border:"1px solid rgba(34,208,122,0.15)",borderRadius:10,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
              <div>
                <div style={{color:"#e8edf5",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
                <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace"}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{r.fecha_completado?new Date(r.fecha_completado).toLocaleDateString("es-CL"):""}</div>
                {r.ayudante_trabajo&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{r.ayudante_trabajo}</div>}
              </div>
              <div style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:8,padding:"6px 12px",textAlign:"center"}}>
                <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace"}}>PAGADO</div>
                <div style={{color:"#22d07a",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{fmt(r.ayudante_monto)}</div>
              </div>
            </div>
          ))}
        </div>
      </Sec>}

    </div>
  );
}


export default PestañaMauricio;
