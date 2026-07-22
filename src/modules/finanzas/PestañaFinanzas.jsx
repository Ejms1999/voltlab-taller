import { useState, useEffect } from "react";
import { sb } from "../../lib/supabaseClient.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt, enRango, calcularDiasTrabajados, diasHabilesEnPeriodo, getHorasDia } from "../../utils/fechas.js";
import FiltroBar from "../../components/ui/FiltroBar.jsx";
import { LBL, INP } from "../../components/ui/styles.js";
function PestañaFinanzas({ registros, asistenciaData }) {
  const [filtro, setFiltro] = useState("mes");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [gastosFijos, setGastosFijos] = useState([]);
  const [gastosVar, setGastosVar] = useState([]);
  const [editFijo, setEditFijo] = useState(null);

  const FILTROS = [{k:"hoy",l:"Hoy"},{k:"ayer",l:"Ayer"},{k:"semana",l:"Esta sem."},{k:"semana_pasada",l:"Sem. pasada"},{k:"mes",l:"Este mes"},{k:"mes_pasado",l:"Mes ant."},{k:"custom",l:"📅"}];

  useEffect(() => { cargarGastos(); }, []);

  const [pagosAyudante, setPagosAyudante] = useState([]);

  const cargarGastos = async () => {
    const { data } = await sb.from("gastos").select("*").order("fecha", { ascending: false });
    if(data) {
      setGastosFijos(data.filter(g=>g.tipo==="fijo"));
      setGastosVar(data.filter(g=>g.tipo==="variable"));
    }
    const { data: pa } = await sb.from("pagos_ayudante").select("*").order("fecha", { ascending: false });
    if(pa) setPagosAyudante(pa);
  };

  const agregarFijo = async () => {
    if(!nuevoFijo.descripcion||!nuevoFijo.monto)return;
    const { data: { user } } = await sb.auth.getUser();
    const { data } = await sb.from("gastos").insert([{ user_id:user.id, tipo:"fijo", descripcion:nuevoFijo.descripcion, monto:Number(nuevoFijo.monto) }]).select().single();
    if(data){ setGastosFijos(p=>[...p,data]); setNuevoFijo({descripcion:"",monto:""}); setShowAddFijo(false); }
  };

  const editarFijo = async (id, monto) => {
    await sb.from("gastos").update({monto:Number(monto)}).eq("id",id);
    setGastosFijos(p=>p.map(g=>g.id===id?{...g,monto:Number(monto)}:g));
    setEditFijo(null);
  };

  const eliminarGasto = async (id, tipo) => {
    if(!window.confirm("¿Eliminar este gasto?"))return;
    await sb.from("gastos").delete().eq("id",id);
    if(tipo==="fijo") setGastosFijos(p=>p.filter(g=>g.id!==id));
    else setGastosVar(p=>p.filter(g=>g.id!==id));
  };

  const agregarVar = async () => {
    if(!nuevoVar.descripcion||!nuevoVar.monto)return;
    const { data: { user } } = await sb.auth.getUser();
    const { data } = await sb.from("gastos").insert([{ user_id:user.id, tipo:"variable", descripcion:nuevoVar.descripcion, monto:Number(nuevoVar.monto), fecha:new Date(nuevoVar.fecha).toISOString() }]).select().single();
    if(data){ setGastosVar(p=>[data,...p]); setNuevoVar({descripcion:"",monto:"",fecha:new Date().toISOString().split("T")[0]}); setShowAddVar(false); }
  };

  // Cálculos
  const completados = registros.filter(r=>r.estado==="completado"&&enRango(r.fecha_completado,filtro,desde,hasta));
  const ingresos = completados.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const pagadoMauricio = completados.reduce((s,r)=>s+(Number(r.ayudante_monto)||0),0);
  const repuestos = completados.reduce((s,r)=>s+(Number(r.costo_repuestos)||0),0);
  const garantiasDevuelto = completados.filter(r=>r.garantia_activa&&r.garantia_tipo==="devolucion").reduce((s,r)=>s+(Number(r.garantia_monto)||0),0);
  const garantiaCobrado = completados.filter(r=>r.garantia_activa&&r.garantia_tipo==="cobro").reduce((s,r)=>s+(Number(r.garantia_monto)||0),0);
  
  const totalFijoMensual = gastosFijos.reduce((s,g)=>s+(Number(g.monto)||0),0);
  const totalFijoDiario = Math.round(totalFijoMensual/30);
  const totalFijoSemanal = Math.round(totalFijoMensual/4);
  const diasPeriodo = diasHabilesEnPeriodo(filtro,desde,hasta);
  const gastoFijoPeriodo = Math.round(totalFijoMensual/30*diasPeriodo);

  const gastosVarPeriodo = gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)).reduce((s,g)=>s+(Number(g.monto)||0),0);
  const totalGastos = gastoFijoPeriodo + gastosVarPeriodo + pagadoMauricio + repuestos + garantiasDevuelto - garantiaCobrado;
  const neto = ingresos - totalGastos;
  const ivaEstimado = Math.round(ingresos*0.19);
  
  // Ayudante: basado en pagos_ayudante en el período seleccionado
  const pagosAyPeriodo = pagosAyudante.filter(p=>enRango(p.fecha+"T12:00:00",filtro,desde,hasta));
  const totalPagadoAyudante = pagosAyPeriodo.reduce((s,p)=>s+(Number(p.monto)||0),0);
  const totalEfecAy = pagosAyPeriodo.reduce((s,p)=>s+(Number(p.monto_efectivo)||0),0);
  const totalTransAy = pagosAyPeriodo.reduce((s,p)=>s+(Number(p.monto_transferencia)||0),0);
  // Fechas en que se le pagó - buscar trabajos completados en ese lapso
  const fechasPago = pagosAyPeriodo.map(p=>p.fecha);
  const primerPago = fechasPago.length?fechasPago[fechasPago.length-1]:null;
  const ultimoPago = fechasPago.length?fechasPago[0]:null;
  // Ingresos generados en el lapso que trabajó el ayudante
  const compEnLapso = primerPago&&ultimoPago ? completados.filter(r=>{
    if(!r.fecha_completado) return false;
    const d = new Date(r.fecha_completado).toISOString().split("T")[0];
    return d >= primerPago && d <= ultimoPago;
  }) : completados;
  const ingresosLapso = compEnLapso.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const tuGananciaLapso = ingresosLapso - totalPagadoAyudante;
  const diasTrabajadosAy = new Set(fechasPago).size || 1;
  const promDiarioAy = Math.round(totalPagadoAyudante/diasTrabajadosAy);
  // Old vars for other sections
  const conAy = completados.filter(r=>r.ayudante==="con_ayudante");
  const sinAy = completados.filter(r=>r.ayudante!=="con_ayudante");
  const ingresosConAy = conAy.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const ingresosSinAy = sinAy.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);

  // Días con trabajos reales (no días del período)
  const diasConTrabajos = new Set(completados.map(r => r.fecha_completado ? new Date(r.fecha_completado).toDateString() : null).filter(Boolean)).size || 1;
  const promDiario = diasConTrabajos>0 ? Math.round(ingresos/diasConTrabajos) : 0;
  const promSemanal = promDiario*6;
  const diasRestantes = diasHabilesRestantesMes();
  const proyeccion = promDiario*diasRestantes + ingresos;
  const horasDia = 8.25; // promedio L-V/S
  const promXHora = Math.round(ingresos/(diasPeriodo*horasDia)||0);
  const trabajos = completados.length;
  const ticket = trabajos>0?Math.round(ingresos/trabajos):0;
  const ptoEquilibrio = totalFijoDiario>0?Math.ceil(totalFijoMensual/ticket||0):0;

  const fallaCount={};
  completados.forEach(r=>(r.tipos_falla||[]).forEach(id=>{fallaCount[id]=(fallaCount[id]||0)+1;}));
  const topFallas=Object.entries(fallaCount).sort((a,b)=>b[1]-a[1]).slice(0,5);

  const Card2=({label,val,color,sub})=>(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
      <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{color:color||"#e8edf5",fontWeight:800,fontSize:14,fontFamily:"'DM Mono',monospace"}}>{val}</div>
      {sub&&<div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{sub}</div>}
    </div>
  );
  const Sec=({title,color,children,action})=>(
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{color:color||"#7a8aaa",fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>{title}</div>
        {action}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* Filtros */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
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
      </div>

      {/* Ingresos */}
      <Sec title="💰 Ingresos del Taller" color="#22d07a">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="TRABAJOS" val={trabajos} color="#e8edf5"/>
          <Card2 label="INGRESO BRUTO" val={fmt(ingresos)} color="#22d07a"/>
          <Card2 label="PROMEDIO DIARIO" val={fmt(promDiario)} color="#e8edf5"/>
          <Card2 label="PROMEDIO SEMANAL" val={fmt(promSemanal)} color="#e8edf5"/>
          <Card2 label="PROM. POR HORA" val={fmt(promXHora)} color="#e8edf5" sub={"~"+horasDia+"h/día"}/>
          <Card2 label="TICKET PROMEDIO" val={fmt(ticket)} color="#e8edf5"/>
        </div>
      </Sec>

      {/* Neto real */}
      <Sec title="📊 Resultado Real" color="#ffb432">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="INGRESO BRUTO" val={fmt(ingresos)} color="#22d07a"/>
          <Card2 label="PAGADO MAURICIO" val={fmt(pagadoMauricio)} color="#4f8cff"/>
          <Card2 label="GASTOS FIJOS" val={fmt(gastoFijoPeriodo)} color="#ff8a8a" sub="proporcional período"/>
          <Card2 label="GASTOS VARIABLES" val={fmt(gastosVarPeriodo)} color="#ff8a8a"/>
          {repuestos>0&&<Card2 label="REPUESTOS" val={fmt(repuestos)} color="#ffb432"/>}
          {garantiasDevuelto>0&&<Card2 label="DEVUELTO GARANTÍA" val={fmt(garantiasDevuelto)} color="#ff5a5a"/>}
          <Card2 label="NETO REAL" val={fmt(neto)} color={neto>=0?"#22d07a":"#ff5a5a"}/>
          <Card2 label="IVA ESTIMADO (19%)" val={fmt(ivaEstimado)} color="#7a8aaa" sub="Solo referencia"/>
        </div>
      </Sec>

      {/* Proyección */}
      <Sec title="📈 Proyección del Mes" color="#4f8cff">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="DÍAS HÁB. RESTANTES" val={diasRestantes} color="#e8edf5"/>
          <Card2 label="PROYECCIÓN INGRESOS" val={fmt(proyeccion)} color="#22d07a" sub="incl. lo ya generado"/>
          <Card2 label="GASTO FIJO MENSUAL" val={fmt(totalFijoMensual)} color="#ff8a8a"/>
          <Card2 label="PUNTO DE EQUILIBRIO" val={ptoEquilibrio+" trabajos"} color="#ffb432" sub="para cubrir gastos fijos"/>
        </div>
      </Sec>

      {/* Ayudante - basado en pagos reales */}
      {(()=>{
        const pagosEnPeriodo = pagosAyudante.filter(p=>enRango(p.fecha+"T12:00:00",filtro,desde,hasta));
        const totalPagadoAy = pagosEnPeriodo.reduce((s,p)=>s+(Number(p.monto)||0),0);
        const fechas = pagosEnPeriodo.map(p=>p.fecha).sort();
        const primerPago = fechas[0];
        const ultimoPago = fechas[fechas.length-1];
        const trabLapso = primerPago&&ultimoPago
          ? completados.filter(r=>r.fecha_completado&&r.fecha_completado>=primerPago+"T00:00:00"&&r.fecha_completado<=ultimoPago+"T23:59:59")
          : [];
        const ingresosLapso = trabLapso.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
        const gananciaLapso = ingresosLapso - totalPagadoAy;
        return (
          <Sec title="👥 Ayudante" color="#4f8cff">
            {pagosEnPeriodo.length===0
              ?<div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif",textAlign:"center",padding:"8px 0"}}>Sin pagos al ayudante en este período</div>
              :<div style={{display:"flex",flexDirection:"column",gap:10}}>
                {primerPago&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",textAlign:"center",background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"6px 10px"}}>
                  Lapso: {new Date(primerPago+"T12:00:00").toLocaleDateString("es-CL")} → {new Date(ultimoPago+"T12:00:00").toLocaleDateString("es-CL")}
                </div>}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <Card2 label="DÍAS PAGADOS" val={pagosEnPeriodo.length} color="#4f8cff"/>
                  <Card2 label="PAGADO AL AYUDANTE" val={fmt(totalPagadoAy)} color="#4f8cff"/>
                  <Card2 label="INGRESOS EN ESE LAPSO" val={fmt(ingresosLapso)} color="#22d07a" sub={trabLapso.length+" trabajos"}/>
                  <Card2 label="TU GANANCIA" val={fmt(gananciaLapso)} color={gananciaLapso>=0?"#22d07a":"#ff5a5a"} sub="ingresos - pagado"/>
                </div>
              </div>
            }
          </Sec>
        );
      })()}

      {/* Fallas frecuentes */}
      {topFallas.length>0&&<Sec title="🔧 Fallas más Frecuentes" color="#ff8a8a">
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {topFallas.map(([id,count])=>{
            const tf=TIPOS_FALLA.find(t=>t.id===id);
            const pct=trabajos>0?Math.round((count/trabajos)*100):0;
            return tf?(<div key={id} style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:16}}>{tf.icon}</span>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{color:"#c8d0e0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{tf.label}</span>
                  <span style={{color:"#ff8a8a",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{count}x · {pct}%</span>
                </div>
                <div style={{background:"rgba(255,255,255,0.06)",borderRadius:4,height:5}}>
                  <div style={{background:"#ff6432",borderRadius:4,height:5,width:pct+"%"}}/>
                </div>
              </div>
            </div>):null;
          })}
        </div>
      </Sec>}

      {/* Gastos Fijos */}
      <Sec title="🏠 Gastos Fijos Mensuales" color="#ff8a8a">
        {gastosFijos.map(g=>(
          <div key={g.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
            <span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif",flex:1}}>{g.descripcion}</span>
            {editFijo===g.id
              ? <div style={{display:"flex",gap:6}}>
                  <input type="number" defaultValue={g.monto} id={"fijo-"+g.id} style={{width:100,...INP,padding:"6px 8px",fontSize:12}}/>
                  <button onClick={()=>editarFijo(g.id,document.getElementById("fijo-"+g.id).value)} style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:6,padding:"6px 10px",color:"#22d07a",fontSize:12,cursor:"pointer"}}>✓</button>
                </div>
              : <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{color:"#ff8a8a",fontWeight:700,fontSize:13,fontFamily:"'DM Mono',monospace"}}>{fmt(g.monto)}</span>
                  <button onClick={()=>setEditFijo(g.id)} style={{background:"transparent",border:"none",color:"#7a8aaa",cursor:"pointer",fontSize:13}}>✏️</button>
                  <button onClick={()=>eliminarGasto(g.id,"fijo")} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:13}}>🗑</button>
                </div>
            }
          </div>
        ))}
        <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:10,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:4}}>
          <Card2 label="TOTAL MENSUAL" val={fmt(totalFijoMensual)} color="#ff8a8a"/>
          <Card2 label="GASTO DIARIO" val={fmt(totalFijoDiario)} color="#ff8a8a"/>
          <Card2 label="GASTO SEMANAL" val={fmt(totalFijoSemanal)} color="#ff8a8a"/>
        </div>
      </Sec>

      {/* Gastos Variables */}
      <Sec title="📝 Gastos Variables" color="#ffb432">
        {gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)).map(g=>(
          <div key={g.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
            <div>
              <span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{g.descripcion}</span>
              <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace"}}>{new Date(g.fecha).toLocaleDateString("es-CL")}</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{color:"#ffb432",fontWeight:700,fontSize:13,fontFamily:"'DM Mono',monospace"}}>{fmt(g.monto)}</span>
              <button onClick={()=>eliminarGasto(g.id,"variable")} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:13}}>🗑</button>
            </div>
          </div>
        ))}
      </Sec>
    </div>
  );
}



export default PestañaFinanzas;
