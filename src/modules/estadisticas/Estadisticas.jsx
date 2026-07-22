import { useState } from "react";
import { TIPOS_FALLA } from "../../utils/constants.js";
import { fmt } from "../../utils/fechas.js";
import FiltroBar from "../../components/ui/FiltroBar.jsx";
function Estadisticas({completados,pendientes}) {
  const [filtro,setFiltro]=useState("mes");
  const [desde,setDesde]=useState("");
  const [hasta,setHasta]=useState("");
  const data=completados.filter(r=>enRango(r.fecha_completado,filtro,desde,hasta));
  const total=data.length;
  const ingresos=data.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const pagadoAy=data.reduce((s,r)=>s+(Number(r.ayudante_monto)||0),0);
  const neto=ingresos-pagadoAy;
  const garantias=data.filter(r=>r.garantia_activa);
  const totalDevuelto=garantias.filter(r=>r.garantia_tipo==="devolucion").reduce((s,r)=>s+(Number(r.garantia_monto)||0),0);
  const totalCobroGarantia=garantias.filter(r=>r.garantia_tipo==="cobro").reduce((s,r)=>s+(Number(r.garantia_monto)||0),0);
  const netoReal=neto-totalDevuelto+totalCobroGarantia;
  const ticket=total>0?Math.round(ingresos/total):0;
  const valores=data.map(r=>Number(r.valor_cobrado)||0).filter(v=>v>0);
  const masCaro=valores.length?Math.max(...valores):0;
  const masBarato=valores.length?Math.min(...valores):0;
  const conAy=data.filter(r=>r.ayudante==="con_ayudante");
  const sinAy=data.filter(r=>r.ayudante!=="con_ayudante");
  const ingresosConAy=conAy.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const ingresosSinAy=sinAy.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const pagadoAyConAy=conAy.reduce((s,r)=>s+(Number(r.ayudante_monto)||0),0);
  const netoConAy=ingresosConAy-pagadoAyConAy;
  const ticketConAy=conAy.length>0?Math.round(ingresosConAy/conAy.length):0;
  const ticketAy=conAy.length>0?Math.round(pagadoAyConAy/conAy.length):0;
  const tiempos=data.map(r=>r.fecha&&r.fecha_completado?Math.round(Math.abs((new Date(r.fecha_completado)-new Date(r.fecha))/86400000)):null).filter(d=>d!==null&&d>=0);
  const promDias=tiempos.length>0?Math.round(tiempos.reduce((a,b)=>a+b,0)/tiempos.length):null;
  const maxDias=tiempos.length?Math.max(...tiempos):null;
  const minDias=tiempos.length?Math.min(...tiempos):null;
  const fallaCount={};
  data.forEach(r=>(r.tipos_falla||[]).forEach(id=>{fallaCount[id]=(fallaCount[id]||0)+1;}));
  const topFallas=Object.entries(fallaCount).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const deudaAyudante=(pendientes||[]).filter(r=>r.ayudante==="con_ayudante"&&!r.ayudante_pagado&&r.ayudante_monto).reduce((s,r)=>s+(Number(r.ayudante_monto)||0),0);
  const pendAyudanteSinPagar=(pendientes||[]).filter(r=>r.ayudante==="con_ayudante"&&!r.ayudante_pagado).length;

  const Card2=({label,val,color,sub})=>(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
      <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{color:color||"#e8edf5",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{val}</div>
      {sub&&<div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{sub}</div>}
    </div>
  );
  const Sec=({title,color,children})=>(
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{color:color||"#7a8aaa",fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>{title}</div>
      {children}
    </div>
  );

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,border:"1px solid rgba(255,255,255,0.07)",gap:2}}>
          {[{k:"hoy",l:"Hoy"},{k:"semana",l:"7d"},{k:"mes",l:"Este mes"},{k:"todo",l:"Todo"},{k:"custom",l:"📅 Fechas"}].map(f=>(
            <button key={f.k} onClick={()=>setFiltro(f.k)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",background:filtro===f.k?"rgba(79,140,255,0.2)":"transparent",color:filtro===f.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",borderBottom:filtro===f.k?"2px solid #4f8cff":"2px solid transparent",transition:"all 0.2s"}}>{f.l}</button>
          ))}
        </div>
        {filtro==="custom"&&(
          <div style={{background:"rgba(79,140,255,0.07)",border:"1px solid rgba(79,140,255,0.2)",borderRadius:12,padding:"14px 16px",display:"flex",flexDirection:"column",gap:12}}>
            <div style={{color:"#4f8cff",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>RANGO PERSONALIZADO</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>DESDE</label>
                <input type="date" value={desde} onChange={e=>setDesde(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",colorScheme:"dark"}}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>HASTA</label>
                <input type="date" value={hasta} onChange={e=>setHasta(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",colorScheme:"dark"}}/>
              </div>
            </div>
            {(desde||hasta)&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{desde&&hasta?"Del "+new Date(desde+"T00:00:00").toLocaleDateString("es-CL")+" al "+new Date(hasta+"T00:00:00").toLocaleDateString("es-CL"):desde?"Desde "+new Date(desde+"T00:00:00").toLocaleDateString("es-CL"):"Hasta "+new Date(hasta+"T00:00:00").toLocaleDateString("es-CL")}</span>
              <button onClick={()=>{setDesde("");setHasta("");}} style={{background:"transparent",border:"1px solid rgba(255,90,90,0.3)",borderRadius:6,padding:"4px 10px",color:"rgba(255,90,90,0.7)",fontSize:11,cursor:"pointer"}}>Limpiar</button>
            </div>}
          </div>
        )}
      </div>

      {total===0?<div style={{textAlign:"center",padding:"40px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:40,marginBottom:10}}>📊</div><div>Sin datos en este período</div></div>:<>
      <Sec title="📊 Resumen General" color="#4f8cff">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="TRABAJOS" val={total} color="#e8edf5"/>
          <Card2 label="INGRESOS" val={fmt(ingresos)} color="#22d07a"/>
          <Card2 label="PAGADO AYUDANTE" val={fmt(pagadoAy)} color="#4f8cff"/>
          <Card2 label="NETO" val={fmt(netoReal)} color="#ffb432" sub={netoReal!==neto?"Incl. garantías":null}/>
          <Card2 label="TICKET PROMEDIO" val={fmt(ticket)} color="#e8edf5"/>
          <Card2 label="TRABAJO MÁS CARO" val={fmt(masCaro)} color="#22d07a" sub={"Más barato: "+fmt(masBarato)}/>
        </div>
      </Sec>
      <Sec title="👤 Sin Ayudante" color="#7a8aaa">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          <Card2 label="TRABAJOS" val={sinAy.length} color="#e8edf5"/>
          <Card2 label="TOTAL" val={fmt(ingresosSinAy)} color="#22d07a"/>
          <Card2 label="PROMEDIO" val={sinAy.length>0?fmt(Math.round(ingresosSinAy/sinAy.length)):"—"} color="#e8edf5"/>
        </div>
      </Sec>
      <Sec title="👥 Con Ayudante" color="#4f8cff">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="TRABAJOS" val={conAy.length} color="#e8edf5"/>
          <Card2 label="GENERADO" val={fmt(ingresosConAy)} color="#22d07a"/>
          <Card2 label="PAGADO AL AYUD." val={fmt(pagadoAyConAy)} color="#4f8cff"/>
          <Card2 label="TU NETO" val={fmt(netoConAy)} color="#ffb432"/>
          <Card2 label="PROM. X TRABAJO" val={fmt(ticketConAy)} color="#e8edf5"/>
          <Card2 label="PROM. PAGO AYUD." val={fmt(ticketAy)} color="#4f8cff"/>
        </div>
      </Sec>
      {topFallas.length>0&&<Sec title="🔧 Fallas más Frecuentes" color="#ff8a8a">
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {topFallas.map(([id,count])=>{const tf=TIPOS_FALLA.find(t=>t.id===id);const pct=Math.round((count/total)*100);return tf?(<div key={id} style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:16}}>{tf.icon}</span><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{color:"#c8d0e0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{tf.label}</span><span style={{color:"#ff8a8a",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{count}x · {pct}%</span></div><div style={{background:"rgba(255,255,255,0.06)",borderRadius:4,height:5}}><div style={{background:"#ff6432",borderRadius:4,height:5,width:pct+"%",transition:"width 0.5s"}}/></div></div></div>):null;})}
        </div>
      </Sec>}
      {tiempos.length>0&&<Sec title="⏱ Tiempos en Taller" color="#a78bfa">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          <Card2 label="PROM. DÍAS" val={promDias+"d"} color="#a78bfa"/>
          <Card2 label="MÁS RÁPIDO" val={minDias+"d"} color="#22d07a"/>
          <Card2 label="MÁS LENTO" val={maxDias+"d"} color="#ff8a8a"/>
        </div>
      </Sec>}
      {garantias.length>0&&<Sec title="🛡 Garantías" color="#a78bfa">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="GARANTÍAS" val={garantias.length} color="#a78bfa" sub={"de "+total+" trabajos"}/>
          <Card2 label="% GARANTÍAS" val={Math.round((garantias.length/total)*100)+"%"} color="#a78bfa"/>
          <Card2 label="DEVUELTO" val={fmt(totalDevuelto)} color="#ff5a5a"/>
          <Card2 label="COBRADO EXTRA" val={fmt(totalCobroGarantia)} color="#22d07a"/>
        </div>
        <Card2 label="NETO REAL (con garantías)" val={fmt(netoReal)} color="#ffb432"/>
      </Sec>}
      {deudaAyudante>0&&<Sec title="⚠ Deuda con Ayudante" color="#ffb432">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="TRABAJOS SIN PAGAR" val={pendAyudanteSinPagar} color="#ffb432"/>
          <Card2 label="MONTO ADEUDADO" val={fmt(deudaAyudante)} color="#ff5a5a"/>
        </div>
        <div style={{background:"rgba(255,180,50,0.08)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:8,padding:"10px 12px"}}>
          <div style={{color:"#ffb432",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>⚠ Tienes trabajos pendientes sin pagarle al ayudante.</div>
        </div>
      </Sec>}
      </>}
    </div>
  );
}

export default Estadisticas;
