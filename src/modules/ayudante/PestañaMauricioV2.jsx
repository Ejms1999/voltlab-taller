import { useState } from "react";
import actualizarDB from "../../lib/actualizarDB.js";
import { fmt, enRango } from "../../utils/fechas.js";
import MauricioCard from "./MauricioCard.jsx";
function PestañaMauricioV2({ registros, asistenciaData }) {
  const [subTab, setSubTab] = useState("porPagar");
  const [filtro, setFiltro] = useState("mes");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const FILTROS = [{k:"hoy",l:"Hoy"},{k:"ayer",l:"Ayer"},{k:"semana",l:"Esta sem."},{k:"semana_pasada",l:"Sem. ant."},{k:"mes",l:"Este mes"},{k:"mes_pasado",l:"Mes ant."},{k:"custom",l:"📅"}];

  // Todos los registros con Mauricio
  const todosConMauri = registros.filter(r => r.ayudante === "con_ayudante");
  const porPagar = todosConMauri.filter(r => !r.ayudante_pagado);
  const pagados = todosConMauri.filter(r => r.ayudante_pagado);

  // Resumen en período
  const enPeriodo = todosConMauri.filter(r => enRango(r.fecha_completado||r.fecha_presupuesto||r.fecha, filtro, desde, hasta));
  // Total pagado = todos los registros donde se marcó pagado (sin importar estado)
  const pagadosEnPeriodo = enPeriodo.filter(r=>r.ayudante_pagado);
  const totalPagado = pagadosEnPeriodo.reduce((s,r)=>s+(Number(r.ayudante_monto)||0),0);
  const completadosM = enPeriodo.filter(r=>r.estado==="completado");
  const trabajos = enPeriodo.length; // todos los trabajos en el período
  const promXTrabajo = trabajos>0?Math.round(totalPagado/trabajos):0;

  // Días trabajados
  // Días trabajados basado en todos los registros con Mauricio
  const diasTrabajados = calcularDiasTrabajados(registros.filter(r=>r.ayudante==="con_ayudante"), asistenciaData, filtro, desde, hasta);
  const promDiario = Math.round(totalPagado/diasTrabajados);
  const diasRestantes = diasHabilesRestantesMes();
  const proyeccion = promDiario*diasRestantes + totalPagado;

  // Por día — agrupar completados por fecha
  const porDia = {};
  // Por día usa todos los registros con Mauricio, agrupados por la fecha más relevante
  enPeriodo.forEach(r => {
    const fechaRef = r.fecha_completado || r.fecha_presupuesto || r.fecha;
    if(!fechaRef) return;
    const dia = new Date(fechaRef).toLocaleDateString("es-CL");
    if(!porDia[dia]) porDia[dia] = { fecha: fechaRef, trabajos: 0, pagado: 0 };
    porDia[dia].trabajos++;
    if(r.ayudante_pagado) porDia[dia].pagado += Number(r.ayudante_monto)||0;
  });
  const listaDias = Object.values(porDia).sort((a,b)=>new Date(b.fecha)-new Date(a.fecha));

  const Card2=({label,val,color,sub})=>(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
      <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{color:color||"#e8edf5",fontWeight:800,fontSize:14,fontFamily:"'DM Mono',monospace"}}>{val}</div>
      {sub&&<div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{sub}</div>}
    </div>
  );
  const Sec=({title,color,children})=>(
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{color:color||"#7a8aaa",fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {/* Sub-tabs */}
      <div style={{display:"flex",background:"rgba(255,255,255,0.03)",borderRadius:10,padding:3,border:"1px solid rgba(255,255,255,0.06)",gap:2}}>
        {[
          {k:"porPagar",l:"⚠ Por pagar ("+porPagar.length+")"},
          {k:"pagados",l:"✅ Pagado ("+pagados.length+")"},
          {k:"resumen",l:"📊 Resumen"},
          {k:"porDia",l:"📅 Por día"},
        ].map(s=>(
          <button key={s.k} onClick={()=>setSubTab(s.k)} style={{flex:1,padding:"8px 3px",borderRadius:8,border:"none",background:subTab===s.k?"rgba(79,140,255,0.18)":"transparent",color:subTab===s.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{s.l}</button>
        ))}
      </div>

      {/* Por pagar */}
      {subTab==="porPagar"&&(
        porPagar.length===0
          ?<div style={{textAlign:"center",padding:"40px 20px",color:"#7a8aaa"}}><div style={{fontSize:36,marginBottom:8}}>✅</div><div>Todo pagado</div></div>
          :<div style={{display:"flex",flexDirection:"column",gap:10}}>
            {porPagar.map(r=><MauricioCard key={r.id} r={r} onActualizar={async(datos)=>{await actualizarDB(r.id,datos);}}/>)}
          </div>
      )}

      {/* Pagados */}
      {subTab==="pagados"&&(
        pagados.length===0
          ?<div style={{textAlign:"center",padding:"40px 20px",color:"#7a8aaa"}}><div style={{fontSize:36,marginBottom:8}}>📭</div><div>Sin pagos</div></div>
          :<div style={{display:"flex",flexDirection:"column",gap:10}}>
            {pagados.map(r=>(
              <div key={r.id} style={{background:"rgba(34,208,122,0.04)",border:"1px solid rgba(34,208,122,0.15)",borderRadius:12,padding:14,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                <div>
                  <div style={{color:"#e8edf5",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
                  <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace"}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{new Date(r.fecha_completado||r.fecha).toLocaleDateString("es-CL")}</div>
                  <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{r.estado==="completado"?"✅":"⏳"} {r.estado}</div>
                  {r.ayudante_trabajo&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>{r.ayudante_trabajo}</div>}
                </div>
                <div style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:8,padding:"6px 12px",textAlign:"center"}}>
                  <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace"}}>PAGADO</div>
                  <div style={{color:"#22d07a",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{fmt(r.ayudante_monto)}</div>
                </div>
              </div>
            ))}
          </div>
      )}

      {/* Resumen */}
      {subTab==="resumen"&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,border:"1px solid rgba(255,255,255,0.07)",gap:2}}>
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
          <Sec title="👥 Mauricio" color="#4f8cff">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <Card2 label="TRABAJOS" val={trabajos} color="#e8edf5"/>
              <Card2 label="DÍAS TRABAJADOS" val={diasTrabajados} color="#e8edf5"/>
              <Card2 label="TOTAL PAGADO" val={fmt(totalPagado)} color="#4f8cff"/>
              <Card2 label="PROM. X TRABAJO" val={fmt(promXTrabajo)} color="#4f8cff"/>
            </div>
          </Sec>
          <Sec title="📈 Proyección" color="#22d07a">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <Card2 label="PROM. DIARIO" val={fmt(promDiario)} color="#22d07a"/>
              <Card2 label="DÍAS HÁB. RESTANTES" val={diasRestantes} color="#e8edf5"/>
              <Card2 label="PROYECCIÓN MES" val={fmt(proyeccion)} color="#22d07a" sub="incl. lo ya generado"/>
            </div>
          </Sec>
        </div>
      )}

      {/* Por día */}
      {subTab==="porDia"&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,border:"1px solid rgba(255,255,255,0.07)",gap:2}}>
            {FILTROS.map(f=>(
              <button key={f.k} onClick={()=>setFiltro(f.k)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",background:filtro===f.k?"rgba(79,140,255,0.2)":"transparent",color:filtro===f.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",borderBottom:filtro===f.k?"2px solid #4f8cff":"2px solid transparent"}}>{f.l}</button>
            ))}
          </div>
          {listaDias.length===0
            ?<div style={{textAlign:"center",padding:"40px 20px",color:"#7a8aaa"}}><div style={{fontSize:36,marginBottom:8}}>📅</div><div>Sin trabajos en este período</div></div>
            :<div style={{display:"flex",flexDirection:"column",gap:8}}>
              {listaDias.map((d,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:12,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{color:"#e8edf5",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>{new Date(d.fecha).toLocaleDateString("es-CL",{weekday:"long",day:"numeric",month:"short"})}</div>
                    <div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{d.trabajos} trabajo{d.trabajos!==1?"s":""}</div>
                  </div>
                  <div style={{background:"rgba(79,140,255,0.15)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"6px 12px",textAlign:"center"}}>
                    <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace"}}>PAGADO</div>
                    <div style={{color:"#4f8cff",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{fmt(d.pagado)}</div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default PestañaMauricioV2;
