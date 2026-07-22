import { useState, useEffect } from "react";
import { sb } from "../../lib/supabaseClient.js";
import { fmt, enRango } from "../../utils/fechas.js";
import FiltroBar from "../../components/ui/FiltroBar.jsx";
function PestañaRepuestos() {
  const [repuestos, setRepuestos] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [nuevo, setNuevo] = useState({ descripcion:"", monto:"", fecha: new Date().toISOString().split("T")[0] });
  const [loading, setLoading] = useState(false);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const { data } = await sb.from("ventas_repuestos").select("*").order("fecha", { ascending: false });
    if(data) setRepuestos(data);
  };

  const agregar = async () => {
    if(!nuevo.descripcion||!nuevo.monto) return;
    setLoading(true);
    const { data: { user } } = await sb.auth.getUser();
    const { data } = await sb.from("ventas_repuestos").insert([{
      user_id: user.id,
      descripcion: nuevo.descripcion,
      monto: Number(nuevo.monto),
      fecha: new Date(nuevo.fecha+"T12:00:00").toISOString()
    }]).select().single();
    if(data){ setRepuestos(p=>[data,...p]); setNuevo({descripcion:"",monto:"",fecha:new Date().toISOString().split("T")[0]}); setShowAdd(false); }
    setLoading(false);
  };

  const eliminar = async (id) => {
    if(!window.confirm("¿Eliminar?")) return;
    await sb.from("ventas_repuestos").delete().eq("id",id);
    setRepuestos(p=>p.filter(r=>r.id!==id));
  };

  const totalMes = repuestos.filter(r=>enRango(r.fecha,"mes")).reduce((s,r)=>s+(Number(r.monto)||0),0);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{color:"#e8edf5",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>🔩 Ventas de Repuestos</div>
          <div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>Este mes: <strong style={{color:"#22d07a"}}>{fmt(totalMes)}</strong></div>
        </div>
        <button onClick={()=>setShowAdd(p=>!p)} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:10,padding:"10px 16px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>➕ Agregar</button>
      </div>

      {showAdd&&(
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{color:"#4f8cff",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>NUEVA VENTA</div>
          <input placeholder="Repuesto o pieza vendida" value={nuevo.descripcion} onChange={e=>setNuevo(p=>({...p,descripcion:e.target.value}))} style={{...INP,fontSize:14}}/>
          <div style={{display:"flex",gap:10}}>
            <input type="number" placeholder="Valor" value={nuevo.monto} onChange={e=>setNuevo(p=>({...p,monto:e.target.value}))} style={{flex:1,...INP,fontSize:14}}/>
            <input type="date" value={nuevo.fecha} onChange={e=>setNuevo(p=>({...p,fecha:e.target.value}))} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 10px",color:"#e8edf5",fontSize:14,outline:"none",colorScheme:"dark"}}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={agregar} disabled={loading} style={{flex:1,background:"linear-gradient(135deg,#22d07a,#4f8cff)",border:"none",borderRadius:10,padding:"12px",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>💾 Guardar</button>
            <button onClick={()=>setShowAdd(false)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px 16px",color:"#7a8aaa",fontSize:14,cursor:"pointer"}}>Cancelar</button>
          </div>
        </div>
      )}

      {repuestos.length===0&&!showAdd
        ? <div style={{textAlign:"center",padding:"50px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:40,marginBottom:10}}>🔩</div><div>Sin ventas registradas</div></div>
        : <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {repuestos.map(r=>(
              <div key={r.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:12,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                <div>
                  <div style={{color:"#e8edf5",fontWeight:600,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>{r.descripcion}</div>
                  <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace",marginTop:2}}>{new Date(r.fecha).toLocaleDateString("es-CL")}</div>
                </div>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span style={{color:"#22d07a",fontWeight:800,fontSize:16,fontFamily:"'DM Mono',monospace"}}>{fmt(r.monto)}</span>
                  <button onClick={()=>eliminar(r.id)} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:16}}>🗑</button>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

export default PestañaRepuestos;
