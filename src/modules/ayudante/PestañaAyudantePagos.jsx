import { useState, useEffect } from "react";
import { sb } from "../../lib/supabaseClient.js";
import { fmt, enRango } from "../../utils/fechas.js";
import { LBL, INP } from "../../components/ui/styles.js";
function PestañaAyudantePagos() {
  const [pagos, setPagos] = useState([]);
  const [filtro, setFiltro] = useState("mes");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formaPago, setFormaPago] = useState("efectivo");
  const montoRef = useRef();
  const montoEfecRef = useRef();
  const montoTransRef = useRef();
  const notaRef = useRef();
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const { data } = await sb.from("pagos_ayudante").select("*").order("fecha", { ascending: false });
    if(data) setPagos(data);
  };

  const agregar = async () => {
    let monto = 0, monto_efectivo = null, monto_transferencia = null;
    if(formaPago === "ambos") {
      monto_efectivo = Number(montoEfecRef.current?.value||0);
      monto_transferencia = Number(montoTransRef.current?.value||0);
      monto = monto_efectivo + monto_transferencia;
    } else {
      monto = Number(montoRef.current?.value||0);
      if(formaPago === "efectivo") monto_efectivo = monto;
      else monto_transferencia = monto;
    }
    if(!monto) { alert("Ingresa un monto"); return; }
    setLoading(true);
    const { data: { user } } = await sb.auth.getUser();
    const { data } = await sb.from("pagos_ayudante").insert([{
      user_id: user.id, monto, monto_efectivo, monto_transferencia,
      forma_pago: formaPago, fecha: fechaPago,
      nota: notaRef.current?.value||null
    }]).select().single();
    if(data) { setPagos(p=>[data,...p]); setShowAdd(false); setFormaPago("efectivo"); setFechaPago(new Date().toISOString().split("T")[0]); }
    setLoading(false);
  };

  const eliminar = async (id) => {
    if(!window.confirm("¿Eliminar este pago?")) return;
    await sb.from("pagos_ayudante").delete().eq("id",id);
    setPagos(p=>p.filter(x=>x.id!==id));
  };

  const enPeriodo = pagos.filter(p => enRango(p.fecha+"T12:00:00", filtro));
  const totalPeriodo = enPeriodo.reduce((s,p)=>s+(Number(p.monto)||0),0);
  const totalEfec = enPeriodo.reduce((s,p)=>s+(Number(p.monto_efectivo)||0),0);
  const totalTrans = enPeriodo.reduce((s,p)=>s+(Number(p.monto_transferencia)||0),0);

  const formaIcon = {efectivo:"💵",transferencia:"🏦",ambos:"💳"};
  const formaLabel = {efectivo:"Efectivo",transferencia:"Transferencia",ambos:"Ambos"};

  // Dashboard stats
  const ahora = new Date();
  const inicioMesA = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
  const pagosMes = pagos.filter(p => new Date(p.fecha+"T12:00:00") >= inicioMesA);
  const totalMes = pagosMes.reduce((s,p)=>s+(Number(p.monto)||0),0);
  const totalMesEfec = pagosMes.reduce((s,p)=>s+(Number(p.monto_efectivo)||0),0);
  const totalMesTrans = pagosMes.reduce((s,p)=>s+(Number(p.monto_transferencia)||0),0);
  const diasPagados = new Set(pagosMes.map(p=>p.fecha)).size || 1;
  const promDiario = Math.round(totalMes / diasPagados);
  const ultimoPago = pagos[0];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {/* Dashboard resumen */}
      <div style={{background:"rgba(79,140,255,0.06)",border:"1px solid rgba(79,140,255,0.18)",borderRadius:16,padding:16,display:"flex",flexDirection:"column",gap:12}}>
        <div style={{color:"#4f8cff",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>RESUMEN ESTE MES</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div style={{background:"rgba(79,140,255,0.12)",border:"1px solid rgba(79,140,255,0.25)",borderRadius:12,padding:"12px 10px",textAlign:"center",gridColumn:"1 / -1"}}>
            <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>TOTAL PAGADO</div>
            <div style={{color:"#4f8cff",fontWeight:800,fontSize:24,fontFamily:"'DM Mono',monospace",marginTop:3}}>{fmt(totalMes)}</div>
          </div>
          <div style={{background:"rgba(34,208,122,0.08)",border:"1px solid rgba(34,208,122,0.2)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
            <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>💵 EFECTIVO</div>
            <div style={{color:"#22d07a",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace",marginTop:2}}>{fmt(totalMesEfec)}</div>
          </div>
          <div style={{background:"rgba(255,180,50,0.08)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
            <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>🏦 TRANSF.</div>
            <div style={{color:"#ffb432",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace",marginTop:2}}>{fmt(totalMesTrans)}</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
            <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>PROM. DIARIO</div>
            <div style={{color:"#e8edf5",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace",marginTop:2}}>{fmt(promDiario)}</div>
            <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Sans',sans-serif"}}>{diasPagados} día{diasPagados!==1?"s":""} pagados</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
            <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>ÚLTIMO PAGO</div>
            {ultimoPago
              ?<><div style={{color:"#e8edf5",fontWeight:800,fontSize:14,fontFamily:"'DM Mono',monospace",marginTop:2}}>{fmt(ultimoPago.monto)}</div>
              <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Sans',sans-serif"}}>{new Date(ultimoPago.fecha+"T12:00:00").toLocaleDateString("es-CL",{day:"numeric",month:"short"})}</div></>
              :<div style={{color:"#7a8aaa",fontSize:12,marginTop:4}}>—</div>
            }
          </div>
        </div>
      </div>

      {/* Header con botón */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{color:"#e8edf5",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>👥 Historial de Pagos</div>
        <button onClick={()=>setShowAdd(p=>!p)} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:10,padding:"10px 16px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>➕ Registrar pago</button>
      </div>

      {/* Form agregar */}
      {showAdd&&(
        <div style={{background:"rgba(79,140,255,0.06)",border:"1px solid rgba(79,140,255,0.2)",borderRadius:16,padding:18,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{color:"#4f8cff",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>NUEVO PAGO</div>

          {/* Fecha */}
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={LBL}>Fecha</label>
            <input type="date" value={fechaPago} onChange={e=>setFechaPago(e.target.value)} style={{...INP,colorScheme:"dark"}}/>
          </div>

          {/* Forma de pago */}
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <label style={LBL}>Forma de pago</label>
            <div style={{display:"flex",gap:8}}>
              {["efectivo","transferencia","ambos"].map(f=>(
                <button key={f} onClick={()=>setFormaPago(f)} style={{flex:1,padding:"10px 6px",borderRadius:10,border:"1.5px solid",borderColor:formaPago===f?"#4f8cff":"rgba(255,255,255,0.1)",background:formaPago===f?"rgba(79,140,255,0.18)":"transparent",color:formaPago===f?"#4f8cff":"rgba(255,255,255,0.4)",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                  {formaIcon[f]} {formaLabel[f]}
                </button>
              ))}
            </div>
          </div>

          {/* Montos */}
          {formaPago==="ambos" ? (
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={LBL}>💵 Efectivo</label>
                <input ref={montoEfecRef} type="number" min="0" placeholder="Ej: 5000" defaultValue="" style={{...INP,fontSize:14}}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={LBL}>🏦 Transferencia</label>
                <input ref={montoTransRef} type="number" min="0" placeholder="Ej: 10000" defaultValue="" style={{...INP,fontSize:14}}/>
              </div>
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={LBL}>Monto</label>
              <input ref={montoRef} type="number" min="0" placeholder="Ej: 15000" defaultValue="" style={{...INP,fontSize:14}}/>
            </div>
          )}

          {/* Nota */}
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={LBL}>Nota (opcional)</label>
            <input ref={notaRef} placeholder="Ej: Pago jornada completa..." defaultValue="" style={{...INP,fontSize:14}}/>
          </div>

          <div style={{display:"flex",gap:8}}>
            <button onClick={agregar} disabled={loading} style={{flex:1,background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:10,padding:"13px",color:"#fff",fontSize:14,fontWeight:700,cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1}}>
              {loading?"⏳ Guardando...":"💾 Guardar pago"}
            </button>
            <button onClick={()=>setShowAdd(false)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"13px 18px",color:"#7a8aaa",fontSize:14,cursor:"pointer"}}>✕</button>
          </div>
        </div>
      )}

      {/* Filtro */}
      <FiltroBar filtro={filtro} setFiltro={setFiltro}/>

      {/* Resumen */}
      {enPeriodo.length>0&&(
        <div style={{background:"rgba(79,140,255,0.06)",border:"1px solid rgba(79,140,255,0.15)",borderRadius:14,padding:14,display:"flex",flexDirection:"column",gap:10}}>
          <div style={{color:"#4f8cff",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>RESUMEN DEL PERÍODO</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <div style={{background:"rgba(79,140,255,0.1)",border:"1px solid rgba(79,140,255,0.2)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
              <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>TOTAL</div>
              <div style={{color:"#4f8cff",fontWeight:800,fontSize:16,fontFamily:"'DM Mono',monospace",marginTop:3}}>{fmt(totalPeriodo)}</div>
            </div>
            <div style={{background:"rgba(34,208,122,0.08)",border:"1px solid rgba(34,208,122,0.2)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
              <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>💵 EFECTIVO</div>
              <div style={{color:"#22d07a",fontWeight:800,fontSize:16,fontFamily:"'DM Mono',monospace",marginTop:3}}>{fmt(totalEfec)}</div>
            </div>
            <div style={{background:"rgba(255,180,50,0.08)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
              <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>🏦 TRANSF.</div>
              <div style={{color:"#ffb432",fontWeight:800,fontSize:16,fontFamily:"'DM Mono',monospace",marginTop:3}}>{fmt(totalTrans)}</div>
            </div>
          </div>
          <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",textAlign:"center"}}>{enPeriodo.length} pago{enPeriodo.length!==1?"s":""}</div>
        </div>
      )}

      {/* Lista */}
      {pagos.length===0
        ?<div style={{textAlign:"center",padding:"50px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:40,marginBottom:10}}>💰</div><div>Sin pagos registrados</div></div>
        :enPeriodo.length===0
          ?<div style={{textAlign:"center",padding:"30px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif",fontSize:13}}>Sin pagos en este período</div>
          :<div style={{display:"flex",flexDirection:"column",gap:8}}>
            {enPeriodo.map(p=>(
              <div key={p.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:12,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:16}}>{formaIcon[p.forma_pago]||"💵"}</span>
                    <div style={{color:"#e8edf5",fontWeight:700,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{fmt(p.monto)}</div>
                  </div>
                  <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:3}}>
                    {new Date(p.fecha+"T12:00:00").toLocaleDateString("es-CL",{weekday:"long",day:"numeric",month:"short"})}
                    {p.nota&&" · "+p.nota}
                  </div>
                  {p.forma_pago==="ambos"&&(
                    <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",marginTop:2}}>
                      💵 {fmt(p.monto_efectivo)} + 🏦 {fmt(p.monto_transferencia)}
                    </div>
                  )}
                </div>
                <button onClick={()=>eliminar(p.id)} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:16}}>🗑</button>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

export default PestañaAyudantePagos;
