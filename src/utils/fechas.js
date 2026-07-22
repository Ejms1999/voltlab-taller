function fmt(n) { if (!n && n !== 0) return ""; return new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",minimumFractionDigits:0}).format(n); }
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
function diasEntre(a,b) { if(!a||!b)return null; return Math.round(Math.abs((new Date(b)-new Date(a))/86400000)); }
// Feriados fijos Chile (MM-DD)
const FERIADOS_FIJOS = ["01-01","05-01","05-21","06-20","07-16","08-15","10-12","10-31","11-01","12-08","12-25"];
// Feriados variables por año
const FERIADOS_VAR = {
  "2025": ["2025-04-18","2025-04-19","2025-09-18","2025-09-19"],
  "2026": ["2026-04-03","2026-04-04","2026-09-18","2026-09-19"],
};

function esFeriado(fecha) {
  const d = new Date(fecha);
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const dd = String(d.getDate()).padStart(2,"0");
  const yyyy = String(d.getFullYear());
  const iso = d.toISOString().split("T")[0];
  if(FERIADOS_FIJOS.includes(mm+"-"+dd)) return true;
  if((FERIADOS_VAR[yyyy]||[]).includes(iso)) return true;
  return false;
}

function esDiaHabil(fecha) {
  const d = new Date(fecha);
  const dow = d.getDay();
  if(dow === 0) return false; // domingo
  if(esFeriado(fecha)) return false;
  return true; // lunes a sábado sin feriado
}

// Contar días hábiles entre dos fechas (L-S, sin feriados)
function diasHabilesEntre(fechaInicio, fechaFin) {
  let count = 0;
  const start = new Date(fechaInicio);
  const end = new Date(fechaFin);
  start.setHours(0,0,0,0);
  end.setHours(0,0,0,0);
  for(let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
    if(esDiaHabil(d)) count++;
  }
  return count;
}

// Días hábiles desde ingreso hasta hoy
function diasHabilesEnTaller(fechaIngreso) {
  if(!fechaIngreso) return 0;
  const inicio = new Date(fechaIngreso);
  // Empezar a contar desde el día siguiente
  inicio.setDate(inicio.getDate()+1);
  return diasHabilesEntre(inicio, new Date());
}

// Obtener lunes de esta semana
function getLunes(ref) {
  const d = new Date(ref);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0,0,0,0);
  return d;
}
// Obtener sábado (fin de semana laboral)
function getSabado(lunes) {
  const d = new Date(lunes);
  d.setDate(d.getDate() + 5);
  d.setHours(23,59,59,999);
  return d;
}

function enRango(fecha, filtro, desde, hasta) {
  if(!fecha) return false;
  const d = new Date(fecha);
  const hoy = new Date();
  hoy.setHours(23,59,59,999);
  const hoyStart = new Date(); hoyStart.setHours(0,0,0,0);

  if(filtro==="hoy") return d >= hoyStart && d <= hoy;
  if(filtro==="ayer") {
    const ayerStart = new Date(hoyStart); ayerStart.setDate(ayerStart.getDate()-1);
    const ayerEnd = new Date(hoyStart); ayerEnd.setMilliseconds(-1);
    return d >= ayerStart && d <= ayerEnd;
  }
  if(filtro==="semana") {
    const lunes = getLunes(new Date());
    const sabado = getSabado(lunes);
    return d >= lunes && d <= sabado;
  }
  if(filtro==="semana_pasada") {
    const lunesEsta = getLunes(new Date());
    const lunesPasada = new Date(lunesEsta); lunesPasada.setDate(lunesPasada.getDate()-7);
    const sabadoPasada = getSabado(lunesPasada);
    return d >= lunesPasada && d <= sabadoPasada;
  }
  if(filtro==="mes") {
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    inicioMes.setHours(0,0,0,0);
    return d >= inicioMes && d <= hoy;
  }
  if(filtro==="mes_pasado") {
    const primerDia = new Date(hoy.getFullYear(), hoy.getMonth()-1, 1);
    primerDia.setHours(0,0,0,0);
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
    ultimoDia.setHours(23,59,59,999);
    return d >= primerDia && d <= ultimoDia;
  }
  if(filtro==="custom") {
    const d1 = desde ? new Date(desde+"T00:00:00") : null;
    const d2 = hasta ? new Date(hasta+"T23:59:59") : null;
    if(d1 && d < d1) return false;
    if(d2 && d > d2) return false;
    return true;
  }
  return true;
}

// Calcular días trabajados en un período dado registros y asistencia
function calcularDiasTrabajados(registros, asistencia, filtro, desde, hasta) {
  const diasSet = new Set();
  // Solo días con trabajos COMPLETADOS
  registros.filter(r => r.estado === "completado" && r.fecha_completado).forEach(r => {
    if(enRango(r.fecha_completado, filtro, desde, hasta)) {
      diasSet.add(new Date(r.fecha_completado).toDateString());
    }
  });
  // Días con asistencia (igual cuentan como día trabajado)
  (asistencia||[]).forEach(a => {
    if(enRango(a.hora, filtro, desde, hasta)) {
      diasSet.add(new Date(a.hora).toDateString());
    }
  });
  return diasSet.size || 1;
}

// Horas laborales por día
const HORAS_DIA = { lv: 8.167, sab: 9.5 }; // L-V: 10:30-18:40, S: 11:00-20:30
function getHorasDia(fecha) {
  const d = new Date(fecha);
  const day = d.getDay(); // 0=dom, 6=sab
  if(day === 0) return 0;
  if(day === 6) return HORAS_DIA.sab;
  return HORAS_DIA.lv;
}
// Días hábiles L-S restantes en el mes
function diasHabilesTotalesMes() {
  const hoy = new Date();
  const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth()+1, 0);
  let count = 0;
  for(let d = new Date(primerDia); d <= ultimoDia; d.setDate(d.getDate()+1)) {
    if(d.getDay() !== 0) count++; // L-S, sin domingos
  }
  return count;
}

function diasHabilesRestantesMes() {
  const hoy = new Date();
  const fin = new Date(hoy.getFullYear(), hoy.getMonth()+1, 0);
  let count = 0;
  for(let d = new Date(hoy); d <= fin; d.setDate(d.getDate()+1)) {
    if(d.getDay() !== 0) count++;
  }
  return count;
}
// Días hábiles L-S en un período
function diasHabilesEnPeriodo(filtro, desde, hasta) {
  const hoy = new Date();
  let start, end;
  if(filtro==="hoy") { start=end=new Date(); }
  else if(filtro==="ayer") { start=end=new Date(); start.setDate(start.getDate()-1); end=new Date(start); }
  else if(filtro==="semana") { start=getLunes(hoy); end=getSabado(start); }
  else if(filtro==="semana_pasada") { const l=getLunes(hoy); start=new Date(l); start.setDate(l.getDate()-7); end=getSabado(start); }
  else if(filtro==="mes") { start=new Date(hoy.getFullYear(),hoy.getMonth(),1); start.setHours(0,0,0,0); end=new Date(hoy); }
  else if(filtro==="mes_pasado") { start=new Date(hoy.getFullYear(),hoy.getMonth()-1,1); start.setHours(0,0,0,0); end=new Date(hoy.getFullYear(),hoy.getMonth(),0); end.setHours(23,59,59,999); }
  else if(filtro==="custom") { start=desde?new Date(desde+"T00:00:00"):new Date(); end=hasta?new Date(hasta+"T23:59:59"):new Date(); }
  else return 1;
  let count=0;
  for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)) {
    if(d.getDay()!==0) count++;
  }
  return count||1;
}

function diasEnTaller(fecha) {
  return diasHabilesEnTaller(fecha);
}

function urgenciaBadge(dias) {
  if(dias >= 4) return { color:"#ff5a5a", bg:"rgba(255,90,90,0.15)", border:"rgba(255,90,90,0.4)", label:"🔴 URGENTE", dias };
  if(dias >= 2) return { color:"#ffb432", bg:"rgba(255,180,50,0.15)", border:"rgba(255,180,50,0.4)", label:"🟡 REVISAR", dias };
  return { color:"#22d07a", bg:"rgba(34,208,122,0.1)", border:"rgba(34,208,122,0.2)", label:"🟢 OK", dias };
}

export {
  fmt,
  diasEntre,
  esFeriado,
  esDiaHabil,
  diasHabilesEntre,
  diasHabilesEnTaller,
  getLunes,
  getSabado,
  enRango,
  calcularDiasTrabajados,
  getHorasDia,
  diasHabilesTotalesMes,
  diasHabilesRestantesMes,
  diasHabilesEnPeriodo,
  diasEnTaller,
  urgenciaBadge,
};
