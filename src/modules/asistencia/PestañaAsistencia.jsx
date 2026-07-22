import { useState } from "react";
import { sb } from "../../lib/supabaseClient.js";
import { enRango } from "../../utils/fechas.js";
function PestañaAsistencia({ asistenciaData, onNuevoRegistro, onEliminar }) {
  const [loading, setLoading] = useState(false);
  const [horaManual, setHoraManual] = useState({ persona: null, tipo: "entrada", hora: "" });
  const [filtro, setFiltro] = useState("hoy");

  const marcar = async (persona, tipo, horaOverride) => {
    setLoading(true);
    const { data: { user } } = await sb.auth.getUser();
    const hora = horaOverride ? new Date(horaOverride).toISOString() : new Date().toISOString();
    const { data } = await sb.from("asistencia").insert([{
      user_id: user.id, persona, tipo, hora,
      hora_manual: !!horaOverride,
      fecha: new Date().toISOString().split("T")[0]
    }]).select().single();
    if(data) onNuevoRegistro(data);
    setHoraManual({ persona: null, tipo: "entrada", hora: "" });
    setLoading(false);
  };

  const eliminar = async (id) => {
    await sb.from("asistencia").delete().eq("id", id);
    onEliminar(id);
  };

  // Calcular horas trabajadas por persona en un período
  const calcHoras = (persona, filtroLocal) => {
    const registros = (asistenciaData||[]).filter(a => a.persona === persona && enRango(a.hora, filtroLocal));
    const dias = {};
    registros.forEach(a => {
      const fecha = new Date(a.hora).toDateString();
      if(!dias[fecha]) dias[fecha] = {};
      if(a.tipo === "entrada") dias[fecha].entrada = new Date(a.hora);
      if(a.tipo === "salida") dias[fecha].salida = new Date(a.hora);
    });
    let total = 0;
    let diasCount = 0;
    Object.values(dias).forEach(d => {
      if(d.entrada && d.salida) {
        total += (d.salida - d.entrada) / 3600000;
        diasCount++;
      }
    });
    return { horas: Math.round(total * 10) / 10, dias: diasCount };
  };

  const filtrosResumen = ["hoy", "semana", "mes"];
  const personas = [
    { k: "mauricio", l: "👥 Mauricio", color: "#4f8cff", bg: "rgba(79,140,255,0.08)", border: "rgba(79,140,255,0.2)" },
    { k: "admin", l: "👤 Admin (Yo)", color: "#22d07a", bg: "rgba(34,208,122,0.08)", border: "rgba(34,208,122,0.2)" },
  ];

  const registrosHoy = (asistenciaData||[]).filter(a => enRango(a.hora, "hoy"));

  const Sec = ({title, color, children}) => (
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{color:color||"#7a8aaa",fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>

      {/* Marcar asistencia */}
      {personas.map(p => (
        <div key={p.k} style={{background:p.bg,border:"1px solid "+p.border,borderRadius:16,padding:18,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{color:p.color,fontWeight:700,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>{p.l}</div>
          <button onClick={()=>marcar(p.k,"entrada")} disabled={loading} style={{width:"100%",background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:10,padding:"14px 8px",color:"#22d07a",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            ✅ Marcar Llegada
          </button>
          {/* Manual */}
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            <input type="datetime-local" value={horaManual.persona===p.k?horaManual.hora:""}
              onChange={e=>setHoraManual({persona:p.k,tipo:horaManual.tipo,hora:e.target.value})}
              style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",colorScheme:"dark"}}/>

            <button onClick={()=>{if(horaManual.hora&&horaManual.persona===p.k) marcar(p.k,'entrada',horaManual.hora);}}
              style={{background:"rgba(79,140,255,0.15)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 14px",color:"#4f8cff",fontSize:13,fontWeight:700,cursor:"pointer"}}>
              Manual
            </button>
          </div>
        </div>
      ))}



      {/* Historial hoy */}
      <Sec title="📋 Registro de Hoy" color="#ffb432">
        {registrosHoy.length === 0
          ? <div style={{color:"#7a8aaa",fontSize:13,fontFamily:"'DM Sans',sans-serif",textAlign:"center",padding:"12px 0"}}>Sin registros hoy</div>
          : registrosHoy.map(a => (
            <div key={a.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <span style={{fontSize:18}}>{a.persona==="mauricio"?"👥":"👤"}</span>
                <div>
                  <div style={{color:"#e8edf5",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>
                    {a.persona==="mauricio"?"Mauricio":"Admin"} · {a.tipo==="entrada"?"Entrada":"Salida"}
                  </div>
                  <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace"}}>
                    {new Date(a.hora).toLocaleTimeString("es-CL",{hour:"2-digit",minute:"2-digit"})}{a.hora_manual?" · Manual":""}
                  </div>
                </div>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{background:a.tipo==="entrada"?"rgba(34,208,122,0.15)":"rgba(255,90,90,0.12)",color:a.tipo==="entrada"?"#22d07a":"#ff5a5a",borderRadius:5,padding:"2px 8px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>
                  {a.tipo==="entrada"?"IN":"OUT"}
                </span>
                <button onClick={()=>eliminar(a.id)} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:14}}>🗑</button>
              </div>
            </div>
          ))
        }
      </Sec>
    </div>
  );
}

export default PestañaAsistencia;
