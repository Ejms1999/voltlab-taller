import { sb } from "./supabaseClient.js";

async function actualizarDB(id, datos) {
  const{error}=await sb.from("registros").update(datos).eq("id",id);
  return !error;
}

export default actualizarDB;
