import { useState, useEffect } from "react";
import { sb } from "../../lib/supabaseClient.js";
import { fmt } from "../../utils/fechas.js";
import { LBL, INP } from "../../components/ui/styles.js";
function PestañaCatalogo() {
  const [items, setItems] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nuevo, setNuevo] = useState({ nombre:"", precio:"", descripcion:"", fotoPreview:null, fotoFile:null });
  const fileRef = useRef();

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const { data } = await sb.from("catalogo").select("*").order("nombre", { ascending: true });
    if(data) setItems(data);
  };

  const handleFoto = async (e) => {
    const file = e.target.files[0]; if(!file) return;
    const rd = new FileReader();
    rd.onload = async ev => {
      const comprimida = await comprimirImagen(ev.target.result, 150);
      const res = await fetch(comprimida);
      const blob = await res.blob();
      setNuevo(p => ({...p, fotoPreview: comprimida, fotoFile: new File([blob],"foto.jpg",{type:"image/jpeg"})}));
    };
    rd.readAsDataURL(file);
  };

  const agregar = async () => {
    if(!nuevo.nombre.trim()) { alert("Ingresa el nombre del artículo"); return; }
    setLoading(true);
    const { data: { user } } = await sb.auth.getUser();
    let foto_url = null;

    if(nuevo.fotoFile) {
      const path = user.id+"/catalogo/"+Date.now()+".jpg";
      const { error } = await sb.storage.from("fotos").upload(path, nuevo.fotoFile);
      if(!error) {
        const { data: signed } = await sb.storage.from("fotos").createSignedUrl(path, 60*60*24*365*5);
        foto_url = signed?.signedUrl || null;
      }
    }

    const { data } = await sb.from("catalogo").insert([{
      user_id: user.id,
      nombre: nuevo.nombre,
      precio: nuevo.precio ? Number(nuevo.precio) : null,
      descripcion: nuevo.descripcion || null,
      foto_url,
    }]).select().single();

    if(data) {
      setItems(p => [...p, data].sort((a,b) => a.nombre.localeCompare(b.nombre)));
      setNuevo({ nombre:"", precio:"", descripcion:"", fotoPreview:null, fotoFile:null });
      setShowAdd(false);
    }
    setLoading(false);
  };

  const eliminar = async (id) => {
    if(!window.confirm("¿Eliminar este artículo?")) return;
    await sb.from("catalogo").delete().eq("id", id);
    setItems(p => p.filter(i => i.id !== id));
  };

  const filtrados = items.filter(i =>
    i.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (i.descripcion||"").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{color:"#e8edf5",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>📦 Catálogo de Repuestos</div>
          <div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{items.length} artículo{items.length!==1?"s":""}</div>
        </div>
        <button onClick={()=>setShowAdd(p=>!p)} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:10,padding:"10px 16px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>➕ Agregar</button>
      </div>

      {/* Buscador */}
      <input
        value={busqueda} onChange={e=>setBusqueda(e.target.value)}
        placeholder="🔍 Buscar por nombre o descripción..."
        style={{...INP, fontSize:14, padding:"12px 14px"}}
      />

      {/* Form agregar */}
      {showAdd&&(
        <div style={{background:"rgba(79,140,255,0.06)",border:"1px solid rgba(79,140,255,0.2)",borderRadius:16,padding:18,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{color:"#4f8cff",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>NUEVO ARTÍCULO</div>

          {/* Foto */}
          <div>
            <label style={LBL}>Foto</label>
            <div onClick={()=>fileRef.current.click()} style={{marginTop:6,border:"1.5px dashed rgba(255,255,255,0.15)",borderRadius:12,minHeight:80,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden",background:"rgba(255,255,255,0.02)"}}>
              {nuevo.fotoPreview
                ?<img src={nuevo.fotoPreview} alt="prev" style={{width:"100%",maxHeight:150,objectFit:"contain"}}/>
                :<div style={{textAlign:"center",color:"rgba(255,255,255,0.3)"}}><div style={{fontSize:24}}>📷</div><div style={{fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Agregar foto</div></div>}
            </div>
            <div style={{display:"flex",gap:8,marginTop:6}}>
              <button onClick={()=>{fileRef.current.removeAttribute("capture");fileRef.current.click();}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"8px",color:"#c8d0e0",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>🖼 Galería</button>
              <button onClick={()=>{fileRef.current.setAttribute("capture","environment");fileRef.current.click();}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"8px",color:"#c8d0e0",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>📷 Cámara</button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFoto}/>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={LBL}>Nombre *</label>
            <input value={nuevo.nombre} onChange={e=>setNuevo(p=>({...p,nombre:e.target.value}))} placeholder="Ej: Batería 48V 10Ah" style={{...INP,fontSize:14}}/>
          </div>

          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
              <label style={LBL}>Precio venta</label>
              <input type="number" value={nuevo.precio} onChange={e=>setNuevo(p=>({...p,precio:e.target.value}))} placeholder="Ej: 85000" style={{...INP,fontSize:14}}/>
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={LBL}>Descripción (opcional)</label>
            <input value={nuevo.descripcion} onChange={e=>setNuevo(p=>({...p,descripcion:e.target.value}))} placeholder="Ej: Compatible con Xiaomi Pro 2, marca X..." style={{...INP,fontSize:14}}/>
          </div>

          <div style={{display:"flex",gap:8}}>
            <button onClick={agregar} disabled={loading} style={{flex:1,background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:10,padding:"13px",color:"#fff",fontSize:14,fontWeight:700,cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1}}>
              {loading?"⏳ Guardando...":"💾 Guardar"}
            </button>
            <button onClick={()=>setShowAdd(false)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"13px 18px",color:"#7a8aaa",fontSize:14,cursor:"pointer"}}>✕</button>
          </div>
        </div>
      )}

      {/* Lista de artículos */}
      {filtrados.length===0
        ? <div style={{textAlign:"center",padding:"50px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}>
            <div style={{fontSize:44,marginBottom:10}}>📦</div>
            <div style={{fontSize:15}}>{busqueda?"Sin resultados para \""+busqueda+"\"":'Sin artículos en el catálogo'}</div>
            {!busqueda&&<div style={{fontSize:12,marginTop:4}}>Agrega repuestos y accesorios con su precio</div>}
          </div>
        : <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {filtrados.map(item=>(
              <div key={item.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:14,overflow:"hidden",display:"flex",flexDirection:"column"}}>
                {item.foto_url
                  ?<img src={item.foto_url} alt={item.nombre} style={{width:"100%",height:120,objectFit:"contain",background:"rgba(0,0,0,0.3)"}}/>
                  :<div style={{width:"100%",height:100,background:"rgba(255,255,255,0.03)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>📦</div>
                }
                <div style={{padding:"10px 10px 12px",display:"flex",flexDirection:"column",gap:4,flex:1}}>
                  <div style={{color:"#e8edf5",fontWeight:700,fontSize:13,fontFamily:"'DM Sans',sans-serif",lineHeight:1.3}}>{item.nombre}</div>
                  {item.descripcion&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",lineHeight:1.4}}>{item.descripcion}</div>}
                  <div style={{marginTop:"auto",paddingTop:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{color:"#22d07a",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{item.precio?fmt(item.precio):"Sin precio"}</div>
                    <button onClick={()=>eliminar(item.id)} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:14,padding:"4px"}}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

export default PestañaCatalogo;
