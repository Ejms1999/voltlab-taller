import { useState } from "react";
import { fmt, enRango, calcularDiasTrabajados, diasHabilesEnPeriodo, getHorasDia } from "../../utils/fechas.js";
import FiltroBar from "../../components/ui/FiltroBar.jsx";
function PestañaBalance({ registros, asistenciaData }) {
  const [filtro, setFiltro] = useState("mes");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [gastosFijos, setGastosFijos] = useState([]);
  const [gastosVar, setGastosVar] = useState([]);
  const [showAddFijo, setShowAddFijo] = useState(false);
  const [showAddVar, setShowAddVar] = useState(false);

  const FILTROS = [{k:"hoy",l:"Hoy"},{k:"ayer",l:"Ayer"},{k:"semana",l:"Esta sem."},{k:"semana_pasada",l:"Sem. ant."},{k:"mes",l:"Este mes"},{k:"mes_pasado",l:"Mes ant."},{k:"custom",l:"📅"}];

  const [ventasRepuestos, setVentasRepuestos] = useState([]);
  useEffect(() => { cargarGastosBalance(); }, []);

  const [pagosAyBalance, setPagosAyBalance] = useState([]);
  const cargarGastosBalance = async () => {
    const { data } = await sb.from("gastos").select("*").order("fecha", { ascending: false });
    if(data) {
      setGastosFijos(data.filter(g=>g.tipo==="fijo"));
      setGastosVar(data.filter(g=>g.tipo==="variable"));
    }
    const { data: rep } = await sb.from("ventas_repuestos").select("*").order("fecha", { ascending: false });
    if(rep) setVentasRepuestos(rep);
    const { data: pa } = await sb.from("pagos_ayudante").select("*").order("fecha", { ascending: false });
    if(pa) setPagosAyBalance(pa);
  };

  const agregarFijo = async (desc, monto) => {
    if(!desc||!monto) return;
    const { data: { user } } = await sb.auth.getUser();
    const { data } = await sb.from("gastos").insert([{ user_id:user.id, tipo:"fijo", descripcion:desc, monto:Number(monto) }]).select().single();
    if(data){ setGastosFijos(p=>[...p,data]); setShowAddFijo(false); }
  };

  const editarFijo = async (id) => {
    if(!editFijoVal) return;
    await sb.from("gastos").update({monto:Number(editFijoVal)}).eq("id",id);
    setGastosFijos(p=>p.map(g=>g.id===id?{...g,monto:Number(editFijoVal)}:g));
    setEditFijo(null); setEditFijoVal("");
  };

  const eliminarGasto = async (id, tipo) => {
    if(!window.confirm("¿Eliminar este gasto?")) return;
    await sb.from("gastos").delete().eq("id",id);
    if(tipo==="fijo") setGastosFijos(p=>p.filter(g=>g.id!==id));
    else setGastosVar(p=>p.filter(g=>g.id!==id));
  };

  const agregarVar = async (desc, monto, fecha) => {
    if(!desc||!monto) return;
    const { data: { user } } = await sb.auth.getUser();
    const { data } = await sb.from("gastos").insert([{ user_id:user.id, tipo:"variable", descripcion:desc, monto:Number(monto), fecha:new Date(fecha+"T12:00:00").toISOString() }]).select().single();
    if(data){ setGastosVar(p=>[data,...p]); setShowAddVar(false); }
  };

  // ── Cálculos ──────────────────────────────────────────────────────────────
  const completados = registros.filter(r => r.estado==="completado" && enRango(r.fecha_completado, filtro, desde, hasta));
  // Mes pasado para comparativa
  const compMesPasado = registros.filter(r=>r.estado==="completado"&&enRango(r.fecha_completado,"mes_pasado"));
  const ingresosMesPasado = compMesPasado.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const ingresos = completados.reduce((s,r) => s+(Number(r.valor_cobrado)||0), 0);
  const ingresosRepuestos = ventasRepuestos.filter(r=>enRango(r.fecha,filtro,desde,hasta)).reduce((s,r)=>s+(Number(r.monto)||0),0);
  const ingresosTotal = ingresos + ingresosRepuestos;
  // Pagado al ayudante real (de pagos_ayudante tabla)
  const pagadoAyudante = pagosAyBalance.filter(p=>enRango(p.fecha+"T12:00:00",filtro,desde,hasta)).reduce((s,p)=>s+(Number(p.monto)||0),0);
  const pagadoMauricio = pagadoAyudante; // alias para compatibilidad
  const repuestos = completados.reduce((s,r) => s+(Number(r.costo_repuestos)||0), 0);
  const garantiaDev = completados.filter(r=>r.garantia_activa&&r.garantia_tipo==="devolucion").reduce((s,r)=>s+(Number(r.garantia_monto)||0),0);
  const garantiaCob = completados.filter(r=>r.garantia_activa&&r.garantia_tipo==="cobro").reduce((s,r)=>s+(Number(r.garantia_monto)||0),0);

  const totalFijoMensual = gastosFijos.reduce((s,g) => s+(Number(g.monto)||0), 0);
  const diasHabMes = diasHabilesTotalesMes(); // días L-S del mes actual sin domingos
  const totalFijoDiario = diasHabMes>0?Math.round(totalFijoMensual/diasHabMes):0;
  const totalFijoSemanal = totalFijoDiario*6;
  const diasPeriodo = diasHabilesEnPeriodo(filtro, desde, hasta);
  const gastoFijoPeriodo = Math.round(totalFijoDiario*diasPeriodo);
  const gastosVarPeriodo = gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)).reduce((s,g)=>s+(Number(g.monto)||0),0);

  const totalGastos = gastoFijoPeriodo + gastosVarPeriodo + pagadoMauricio + repuestos + garantiaDev - garantiaCob;
  const neto = ingresosTotal - totalGastos;
  const ivaEstimado = Math.round(ingresosTotal*0.19);
  const ivaReal = gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)&&g.descripcion.toLowerCase().includes("iva")).reduce((s,g)=>s+(Number(g.monto)||0),0);

  const diasTrabajados = calcularDiasTrabajados(registros, asistenciaData, filtro, desde, hasta);
  const promDiario = Math.round(ingresosTotal/diasTrabajados);
  const promSemanal = promDiario*6;
  const diasRestantes = diasHabilesRestantesMes();
  const diasTotalesMes = diasHabilesTotalesMes();
  const proyeccionMesCompleto = promDiario*diasTotalesMes; // si todo el mes fuera igual
  const proyeccion = promDiario*diasRestantes + ingresos;  // lo que falta + lo ya generado
  const trabajos = completados.length;
  const ticket = trabajos>0?Math.round(ingresosTotal/trabajos):0;
  const ptoEquilibrio = ticket>0?Math.ceil(totalFijoMensual/ticket):0;

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
        <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",textAlign:"center"}}>
          {diasTrabajados} día{diasTrabajados!==1?"s":""} trabajado{diasTrabajados!==1?"s":""} en el período
        </div>
      </div>

      {/* Resumen ingresos */}
      {filtro==="mes"&&ingresosMesPasado>0&&(
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>vs mes pasado: <strong style={{color:"#7a8aaa"}}>{fmt(ingresosMesPasado)}</strong></div>
          <div style={{color:ingresosTotal>=ingresosMesPasado?"#22d07a":"#ff5a5a",fontWeight:700,fontSize:14,fontFamily:"'DM Mono',monospace"}}>
            {ingresosTotal>=ingresosMesPasado?"▲":"▼"} {Math.abs(Math.round(((ingresosTotal-ingresosMesPasado)/ingresosMesPasado)*100))}%
          </div>
        </div>
      )}
      <Sec title="💰 Ingresos" color="#22d07a">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="TRABAJOS" val={fmt(ingresos)} color="#22d07a"/>
          <Card2 label="REPUESTOS" val={fmt(ingresosRepuestos)} color="#22d07a"/>
          <Card2 label="TOTAL INGRESOS" val={fmt(ingresosTotal)} color="#22d07a" sub="trabajos + repuestos"/>
          <Card2 label="TRABAJOS" val={trabajos} color="#e8edf5" sub={"ticket prom: "+fmt(ticket)}/>
          <Card2 label="PROM. DIARIO" val={fmt(promDiario)} color="#22d07a" sub={diasTrabajados+" días trabajados"}/>
          <Card2 label="PROM. SEMANAL" val={fmt(promSemanal)} color="#22d07a" sub="(6 días/semana)"/>
          <Card2 label="PROYEC. MES COMPLETO" val={fmt(proyeccionMesCompleto)} color="#4f8cff" sub={diasTotalesMes+"d hábiles sin dom."}/>
          <Card2 label="PROYEC. RESTO MES" val={fmt(proyeccion)} color="#22d07a" sub="lo ya generado + lo que falta"/>
        </div>
      </Sec>

      {/* Proyección */}
      <Sec title="📈 Proyección del Mes" color="#4f8cff">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="DÍAS HÁB. RESTANTES" val={diasRestantes} color="#e8edf5"/>
          <Card2 label="PROYECCIÓN TOTAL" val={fmt(proyeccion)} color="#4f8cff" sub="incl. lo ya generado"/>
          <Card2 label="GASTO FIJO MENSUAL" val={fmt(totalFijoMensual)} color="#ff8a8a"/>
          <Card2 label="PUNTO EQUILIBRIO" val={ptoEquilibrio+" trab."} color="#ffb432" sub="para cubrir gastos fijos"/>
        </div>
      </Sec>

      {/* Balance real */}
      <Sec title="📊 Balance Real" color="#ffb432">
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {[
            {label:"Ingresos trabajos", val:ingresos, color:"#22d07a", sign:"+"},
            ingresosRepuestos>0?{label:"Ingresos repuestos", val:ingresosRepuestos, color:"#22d07a", sign:"+"}:null,
            {label:"Pagado al Ayudante", val:pagadoMauricio, color:"#4f8cff", sign:"-"},
            {label:"Gastos fijos (proporcional)", val:gastoFijoPeriodo, color:"#ff8a8a", sign:"-"},
            {label:"Gastos variables", val:gastosVarPeriodo, color:"#ff8a8a", sign:"-"},
            repuestos>0?{label:"Repuestos", val:repuestos, color:"#ffb432", sign:"-"}:null,
            garantiaDev>0?{label:"Devoluciones garantía", val:garantiaDev, color:"#ff5a5a", sign:"-"}:null,
            garantiaCob>0?{label:"Cobro extra garantía", val:garantiaCob, color:"#22d07a", sign:"+"}:null,
          ].filter(Boolean).map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{item.sign === "-" ? "−" : "+"} {item.label}</span>
              <span style={{color:item.color,fontWeight:700,fontSize:13,fontFamily:"'DM Mono',monospace"}}>{fmt(item.val)}</span>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0 4px",borderTop:"2px solid rgba(255,255,255,0.12)"}}>
            <span style={{color:"#e8edf5",fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:800}}>NETO REAL</span>
            <span style={{color:neto>=0?"#22d07a":"#ff5a5a",fontWeight:800,fontSize:18,fontFamily:"'DM Mono',monospace"}}>{fmt(neto)}</span>
          </div>
        </div>
      </Sec>

      {/* IVA */}
      <Sec title="🧾 IVA" color="#7a8aaa">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="IVA ESTIMADO (19%)" val={fmt(ivaEstimado)} color="#7a8aaa" sub="Solo referencia"/>
          <Card2 label="IVA PAGADO REAL" val={ivaReal>0?fmt(ivaReal):"No ingresado"} color={ivaReal>0?"#ff8a8a":"#7a8aaa"} sub="Ingresado en gastos var."/>
        </div>
        <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>
          💡 Para registrar el IVA pagado, agrégalo en Gastos Variables con la descripción "IVA".
        </div>
      </Sec>

      {/* Gastos Fijos */}
      <Sec title="🏠 Gastos Fijos Mensuales" color="#ff8a8a" action={
        <button onClick={()=>setShowAddFijo(p=>!p)} style={{background:"rgba(79,140,255,0.15)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"5px 12px",color:"#4f8cff",fontSize:12,cursor:"pointer",fontWeight:700}}>➕</button>
      }>
        {showAddFijo&&<AddGastoFijo onGuardar={agregarFijo} onCancelar={()=>setShowAddFijo(false)}/>}
        {gastosFijos.length===0&&!showAddFijo&&(
          <div style={{color:"#7a8aaa",fontSize:12,textAlign:"center",padding:"8px 0"}}>Sin gastos fijos ingresados</div>
        )}
        {gastosFijos.map(g=>(
          <GastoFijoRow key={g.id} g={g} onEditar={editarFijo} onEliminar={eliminarGasto}/>
        ))}
        {gastosFijos.length>0&&(
          <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:10,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:4}}>
            <Card2 label="TOTAL/MES" val={fmt(totalFijoMensual)} color="#ff8a8a"/>
            <Card2 label="DIARIO" val={fmt(totalFijoDiario)} color="#ff8a8a"/>
            <Card2 label="SEMANAL" val={fmt(totalFijoSemanal)} color="#ff8a8a"/>
          </div>
        )}
      </Sec>

      {/* Gastos Variables */}
      <Sec title="📝 Gastos Variables" color="#ffb432" action={
        <button onClick={()=>setShowAddVar(p=>!p)} style={{background:"rgba(255,180,50,0.15)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:8,padding:"5px 12px",color:"#ffb432",fontSize:12,cursor:"pointer",fontWeight:700}}>➕</button>
      }>
        {showAddVar&&<AddGastoVar onGuardar={agregarVar} onCancelar={()=>setShowAddVar(false)}/>}
        {gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)).length===0&&!showAddVar&&(
          <div style={{color:"#7a8aaa",fontSize:12,textAlign:"center",padding:"8px 0"}}>Sin gastos variables en este período</div>
        )}
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

export default PestañaBalance;
