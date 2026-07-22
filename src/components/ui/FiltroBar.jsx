function FiltroBar({ filtro, setFiltro, incluirTodo=true }) {
  const opts = [
    {k:"hoy",l:"Hoy"},{k:"ayer",l:"Ayer"},{k:"semana",l:"Esta sem."},
    {k:"semana_pasada",l:"Sem. ant."},{k:"mes",l:"Este mes"},{k:"mes_pasado",l:"Mes ant."},
  ];
  if(incluirTodo) opts.push({k:"todo",l:"Todo"});
  return (
    <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:3,border:"1px solid rgba(255,255,255,0.07)",gap:2,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
      {opts.map(f=>(
        <button key={f.k} onClick={()=>setFiltro(f.k)} style={{flexShrink:0,padding:"8px 10px",borderRadius:9,border:"none",background:filtro===f.k?"rgba(79,140,255,0.2)":"transparent",color:filtro===f.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",borderBottom:filtro===f.k?"2px solid #4f8cff":"2px solid transparent",whiteSpace:"nowrap"}}>
          {f.l}
        </button>
      ))}
    </div>
  );
}

export default FiltroBar;
