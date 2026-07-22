import { fmt, diasEnTaller, urgenciaBadge } from "../../utils/fechas.js";
import { TIPOS_FALLA } from "../../utils/constants.js";
function Dashboard({ registros, onNuevoIngreso, onRegistroRapido, completados, pendientes, pendientesTodas, presupuestos, onVerFicha }) {
  const top3 = [...(pendientesTodas||pendientes)].sort((a,b)=>new Date(a.fecha)-new Date(b.fecha)).slice(0,3);
  
  // Mes actual stats
  const hoy = new Date();
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const compMes = completados.filter(r => r.fecha_completado && new Date(r.fecha_completado) >= inicioMes);
  const ingresosMes = compMes.reduce((s,r) => s+(Number(r.valor_cobrado)||0), 0);
  
  // Mes pasado
  const inicioPasado = new Date(hoy.getFullYear(), hoy.getMonth()-1, 1);
  const finPasado = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
  const compPasado = completados.filter(r => r.fecha_completado && new Date(r.fecha_completado) >= inicioPasado && new Date(r.fecha_completado) <= finPasado);
  const ingresosPasado = compPasado.reduce((s,r) => s+(Number(r.valor_cobrado)||0), 0);
  const diffPct = ingresosPasado > 0 ? Math.round(((ingresosMes - ingresosPasado) / ingresosPasado) * 100) : null;
  // Promedio diario comparativo
  const diasConTrabMes = new Set(compMes.map(r=>new Date(r.fecha_completado).toDateString())).size || 1;
  const diasConTrabPasado = new Set(compPasado.map(r=>new Date(r.fecha_completado).toDateString())).size || 1;
  const promDiaMes = Math.round(ingresosMes / diasConTrabMes);
  const promDiaPasado = Math.round(ingresosPasado / diasConTrabPasado);
  const diffPromPct = promDiaPasado > 0 ? Math.round(((promDiaMes - promDiaPasado) / promDiaPasado) * 100) : null;

  // Meta mensual - hardcoded, podría ser configurable
  const [meta, setMeta] = useState(() => {
    try { return parseInt(localStorage.getItem("voltlab_meta_mensual")||"0"); } catch(e){ return 0; }
  });
  const [editMeta, setEditMeta] = useState(false);
  const [verDinero, setVerDinero] = useState(false);
  const [mostrarDinero, setMostrarDinero] = useState(false);
  const ocultarVal = (val) => mostrarDinero ? val : '••••••';
  const metaRef = useRef();
  const pctMeta = meta > 0 ? Math.min(100, Math.round((ingresosMes/meta)*100)) : 0;

  const urgentes = (pendientesTodas||pendientes).filter(r => diasEnTaller(r.fecha) >= 4);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      
      {/* Botones principales */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <button onClick={onNuevoIngreso} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:14,padding:"16px",color:"#fff",fontSize:17,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",boxShadow:"0 4px 24px rgba(79,140,255,0.35)",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          <span style={{fontSize:22}}>➕</span> Registrar Nuevo Equipo
        </button>
        <button onClick={onRegistroRapido} style={{background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:14,padding:"14px",color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          <span style={{fontSize:20}}>⚡</span> Registro Rápido de Trabajo
        </button>
      </div>

      {/* Resumen rápido */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        {[
          {label:"Pendientes",val:pendientes.length,color:"#ffb432",bg:"rgba(255,180,50,0.1)",border:"rgba(255,180,50,0.25)"},
          {label:"Presupuestos",val:presupuestos.length,color:"#4f8cff",bg:"rgba(79,140,255,0.1)",border:"rgba(79,140,255,0.25)"},
          {label:"Completados mes",val:compMes.length,color:"#22d07a",bg:"rgba(34,208,122,0.1)",border:"rgba(34,208,122,0.25)"},
        ].map(it=>(
          <div key={it.label} style={{background:it.bg,border:"1px solid "+it.border,borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
            <div style={{color:it.color,fontWeight:800,fontSize:22,fontFamily:"'DM Mono',monospace"}}>{it.val}</div>
            <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{it.label}</div>
          </div>
        ))}
      </div>

      {/* Meta mensual */}
      <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>INGRESOS ESTE MES</div>
              <button onClick={()=>setMostrarDinero(p=>!p)} style={{background:"none",border:"none",color:"#7a8aaa",cursor:"pointer",fontSize:14,padding:0}}>{mostrarDinero?"👁":"🙈"}</button>
            </div>
            <div style={{color:"#22d07a",fontWeight:800,fontSize:20,fontFamily:"'DM Mono',monospace",marginTop:2}}>{ocultarVal(fmt(ingresosMes))}</div>
            {diffPromPct!==null&&<div style={{display:"flex",flexDirection:"column",gap:3,marginTop:4}}>
              <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>
                Prom. diario este mes: <strong style={{color:"#22d07a"}}>{ocultarVal(fmt(promDiaMes))}</strong>
              </div>
              <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>
                Prom. diario mes pasado: <strong style={{color:"#7a8aaa"}}>{ocultarVal(fmt(promDiaPasado))}</strong> · total {ocultarVal(fmt(ingresosPasado))}
              </div>
              <div style={{color:diffPromPct>=0?"#22d07a":"#ff5a5a",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>
                {diffPromPct>=0?"▲":"▼"} {Math.abs(diffPromPct)}% en promedio diario
              </div>
            </div>}
          </div>
          <button onClick={()=>setEditMeta(p=>!p)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"6px 12px",color:"#7a8aaa",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            {meta>0?`Meta: ${fmt(meta)}`:"+ Agregar meta"}
          </button>
        </div>
        {editMeta&&(
          <div style={{display:"flex",gap:8}}>
            <input ref={metaRef} type="number" defaultValue={meta||""} placeholder="Meta mensual en $" style={{flex:1,...INP,padding:"9px 12px",fontSize:14}}/>
            <button onClick={()=>{const v=parseInt(metaRef.current?.value||"0");setMeta(v);try{localStorage.setItem("voltlab_meta_mensual",String(v));}catch(e){}setEditMeta(false);}} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:8,padding:"9px 16px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>💾</button>
          </div>
        )}
        {meta>0&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>{pctMeta}% de la meta</span>
              <span style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>Faltan {fmt(Math.max(0,meta-ingresosMes))}</span>
            </div>
            <div style={{background:"rgba(255,255,255,0.08)",borderRadius:8,height:10,overflow:"hidden"}}>
              <div style={{background:pctMeta>=100?"#22d07a":"linear-gradient(90deg,#4f8cff,#22d07a)",height:"100%",width:pctMeta+"%",borderRadius:8,transition:"width 0.5s"}}/>
            </div>
          </div>
        )}
      </div>

      {/* Urgentes */}
      {urgentes.length>0&&(
        <div style={{background:"rgba(255,90,90,0.06)",border:"1px solid rgba(255,90,90,0.2)",borderRadius:14,padding:14}}>
          <div style={{color:"#ff5a5a",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1,marginBottom:10}}>🔴 REQUIEREN ATENCIÓN ({urgentes.length})</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {urgentes.map(r=>{
              const dias = diasEnTaller(r.fecha);
              const u = urgenciaBadge(dias);
              return (
                <div key={r.id} onClick={()=>onVerFicha&&onVerFicha(r)} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                  <div>
                    <div style={{color:"#e8edf5",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
                    <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{(r.tipos_falla||[]).slice(0,2).map(id=>{const tf=TIPOS_FALLA.find(t=>t.id===id);return tf?tf.icon+" "+tf.label:"";}).join(", ")}</div>
                  </div>
                  <div style={{background:u.bg,border:"1px solid "+u.border,borderRadius:8,padding:"5px 10px",textAlign:"center"}}>
                    <div style={{color:u.color,fontSize:12,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{dias}d</div>
                    <div style={{color:u.color,fontSize:9,fontFamily:"'DM Sans',sans-serif"}}>{dias>=4?"URGENTE":"REVISAR"}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Próximos 3 en cola */}
      {top3.length>0&&(
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:14}}>
          <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1,marginBottom:10}}>📋 COLA DE TRABAJO (primeros 3)</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {top3.map((r,i)=>{
              const dias = diasEnTaller(r.fecha);
              const u = urgenciaBadge(dias);
              return (
                <div key={r.id} onClick={()=>onVerFicha&&onVerFicha(r)} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(79,140,255,0.2)",border:"1px solid rgba(79,140,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",color:"#4f8cff",fontWeight:800,fontSize:13,fontFamily:"'DM Mono',monospace",flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1}}>
                    <div style={{color:"#e8edf5",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
                    <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:1}}>{new Date(r.fecha).toLocaleDateString("es-CL")} · {(r.tipos_falla||[]).slice(0,1).map(id=>{const tf=TIPOS_FALLA.find(t=>t.id===id);return tf?tf.label:"";}).join("")}</div>
                  </div>
                  <div style={{background:u.bg,border:"1px solid "+u.border,borderRadius:8,padding:"4px 8px",textAlign:"center",flexShrink:0}}>
                    <div style={{color:u.color,fontSize:13,fontWeight:800,fontFamily:"'DM Mono',monospace"}}>{dias}d</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {pendientes.length===0&&presupuestos.length===0&&(
        <div style={{textAlign:"center",padding:"40px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}>
          <div style={{fontSize:44,marginBottom:10}}>✅</div>
          <div style={{fontSize:15,fontWeight:600}}>Todo al día</div>
          <div style={{fontSize:12,marginTop:4}}>Sin equipos pendientes</div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
