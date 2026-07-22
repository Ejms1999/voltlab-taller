import { sb } from "./supabaseClient.js";
import { COUNTER_KEY } from "../utils/constants.js";

async function getNextOrden() {
  try {
    // Contar todos los registros en DB para generar número siguiente
    const { count } = await sb.from("registros").select("*", { count: "exact", head: true });
    // También buscar el máximo n_orden existente
    const { data } = await sb.from("registros").select("n_orden");
    let maxN = count || 0;
    if (data && data.length > 0) {
      data.forEach(r => {
        const n = parseInt((r.n_orden || "0").replace(/[^0-9]/g, ""));
        if (!isNaN(n) && n > maxN) maxN = n;
      });
    }
    const next = maxN + 1;
    localStorage.setItem(COUNTER_KEY, String(next));
    return String(next).padStart(4, "0");
  } catch(e) {
    const n = parseInt(localStorage.getItem(COUNTER_KEY) || "0") + 1;
    localStorage.setItem(COUNTER_KEY, String(n));
    return String(n).padStart(4, "0");
  }
}

export default getNextOrden;
