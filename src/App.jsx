import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qlaneszgjulqkhrhzrse.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYW5lc3pnanVscWtocmh6cnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjQ1NjUsImV4cCI6MjA5MjA0MDU2NX0.lIp-na6nckdDFui64ir_sHFwzygSWd7Z4tZMlSNnOpk";
const sb = createClient(SUPABASE_URL, SUPABASE_ANON);

const LOGO_B64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEsASwDASIAAhEBAxEB/8QAHAABAAICAwEAAAAAAAAAAAAAAAYHBAUCAwgB/8QASxAAAQMDAgMDBQkLDAMBAAAAAAECAwQFEQYSByExE0FRFGGBkZMVIjI2cXSy0eEXQkRTcnOSobHB0hYjMzU3RVRWgpSzwlKDo/D/xAAaAQEAAgMBAAAAAAAAAAAAAAAAAwQBAgUG/8QAMBEBAAICAQIEAwcEAwAAAAAAAAECAxEEEiEFEzFRQXGhFCIzNGGB8DJCkfFSsdH/2gAMAwEAAhEDEQA/AL/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGtfqG0RyOjfcaZHtVUcm9OSnfSXOhr3uZS1UUzmplUY7OENIyUmdRMbSTiyRG5rOvkywAbowAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA116vVFYaBayue5sW5GIjW7lc5e5E9ZsSC8VfizTfO2/RcR5bTWk2ha4WGufkUx29JllN4lWF3RKv2P2nY3iHZHdEqvY/aQzRthtVxoauerrad8qU0i9g5q7qfC8pF59PrNNUQRUtZJDBVMqomYRszEwj+Xcc7Jys9Kxbt3d+PDOFbJbHXq3X+ezJV6STyPbnDnucnyKpJNLXWntNZNLU79r49qbG555yaawQRVN7ooJmI+J8qNc1eioWcmmbMnS3xfr+sqcXj5clvNxzG49zxHk4sceTkie8fBjpq+2O6JP7P7TcUtVFWU7J4Hbo3JyUwH6ctTo3NbSMYqphHNVcp50NJb6mXT1xkpKrKwOXOUT1OT9/2F6eRnwXj7Rrpn4x8J/VxfJw5qz5G9x8J+KYAxqOvpq5iup5N2OqKmFT0GSdCl63jqrO4UbVms6mAAGzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHdZWy3XS0xQ3O4toIWzo9siq1MuwvLn8q+okRBeKvxZpvnbfouI80xFJmVzw+s25VK1nU79WrpNOado+08m1j2faMWN+yWNNzV6ovmObNLaZTpqZi/64yu4eiGfEca+an/AAj6vWX4eaJ350/4j/xZFpsFjprpTTU98ZPKx6KyNHM98vhyJwVBpn4xW/8APJ+xS3y9wL1tSZrXXd5vxXHamWsWt1dgiWoo3R3iGediyU6tamM4RcLzTPcS0x6uopaeLNU+NrFXGH88+gl5mGM2KazOvjv4fupcbLOPJuI2jun2Oku0s8Easp0a5MZzjPRM95KjHpKilnizSvY5idzOWPQZBjhYIw4umJ3vvv4fscjJOS+5jQAC2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAILxV+LNN87b9FxOiC8VfizTfO2/RcQ5/wAOV/wv85j+aqoeiGfEYEPRDPiOBd7nI21rbUuuFO2iVUqVf/NqionP0kzZS6y++lk9rGQ21Va0Fwp6tGb1hfu25xn0kzbr17v7vb7b7DfBbDFZ8y81+X+nC51c03jy6RaP1/27W02rPvpX+0YYtZHXR1kC3ftHJ5nIq7c80RU5ZMxutnu/AW+1+w39HV0d7o9yxtcifDjeiKrV/wD3eS+Tg5H3MeWZn2n0/wCnMtkzYfvZMcRH6NJp9FW7yup0elPtXO7w7s+clZjOfR22DmsUEeeiJjK/vOdPVQVbFfBK2Rqcl2r0Ohw8VePTyptE29f5Dn8i85bdcR2dwALquAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQXir8Wab5236LidEF4q/Fmm+dt+i4hz/AIcr/hf5zH81VQ9EM+IwIeiGfEcC73ORINMoi6ht6KmU7ZP2KW92bP8Awb6inbBURUt6op5noyKORHOcvchZiaosq9K9n6LvqL/h+THSk9UxHd5XxjFkvlrNKzPb4No+CKRjmPja5rkwqKnVCMzWKvt9astrcvZuTuciK3zLnqh0S6trJZ5H0lMzyaNeauaqrjxVU6ZJNba9lyoWVDG7c8nN8FTqhJa3G5luiJmJj0mO0/sodGfi16pjtPw9f8onXNrGVUK3TtFb5lTO3PPGOWTMsCZvMq06PSn2rnd1x3Z85J5oIqhmyaNsjfByZENPDTs2Qxsjb4NTBDTwu1M8ZOrcRO+/r/ktzYtimvT3+jsAB2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgvFX4s03ztv0XE6ILxV+LNN87b9FxDn/Dlf8AC/zmP5qqh6IZ8RgQ9EM+I4F3ucjd2OmjrbvSU0yKscsiNdhcLgsRujLQnRk3tVK3tVZ5Bcaer2b+xfu25xn0k1Zr5Hf3fj/3fYT8W/GrWfO1v5PPeI4+Va8Tg3rXvpxfpq7Usk1PSPR9LKuFXejcp3bk+olFpt/ubQMp1dudlXPcnRVUj7dbo78B/wDt9hzk1bJLE5sNMkci8kcr92PRgkxZ+DgtN62nf7/Ts52bFzMsRW9Y+n1SCoulFSyrFNUNa9Oat5rj1GqrdQuWdsNuYkuU+ErVXPmRDrt1g7eNZ69X75OaN3YX5V858qrDU01S2a2OXknRX4c1flXqMubnXx9cV1E+39WkVMfGrfpmdz+vo2Nnuy3Fr2SMRkzOa46KnibQ1FktUlB2k07kWaTlhFzhPl8TbnQ4c5Zwx539SpyOiMk+X6AALSEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAILxV+LNN87b9FxOiDcVEVdMQOwuG1bcr4e9cQ5/w5X/C/zmP5qph6IZ8Rm2e7WGmoGRVthbWVCKu6bylWZ58uSeB1VM9LUVsktJTpTQOVNkO/dtTHj3nCyViI3t7S17WvNZrMR79tT9d/RuNNIjtQ0CKiKizJlF+RS20p4fxTP0UKbtFa2guVNVq3ekL0crUXGSct19A78Af7VCzwuRhxUmMk67vPeK8bNlyROONxpLOwi/FM/RQ+pFGi5SNqf6UIu3W8LvwJ/tEOx2rmyRuSKlVr1T3queioilufEOJH930lyfsXJ+Nfqk4IUldcoY463ytXI9yptV+c48W+BMaeXt6aKXGN7EdjwyhtxObXkTMRExMe/tKPPx5xREzO3YAC6rgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHCSKOaNY5WNex3Vrkyi+g5gHoxPcq3p+A0vsW/Uffcyg/wVN7Jv1GUDXpj2b+Zf3Y3udRJ+B0/sm/UffIKP/CwezT6jIA6K+zHXb3dHkVKn4ND7NDjJQUksTo3U8e1yYXDURTJBicdJjUwddvdH2aWhbNufUPdHn4O1EVfNk37Wo1qNamERMIiH0EeDjYsG/LrrbfJmvk11zsABOiAAAAAAAAAAAAAAAAAAAAAAAAAuccuoAFT1XGzyKsnpZ9OSsmgkdG9q1acnIuF+98xL9E61g1nQ1U8dI6lkp5UY6N0iP5KmUXOE8/qKn4wWP3M1alwjZiC4x9plE5do3CO9abV9KjhFfI7TqSrgqH7aeopHvX8qP3+f0d51L8bFbB5mOO/82ji09WpTrU3Fqn07qCptTbU+rWn2o6VtQjE3KiKqY2r0ybfReuv5XxV1QtsWhpqTajpZJ0ciqqKqp0TGETKr5zzrcq+S53OruEy+/qZXzO/1Lkn2p3T6U4c2XTkarFPcmurK7HJVRcYYvrRF/JNsnDxxWtIj70/yWIvPqmF84z2egqHQWykluLmrhZUf2cefMqoqr8uMGtouOUTpkSusb2RqvN8E6PVE+RUTPrKntNprL5dILdQRdrUzLhrc4RERMqqr3IiG51ToW86SjhmuDYZKeZ21s0D1c1HYztXKIqLjPqJPsvHrMUn1+bHVb1eirHf7bqK3pW2ypbNF0cnRzHeDkXmikJ1Jxbj09qGstLrK+daZyN7VKlG7stR3TauOpWPDq/zWLWNFteqU1ZI2mqGZ5Kjlw1flRVRfX4nHiV/aJefzjP8AjaQ04dIzTW3eNbhtN51tdGiNes1o+ua23OpPJUYvvpkfu3Z8yY+CaO+8YIrJfq21rZJJlpZVj7RKlG7uSc8beXU0/Av+mvn5MH/c7tScI7retSXC5w3KijiqZlkax7X5RMJ1x8hp5eCme1b+n7m7TXcPv3dYf8vSf7tP4R93WH/L0n+7T+Ep6eJYKiWFyoqxvcxVToqouP3Ex0pw2uOrLQtypa6lgjSV0WyVrlXKY58vlLV+NxqR1Wjt+7WLWlZ104nx2zS1mvi2l8iXPfiFJ0RY9vn28zAsnGKK83yhtiWOSFaqZsXaLUo7bnvxt5kb4kWebT+hdLWqeVkstNJK1z40VGryzyz8pDtDfHqx/PGEVONhtim+vdmbTvT1IOg7iK8Rb57g6LrZ437aidvk8P5T+WfQmV9By6Vm9orHxSTOkSrON9LT1tRDBZJJ4o5HMZL5Sjd6IuEdjbyySnRGvKfWjaxGUbqSamVuY3So/c12cOTkneioea2sc5HbGqqNbuXHcid5LOG989wta0Uj37aeqXyWbnyw7ovodt/WdfNwscY56I7o4vO+70FqK8pp/T9bdXQLOlNHv7NHbd3NExnnjqVr93WH/L0n+7T+EmvEf+z29fN/+yHmV3fjqQcLj48tJm8fFm9piey66fjlQPlRKmyVUTO90czXqnoXBYth1BbdSW5K62VCSxZ2uRUw5jvBydynmG9U1spamBtqrn1cTqdj5XPbjZKqe+anTKJ4lw8GLJcLda6+urInww1ro1gY9MK5Govv8eC7kx44M8rjYqY+uvaStpmdLQABzEgAAAAAAAAAAAAAAAAAAIRxUsXuzouoljZuqKFfKY8JzVE+Gn6KqvoQ86skfG7dG9WrhUy1cclTC/qU9fyMbLG6N7UcxyKjkXoqKUTWcF78lbOlHUUC0vaO7HtJXI7Zn3uU29cYOnweRWtZpedI7133hFtC2P8AlBrCgonN3QNf20/hsZzVPSuE9JYPG+0zOZa7sxquij3U8qp96qqit9eFT1Eg4a6CqtJOrqq5Pp31c+2ONYXK5GsTmvNUTmq/sQnFfQUtzoZqKthZNTTN2SRvTkqGublx58Wr3iCK/d08u6V1DLpfUNPdY4UmSNHNfEq43tcmFRF7l7/QSfX3EhurrfBb6WhkpqZkiTSOlciuc5EVERMdE5r8puL7wUrY53yWOuilgVcpDVKrXt825EVF9ODV0XBnUtRMjaqWhpY883LKsi+hET96FqcvGvaMsz3hrq0dkb0PaprxrK100TVVrJ2zSqn3rGKjlX9SJ8qoZXEr+0S8/nGf8bS9dI6KtukKN8dJumqpcdtUyIm5+O5PBvm/aQDWHC6/33VlwudJLQtgqHtcxJJXI7kxqc0Rq96EdOXS2aZmdRpmazEIjoLXEWi317pKCSr8qSNE2SIzbt3eKLn4Rcuidbx60irXx0D6TyVzGqj5Efu3ZXuRPAqz7i+p/wAfbfbO/gLC4aaNuekYLky4vpnLUvjczsHq74KLnOUTxI+X5Fqzes/eZr1R2UFcf60rPnEn01L34MfEZ/z2X9jSE1fBzUs9bUTMntu2SV70zM7OFcqp975yzeHmm63S2mnW+vdC6Zah8uYXK5uFxjqieBtzM2O+LVZ3LFImJRHjn/V1m/PyfRQqew3Ntmv9Bc3RLK2lmbKsaLhXY7sl8cS9H3LV1Jb4rc+na6nle9/bvVvJWoiYwildfcX1P+PtvtnfwG3FzYowxW0+5aJ3uE1sHF2C+36itTbNNC6pk2JI6drkbyVc4x5iKcaL55Zf6Wzxu/m6KPtJET8Y/wCpuP0jP0pwr1BZNU265VU1AsFNLvekcrlcqbVTkitTxMK68KNW3a7VdwqKi29rUyuld/Pv5ZXknwO5MJ6DWkcembqrPaI+pPVMK/tdybbmV7XUrKjyukfS5e5U7PcqLuTHVUwhr8rnKKqL4p3F+aX4T2iksrWagoYKy4K9znPZK/ajc+9RMKnd5u8iV04M3p11q3W2WgbQulcsDZJnI5rFXki+9Xp06livLwzaY3piaSlt0viah4I1dwVyLM6j2TeaRrkR360z6Sg3Z5469xdtk0DqS36Lv9gqJaFza5rXU6tmcqMflN2fe8kVET1EX+4vqfP9PbfbO/gI+PkxY+qOqNbZtEyiupKaxU0tCljq5KhH0rHVSOXKRy96IuE+wsPgldq2SsuFqkle+jZC2aNrlykbt2FRPBFz08xrKbgnf5JESor7fCzvVrnvX1YT9pamjtF0GjqCSGme+eomVFnqHphX46IidyJleXnNOTnxTimkTuStZ3tJAAclKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==";
const COUNTER_KEY = "voltlab_orden_counter";
const AYUDANTE_KEY = "voltlab_ayudante_nombre";

const TIPOS_FALLA = [
  { id:"no_enciende", label:"No enciende", icon:"🔋" },
  { id:"no_acelera", label:"No acelera / pierde fuerza", icon:"⚡" },
  { id:"bateria", label:"Problema de batería", icon:"🪫" },
  { id:"frenos", label:"Frenos", icon:"🛑" },
  { id:"ruedas", label:"Ruedas / neumáticos", icon:"🛞" },
  { id:"luces", label:"Luces / bocina", icon:"💡" },
  { id:"display", label:"Display / pantalla", icon:"📟" },
  { id:"cargador", label:"Cargador / puerto carga", icon:"🔌" },
  { id:"motor", label:"Ruido en motor", icon:"⚙️" },
  { id:"otro", label:"Otro", icon:"🔧" },
];

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

// ── Comprimir imagen antes de subir ──────────────────────────────────────────
function comprimirImagen(dataUrl, maxKB=200) {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let w=img.width, h=img.height;
      const max=1200;
      if(w>max){h=Math.round(h*max/w);w=max;}
      if(h>max){w=Math.round(w*max/h);h=max;}
      canvas.width=w; canvas.height=h;
      canvas.getContext("2d").drawImage(img,0,0,w,h);
      let q=0.8;
      const tryCompress = () => {
        const out=canvas.toDataURL("image/jpeg",q);
        if(out.length/1024<maxKB*1.37||q<0.3){res(out);}
        else{q-=0.1;tryCompress();}
      };
      tryCompress();
    };
    img.src=dataUrl;
  });
}

// ── jsPDF ─────────────────────────────────────────────────────────────────────
function cargarJsPDF() {
  return new Promise((res,rej)=>{
    if(window.jspdf){res(window.jspdf.jsPDF);return;}
    const s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    s.onload=()=>res(window.jspdf.jsPDF); s.onerror=rej;
    document.head.appendChild(s);
  });
}

async function generarPDF(r,{descargar=true,nOrdenParam=null}={}) {
  const jsPDF=await cargarJsPDF();
  const doc=new jsPDF({unit:"mm",format:"a4"});
  const W=210,mg=18; let y=0;
  const AZUL=[30,80,180],VERDE=[22,160,90],ROJO=[200,40,40],GRIS_M=[120,130,150],GRIS=[100,110,130],FONDO=[240,245,255],BORDE=[200,210,230];
  doc.setFillColor(15,25,50); doc.rect(0,0,W,36,"F");
  try{doc.addImage(LOGO_B64,"JPEG",mg,4,28,28,undefined,"FAST");}catch(e){}
  doc.setFontSize(16);doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");
  doc.text("VOLTLAB",mg+32,14);
  doc.setFontSize(8);doc.setTextColor(100,160,255);doc.setFont("helvetica","normal");
  doc.text("COMPROBANTE DE RECEPCION DE EQUIPO",mg+32,21);
  const fecha=r.fecha instanceof Date?r.fecha.toLocaleDateString("es-CL")+"  "+r.fecha.toLocaleTimeString("es-CL",{hour:"2-digit",minute:"2-digit"}):String(r.fecha||"");
  doc.setTextColor(180,200,240);doc.setFontSize(8);doc.text(fecha,W-mg,28,{align:"right"});
  const nOrden=nOrdenParam||r.nOrden||"0000";
  doc.setFontSize(10);doc.setTextColor(255,210,60);doc.setFont("helvetica","bold");
  doc.text("N\u00B0 "+nOrden,W-mg,14,{align:"right"});
  y=44;
  const sec=(titulo,fn)=>{doc.setFillColor(...FONDO);doc.setDrawColor(...BORDE);doc.roundedRect(mg,y,W-mg*2,7,1.5,1.5,"FD");doc.setFillColor(...AZUL);doc.rect(mg,y,3,7,"F");doc.setFontSize(8);doc.setTextColor(...AZUL);doc.setFont("helvetica","bold");doc.text(titulo.toUpperCase(),mg+6,y+5);y+=11;fn();y+=4;};
  const fila=(lbl,val,col)=>{doc.setFontSize(9);doc.setTextColor(...GRIS);doc.setFont("helvetica","normal");doc.text(lbl,mg+2,y);doc.setTextColor(...(col||[30,40,60]));doc.setFont("helvetica","bold");doc.text(String(val||"\u2014"),mg+52,y);y+=6;};
  const linea=()=>{doc.setDrawColor(...BORDE);doc.setLineWidth(0.2);doc.line(mg,y,W-mg,y);y+=4;};
  const vl=(v)=>v==="SI"?"SI":v==="NO"?"NO":v==="NA"?"N/A":"\u2014";
  const vc=(v)=>v==="SI"?VERDE:v==="NO"?ROJO:GRIS_M;
  sec("Datos del cliente",()=>{fila("Nombre:",r.cliente);fila("WhatsApp:","+56 "+r.telefono);});
  linea();
  if(r.fotoPreview){
    try{
      const img=new Image();
      img.src=r.fotoPreview;
      const maxW=W-mg*2;
      const maxH=60;
      let iw=img.naturalWidth||400;
      let ih=img.naturalHeight||300;
      let ratio=iw/ih;
      let drawW=maxW;
      let drawH=drawW/ratio;
      if(drawH>maxH){drawH=maxH;drawW=drawH*ratio;}
      const xOff=mg+(maxW-drawW)/2;
      doc.addImage(r.fotoPreview,"JPEG",xOff,y,drawW,drawH,undefined,"FAST");
      y+=drawH+4;linea();
    }catch(e){}
  }
  sec("Falla reportada",()=>{
    const labs=(r.tiposFalla||[]).map(id=>TIPOS_FALLA.find(t=>t.id===id)).filter(Boolean).map(t=>t.label).join(" / ");
    doc.setFontSize(9);doc.setTextColor(180,40,40);doc.setFont("helvetica","bold");
    const w1=doc.splitTextToSize(labs||"\u2014",W-mg*2-4);doc.text(w1,mg+2,y);y+=w1.length*5+2;
    if(r.motivoIngreso){doc.setFontSize(8.5);doc.setTextColor(80,80,100);doc.setFont("helvetica","normal");const w2=doc.splitTextToSize(r.motivoIngreso,W-mg*2-4);doc.text(w2,mg+2,y);y+=w2.length*5;}
  });
  linea();
  sec("Revision tecnica al ingreso",()=>{fila("Motor funciona:",vl(r.motorFunciona||r.motor_funciona),vc(r.motorFunciona||r.motor_funciona));fila("Luces y bocina:",vl(r.lucesBocina||r.luces_bocina),vc(r.lucesBocina||r.luces_bocina));fila("Neumaticos con aire:",vl(r.neumaticos||r.neumaticos),vc(r.neumaticos||r.neumaticos));});
  if(r.comentario){linea();sec("Observaciones",()=>{doc.setFontSize(8.5);doc.setTextColor(80,80,100);doc.setFont("helvetica","italic");const w=doc.splitTextToSize(r.comentario,W-mg*2-4);doc.text(w,mg+2,y);y+=w.length*5;});}
  // Revisión y diagnóstico info box
  linea();
  doc.setFillColor(240,245,255);
  doc.setDrawColor(...BORDE);
  doc.roundedRect(mg,y,W-mg*2,50,2,2,"FD");
  doc.setFontSize(8);doc.setTextColor(...AZUL);doc.setFont("helvetica","bold");
  doc.text("REVISION Y DIAGNOSTICO: $25.000",mg+4,y+7);
  doc.setFontSize(7.5);doc.setTextColor(...GRIS);doc.setFont("helvetica","normal");
  doc.text("Plazo: 1 a 4 dias habiles desde el dia siguiente al ingreso del equipo.",mg+4,y+14);
  doc.text("Se notificara el diagnostico y presupuesto por WhatsApp al numero registrado.",mg+4,y+20);
  doc.setTextColor(34,160,90);doc.setFont("helvetica","bold");
  doc.text("* Si acepta el presupuesto de reparacion, el valor de revision queda incluido en el total.",mg+4,y+27);
  doc.setTextColor(180,40,40);doc.setFont("helvetica","bold");
  doc.text("IMPORTANTE: ",mg+4,y+35);
  doc.setFont("helvetica","normal");doc.setTextColor(...GRIS);
  doc.text("Transcurrido 1 mes desde la notificacion del diagnostico sin respuesta del",mg+28,y+35);
  doc.text("cliente, el taller no se hace responsable del equipo ni de su estado de conservacion.",mg+4,y+42);
  y+=56;

  y+=6;doc.setDrawColor(...BORDE);doc.setLineWidth(0.3);
  doc.line(mg,y,mg+70,y);doc.setFontSize(7.5);doc.setTextColor(...GRIS);doc.setFont("helvetica","normal");
  doc.text("Firma y RUT del cliente",mg,y+4);doc.line(W-mg-70,y,W-mg,y);doc.text("Firma tecnico responsable",W-mg-70,y+4);
  doc.setFillColor(15,25,50);doc.rect(0,285,W,12,"F");doc.setFontSize(7);doc.setTextColor(120,150,200);
  doc.text("VoltLab  |  Comprobante de recepcion generado automaticamente",W/2,292,{align:"center"});
  const nombre="recibo-"+(r.cliente||"cliente").replace(/\s+/g,"-")+"-"+nOrden+".pdf";
  if(descargar)doc.save(nombre);
  return {blobUrl:URL.createObjectURL(doc.output("blob")),nombreArchivo:nombre,nOrden};
}

// ── Estilos base ──────────────────────────────────────────────────────────────
const E={color:"#ff5a5a",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginTop:4,display:"block"};
const LBL={color:"#7a8aaa",fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace"};
const INP={background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,padding:"12px 14px",color:"#e8edf5",fontSize:16,fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",boxSizing:"border-box",transition:"border 0.2s"};

const Inp=({label,value,onChange,type="text",placeholder,err})=>(
  <div style={{display:"flex",flexDirection:"column",gap:6}}>
    <label style={LBL}>{label}</label>
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{...INP,border:"1px solid "+(err?"#ff5a5a":"rgba(255,255,255,0.09)")}}
      onFocus={e=>e.target.style.borderColor="#4f8cff"}
      onBlur={e=>e.target.style.borderColor=err?"#ff5a5a":"rgba(255,255,255,0.09)"}/>
    {err&&<span style={E}>{err}</span>}
  </div>
);

const TA=({label,value,onChange,placeholder,rows=3,err})=>(
  <div style={{display:"flex",flexDirection:"column",gap:6}}>
    {label&&<label style={LBL}>{label}</label>}
    <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
      style={{...INP,fontSize:13,resize:"vertical",border:"1px solid "+(err?"#ff5a5a":"rgba(255,255,255,0.09)")}}/>
    {err&&<span style={E}>{err}</span>}
  </div>
);

const Check3=({label,icon,value,onChange,err})=>{
  const opts=[{v:"SI",c:"#22d07a",bg:"rgba(34,208,122,0.15)"},{v:"NO",c:"#ff5a5a",bg:"rgba(255,90,90,0.15)"},{v:"NA",c:"#7a8aaa",bg:"rgba(255,255,255,0.08)"}];
  return(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid "+(err?"#ff5a5a":"rgba(255,255,255,0.09)"),borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:17}}>{icon}</span><span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{label}</span></div>
      <div style={{display:"flex",gap:5}}>
        {opts.map(o=>(
          <button key={o.v} onClick={()=>onChange(o.v)} style={{padding:"5px 10px",borderRadius:7,border:"1.5px solid",borderColor:value===o.v?o.c:"rgba(255,255,255,0.13)",background:value===o.v?o.bg:"transparent",color:value===o.v?o.c:"rgba(255,255,255,0.3)",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"'DM Mono',monospace",transition:"all 0.15s"}}>
            {o.v==="NA"?"N/A":o.v}
          </button>
        ))}
      </div>
    </div>
  );
};

const Badge=({val})=>{
  if(!val)return<span style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace"}}>—</span>;
  const m={SI:{c:"#22d07a",bg:"rgba(34,208,122,0.12)"},NO:{c:"#ff5a5a",bg:"rgba(255,90,90,0.12)"},NA:{c:"#7a8aaa",bg:"rgba(255,255,255,0.06)"}}[val]||{c:"#7a8aaa",bg:"rgba(255,255,255,0.06)"};
  return<span style={{background:m.bg,color:m.c,borderRadius:5,padding:"2px 7px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{val==="NA"?"N/A":val}</span>;
};

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({onLogin}) {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const entrar=async()=>{
    if(!email||!pass){setErr("Completa todos los campos");return;}
    setLoading(true);setErr("");
    const{error}=await sb.auth.signInWithPassword({email,password:pass});
    if(error){setErr("Email o contraseña incorrectos");setLoading(false);return;}
    onLogin();
  };

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1117 0%,#111827 50%,#0d1117 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:380,display:"flex",flexDirection:"column",alignItems:"center",gap:28}}>
        <img src={LOGO_B64} alt="VoltLab" style={{height:90,width:"auto"}}/>
        <div style={{textAlign:"center"}}>
          <div style={{color:"#e8edf5",fontWeight:800,fontSize:22,fontFamily:"'DM Sans',sans-serif",letterSpacing:-0.5}}>VoltLab</div>
          <div style={{color:"#4f8cff",fontSize:11,fontFamily:"'DM Mono',monospace",letterSpacing:2,marginTop:4}}>SISTEMA DE INGRESOS</div>
        </div>
        <div style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:20,padding:28,display:"flex",flexDirection:"column",gap:16}}>
          <Inp label="Email" value={email} onChange={setEmail} type="email" placeholder="tu@email.com"/>
          <Inp label="Contraseña" value={pass} onChange={setPass} type="password" placeholder="••••••••"/>
          {err&&<div style={{background:"rgba(255,90,90,0.1)",border:"1px solid rgba(255,90,90,0.3)",borderRadius:8,padding:"10px 14px",color:"#ff5a5a",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{err}</div>}
          <button onClick={entrar} disabled={loading} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:12,padding:"14px",color:"#fff",fontSize:16,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1,marginTop:4}}>
            {loading?"⏳ Entrando...":"🔐 Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── FORM INGRESO ──────────────────────────────────────────────────────────────
function FormIngreso({onGuardar, prefill}) {
  const [f,setF]=useState({cliente:(prefill&&prefill.cliente)||"" ,telefono:(prefill&&prefill.telefono)||"" ,fotoPreview:null,fotoFile:null,tiposFalla:[],motivoIngreso:"",motorFunciona:null,lucesBocina:null,neumaticos:null,comentario:"",fechaIngreso:new Date().toISOString().split("T")[0]});
  const [err,setErr]=useState({});
  const [loading,setLoading]=useState(false);
  const fileRef=useRef();
  const s=(k,v)=>setF(p=>({...p,[k]:v}));

  const handleFoto=async(e)=>{
    const file=e.target.files[0]; if(!file)return;
    const rd=new FileReader();
    rd.onload=async ev=>{
      const comprimida=await comprimirImagen(ev.target.result);
      s("fotoPreview",comprimida);
      // Convert back to blob for upload
      const res=await fetch(comprimida);
      const blob=await res.blob();
      s("fotoFile",new File([blob],"foto.jpg",{type:"image/jpeg"}));
    };
    rd.readAsDataURL(file);
  };

  const toggleFalla=id=>s("tiposFalla",f.tiposFalla.includes(id)?f.tiposFalla.filter(x=>x!==id):[...f.tiposFalla,id]);

  const validate=()=>{
    const e={};
    if(!f.cliente.trim())e.cliente="Obligatorio";
    if(!f.telefono.trim())e.telefono="Obligatorio";
    if(f.tiposFalla.length===0)e.tiposFalla="Selecciona al menos una";
    if(!f.motivoIngreso.trim())e.motivoIngreso="Obligatorio";
    if(!f.motorFunciona)e.motorFunciona=true;
    if(!f.lucesBocina)e.lucesBocina=true;
    if(!f.neumaticos)e.neumaticos=true;
    setErr(e); return Object.keys(e).length===0;
  };

  const submit=async()=>{
    if(!validate())return;
    setLoading(true);
    const nOrden=await getNextOrden();
    const{data:{user}}=await sb.auth.getUser();
    let foto_url=null;

    // Subir foto a Storage
    if(f.fotoFile){
      const path=user.id+"/"+Date.now()+".jpg";
      const{error:upErr}=await sb.storage.from("fotos").upload(path,f.fotoFile);
      if(!upErr){
        const{data:urlData}=sb.storage.from("fotos").getPublicUrl(path);
        foto_url=urlData?.publicUrl||null;
        // Use signed URL instead for private bucket
        const{data:signed}=await sb.storage.from("fotos").createSignedUrl(path,60*60*24*365*5);
        foto_url=signed?.signedUrl||foto_url;
      }
    }

    const registro={
      user_id:user.id,
      n_orden:nOrden,
      cliente:f.cliente,
      telefono:f.telefono,
      foto_url,
      tipos_falla:f.tiposFalla,
      motivo_ingreso:f.motivoIngreso,
      motor_funciona:f.motorFunciona,
      luces_bocina:f.lucesBocina,
      neumaticos:f.neumaticos,
      comentario:f.comentario,
      estado:"pendiente",
      ayudante:null,
      ayudante_nombre:"",
      ayudante_trabajo:"",
      ayudante_monto:null,
      ayudante_pagado:false,
      fecha:new Date(f.fechaIngreso+"T12:00:00").toISOString(),
    };

    const{data,error}=await sb.from("registros").insert([registro]).select().single();
    if(error){alert("Error guardando: "+error.message);setLoading(false);return;}

    // Generar PDF con preview local (foto ya comprimida)
    const rParaPDF={...data,tiposFalla:data.tipos_falla,fotoPreview:f.fotoPreview,nOrden,motorFunciona:data.motor_funciona,lucesBocina:data.luces_bocina,neumaticos:data.neumaticos};
    try{await generarPDF(rParaPDF,{descargar:true,nOrdenParam:nOrden});}catch(e){}

    onGuardar(data);
    setF({cliente:"",telefono:"",fotoPreview:null,fotoFile:null,tiposFalla:[],motivoIngreso:"",motorFunciona:null,lucesBocina:null,neumaticos:null,comentario:"",fechaIngreso:new Date().toISOString().split("T")[0]});
    setErr({});setLoading(false);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div>
        <Inp label="Nombre del Cliente *" value={f.cliente} onChange={v=>s("cliente",v)} placeholder="Ej: Juan Pérez" err={err.cliente}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <label style={LBL}>WhatsApp *</label>
        <div style={{display:"flex",alignItems:"center"}}>
          <div style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.09)",borderRight:"none",borderRadius:"10px 0 0 10px",padding:"12px 12px",color:"#22d07a",fontSize:14,fontFamily:"'DM Mono',monospace",fontWeight:700,flexShrink:0}}>+56</div>
          <input type="tel" value={f.telefono} onChange={e=>s("telefono",e.target.value.replace(/\D/g,"").slice(0,9))} placeholder="912345678" maxLength={9}
            style={{...INP,borderRadius:"0 10px 10px 0",border:"1px solid "+(err.telefono?"#ff5a5a":"rgba(255,255,255,0.09)")}}
            onFocus={e=>e.target.style.borderColor="#4f8cff"}
            onBlur={e=>e.target.style.borderColor=err.telefono?"#ff5a5a":"rgba(255,255,255,0.09)"}/>
        </div>
        {err.telefono&&<span style={E}>{err.telefono}</span>}
        {f.telefono&&<a href={"https://wa.me/56"+f.telefono} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:4,color:"#22d07a",fontSize:13,textDecoration:"none"}}>💬 Abrir chat</a>}
      </div>

      <div>
        <label style={LBL}>Foto del equipo</label>
        <div onClick={()=>fileRef.current.click()} style={{marginTop:6,border:"1.5px dashed rgba(255,255,255,0.15)",borderRadius:12,minHeight:85,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden",background:"rgba(255,255,255,0.02)"}}>
          {f.fotoPreview?<img src={f.fotoPreview} alt="prev" style={{width:"100%",maxHeight:160,objectFit:"cover"}}/>:<div style={{textAlign:"center",color:"rgba(255,255,255,0.3)"}}><div style={{fontSize:26}}>📷</div><div style={{fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Toca para agregar foto</div></div>}
        </div>
        <div style={{display:"flex",gap:8,marginTop:6}}>
          <button onClick={()=>{fileRef.current.removeAttribute("capture");fileRef.current.click();}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"9px",color:"#c8d0e0",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>🖼 Galería</button>
          <button onClick={()=>{fileRef.current.setAttribute("capture","environment");fileRef.current.click();}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"9px",color:"#c8d0e0",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>📷 Cámara</button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFoto}/>
      </div>

      <div style={{background:"rgba(255,90,90,0.05)",border:"1.5px solid "+(err.tiposFalla?"#ff5a5a":"rgba(255,90,90,0.2)"),borderRadius:16,padding:16,display:"flex",flexDirection:"column",gap:12}}>
        <div><label style={{...LBL,color:"#ff8a8a"}}>🔧 Tipo de falla *</label><p style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginTop:3}}>Selecciona uno o más</p></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {TIPOS_FALLA.map(tf=>{const a=f.tiposFalla.includes(tf.id);return(
            <button key={tf.id} onClick={()=>toggleFalla(tf.id)} style={{padding:"9px 8px",borderRadius:10,border:"1.5px solid",borderColor:a?"#ff8a8a":"rgba(255,255,255,0.09)",background:a?"rgba(255,90,90,0.18)":"rgba(255,255,255,0.03)",color:a?"#ff8a8a":"rgba(255,255,255,0.4)",fontWeight:a?700:500,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6,transition:"all 0.15s"}}>
              <span style={{fontSize:15}}>{tf.icon}</span><span>{tf.label}</span>
            </button>
          );})}
        </div>
        {err.tiposFalla&&<span style={E}>{err.tiposFalla}</span>}
        <TA label="¿Por qué lo trae? *" value={f.motivoIngreso} onChange={v=>s("motivoIngreso",v)} placeholder="Describe la falla..." err={err.motivoIngreso}/>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <label style={LBL}>Revisión del equipo * <span style={{color:"#7a8aaa",fontWeight:400,fontSize:10,letterSpacing:0,textTransform:"none"}}>(N/A si no aplica)</span></label>
        <Check3 label="¿Motor funciona?" icon="⚡" value={f.motorFunciona} onChange={v=>s("motorFunciona",v)} err={err.motorFunciona}/>
        <Check3 label="¿Luces y bocina?" icon="🔦" value={f.lucesBocina} onChange={v=>s("lucesBocina",v)} err={err.lucesBocina}/>
        <Check3 label="¿Neumáticos con aire?" icon="🛞" value={f.neumaticos} onChange={v=>s("neumaticos",v)} err={err.neumaticos}/>
      </div>

      <TA label="Observaciones del técnico" value={f.comentario} onChange={v=>s("comentario",v)} placeholder="Notas internas, piezas, advertencias..."/>

      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <label style={LBL}>Fecha de ingreso</label>
        <input type="date" value={f.fechaIngreso} onChange={e=>s("fechaIngreso",e.target.value)}
          style={{...INP,colorScheme:"dark"}}/>
      </div>

      <button onClick={submit} disabled={loading} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:12,padding:16,color:"#fff",fontSize:16,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1,marginTop:4}}>
        {loading?"⏳ Guardando y subiendo foto...":"✅ Registrar Ingreso"}
      </button>
    </div>
  );
}

// ── Helpers para actualizar registro en Supabase ──────────────────────────────
async function actualizarDB(id, datos) {
  const{error}=await sb.from("registros").update(datos).eq("id",id);
  return !error;
}

// ── MODAL AYUDANTE ────────────────────────────────────────────────────────────
function ModalAyudante({r,onGuardar,onCerrar}) {
  const [con,setCon]=useState(r.ayudante==="con_ayudante");
  const [nombre,setNombre]=useState(r.ayudante_nombre||"Mauricio");
  const [trabajo,setTrabajo]=useState(r.ayudante_trabajo||"");
  const [monto,setMonto]=useState(r.ayudante_monto||"");
  const [pagado,setPagado]=useState(r.ayudante_pagado||false);
  const guardar=async()=>{
    const datos=con
      ?{ayudante:"con_ayudante",ayudante_nombre:nombre,ayudante_trabajo:trabajo,ayudante_monto:monto?Number(monto):null,ayudante_pagado:pagado}
      :{ayudante:null,ayudante_nombre:"",ayudante_trabajo:"",ayudante_monto:null,ayudante_pagado:false};
    if(con){if(!nombre.trim()){alert("Ingresa el nombre");return;}}
    await actualizarDB(r.id,datos);
    onGuardar({...r,...datos});
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#4f8cff",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>👥 Ayudante</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <div style={{display:"flex",gap:10}}>
          {[{v:true,l:"👥 Con ayudante"},{v:false,l:"👤 Sin ayudante"}].map(o=>(
            <button key={String(o.v)} onClick={()=>setCon(o.v)} style={{flex:1,padding:"10px 8px",borderRadius:10,border:"1.5px solid",borderColor:con===o.v?"#4f8cff":"rgba(255,255,255,0.1)",background:con===o.v?"rgba(79,140,255,0.18)":"transparent",color:con===o.v?"#4f8cff":"rgba(255,255,255,0.4)",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{o.l}</button>
          ))}
        </div>
        {con&&<>
          <Inp label="Nombre *" value={nombre} onChange={setNombre} placeholder="Ej: Pedro"/>
          <TA label="¿Qué realizó?" value={trabajo} onChange={setTrabajo} placeholder="Desmontaje, cambio de batería..." rows={2}/>
          <div style={{display:"flex",gap:12,alignItems:"flex-end"}}>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
              <label style={LBL}>Monto pagado</label>
              <input type="number" min="0" value={monto} onChange={e=>setMonto(e.target.value)} placeholder="Ej: 8000" style={INP}/>
            </div>
            <button onClick={()=>setPagado(p=>!p)} style={{padding:"12px 14px",borderRadius:10,border:"1.5px solid",borderColor:pagado?"#22d07a":"rgba(255,255,255,0.15)",background:pagado?"rgba(34,208,122,0.15)":"transparent",color:pagado?"#22d07a":"#7a8aaa",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>
              {pagado?"✅ Pagado":"⬜ Sin pagar"}
            </button>
          </div>
        </>}
        <button onClick={guardar} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:12,padding:13,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>💾 Guardar</button>
      </div>
    </div>
  );
}

// ── MODAL PRESUPUESTO ─────────────────────────────────────────────────────────
function ModalPresupuesto({r,onConfirmar,onCerrar}) {
  const [problema,setProblema]=useState(r.presupuesto_problema||"");
  const [trabajo,setTrabajo]=useState(r.presupuesto_trabajo||"");
  const [valor,setValor]=useState(r.presupuesto_valor||"");
  const [loading,setLoading]=useState(false);
  const guardar=async()=>{
    if(!problema.trim()||!trabajo.trim()||!valor){alert("Completa todos los campos");return;}
    setLoading(true);
    const datos={estado:"presupuesto",presupuesto_problema:problema,presupuesto_trabajo:trabajo,presupuesto_valor:Number(valor),fecha_presupuesto:new Date().toISOString()};
    await actualizarDB(r.id,datos);
    onConfirmar({...r,...datos});
    setLoading(false);
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:16,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#ffb432",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>📋 Registrar Presupuesto</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <div style={{color:"#7a8aaa",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Cliente: <strong style={{color:"#e8edf5"}}>{r.cliente}</strong></div>
        <TA label="Problema encontrado *" value={problema} onChange={setProblema} placeholder="Ej: Celda 3 de batería en cortocircuito..." rows={3}/>
        <TA label="Lo que se hará *" value={trabajo} onChange={setTrabajo} placeholder="Ej: Reemplazo de celda defectuosa..." rows={3}/>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Valor *</label>
          <input type="number" min="0" value={valor} onChange={e=>setValor(e.target.value)} placeholder="Ej: 45000" style={INP}/>
        </div>
        <button onClick={guardar} disabled={loading} style={{background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:12,padding:14,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1}}>
          {loading?"⏳ Guardando...":"💾 Guardar Presupuesto"}
        </button>
      </div>
    </div>
  );
}

// ── MODAL COMPLETAR ───────────────────────────────────────────────────────────
function ModalCompletar({r,onConfirmar,onCerrar}) {
  const [detalle,setDetalle]=useState(r.detalle_reparacion||r.presupuesto_trabajo||"");
  const [valor,setValor]=useState(r.valor_cobrado||r.presupuesto_valor||"");
  const [repuestos,setRepuestos]=useState(r.costo_repuestos||"");
  const [fechaComp,setFechaComp]=useState(new Date().toISOString().split("T")[0]);
  const confirmar=async()=>{
    if(!detalle.trim()||!valor){alert("Completa todos los campos");return;}
    const datos={estado:"completado",detalle_reparacion:detalle,valor_cobrado:Number(valor),costo_repuestos:repuestos?Number(repuestos):null,fecha_completado:new Date(fechaComp+"T12:00:00").toISOString()};
    await actualizarDB(r.id,datos);
    onConfirmar({...r,...datos});
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#22d07a",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>✅ Completar</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <div style={{color:"#7a8aaa",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Cliente: <strong style={{color:"#e8edf5"}}>{r.cliente}</strong></div>
        <TA label="Detalle de lo reparado *" value={detalle} onChange={setDetalle} placeholder="Ej: Cambio de batería, ajuste de frenos..." rows={3}/>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Valor cobrado *</label>
          <input type="number" min="0" value={valor} onChange={e=>setValor(e.target.value)} placeholder="Ej: 45000" style={INP}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Costo repuestos (opcional)</label>
          <input type="number" min="0" value={repuestos} onChange={e=>setRepuestos(e.target.value)} placeholder="Ej: 12000" style={INP}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Fecha de completado</label>
          <input type="date" value={fechaComp} onChange={e=>setFechaComp(e.target.value)} style={{...INP,colorScheme:"dark"}}/>
        </div>
        <button onClick={confirmar} style={{background:"linear-gradient(135deg,#22d07a,#4f8cff)",border:"none",borderRadius:12,padding:14,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>✅ Confirmar y completar</button>
      </div>
    </div>
  );
}

// ── MODAL GARANTIA ────────────────────────────────────────────────────────────
function ModalGarantia({r,onGuardar,onCerrar}) {
  const [desc,setDesc]=useState(r.garantia_desc||"");
  const [tipo,setTipo]=useState(r.garantia_tipo||null);
  const [monto,setMonto]=useState(r.garantia_monto||"");
  const guardar=async()=>{
    if(!desc.trim()){alert("Describe el problema");return;}
    if(!tipo){alert("Selecciona el tipo");return;}
    if((tipo==="cobro"||tipo==="devolucion")&&!monto){alert("Ingresa el monto");return;}
    const datos={garantia_activa:true,garantia_desc:desc,garantia_tipo:tipo,garantia_monto:monto?Number(monto):0,garantia_fecha:new Date().toISOString()};
    await actualizarDB(r.id,datos);
    onGuardar({...r,...datos});
  };
  const tipos=[{v:"cobro",l:"💰 Cobro adicional",c:"#22d07a",bg:"rgba(34,208,122,0.15)"},{v:"devolucion",l:"🔄 Devolución al cliente",c:"#ff5a5a",bg:"rgba(255,90,90,0.15)"},{v:"gratis",l:"✅ Sin costo",c:"#7a8aaa",bg:"rgba(255,255,255,0.08)"}];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:16,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#a78bfa",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>🛡 Garantía / Ajuste</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <TA label="Descripción del problema *" value={desc} onChange={setDesc} placeholder="Ej: Volvió con el mismo problema..." rows={3}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <label style={LBL}>Tipo *</label>
          {tipos.map(t=>(
            <button key={t.v} onClick={()=>setTipo(t.v)} style={{padding:"11px 14px",borderRadius:10,border:"1.5px solid",borderColor:tipo===t.v?t.c:"rgba(255,255,255,0.1)",background:tipo===t.v?t.bg:"transparent",color:tipo===t.v?t.c:"rgba(255,255,255,0.4)",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textAlign:"left"}}>{t.l}</button>
          ))}
        </div>
        {(tipo==="cobro"||tipo==="devolucion")&&(
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={LBL}>{tipo==="cobro"?"Monto adicional":"Monto devuelto"}</label>
            <input type="number" min="0" value={monto} onChange={e=>setMonto(e.target.value)} placeholder="Ej: 15000" style={INP}/>
          </div>
        )}
        <button onClick={guardar} style={{background:"linear-gradient(135deg,#a78bfa,#4f8cff)",border:"none",borderRadius:12,padding:14,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>🛡 Guardar garantía</button>
      </div>
    </div>
  );
}


// ── MODAL EDITAR PRESUPUESTO ──────────────────────────────────────────────────
function ModalEditarPresupuesto({r, onGuardar, onCerrar}) {
  const [problema, setProblema] = useState(r.presupuesto_problema||"");
  const [trabajo, setTrabajo] = useState(r.presupuesto_trabajo||"");
  const [valor, setValor] = useState(r.presupuesto_valor||"");
  const guardar = async () => {
    if(!problema.trim()||!trabajo.trim()||!valor){alert("Completa todos los campos");return;}
    const datos = {presupuesto_problema:problema, presupuesto_trabajo:trabajo, presupuesto_valor:Number(valor)};
    await actualizarDB(r.id, datos);
    onGuardar({...r,...datos});
  };
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:16,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#ffb432",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>✏️ Editar Presupuesto</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <div style={{color:"#7a8aaa",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Cliente: <strong style={{color:"#e8edf5"}}>{r.cliente}</strong></div>
        <TA label="Problema encontrado *" value={problema} onChange={setProblema} placeholder="Problema encontrado..." rows={3}/>
        <TA label="Lo que se hará *" value={trabajo} onChange={setTrabajo} placeholder="Trabajo a realizar..." rows={3}/>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Valor *</label>
          <input type="number" min="0" value={valor} onChange={e=>setValor(e.target.value)} placeholder="Ej: 45000" style={INP}/>
        </div>
        <button onClick={guardar} style={{background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:12,padding:14,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>💾 Guardar cambios</button>
      </div>
    </div>
  );
}

// ── MODAL EDITAR ──────────────────────────────────────────────────────────────
function ModalEditar({r,onGuardar,onCerrar}) {
  const [d,setD]=useState({...r});
  const s=(k,v)=>setD(p=>({...p,[k]:v}));
  const tog=id=>s("tipos_falla",d.tipos_falla.includes(id)?d.tipos_falla.filter(f=>f!==id):[...d.tipos_falla,id]);
  const guardar=async()=>{
    const datos={cliente:d.cliente,telefono:d.telefono,tipos_falla:d.tipos_falla,motivo_ingreso:d.motivo_ingreso,motor_funciona:d.motor_funciona,luces_bocina:d.luces_bocina,neumaticos:d.neumaticos,comentario:d.comentario};
    await actualizarDB(r.id,datos);
    onGuardar({...r,...datos});
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"flex-start",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)",overflowY:"auto",padding:"20px 0"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:24,width:"calc(100% - 32px)",maxWidth:480,display:"flex",flexDirection:"column",gap:14,margin:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#e8edf5",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>✏️ Editar</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <Inp label="Nombre" value={d.cliente} onChange={v=>s("cliente",v)}/>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>WhatsApp</label>
          <div style={{display:"flex",alignItems:"center"}}>
            <div style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.09)",borderRight:"none",borderRadius:"10px 0 0 10px",padding:"12px 12px",color:"#22d07a",fontSize:14,fontFamily:"'DM Mono',monospace",fontWeight:700,flexShrink:0}}>+56</div>
            <input type="tel" value={d.telefono} onChange={e=>s("telefono",e.target.value.replace(/\D/g,"").slice(0,9))} placeholder="912345678" style={{...INP,borderRadius:"0 10px 10px 0"}}/>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Fallas</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            {TIPOS_FALLA.map(tf=>{const a=(d.tipos_falla||[]).includes(tf.id);return<button key={tf.id} onClick={()=>tog(tf.id)} style={{padding:"8px",borderRadius:8,border:"1.5px solid",borderColor:a?"#ff8a8a":"rgba(255,255,255,0.09)",background:a?"rgba(255,90,90,0.18)":"rgba(255,255,255,0.03)",color:a?"#ff8a8a":"rgba(255,255,255,0.4)",fontWeight:a?700:500,fontSize:11,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:5}}><span>{tf.icon}</span><span>{tf.label}</span></button>;})}
          </div>
        </div>
        <TA label="Motivo" value={d.motivo_ingreso} onChange={v=>s("motivo_ingreso",v)} rows={2}/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <label style={LBL}>Revisión</label>
          <Check3 label="Motor" icon="⚡" value={d.motor_funciona} onChange={v=>s("motor_funciona",v)}/>
          <Check3 label="Luces y bocina" icon="🔦" value={d.luces_bocina} onChange={v=>s("luces_bocina",v)}/>
          <Check3 label="Neumáticos" icon="🛞" value={d.neumaticos} onChange={v=>s("neumaticos",v)}/>
        </div>
        <TA label="Observaciones" value={d.comentario} onChange={v=>s("comentario",v)} rows={2}/>
        <button onClick={guardar} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:12,padding:13,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>💾 Guardar</button>
      </div>
    </div>
  );
}

// ── TARJETA PENDIENTE ─────────────────────────────────────────────────────────
function CardPendiente({r,onEliminar,onPresupuesto,onEditar,onAyudante,onCompletar,onFotoClick}) {
  const [genPDF,setGenPDF]=useState(false);
  const wa="56"+r.telefono.replace(/\D/g,"");
  const fecha=new Date(r.fecha).toLocaleDateString("es-CL");
  const pdfWA=async()=>{
    setGenPDF(true);
    try{
      const{nOrden}=await generarPDF({...r,tiposFalla:r.tipos_falla,fotoPreview:r.foto_url,nOrden:r.n_orden,motorFunciona:r.motor_funciona,lucesBocina:r.luces_bocina,neumaticos:r.neumaticos},{descargar:true,nOrdenParam:r.n_orden});
      const fallas=(r.tipos_falla||[]).map(id=>{const t=TIPOS_FALLA.find(x=>x.id===id);return t?t.label:"";}).filter(Boolean).join(", ");
      const msg="Hola "+r.cliente+" \uD83D\uDC4B\n\nAdjuntamos tu comprobante N\u00B0 "+r.n_orden+".\nFalla: "+fallas+"\n\nTe avisamos pronto. \u26A1";
      setTimeout(()=>window.open("https://wa.me/"+wa+"?text="+encodeURIComponent(msg),"_blank"),600);
    }catch(e){alert("Error generando PDF.");}
    setGenPDF(false);
  };
  return(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:16,padding:18,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{color:"#e8edf5",fontWeight:700,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
          <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace",marginTop:2}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{fecha}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <div style={{background:"rgba(255,180,50,0.15)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:6,padding:"3px 9px",color:"#ffb432",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>⏳ PENDIENTE</div>
          {(()=>{const d=diasEnTaller(r.fecha);const u=urgenciaBadge(d);return <div style={{background:u.bg,border:"1px solid "+u.border,borderRadius:6,padding:"2px 8px",color:u.color,fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{d}d en taller</div>;})()} 
        </div>
      </div>
      {r.foto_url&&<img src={r.foto_url} alt="eq" onClick={()=>onFotoClick&&onFotoClick(r.foto_url)} style={{width:"100%",borderRadius:10,maxHeight:220,objectFit:"contain",background:"rgba(0,0,0,0.3)",cursor:"zoom-in"}}/>}
      <div style={{background:"rgba(255,90,90,0.07)",border:"1px solid rgba(255,90,90,0.18)",borderRadius:10,padding:"10px 12px"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{(r.tipos_falla||[]).map(id=>{const tf=TIPOS_FALLA.find(t=>t.id===id);return tf?<span key={id} style={{background:"rgba(255,90,90,0.15)",border:"1px solid rgba(255,138,138,0.3)",borderRadius:6,padding:"3px 8px",color:"#ff8a8a",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>{tf.icon} {tf.label}</span>:null;})}</div>
        {r.motivo_ingreso&&<div style={{color:"#d0a0a0",fontSize:12,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5,marginTop:6}}>{r.motivo_ingreso}</div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        {[{icon:"⚡",label:"Motor",val:r.motor_funciona},{icon:"🔦",label:"Luces",val:r.luces_bocina},{icon:"🛞",label:"Neumát.",val:r.neumaticos}].map(it=>(
          <div key={it.label} style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"8px 6px",textAlign:"center",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{fontSize:15}}>{it.icon}</div>
            <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",marginBottom:3}}>{it.label}</div>
            <Badge val={it.val}/>
          </div>
        ))}
      </div>
      {r.comentario&&<div style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"10px 12px",color:"#a0a8bc",fontSize:13,fontFamily:"'DM Sans',sans-serif",borderLeft:"3px solid rgba(79,140,255,0.4)"}}>{r.comentario}</div>}
      <div style={{background:"rgba(79,140,255,0.06)",border:"1px solid rgba(79,140,255,0.15)",borderRadius:12,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <div>
          {r.ayudante==="con_ayudante"?(<div>
            <div style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>👥 {r.ayudante_nombre||"Ayudante"}</div>
            {r.ayudante_trabajo&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{r.ayudante_trabajo}</div>}
            <div style={{display:"flex",gap:7,marginTop:4,alignItems:"center",flexWrap:"wrap"}}>
              {r.ayudante_monto?<span style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{fmt(r.ayudante_monto)}</span>:null}
              <span style={{background:r.ayudante_pagado?"rgba(34,208,122,0.15)":"rgba(255,90,90,0.12)",color:r.ayudante_pagado?"#22d07a":"#ff8a8a",borderRadius:5,padding:"2px 7px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{r.ayudante_pagado?"✅ Pagado":"⚠ Sin pagar"}</span>
            </div>
          </div>):(<span style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>👤 Sin ayudante</span>)}
        </div>
        <button onClick={onAyudante} style={{background:"rgba(79,140,255,0.12)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"7px 12px",color:"#4f8cff",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontWeight:600}}>
          {r.ayudante==="con_ayudante"?"✏️ Editar":"➕ Agregar"}
        </button>
      </div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        <button onClick={pdfWA} disabled={genPDF} style={{display:"inline-flex",alignItems:"center",gap:4,background:genPDF?"rgba(255,255,255,0.05)":"rgba(255,100,50,0.15)",border:"1px solid rgba(255,100,50,0.35)",borderRadius:8,padding:"8px 10px",color:genPDF?"#7a8aaa":"#ff6432",fontSize:11,cursor:genPDF?"not-allowed":"pointer",fontWeight:700}}>
          {genPDF?"⏳":"📄"} PDF+WA
        </button>
        <a href={"https://wa.me/"+wa} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",background:"rgba(34,208,122,0.1)",border:"1px solid rgba(34,208,122,0.25)",borderRadius:8,padding:"8px 10px",color:"#22d07a",fontSize:13,textDecoration:"none"}}>💬</a>
        <button onClick={onEditar} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"8px 10px",color:"#c8d0e0",fontSize:13,cursor:"pointer"}}>✏️</button>
        <button onClick={onPresupuesto} style={{flex:1,background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:8,padding:"8px 10px",color:"#fff",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontWeight:700}}>📋 Presupuesto</button>
        <button onClick={onCompletar} style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:8,padding:"8px 10px",color:"#22d07a",fontSize:12,cursor:"pointer",fontWeight:700}}>✅</button>
        <button onClick={onEliminar} style={{background:"transparent",border:"1px solid rgba(255,90,90,0.2)",borderRadius:8,padding:"8px 10px",color:"rgba(255,90,90,0.5)",fontSize:12,cursor:"pointer"}}>🗑</button>
      </div>
    </div>
  );
}

// ── TARJETA PRESUPUESTO ───────────────────────────────────────────────────────
function CardPresupuesto({r,onEliminar,onEditar,onEditarPresupuesto,onAyudante,onCompletar,onReenviar,onRevertir,onFotoClick}) {
  const wa="56"+r.telefono.replace(/\D/g,"");
  const fecha=r.fecha_presupuesto?new Date(r.fecha_presupuesto).toLocaleDateString("es-CL"):new Date(r.fecha).toLocaleDateString("es-CL");
  return(
    <div style={{background:"rgba(255,180,50,0.04)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:16,padding:18,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{color:"#e8edf5",fontWeight:700,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
          <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace",marginTop:2}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{fecha}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <div style={{background:"rgba(255,180,50,0.15)",border:"1px solid rgba(255,180,50,0.4)",borderRadius:6,padding:"3px 9px",color:"#ffb432",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>📋 PRESUPUESTO</div>
          {(()=>{const d=diasEnTaller(r.fecha);const u=urgenciaBadge(d);return <div style={{background:u.bg,border:"1px solid "+u.border,borderRadius:6,padding:"2px 8px",color:u.color,fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{d}d en taller</div>;})()} 
          {r.fecha_presupuesto&&(()=>{const dp=diasEnTaller(r.fecha_presupuesto);return <div style={{background:"rgba(255,180,50,0.1)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:6,padding:"2px 8px",color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{dp}d en presup.</div>;})()} 
        </div>
      </div>
      {r.foto_url&&<img src={r.foto_url} alt="eq" onClick={()=>onFotoClick&&onFotoClick(r.foto_url)} style={{width:"100%",borderRadius:10,maxHeight:220,objectFit:"contain",background:"rgba(0,0,0,0.3)",cursor:"zoom-in"}}/>}
      <div style={{background:"rgba(255,180,50,0.07)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:10,padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
        <div><div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,marginBottom:3}}>PROBLEMA</div><div style={{color:"#e0d0a0",fontSize:13,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{r.presupuesto_problema}</div></div>
        <div><div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,marginBottom:3}}>LO QUE SE HARÁ</div><div style={{color:"#e0d0a0",fontSize:13,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{r.presupuesto_trabajo}</div></div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>VALOR COTIZADO</div>
          <div style={{color:"#ffb432",fontWeight:800,fontSize:18,fontFamily:"'DM Mono',monospace"}}>{fmt(r.presupuesto_valor)}</div>
        </div>
      </div>
      <div style={{background:"rgba(79,140,255,0.06)",border:"1px solid rgba(79,140,255,0.15)",borderRadius:12,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <div>
          {r.ayudante==="con_ayudante"?(<div>
            <div style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>👥 {r.ayudante_nombre||"Ayudante"}</div>
            <div style={{display:"flex",gap:7,marginTop:3,alignItems:"center"}}>
              {r.ayudante_monto?<span style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{fmt(r.ayudante_monto)}</span>:null}
              <span style={{background:r.ayudante_pagado?"rgba(34,208,122,0.15)":"rgba(255,90,90,0.12)",color:r.ayudante_pagado?"#22d07a":"#ff8a8a",borderRadius:5,padding:"2px 7px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{r.ayudante_pagado?"✅ Pagado":"⚠ Sin pagar"}</span>
            </div>
          </div>):(<span style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>👤 Sin ayudante</span>)}
        </div>
        <button onClick={onAyudante} style={{background:"rgba(79,140,255,0.12)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"7px 12px",color:"#4f8cff",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontWeight:600}}>{r.ayudante==="con_ayudante"?"✏️":"➕"}</button>
      </div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        <button onClick={onReenviar} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(255,180,50,0.12)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:8,padding:"8px 10px",color:"#ffb432",fontSize:11,cursor:"pointer",fontWeight:700}}>📤 Reenviar</button>
        <a href={"https://wa.me/"+wa} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",background:"rgba(34,208,122,0.1)",border:"1px solid rgba(34,208,122,0.25)",borderRadius:8,padding:"8px 10px",color:"#22d07a",fontSize:13,textDecoration:"none"}}>💬</a>
        <button onClick={onEditar} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"8px 10px",color:"#c8d0e0",fontSize:13,cursor:"pointer"}}>✏️ Registro</button>
        <button onClick={onEditarPresupuesto} style={{background:"rgba(255,180,50,0.1)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:8,padding:"8px 10px",color:"#ffb432",fontSize:12,cursor:"pointer",fontWeight:600}}>✏️ Presup.</button>
        <button onClick={onCompletar} style={{flex:1,background:"linear-gradient(135deg,#22d07a,#4f8cff)",border:"none",borderRadius:8,padding:"8px 12px",color:"#fff",fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",fontWeight:700}}>✅ Completar</button>
        <button onClick={onRevertir} style={{background:"rgba(255,180,50,0.1)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:8,padding:"8px 10px",color:"#ffb432",fontSize:12,cursor:"pointer",fontWeight:600}}>↩</button>
        <button onClick={onEliminar} style={{background:"transparent",border:"1px solid rgba(255,90,90,0.2)",borderRadius:8,padding:"8px 10px",color:"rgba(255,90,90,0.5)",fontSize:12,cursor:"pointer"}}>🗑</button>
      </div>
    </div>
  );
}

// ── TARJETA COMPLETADO ────────────────────────────────────────────────────────

// ── MODAL EDITAR COMPLETADO ───────────────────────────────────────────────────
function ModalEditarCompletado({r, onGuardar, onCerrar}) {
  const [detalle, setDetalle] = useState(r.detalle_reparacion||"");
  const [valor, setValor] = useState(r.valor_cobrado||"");
  const [repuestos, setRepuestos] = useState(r.costo_repuestos||"");
  const [fechaComp, setFechaComp] = useState(r.fecha_completado?new Date(r.fecha_completado).toISOString().split("T")[0]:"");
  const guardar = async () => {
    if(!detalle.trim()||!valor){alert("Completa los campos obligatorios");return;}
    const datos = {
      detalle_reparacion:detalle,
      valor_cobrado:Number(valor),
      costo_repuestos:repuestos?Number(repuestos):null,
      fecha_completado:fechaComp?new Date(fechaComp+"T12:00:00").toISOString():r.fecha_completado
    };
    await actualizarDB(r.id, datos);
    onGuardar({...r,...datos});
  };
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161d2a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#22d07a",fontWeight:800,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>✏️ Editar Completado</span>
          <button onClick={onCerrar} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        <div style={{color:"#7a8aaa",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Cliente: <strong style={{color:"#e8edf5"}}>{r.cliente}</strong></div>
        <TA label="Detalle de lo reparado *" value={detalle} onChange={setDetalle} placeholder="Ej: Cambio de batería..." rows={3}/>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Valor cobrado *</label>
          <input type="number" min="0" value={valor} onChange={e=>setValor(e.target.value)} placeholder="Ej: 45000" style={INP}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Costo repuestos (opcional)</label>
          <input type="number" min="0" value={repuestos} onChange={e=>setRepuestos(e.target.value)} placeholder="Ej: 12000" style={INP}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Fecha de completado</label>
          <input type="date" value={fechaComp} onChange={e=>setFechaComp(e.target.value)} style={{...INP,colorScheme:"dark"}}/>
        </div>
        <button onClick={guardar} style={{background:"linear-gradient(135deg,#22d07a,#4f8cff)",border:"none",borderRadius:12,padding:14,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>💾 Guardar cambios</button>
      </div>
    </div>
  );
}

function CardCompletado({r,onEliminar,onGarantia,onAyudante,onFotoClick,onEditar,onRevertir,onRepetir}) {
  const wa="56"+r.telefono.replace(/\D/g,"");
  const fechaC=r.fecha_completado?new Date(r.fecha_completado).toLocaleDateString("es-CL"):"—";
  const dias=r.fecha&&r.fecha_completado?Math.round(Math.abs((new Date(r.fecha_completado)-new Date(r.fecha))/86400000)):null;
  const montoBase=Number(r.valor_cobrado)||0;
  const ajuste=r.garantia_activa?(r.garantia_tipo==="cobro"?Number(r.garantia_monto)||0:r.garantia_tipo==="devolucion"?-(Number(r.garantia_monto)||0):0):0;
  const montoFinal=montoBase+ajuste;
  return(
    <div style={{background:"rgba(34,208,122,0.04)",border:"1px solid rgba(34,208,122,0.15)",borderRadius:16,padding:18,display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{color:"#e8edf5",fontWeight:700,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
          <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace",marginTop:1}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{fechaC}{dias!==null?" · "+dias+"d":""}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <div style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:6,padding:"3px 9px",color:"#22d07a",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>✅ COMPLETADO</div>
          {r.garantia_activa&&<div style={{background:"rgba(167,139,250,0.15)",border:"1px solid rgba(167,139,250,0.3)",borderRadius:6,padding:"3px 9px",color:"#a78bfa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:700}}>🛡 GARANTÍA</div>}
        </div>
      </div>
      {r.foto_url&&<img src={r.foto_url} alt="eq" onClick={()=>onFotoClick&&onFotoClick(r.foto_url)} style={{width:"100%",borderRadius:10,maxHeight:220,objectFit:"contain",background:"rgba(0,0,0,0.3)",cursor:"zoom-in"}}/>}
      {r.detalle_reparacion&&<div style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"10px 12px",borderLeft:"3px solid rgba(34,208,122,0.4)"}}><div style={{color:"#22d07a",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,marginBottom:4}}>TRABAJO REALIZADO</div><div style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{r.detalle_reparacion}</div></div>}
      {r.garantia_activa&&<div style={{background:"rgba(167,139,250,0.07)",border:"1px solid rgba(167,139,250,0.2)",borderRadius:8,padding:"10px 12px",borderLeft:"3px solid rgba(167,139,250,0.5)"}}>
        <div style={{color:"#a78bfa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,marginBottom:4}}>🛡 {r.garantia_tipo==="cobro"?"Cobro adicional":r.garantia_tipo==="devolucion"?"Devolución":"Sin costo"}</div>
        <div style={{color:"#c8d0e0",fontSize:12,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5,marginBottom:r.garantia_monto?4:0}}>{r.garantia_desc}</div>
        {r.garantia_monto>0&&<div style={{color:r.garantia_tipo==="devolucion"?"#ff5a5a":"#22d07a",fontWeight:700,fontSize:14,fontFamily:"'DM Mono',monospace"}}>{r.garantia_tipo==="devolucion"?"-":"+"}{fmt(r.garantia_monto)}</div>}
      </div>}


      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{background:"rgba(34,208,122,0.12)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:8,padding:"6px 12px"}}>
          <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>{r.garantia_activa&&ajuste!==0?"TOTAL FINAL":"COBRADO"}</div>
          <div style={{color:"#22d07a",fontWeight:800,fontSize:16,fontFamily:"'DM Mono',monospace"}}>{fmt(montoFinal)}</div>
          {r.garantia_activa&&ajuste!==0&&<div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace"}}>Base: {fmt(montoBase)}</div>}
        </div>
        {r.costo_repuestos>0&&<div style={{background:"rgba(255,180,50,0.1)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:8,padding:"6px 12px"}}>
          <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>REPUESTOS</div>
          <div style={{color:"#ffb432",fontWeight:800,fontSize:14,fontFamily:"'DM Mono',monospace"}}>{fmt(r.costo_repuestos)}</div>
        </div>}
        <a href={"https://wa.me/"+wa} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",background:"rgba(34,208,122,0.08)",border:"1px solid rgba(34,208,122,0.2)",borderRadius:8,padding:"6px 10px",color:"#22d07a",fontSize:13,textDecoration:"none"}}>💬</a>
        <button onClick={onEditar} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"6px 10px",color:"#c8d0e0",fontSize:12,cursor:"pointer",fontWeight:600}}>✏️ Editar</button>
        <button onClick={onRevertir} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(255,180,50,0.1)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:8,padding:"6px 10px",color:"#ffb432",fontSize:12,cursor:"pointer",fontWeight:600}}>↩ Revertir</button>
        <button onClick={onGarantia} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(167,139,250,0.1)",border:"1px solid rgba(167,139,250,0.3)",borderRadius:8,padding:"6px 10px",color:"#a78bfa",fontSize:12,cursor:"pointer",fontWeight:700}}>🛡 {r.garantia_activa?"Editar":"Garantía"}</button>
        <button onClick={onRepetir} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(79,140,255,0.1)",border:"1px solid rgba(79,140,255,0.25)",borderRadius:8,padding:"6px 10px",color:"#4f8cff",fontSize:12,cursor:"pointer",fontWeight:600}}>🔁 Repetir</button>
        <button onClick={onEliminar} style={{background:"transparent",border:"1px solid rgba(255,90,90,0.2)",borderRadius:8,padding:"6px 10px",color:"rgba(255,90,90,0.5)",fontSize:12,cursor:"pointer"}}>🗑</button>
      </div>
    </div>
  );
}

// ── ESTADÍSTICAS ──────────────────────────────────────────────────────────────
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

// ── APP PRINCIPAL ─────────────────────────────────────────────────────────────
export default function App() {
  const [session,setSession]=useState(null);
  const [loading,setLoading]=useState(true);
  const [registros,setRegistros]=useState([]);
  const [tab,setTab]=useState("nuevo");
  const [subPend,setSubPend]=useState("sinPagar");
  const [toast,setToast]=useState(null);
  const [asistenciaData,setAsistenciaData]=useState([]);
  const [mPresupuesto,setMPresupuesto]=useState(null);
  const [mEditarPresupuesto,setMEditarPresupuesto]=useState(null);
  const [mCompletar,setMCompletar]=useState(null);
  const [mEditar,setMEditar]=useState(null);
  const [mAyudante,setMAyudante]=useState(null);
  const [mAyudanteComp,setMAyudanteComp]=useState(null);
  const [mEditarComp,setMEditarComp]=useState(null);
  const [mGarantia,setMGarantia]=useState(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const [filtroPend,setFiltroPend]=useState("todo");
  const [filtroPresup,setFiltroPresup]=useState("hoy");
  const [filtroComp,setFiltroComp]=useState("hoy");
  const [showFormIngreso,setShowFormIngreso]=useState(false);
  const [prefillIngreso,setPrefillIngreso]=useState(null);
  const [showRegistroRapido,setShowRegistroRapido]=useState(false);
  const [fichaRegistro,setFichaRegistro]=useState(null);
  const [fotoViewer,setFotoViewer]=useState(null);

  // ── Auth ──────────────────────────────────────────────────────────────────
  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setLoading(false);});
    const{data:{subscription}}=sb.auth.onAuthStateChange((_,session)=>setSession(session));
    return()=>subscription.unsubscribe();
  },[]);

  // ── Cargar registros ──────────────────────────────────────────────────────
  useEffect(()=>{
    if(!session)return;
    cargarRegistros();
  },[session]);

  const cargarRegistros=async()=>{
    const{data,error}=await sb.from("registros").select("*").order("fecha",{ascending:false});
    if(!error&&data)setRegistros(data);
    // Load asistencia
    const{data:asist}=await sb.from("asistencia").select("*").order("hora",{ascending:false}).limit(500);
    if(asist)setAsistenciaData(asist);
  };

  const tk=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),2800);};

  const guardar=async(r)=>{
    setRegistros(prev=>[r,...prev]);
    tk("✅ Registro guardado");
    setTab("pendientes");
  };

  const eliminar=async(id)=>{
    if(!window.confirm("¿Eliminar este registro?"))return;
    await sb.from("registros").delete().eq("id",id);
    setRegistros(prev=>prev.filter(r=>r.id!==id));
    tk("🗑 Eliminado",false);
  };

  const actualizarLocal=(id,datos)=>setRegistros(prev=>prev.map(r=>r.id===id?{...r,...datos}:r));

  const pendientesTodas=registros.filter(r=>r.estado==="pendiente").sort((a,b)=>new Date(b.fecha)-new Date(a.fecha));
  const pendientes=filtroPend==="todo"?pendientesTodas:pendientesTodas.filter(r=>enRango(r.fecha,filtroPend));
  const pSinPagar=pendientes.filter(r=>!(r.ayudante==="con_ayudante"&&r.ayudante_pagado));
  const pConAyPagado=pendientes.filter(r=>r.ayudante==="con_ayudante"&&r.ayudante_pagado);
  const presupuestosTodas=registros.filter(r=>r.estado==="presupuesto").sort((a,b)=>new Date(b.fecha)-new Date(a.fecha));
  const presupuestos=filtroPresup==="todo"?presupuestosTodas:presupuestosTodas.filter(r=>enRango(r.fecha,filtroPresup));
  const completadosTodas=registros.filter(r=>r.estado==="completado").sort((a,b)=>new Date(b.fecha_completado||b.fecha)-new Date(a.fecha_completado||a.fecha));
  const completados=filtroComp==="todo"?completadosTodas:completadosTodas.filter(r=>enRango(r.fecha_completado||r.fecha,filtroComp));

  const repetirCliente=(r)=>{
    // Abrir formulario prellenado con datos del cliente
    setPrefillIngreso({ cliente: r.cliente, telefono: r.telefono });
    setShowFormIngreso(true);
  };

  const revertirCompletado=async(r)=>{
    // Vuelve al paso anterior: si tenía presupuesto → presupuesto, si no → pendiente
    const tienePresupuesto = r.presupuesto_problema || r.presupuesto_trabajo || r.presupuesto_valor;
    const nuevoEstado = tienePresupuesto ? "presupuesto" : "pendiente";
    const datos = {
      estado: nuevoEstado,
      fecha_completado: null,
      detalle_reparacion: null,
      valor_cobrado: null,
      costo_repuestos: null,
      garantia_activa: false,
      garantia_desc: null,
      garantia_tipo: null,
      garantia_monto: null,
      garantia_fecha: null,
    };
    await actualizarDB(r.id, datos);
    actualizarLocal(r.id, datos);
    tk("↩ Vuelto a "+(nuevoEstado==="presupuesto"?"Presupuesto":"Pendiente"));
  };

  const revertirPendiente=async(r)=>{
    const datos={estado:"pendiente",fecha_presupuesto:null,presupuesto_problema:"",presupuesto_trabajo:"",presupuesto_valor:null};
    await actualizarDB(r.id,datos);
    actualizarLocal(r.id,datos);
    tk("↩ Vuelto a Pendiente");
  };

  const reenviarPresupuesto=(r)=>{
    const wa="56"+r.telefono.replace(/\D/g,"");
    const msg="Hola "+r.cliente+" \uD83D\uDC4B\n\nTe reenviamos el presupuesto:\n\n\uD83D\uDD0D Problema: "+r.presupuesto_problema+"\n\n\uD83D\uDD27 Trabajo: "+r.presupuesto_trabajo+"\n\n\uD83D\uDCB0 Valor: "+fmt(r.presupuesto_valor)+"\n\n\u00BFApruebas? \u26A1";
    window.open("https://wa.me/"+wa+"?text="+encodeURIComponent(msg),"_blank");
  };

  const cerrarSesion=async()=>{await sb.auth.signOut();};



  if(loading)return(
    <div style={{minHeight:"100vh",background:"#0d1117",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{color:"#4f8cff",fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>⏳ Cargando...</div>
    </div>
  );

  if(!session)return<Login onLogin={()=>{}}/>;

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=DM+Mono:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{touch-action:manipulation;-webkit-text-size-adjust:100%;}
        body{background:#0d1117}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px}
        input,textarea,select{font-size:16px !important;}
        input[type=number]::-webkit-inner-spin-button{opacity:0.4}
        textarea{box-sizing:border-box;width:100%}
      `}</style>
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1117 0%,#111827 50%,#0d1117 100%)",color:"#e8edf5",fontFamily:"'DM Sans',sans-serif",paddingBottom:90}}>

        <div style={{background:"rgba(13,17,23,0.93)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"14px 18px 10px",position:"sticky",top:0,zIndex:10}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <img src={LOGO_B64} alt="VoltLab" style={{height:58,width:"auto",flexShrink:0}}/>
              <div>
                <div style={{fontWeight:800,fontSize:16,letterSpacing:-0.3}}>VoltLab</div>
                <div style={{color:"#4f8cff",fontSize:10,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>SISTEMA DE INGRESOS</div>
              </div>
            </div>
            <button onClick={cerrarSesion} style={{background:"rgba(255,90,90,0.1)",border:"1px solid rgba(255,90,90,0.2)",borderRadius:8,padding:"6px 12px",color:"rgba(255,90,90,0.7)",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Salir</button>
          </div>
        </div>

        {toast&&<div style={{position:"fixed",bottom:88,left:"50%",transform:"translateX(-50%)",background:toast.ok?"rgba(34,208,122,0.95)":"rgba(70,70,80,0.95)",color:"#fff",padding:"11px 20px",borderRadius:12,fontWeight:700,fontSize:13,fontFamily:"'DM Sans',sans-serif",zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.4)",whiteSpace:"nowrap"}}>{toast.msg}</div>}

        {mPresupuesto&&<ModalPresupuesto r={mPresupuesto} onConfirmar={r=>{actualizarLocal(r.id,r);setMPresupuesto(null);tk("📋 Presupuesto enviado");setTab("presupuestos");}} onCerrar={()=>setMPresupuesto(null)}/>}
        {mCompletar&&<ModalCompletar r={mCompletar} onConfirmar={r=>{actualizarLocal(r.id,r);setMCompletar(null);tk("✅ Completado");}} onCerrar={()=>setMCompletar(null)}/>}
        {mEditar&&<ModalEditar r={mEditar} onGuardar={r=>{actualizarLocal(r.id,r);setMEditar(null);tk("💾 Actualizado");}} onCerrar={()=>setMEditar(null)}/>}
        {mAyudante&&<ModalAyudante r={mAyudante} onGuardar={r=>{actualizarLocal(r.id,r);setMAyudante(null);tk("👥 Ayudante guardado");}} onCerrar={()=>setMAyudante(null)}/>}
        {mGarantia&&<ModalGarantia r={mGarantia} onGuardar={r=>{actualizarLocal(r.id,r);setMGarantia(null);tk("🛡 Garantía guardada");}} onCerrar={()=>setMGarantia(null)}/>}
        {fichaRegistro&&<ModalFicha r={fichaRegistro} onCerrar={()=>setFichaRegistro(null)} onAyudante={()=>{setMAyudante(fichaRegistro);setFichaRegistro(null);}} onEditar={()=>{setMEditar(fichaRegistro);setFichaRegistro(null);}} onPresupuesto={()=>{setMPresupuesto(fichaRegistro);setFichaRegistro(null);}} onCompletar={()=>{setMCompletar(fichaRegistro);setFichaRegistro(null);}}/>}
        {fotoViewer&&<div onClick={()=>setFotoViewer(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}} >
          <img src={fotoViewer} alt="foto" style={{maxWidth:"100%",maxHeight:"85vh",objectFit:"contain"}}/>
          <button onClick={()=>setFotoViewer(null)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"10px 24px",color:"#fff",fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>✕ Cerrar</button>
        </div>}
        {mEditarPresupuesto!==null&&registros[mEditarPresupuesto]&&<ModalEditarPresupuesto r={registros[mEditarPresupuesto]} onGuardar={r=>{actualizarLocal(r.id,r);setMEditarPresupuesto(null);tk("💾 Presupuesto actualizado");}} onCerrar={()=>setMEditarPresupuesto(null)}/>}
        {mAyudanteComp!==null&&registros[mAyudanteComp]&&<ModalAyudante r={registros[mAyudanteComp]} onGuardar={r=>{actualizarLocal(r.id,r);setMAyudanteComp(null);tk("👥 Ayudante guardado");}} onCerrar={()=>setMAyudanteComp(null)}/>}
        {mEditarComp&&<ModalEditarCompletado r={mEditarComp} onGuardar={r=>{actualizarLocal(r.id,r);setMEditarComp(null);tk("💾 Completado actualizado");}} onCerrar={()=>setMEditarComp(null)}/>}

        {/* Nav bar - sticky */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px 8px",position:"sticky",top:64,zIndex:9,background:"rgba(13,17,23,0.95)",backdropFilter:"blur(8px)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
          <button onClick={()=>setMenuOpen(p=>!p)} style={{background:menuOpen?"rgba(79,140,255,0.2)":"rgba(255,255,255,0.06)",border:"1px solid "+(menuOpen?"rgba(79,140,255,0.4)":"rgba(255,255,255,0.1)"),borderRadius:10,padding:"8px 14px",color:menuOpen?"#4f8cff":"#c8d0e0",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6}}>
            ☰ Menú
          </button>
          <button onClick={()=>{setShowFormIngreso(true);setMenuOpen(false);}} style={{padding:"8px 18px",borderRadius:10,border:"none",background:tab==="nuevo"?"rgba(79,140,255,0.2)":"rgba(255,255,255,0.06)",color:tab==="nuevo"?"#4f8cff":"#c8d0e0",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>
            ➕ Nuevo Ingreso
          </button>
        </div>

        {/* Slide-in menu from left */}
        {menuOpen&&(
          <>
            <div onClick={()=>setMenuOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:50,backdropFilter:"blur(2px)"}}/>
            <div style={{position:"fixed",top:0,left:0,bottom:0,width:280,background:"#0d1117",borderRight:"1px solid rgba(255,255,255,0.1)",zIndex:51,display:"flex",flexDirection:"column",boxShadow:"4px 0 24px rgba(0,0,0,0.5)"}}>
              {/* Menu header */}
              <div style={{padding:"20px 18px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <img src={LOGO_B64} alt="VoltLab" style={{height:36,width:"auto"}}/>
                  <div style={{color:"#e8edf5",fontWeight:800,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>VoltLab</div>
                </div>
                <button onClick={()=>setMenuOpen(false)} style={{background:"none",border:"none",color:"#7a8aaa",fontSize:22,cursor:"pointer"}}>×</button>
              </div>
              {/* Menu items */}
              <div style={{flex:1,overflowY:"auto",padding:"8px 0"}}>
                {[
                  {k:"nuevo",l:"🏠 Inicio",badge:null},
                  {k:"pendientes",l:"⏳ Pendientes",badge:pendientes.length},
                  {k:"presupuestos",l:"📋 Presupuestos",badge:presupuestos.length},
                  {k:"completados",l:"✅ Completados",badge:completados.length},
                  {k:"finanzas",l:"📊 Finanzas",badge:null},
                  {k:"repuestos",l:"🔩 Repuestos",badge:null},
                  {k:"ayudante_pagos",l:"👥 Ayudante",badge:null},
                  {k:"catalogo",l:"📦 Catálogo",badge:null},
                  {k:"balance",l:"💼 Balance",badge:null},
                ].map((item,i)=>(
                  <button key={item.k} onClick={()=>{setTab(item.k);setMenuOpen(false);}} style={{
                    width:"100%",padding:"15px 20px",border:"none",
                    background:tab===item.k?"rgba(79,140,255,0.15)":"transparent",
                    color:tab===item.k?"#4f8cff":"#c8d0e0",
                    fontWeight:tab===item.k?700:500,fontSize:15,cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif",textAlign:"left",
                    display:"flex",justifyContent:"space-between",alignItems:"center",
                    borderLeft:tab===item.k?"3px solid #4f8cff":"3px solid transparent",
                    transition:"all 0.15s",
                  }}>
                    <span>{item.l}</span>
                    {item.badge>0&&<span style={{background:"rgba(79,140,255,0.2)",color:"#4f8cff",borderRadius:20,padding:"2px 10px",fontSize:12,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{item.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={{padding:"16px 14px"}}>
          {tab==="nuevo"&&<Dashboard registros={registros} onNuevoIngreso={()=>setShowFormIngreso(true)} onRegistroRapido={()=>setShowRegistroRapido(true)} completados={completadosTodas} pendientes={pendientesTodas} pendientesTodas={pendientesTodas} presupuestos={presupuestosTodas} onVerFicha={setFichaRegistro}/>}
          {showRegistroRapido&&<ModalRegistroRapido onGuardar={r=>{guardar(r);setShowRegistroRapido(false);}} onCerrar={()=>setShowRegistroRapido(false)}/>}
          {showFormIngreso&&<ModalFormIngreso onGuardar={r=>{guardar(r);setShowFormIngreso(false);setPrefillIngreso(null);}} onCerrar={()=>{setShowFormIngreso(false);setPrefillIngreso(null);}} prefill={prefillIngreso}/>}

          {tab==="pendientes"&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
            {pendientesTodas.length===0
              ?<div style={{textAlign:"center",padding:"50px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:40,marginBottom:10}}>🛵</div><div style={{fontSize:14}}>Sin equipos pendientes</div></div>
              :<>{pendientesTodas.map(r=>{const ri=registros.indexOf(r);return <CardPendiente key={ri} r={r} idx={ri} onEliminar={()=>eliminar(ri)} onPresupuesto={()=>setMPresupuesto(r)} onEditar={()=>setMEditar(r)} onAyudante={()=>setMAyudante(r)} onCompletar={()=>setMCompletar(r)} onFotoClick={setFotoViewer}/>;})}</>
            }
          </div>}

          {tab==="presupuestos"&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {presupuestosTodas.length===0
                ?<div style={{textAlign:"center",padding:"50px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:40,marginBottom:10}}>📋</div><div style={{fontSize:14}}>Sin presupuestos enviados</div></div>
                :<div style={{display:"flex",flexDirection:"column",gap:14}}>
                  {presupuestosTodas.map(r=>(
                    <CardPresupuesto key={r.id} r={r} onEliminar={()=>eliminar(r.id)} onEditar={()=>setMEditar(r)} onEditarPresupuesto={()=>setMEditarPresupuesto(registros.indexOf(r))} onAyudante={()=>setMAyudante(r)} onCompletar={()=>setMCompletar(r)} onReenviar={()=>reenviarPresupuesto(r)} onRevertir={()=>revertirPendiente(r)} onFotoClick={setFotoViewer}/>
                  ))}
                </div>
              }
            </div>
          )}

          {tab==="completados"&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <FiltroBar filtro={filtroComp} setFiltro={setFiltroComp}/>
              {completadosTodas.length===0
                ?<div style={{textAlign:"center",padding:"50px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:40,marginBottom:10}}>📭</div><div style={{fontSize:14}}>Sin trabajos completados aún</div></div>
                :completados.length===0
                  ?<div style={{textAlign:"center",padding:"30px 20px",color:"#7a8aaa",fontFamily:"'DM Sans',sans-serif",fontSize:13}}>Sin completados en este período</div>
                  :<div style={{display:"flex",flexDirection:"column",gap:14}}>
                    {completados.map(r=>(
                      <CardCompletado key={r.id} r={r} onEliminar={()=>eliminar(r.id)} onGarantia={()=>setMGarantia(r)} onAyudante={()=>setMAyudanteComp(registros.indexOf(r))} onFotoClick={setFotoViewer} onEditar={()=>setMEditarComp(r)} onRevertir={()=>revertirCompletado(r)} onRepetir={()=>repetirCliente(r)}/>
                    ))}
                  </div>
              }
            </div>
          )}

          {tab==="ayudante_pagos"&&<PestañaAyudantePagos/>}
          {tab==="finanzas"&&<PestañaFinanzas registros={registros} asistenciaData={asistenciaData}/>}
          {tab==="repuestos"&&<PestañaRepuestos/>}
          {tab==="balance"&&<PestañaBalance registros={registros} asistenciaData={asistenciaData}/>}
          {tab==="catalogo"&&<PestañaCatalogo/>}
        </div>
      </div>
    </>
  );
}

// ── PESTAÑA MAURICIO ──────────────────────────────────────────────────────────
function PestañaMauricio({ registros, asistenciaData }) {
  const [subTab, setSubTab] = useState("porPagar");
  const [filtro, setFiltro] = useState("mes");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [loadingAsist, setLoadingAsist] = useState(false);
  const [horaManual, setHoraManual] = useState({ persona: null, tipo: null, hora: "" });

  const FILTROS = [{k:"hoy",l:"Hoy"},{k:"ayer",l:"Ayer"},{k:"semana",l:"Esta sem."},{k:"semana_pasada",l:"Sem. pasada"},{k:"mes",l:"Este mes"},{k:"mes_pasado",l:"Mes ant."},{k:"custom",l:"📅"}];

  // asistencia loaded from App

  const marcarAsistencia = async (persona, tipo, horaOverride) => {
    setLoadingAsist(true);
    const { data: { user } } = await sb.auth.getUser();
    const hora = horaOverride ? new Date(horaOverride).toISOString() : new Date().toISOString();
    const { data } = await sb.from("asistencia").insert([{
      user_id: user.id, persona, tipo, hora,
      hora_manual: !!horaOverride, fecha: new Date().toISOString().split("T")[0]
    }]).select().single();
    if(data) setAsistencia(prev => [data, ...prev]);
    setHoraManual({ persona: null, tipo: null, hora: "" });
    setLoadingAsist(false);
  };

  const conMauricio = registros.filter(r => r.ayudante === "con_ayudante");
  const enRangoData = conMauricio.filter(r => enRango(r.fecha_completado || r.fecha, filtro, desde, hasta));
  const completadosConAy = registros.filter(r => r.estado === "completado" && r.ayudante === "con_ayudante");
  const porPagar = completadosConAy.filter(r => !r.ayudante_pagado);
  const pagados = completadosConAy.filter(r => r.ayudante_pagado);

  const totalPagado = enRangoData.reduce((s,r) => s + (Number(r.ayudante_monto)||0), 0);
  const totalGenerado = enRangoData.filter(r=>r.estado==="completado").reduce((s,r) => s + (Number(r.valor_cobrado)||0), 0);
  const trabajos = enRangoData.filter(r=>r.estado==="completado").length;
  const promXTrabajo = trabajos > 0 ? Math.round(totalPagado / trabajos) : 0;

  // Horas trabajadas Mauricio en período
  const asistMauricio = (asistenciaData||[]).filter(a => a.persona === "mauricio" && enRango(a.hora, filtro, desde, hasta));
  let horasTrabajadas = 0;
  const dias = {};
  asistMauricio.forEach(a => {
    const fecha = new Date(a.hora).toDateString();
    if(!dias[fecha]) dias[fecha] = {};
    if(a.tipo === "entrada") dias[fecha].entrada = new Date(a.hora);
    if(a.tipo === "salida") dias[fecha].salida = new Date(a.hora);
  });
  Object.values(dias).forEach(d => {
    if(d.entrada && d.salida) {
      horasTrabajadas += (d.salida - d.entrada) / 3600000;
    }
  });
  const promXHora = horasTrabajadas > 0 ? Math.round(totalPagado / horasTrabajadas) : 0;

  const diasHabiles = diasHabilesRestantesMes();
  const diasConTrabajosM = calcularDiasTrabajados(
    registros.filter(r=>r.ayudante==="con_ayudante"),
    asistenciaData, filtro, desde, hasta
  );
  const promDiario = diasConTrabajosM > 0 ? Math.round(totalPagado / diasConTrabajosM) : 0;
  const promSemanal = promDiario * 6;
  const proyeccion = promDiario * diasHabiles + totalPagado;
  const Card2 = ({label,val,color,sub}) => (
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
      <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{color:color||"#e8edf5",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{val}</div>
      {sub&&<div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{sub}</div>}
    </div>
  );

  const Sec = ({title,color,children}) => (
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{color:color||"#7a8aaa",fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {/* Filtros */}
      <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,border:"1px solid rgba(255,255,255,0.07)",gap:2,flexWrap:"wrap"}}>
        {FILTROS.map(f=>(
          <button key={f.k} onClick={()=>setFiltro(f.k)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",background:filtro===f.k?"rgba(79,140,255,0.2)":"transparent",color:filtro===f.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",borderBottom:filtro===f.k?"2px solid #4f8cff":"2px solid transparent"}}>{f.l}</button>
        ))}
      </div>
      {filtro==="custom"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>DESDE</label>
            <input type="date" value={desde} onChange={e=>setDesde(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",width:"100%",colorScheme:"dark"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>HASTA</label>
            <input type="date" value={hasta} onChange={e=>setHasta(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",width:"100%",colorScheme:"dark"}}/>
          </div>
        </div>
      )}

      {/* Resumen Mauricio */}
      <Sec title="👥 Mauricio" color="#4f8cff">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="TRABAJOS" val={trabajos} color="#e8edf5"/>
          <Card2 label="TOTAL PAGADO" val={fmt(totalPagado)} color="#4f8cff"/>
          <Card2 label="PROM. X TRABAJO" val={fmt(promXTrabajo)} color="#e8edf5"/>
          <Card2 label="PROM. X HORA" val={horasTrabajadas>0?fmt(promXHora):"—"} color="#4f8cff" sub={horasTrabajadas>0?Math.round(horasTrabajadas*10)/10+"h trabaj.":null}/>
          <Card2 label="PROM. DIARIO" val={fmt(promDiario)} color="#22d07a" sub={"Base: "+diasConTrabajosM+" días c/trabajo"}/>
          <Card2 label="PROM. SEMANAL" val={fmt(promSemanal)} color="#22d07a"/>
          <Card2 label="DÍAS HÁB. REST." val={diasHabiles} color="#e8edf5"/>
          <Card2 label="PROYECCIÓN MES" val={fmt(proyeccion)} color="#22d07a" sub="incl. lo ya pagado"/>
        </div>
      </Sec>

      {/* Por pagar */}
      {porPagar.length>0&&<Sec title={"⚠ Por pagar ("+porPagar.length+")"} color="#ffb432">
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {porPagar.map(r=>(
            <MauricioCard key={r.id} r={r} onActualizar={async(datos)=>{await actualizarDB(r.id,datos);}}/>
          ))}
        </div>
      </Sec>}

      {/* Pagados */}
      {pagados.length>0&&<Sec title={"✅ Pagados ("+pagados.length+")"} color="#22d07a">
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {pagados.map(r=>(
            <div key={r.id} style={{background:"rgba(34,208,122,0.04)",border:"1px solid rgba(34,208,122,0.15)",borderRadius:10,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
              <div>
                <div style={{color:"#e8edf5",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
                <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace"}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{r.fecha_completado?new Date(r.fecha_completado).toLocaleDateString("es-CL"):""}</div>
                {r.ayudante_trabajo&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{r.ayudante_trabajo}</div>}
              </div>
              <div style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:8,padding:"6px 12px",textAlign:"center"}}>
                <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace"}}>PAGADO</div>
                <div style={{color:"#22d07a",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{fmt(r.ayudante_monto)}</div>
              </div>
            </div>
          ))}
        </div>
      </Sec>}

    </div>
  );
}

// Tarjeta Mauricio por pagar
function MauricioCard({ r, onActualizar }) {
  const [monto, setMonto] = useState(r.ayudante_monto||"");
  const [pagado, setPagado] = useState(r.ayudante_pagado||false);
  const [editMonto, setEditMonto] = useState(false);
  const [fechaPago, setFechaPago] = useState(r.ayudante_fecha_pago?new Date(r.ayudante_fecha_pago).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]);

  const guardar = async () => {
    const datos = {
      ayudante_monto: monto?Number(monto):null,
      ayudante_pagado: pagado,
      ayudante_fecha_pago: pagado ? new Date(fechaPago+"T12:00:00").toISOString() : null
    };
    await onActualizar(datos);
    setEditMonto(false);
  };

  return (
    <div style={{background:"rgba(79,140,255,0.04)",border:"1px solid rgba(79,140,255,0.15)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{color:"#e8edf5",fontWeight:700,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
          <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace"}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{r.fecha_completado?new Date(r.fecha_completado).toLocaleDateString("es-CL"):""}</div>
          {r.ayudante_trabajo&&<div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginTop:3}}>{r.ayudante_trabajo}</div>}
        </div>
        <div style={{background:"rgba(79,140,255,0.15)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"6px 12px",textAlign:"center",cursor:"pointer"}} onClick={()=>setEditMonto(p=>!p)}>
          <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace"}}>MONTO</div>
          <div style={{color:"#4f8cff",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{r.ayudante_monto?fmt(r.ayudante_monto):"—"}</div>
        </div>
      </div>
      {editMonto&&(
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <input type="number" min="0" value={monto} onChange={e=>setMonto(e.target.value)} placeholder="Monto" style={{flex:1,...INP,padding:"9px 12px",fontSize:13}}/>
        </div>
      )}
      {pagado&&(
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>FECHA DE PAGO</label>
          <input type="date" value={fechaPago} onChange={e=>setFechaPago(e.target.value)}
            style={{...INP,padding:"9px 12px",fontSize:13,colorScheme:"dark"}}/>
        </div>
      )}
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{setPagado(p=>!p);}} style={{flex:1,padding:"10px",borderRadius:10,border:"1.5px solid",borderColor:pagado?"#22d07a":"rgba(255,255,255,0.15)",background:pagado?"rgba(34,208,122,0.15)":"transparent",color:pagado?"#22d07a":"#7a8aaa",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
          {pagado?"✅ Pagado":"⬜ Marcar pagado"}
        </button>
        <button onClick={guardar} style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:10,padding:"10px 18px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>💾</button>
      </div>
    </div>
  );
}

// ── PESTAÑA FINANZAS ──────────────────────────────────────────────────────────
function PestañaFinanzas({ registros, asistenciaData }) {
  const [filtro, setFiltro] = useState("mes");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [gastosFijos, setGastosFijos] = useState([]);
  const [gastosVar, setGastosVar] = useState([]);
  const [editFijo, setEditFijo] = useState(null);

  const FILTROS = [{k:"hoy",l:"Hoy"},{k:"ayer",l:"Ayer"},{k:"semana",l:"Esta sem."},{k:"semana_pasada",l:"Sem. pasada"},{k:"mes",l:"Este mes"},{k:"mes_pasado",l:"Mes ant."},{k:"custom",l:"📅"}];

  useEffect(() => { cargarGastos(); }, []);

  const [pagosAyudante, setPagosAyudante] = useState([]);

  const cargarGastos = async () => {
    const { data } = await sb.from("gastos").select("*").order("fecha", { ascending: false });
    if(data) {
      setGastosFijos(data.filter(g=>g.tipo==="fijo"));
      setGastosVar(data.filter(g=>g.tipo==="variable"));
    }
    const { data: pa } = await sb.from("pagos_ayudante").select("*").order("fecha", { ascending: false });
    if(pa) setPagosAyudante(pa);
  };

  const agregarFijo = async () => {
    if(!nuevoFijo.descripcion||!nuevoFijo.monto)return;
    const { data: { user } } = await sb.auth.getUser();
    const { data } = await sb.from("gastos").insert([{ user_id:user.id, tipo:"fijo", descripcion:nuevoFijo.descripcion, monto:Number(nuevoFijo.monto) }]).select().single();
    if(data){ setGastosFijos(p=>[...p,data]); setNuevoFijo({descripcion:"",monto:""}); setShowAddFijo(false); }
  };

  const editarFijo = async (id, monto) => {
    await sb.from("gastos").update({monto:Number(monto)}).eq("id",id);
    setGastosFijos(p=>p.map(g=>g.id===id?{...g,monto:Number(monto)}:g));
    setEditFijo(null);
  };

  const eliminarGasto = async (id, tipo) => {
    if(!window.confirm("¿Eliminar este gasto?"))return;
    await sb.from("gastos").delete().eq("id",id);
    if(tipo==="fijo") setGastosFijos(p=>p.filter(g=>g.id!==id));
    else setGastosVar(p=>p.filter(g=>g.id!==id));
  };

  const agregarVar = async () => {
    if(!nuevoVar.descripcion||!nuevoVar.monto)return;
    const { data: { user } } = await sb.auth.getUser();
    const { data } = await sb.from("gastos").insert([{ user_id:user.id, tipo:"variable", descripcion:nuevoVar.descripcion, monto:Number(nuevoVar.monto), fecha:new Date(nuevoVar.fecha).toISOString() }]).select().single();
    if(data){ setGastosVar(p=>[data,...p]); setNuevoVar({descripcion:"",monto:"",fecha:new Date().toISOString().split("T")[0]}); setShowAddVar(false); }
  };

  // Cálculos
  const completados = registros.filter(r=>r.estado==="completado"&&enRango(r.fecha_completado,filtro,desde,hasta));
  const ingresos = completados.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const pagadoMauricio = completados.reduce((s,r)=>s+(Number(r.ayudante_monto)||0),0);
  const repuestos = completados.reduce((s,r)=>s+(Number(r.costo_repuestos)||0),0);
  const garantiasDevuelto = completados.filter(r=>r.garantia_activa&&r.garantia_tipo==="devolucion").reduce((s,r)=>s+(Number(r.garantia_monto)||0),0);
  const garantiaCobrado = completados.filter(r=>r.garantia_activa&&r.garantia_tipo==="cobro").reduce((s,r)=>s+(Number(r.garantia_monto)||0),0);
  
  const totalFijoMensual = gastosFijos.reduce((s,g)=>s+(Number(g.monto)||0),0);
  const totalFijoDiario = Math.round(totalFijoMensual/30);
  const totalFijoSemanal = Math.round(totalFijoMensual/4);
  const diasPeriodo = diasHabilesEnPeriodo(filtro,desde,hasta);
  const gastoFijoPeriodo = Math.round(totalFijoMensual/30*diasPeriodo);

  const gastosVarPeriodo = gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)).reduce((s,g)=>s+(Number(g.monto)||0),0);
  const totalGastos = gastoFijoPeriodo + gastosVarPeriodo + pagadoMauricio + repuestos + garantiasDevuelto - garantiaCobrado;
  const neto = ingresos - totalGastos;
  const ivaEstimado = Math.round(ingresos*0.19);
  
  // Ayudante: basado en pagos_ayudante en el período seleccionado
  const pagosAyPeriodo = pagosAyudante.filter(p=>enRango(p.fecha+"T12:00:00",filtro,desde,hasta));
  const totalPagadoAyudante = pagosAyPeriodo.reduce((s,p)=>s+(Number(p.monto)||0),0);
  const totalEfecAy = pagosAyPeriodo.reduce((s,p)=>s+(Number(p.monto_efectivo)||0),0);
  const totalTransAy = pagosAyPeriodo.reduce((s,p)=>s+(Number(p.monto_transferencia)||0),0);
  // Fechas en que se le pagó - buscar trabajos completados en ese lapso
  const fechasPago = pagosAyPeriodo.map(p=>p.fecha);
  const primerPago = fechasPago.length?fechasPago[fechasPago.length-1]:null;
  const ultimoPago = fechasPago.length?fechasPago[0]:null;
  // Ingresos generados en el lapso que trabajó el ayudante
  const compEnLapso = primerPago&&ultimoPago ? completados.filter(r=>{
    if(!r.fecha_completado) return false;
    const d = new Date(r.fecha_completado).toISOString().split("T")[0];
    return d >= primerPago && d <= ultimoPago;
  }) : completados;
  const ingresosLapso = compEnLapso.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const tuGananciaLapso = ingresosLapso - totalPagadoAyudante;
  const diasTrabajadosAy = new Set(fechasPago).size || 1;
  const promDiarioAy = Math.round(totalPagadoAyudante/diasTrabajadosAy);
  // Old vars for other sections
  const conAy = completados.filter(r=>r.ayudante==="con_ayudante");
  const sinAy = completados.filter(r=>r.ayudante!=="con_ayudante");
  const ingresosConAy = conAy.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const ingresosSinAy = sinAy.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);

  // Días con trabajos reales (no días del período)
  const diasConTrabajos = new Set(completados.map(r => r.fecha_completado ? new Date(r.fecha_completado).toDateString() : null).filter(Boolean)).size || 1;
  const promDiario = diasConTrabajos>0 ? Math.round(ingresos/diasConTrabajos) : 0;
  const promSemanal = promDiario*6;
  const diasRestantes = diasHabilesRestantesMes();
  const proyeccion = promDiario*diasRestantes + ingresos;
  const horasDia = 8.25; // promedio L-V/S
  const promXHora = Math.round(ingresos/(diasPeriodo*horasDia)||0);
  const trabajos = completados.length;
  const ticket = trabajos>0?Math.round(ingresos/trabajos):0;
  const ptoEquilibrio = totalFijoDiario>0?Math.ceil(totalFijoMensual/ticket||0):0;

  const fallaCount={};
  completados.forEach(r=>(r.tipos_falla||[]).forEach(id=>{fallaCount[id]=(fallaCount[id]||0)+1;}));
  const topFallas=Object.entries(fallaCount).sort((a,b)=>b[1]-a[1]).slice(0,5);

  const Card2=({label,val,color,sub})=>(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
      <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{color:color||"#e8edf5",fontWeight:800,fontSize:14,fontFamily:"'DM Mono',monospace"}}>{val}</div>
      {sub&&<div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{sub}</div>}
    </div>
  );
  const Sec=({title,color,children,action})=>(
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{color:color||"#7a8aaa",fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>{title}</div>
        {action}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* Filtros */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,border:"1px solid rgba(255,255,255,0.07)",gap:2}}>
          {FILTROS.map(f=>(
            <button key={f.k} onClick={()=>setFiltro(f.k)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",background:filtro===f.k?"rgba(79,140,255,0.2)":"transparent",color:filtro===f.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",borderBottom:filtro===f.k?"2px solid #4f8cff":"2px solid transparent"}}>{f.l}</button>
          ))}
        </div>
        {filtro==="custom"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>DESDE</label>
              <input type="date" value={desde} onChange={e=>setDesde(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",width:"100%",colorScheme:"dark"}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>HASTA</label>
              <input type="date" value={hasta} onChange={e=>setHasta(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",width:"100%",colorScheme:"dark"}}/>
            </div>
          </div>
        )}
      </div>

      {/* Ingresos */}
      <Sec title="💰 Ingresos del Taller" color="#22d07a">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="TRABAJOS" val={trabajos} color="#e8edf5"/>
          <Card2 label="INGRESO BRUTO" val={fmt(ingresos)} color="#22d07a"/>
          <Card2 label="PROMEDIO DIARIO" val={fmt(promDiario)} color="#e8edf5"/>
          <Card2 label="PROMEDIO SEMANAL" val={fmt(promSemanal)} color="#e8edf5"/>
          <Card2 label="PROM. POR HORA" val={fmt(promXHora)} color="#e8edf5" sub={"~"+horasDia+"h/día"}/>
          <Card2 label="TICKET PROMEDIO" val={fmt(ticket)} color="#e8edf5"/>
        </div>
      </Sec>

      {/* Neto real */}
      <Sec title="📊 Resultado Real" color="#ffb432">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="INGRESO BRUTO" val={fmt(ingresos)} color="#22d07a"/>
          <Card2 label="PAGADO MAURICIO" val={fmt(pagadoMauricio)} color="#4f8cff"/>
          <Card2 label="GASTOS FIJOS" val={fmt(gastoFijoPeriodo)} color="#ff8a8a" sub="proporcional período"/>
          <Card2 label="GASTOS VARIABLES" val={fmt(gastosVarPeriodo)} color="#ff8a8a"/>
          {repuestos>0&&<Card2 label="REPUESTOS" val={fmt(repuestos)} color="#ffb432"/>}
          {garantiasDevuelto>0&&<Card2 label="DEVUELTO GARANTÍA" val={fmt(garantiasDevuelto)} color="#ff5a5a"/>}
          <Card2 label="NETO REAL" val={fmt(neto)} color={neto>=0?"#22d07a":"#ff5a5a"}/>
          <Card2 label="IVA ESTIMADO (19%)" val={fmt(ivaEstimado)} color="#7a8aaa" sub="Solo referencia"/>
        </div>
      </Sec>

      {/* Proyección */}
      <Sec title="📈 Proyección del Mes" color="#4f8cff">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="DÍAS HÁB. RESTANTES" val={diasRestantes} color="#e8edf5"/>
          <Card2 label="PROYECCIÓN INGRESOS" val={fmt(proyeccion)} color="#22d07a" sub="incl. lo ya generado"/>
          <Card2 label="GASTO FIJO MENSUAL" val={fmt(totalFijoMensual)} color="#ff8a8a"/>
          <Card2 label="PUNTO DE EQUILIBRIO" val={ptoEquilibrio+" trabajos"} color="#ffb432" sub="para cubrir gastos fijos"/>
        </div>
      </Sec>

      {/* Ayudante - basado en pagos reales */}
      {(()=>{
        const pagosEnPeriodo = pagosAyudante.filter(p=>enRango(p.fecha+"T12:00:00",filtro,desde,hasta));
        const totalPagadoAy = pagosEnPeriodo.reduce((s,p)=>s+(Number(p.monto)||0),0);
        const fechas = pagosEnPeriodo.map(p=>p.fecha).sort();
        const primerPago = fechas[0];
        const ultimoPago = fechas[fechas.length-1];
        const trabLapso = primerPago&&ultimoPago
          ? completados.filter(r=>r.fecha_completado&&r.fecha_completado>=primerPago+"T00:00:00"&&r.fecha_completado<=ultimoPago+"T23:59:59")
          : [];
        const ingresosLapso = trabLapso.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
        const gananciaLapso = ingresosLapso - totalPagadoAy;
        return (
          <Sec title="👥 Ayudante" color="#4f8cff">
            {pagosEnPeriodo.length===0
              ?<div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif",textAlign:"center",padding:"8px 0"}}>Sin pagos al ayudante en este período</div>
              :<div style={{display:"flex",flexDirection:"column",gap:10}}>
                {primerPago&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",textAlign:"center",background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"6px 10px"}}>
                  Lapso: {new Date(primerPago+"T12:00:00").toLocaleDateString("es-CL")} → {new Date(ultimoPago+"T12:00:00").toLocaleDateString("es-CL")}
                </div>}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <Card2 label="DÍAS PAGADOS" val={pagosEnPeriodo.length} color="#4f8cff"/>
                  <Card2 label="PAGADO AL AYUDANTE" val={fmt(totalPagadoAy)} color="#4f8cff"/>
                  <Card2 label="INGRESOS EN ESE LAPSO" val={fmt(ingresosLapso)} color="#22d07a" sub={trabLapso.length+" trabajos"}/>
                  <Card2 label="TU GANANCIA" val={fmt(gananciaLapso)} color={gananciaLapso>=0?"#22d07a":"#ff5a5a"} sub="ingresos - pagado"/>
                </div>
              </div>
            }
          </Sec>
        );
      })()}

      {/* Fallas frecuentes */}
      {topFallas.length>0&&<Sec title="🔧 Fallas más Frecuentes" color="#ff8a8a">
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {topFallas.map(([id,count])=>{
            const tf=TIPOS_FALLA.find(t=>t.id===id);
            const pct=trabajos>0?Math.round((count/trabajos)*100):0;
            return tf?(<div key={id} style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:16}}>{tf.icon}</span>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{color:"#c8d0e0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{tf.label}</span>
                  <span style={{color:"#ff8a8a",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{count}x · {pct}%</span>
                </div>
                <div style={{background:"rgba(255,255,255,0.06)",borderRadius:4,height:5}}>
                  <div style={{background:"#ff6432",borderRadius:4,height:5,width:pct+"%"}}/>
                </div>
              </div>
            </div>):null;
          })}
        </div>
      </Sec>}

      {/* Gastos Fijos */}
      <Sec title="🏠 Gastos Fijos Mensuales" color="#ff8a8a">
        {gastosFijos.map(g=>(
          <div key={g.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
            <span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif",flex:1}}>{g.descripcion}</span>
            {editFijo===g.id
              ? <div style={{display:"flex",gap:6}}>
                  <input type="number" defaultValue={g.monto} id={"fijo-"+g.id} style={{width:100,...INP,padding:"6px 8px",fontSize:12}}/>
                  <button onClick={()=>editarFijo(g.id,document.getElementById("fijo-"+g.id).value)} style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:6,padding:"6px 10px",color:"#22d07a",fontSize:12,cursor:"pointer"}}>✓</button>
                </div>
              : <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{color:"#ff8a8a",fontWeight:700,fontSize:13,fontFamily:"'DM Mono',monospace"}}>{fmt(g.monto)}</span>
                  <button onClick={()=>setEditFijo(g.id)} style={{background:"transparent",border:"none",color:"#7a8aaa",cursor:"pointer",fontSize:13}}>✏️</button>
                  <button onClick={()=>eliminarGasto(g.id,"fijo")} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:13}}>🗑</button>
                </div>
            }
          </div>
        ))}
        <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:10,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:4}}>
          <Card2 label="TOTAL MENSUAL" val={fmt(totalFijoMensual)} color="#ff8a8a"/>
          <Card2 label="GASTO DIARIO" val={fmt(totalFijoDiario)} color="#ff8a8a"/>
          <Card2 label="GASTO SEMANAL" val={fmt(totalFijoSemanal)} color="#ff8a8a"/>
        </div>
      </Sec>

      {/* Gastos Variables */}
      <Sec title="📝 Gastos Variables" color="#ffb432">
        {gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)).map(g=>(
          <div key={g.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
            <div>
              <span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{g.descripcion}</span>
              <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace"}}>{new Date(g.fecha).toLocaleDateString("es-CL")}</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{color:"#ffb432",fontWeight:700,fontSize:13,fontFamily:"'DM Mono',monospace"}}>{fmt(g.monto)}</span>
              <button onClick={()=>eliminarGasto(g.id,"variable")} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:13}}>🗑</button>
            </div>
          </div>
        ))}
      </Sec>
    </div>
  );
}


// Form local para agregar gasto fijo - evita bug de teclado
function AddGastoFijo({ onGuardar, onCancelar }) {
  const descRef = useRef();
  const montoRef = useRef();
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      <input ref={descRef} placeholder="Ej: Arriendo" defaultValue=""
        style={{...INP,padding:"10px 12px",fontSize:14}}/>
      <div style={{display:"flex",gap:8}}>
        <input ref={montoRef} type="number" placeholder="Monto mensual" defaultValue=""
          style={{flex:1,...INP,padding:"10px 12px",fontSize:14}}/>
        <button onClick={()=>onGuardar(descRef.current?.value, montoRef.current?.value)}
          style={{background:"linear-gradient(135deg,#4f8cff,#22d07a)",border:"none",borderRadius:8,padding:"10px 16px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>💾</button>
        <button onClick={onCancelar}
          style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px 14px",color:"#7a8aaa",fontSize:13,cursor:"pointer"}}>✕</button>
      </div>
    </div>
  );
}


// Form local para agregar gasto variable - evita bug de teclado
function AddGastoVar({ onGuardar, onCancelar }) {
  const descRef = useRef();
  const montoRef = useRef();
  const fechaRef = useRef();
  const hoy = new Date().toISOString().split("T")[0];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      <input ref={descRef} placeholder="Ej: IVA enero, herramienta..." defaultValue=""
        style={{...INP,padding:"10px 12px",fontSize:14}}/>
      <div style={{display:"flex",gap:8}}>
        <input ref={montoRef} type="number" placeholder="Monto" defaultValue=""
          style={{flex:1,...INP,padding:"10px 12px",fontSize:14}}/>
        <input ref={fechaRef} type="date" defaultValue={hoy}
          style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"10px 10px",color:"#e8edf5",fontSize:14,outline:"none",colorScheme:"dark"}}/>
        <button onClick={()=>onGuardar(descRef.current?.value, montoRef.current?.value, fechaRef.current?.value||hoy)}
          style={{background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:8,padding:"10px 16px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>💾</button>
        <button onClick={onCancelar}
          style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px 12px",color:"#7a8aaa",fontSize:13,cursor:"pointer"}}>✕</button>
      </div>
    </div>
  );
}


// Fila de gasto fijo con estado local para evitar bug de teclado
function GastoFijoRow({ g, onEditar, onEliminar }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(String(g.monto));
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
      <span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif",flex:1}}>{g.descripcion}</span>
      {editing
        ? <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <input type="number" value={val} onChange={e=>setVal(e.target.value)}
              autoFocus
              style={{width:110,...INP,padding:"6px 8px",fontSize:13}}/>
            <button onClick={()=>{onEditar(g.id,val);setEditing(false);}} style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:6,padding:"6px 10px",color:"#22d07a",fontSize:12,cursor:"pointer"}}>✓</button>
            <button onClick={()=>setEditing(false)} style={{background:"transparent",border:"none",color:"#7a8aaa",cursor:"pointer",fontSize:13}}>✕</button>
          </div>
        : <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{color:"#ff8a8a",fontWeight:700,fontSize:13,fontFamily:"'DM Mono',monospace"}}>{fmt(g.monto)}</span>
            <button onClick={()=>{setVal(String(g.monto));setEditing(true);}} style={{background:"transparent",border:"none",color:"#7a8aaa",cursor:"pointer",fontSize:13}}>✏️</button>
            <button onClick={()=>onEliminar(g.id,"fijo")} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:13}}>🗑</button>
          </div>
      }
    </div>
  );
}

// ── PESTAÑA BALANCE ───────────────────────────────────────────────────────────
function PestañaBalance({ registros, asistenciaData }) {
  const [filtro, setFiltro] = useState("mes");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [gastosFijos, setGastosFijos] = useState([]);
  const [gastosVar, setGastosVar] = useState([]);
  const [showAddFijo, setShowAddFijo] = useState(false);
  const [showAddVar, setShowAddVar] = useState(false);

  const FILTROS = [{k:"hoy",l:"Hoy"},{k:"ayer",l:"Ayer"},{k:"semana",l:"Esta sem."},{k:"semana_pasada",l:"Sem. ant."},{k:"mes",l:"Este mes"},{k:"mes_pasado",l:"Mes ant."},{k:"custom",l:"📅"}];

  const [ventasRepuestos, setVentasRepuestos] = useState([]);
  useEffect(() => { cargarGastosBalance(); }, []);

  const [pagosAyBalance, setPagosAyBalance] = useState([]);
  const cargarGastosBalance = async () => {
    const { data } = await sb.from("gastos").select("*").order("fecha", { ascending: false });
    if(data) {
      setGastosFijos(data.filter(g=>g.tipo==="fijo"));
      setGastosVar(data.filter(g=>g.tipo==="variable"));
    }
    const { data: rep } = await sb.from("ventas_repuestos").select("*").order("fecha", { ascending: false });
    if(rep) setVentasRepuestos(rep);
    const { data: pa } = await sb.from("pagos_ayudante").select("*").order("fecha", { ascending: false });
    if(pa) setPagosAyBalance(pa);
  };

  const agregarFijo = async (desc, monto) => {
    if(!desc||!monto) return;
    const { data: { user } } = await sb.auth.getUser();
    const { data } = await sb.from("gastos").insert([{ user_id:user.id, tipo:"fijo", descripcion:desc, monto:Number(monto) }]).select().single();
    if(data){ setGastosFijos(p=>[...p,data]); setShowAddFijo(false); }
  };

  const editarFijo = async (id) => {
    if(!editFijoVal) return;
    await sb.from("gastos").update({monto:Number(editFijoVal)}).eq("id",id);
    setGastosFijos(p=>p.map(g=>g.id===id?{...g,monto:Number(editFijoVal)}:g));
    setEditFijo(null); setEditFijoVal("");
  };

  const eliminarGasto = async (id, tipo) => {
    if(!window.confirm("¿Eliminar este gasto?")) return;
    await sb.from("gastos").delete().eq("id",id);
    if(tipo==="fijo") setGastosFijos(p=>p.filter(g=>g.id!==id));
    else setGastosVar(p=>p.filter(g=>g.id!==id));
  };

  const agregarVar = async (desc, monto, fecha) => {
    if(!desc||!monto) return;
    const { data: { user } } = await sb.auth.getUser();
    const { data } = await sb.from("gastos").insert([{ user_id:user.id, tipo:"variable", descripcion:desc, monto:Number(monto), fecha:new Date(fecha+"T12:00:00").toISOString() }]).select().single();
    if(data){ setGastosVar(p=>[data,...p]); setShowAddVar(false); }
  };

  // ── Cálculos ──────────────────────────────────────────────────────────────
  const completados = registros.filter(r => r.estado==="completado" && enRango(r.fecha_completado, filtro, desde, hasta));
  // Mes pasado para comparativa
  const compMesPasado = registros.filter(r=>r.estado==="completado"&&enRango(r.fecha_completado,"mes_pasado"));
  const ingresosMesPasado = compMesPasado.reduce((s,r)=>s+(Number(r.valor_cobrado)||0),0);
  const ingresos = completados.reduce((s,r) => s+(Number(r.valor_cobrado)||0), 0);
  const ingresosRepuestos = ventasRepuestos.filter(r=>enRango(r.fecha,filtro,desde,hasta)).reduce((s,r)=>s+(Number(r.monto)||0),0);
  const ingresosTotal = ingresos + ingresosRepuestos;
  // Pagado al ayudante real (de pagos_ayudante tabla)
  const pagadoAyudante = pagosAyBalance.filter(p=>enRango(p.fecha+"T12:00:00",filtro,desde,hasta)).reduce((s,p)=>s+(Number(p.monto)||0),0);
  const pagadoMauricio = pagadoAyudante; // alias para compatibilidad
  const repuestos = completados.reduce((s,r) => s+(Number(r.costo_repuestos)||0), 0);
  const garantiaDev = completados.filter(r=>r.garantia_activa&&r.garantia_tipo==="devolucion").reduce((s,r)=>s+(Number(r.garantia_monto)||0),0);
  const garantiaCob = completados.filter(r=>r.garantia_activa&&r.garantia_tipo==="cobro").reduce((s,r)=>s+(Number(r.garantia_monto)||0),0);

  const totalFijoMensual = gastosFijos.reduce((s,g) => s+(Number(g.monto)||0), 0);
  const diasHabMes = diasHabilesTotalesMes(); // días L-S del mes actual sin domingos
  const totalFijoDiario = diasHabMes>0?Math.round(totalFijoMensual/diasHabMes):0;
  const totalFijoSemanal = totalFijoDiario*6;
  const diasPeriodo = diasHabilesEnPeriodo(filtro, desde, hasta);
  const gastoFijoPeriodo = Math.round(totalFijoDiario*diasPeriodo);
  const gastosVarPeriodo = gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)).reduce((s,g)=>s+(Number(g.monto)||0),0);

  const totalGastos = gastoFijoPeriodo + gastosVarPeriodo + pagadoMauricio + repuestos + garantiaDev - garantiaCob;
  const neto = ingresosTotal - totalGastos;
  const ivaEstimado = Math.round(ingresosTotal*0.19);
  const ivaReal = gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)&&g.descripcion.toLowerCase().includes("iva")).reduce((s,g)=>s+(Number(g.monto)||0),0);

  const diasTrabajados = calcularDiasTrabajados(registros, asistenciaData, filtro, desde, hasta);
  const promDiario = Math.round(ingresosTotal/diasTrabajados);
  const promSemanal = promDiario*6;
  const diasRestantes = diasHabilesRestantesMes();
  const diasTotalesMes = diasHabilesTotalesMes();
  const proyeccionMesCompleto = promDiario*diasTotalesMes; // si todo el mes fuera igual
  const proyeccion = promDiario*diasRestantes + ingresos;  // lo que falta + lo ya generado
  const trabajos = completados.length;
  const ticket = trabajos>0?Math.round(ingresosTotal/trabajos):0;
  const ptoEquilibrio = ticket>0?Math.ceil(totalFijoMensual/ticket):0;

  const Card2=({label,val,color,sub})=>(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
      <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{color:color||"#e8edf5",fontWeight:800,fontSize:14,fontFamily:"'DM Mono',monospace"}}>{val}</div>
      {sub&&<div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{sub}</div>}
    </div>
  );
  const Sec=({title,color,children,action})=>(
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{color:color||"#7a8aaa",fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>{title}</div>
        {action}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* Filtros */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,border:"1px solid rgba(255,255,255,0.07)",gap:2}}>
          {FILTROS.map(f=>(
            <button key={f.k} onClick={()=>setFiltro(f.k)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",background:filtro===f.k?"rgba(79,140,255,0.2)":"transparent",color:filtro===f.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",borderBottom:filtro===f.k?"2px solid #4f8cff":"2px solid transparent"}}>{f.l}</button>
          ))}
        </div>
        {filtro==="custom"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>DESDE</label>
              <input type="date" value={desde} onChange={e=>setDesde(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",width:"100%",colorScheme:"dark"}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>HASTA</label>
              <input type="date" value={hasta} onChange={e=>setHasta(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",width:"100%",colorScheme:"dark"}}/>
            </div>
          </div>
        )}
        <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",textAlign:"center"}}>
          {diasTrabajados} día{diasTrabajados!==1?"s":""} trabajado{diasTrabajados!==1?"s":""} en el período
        </div>
      </div>

      {/* Resumen ingresos */}
      {filtro==="mes"&&ingresosMesPasado>0&&(
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>vs mes pasado: <strong style={{color:"#7a8aaa"}}>{fmt(ingresosMesPasado)}</strong></div>
          <div style={{color:ingresosTotal>=ingresosMesPasado?"#22d07a":"#ff5a5a",fontWeight:700,fontSize:14,fontFamily:"'DM Mono',monospace"}}>
            {ingresosTotal>=ingresosMesPasado?"▲":"▼"} {Math.abs(Math.round(((ingresosTotal-ingresosMesPasado)/ingresosMesPasado)*100))}%
          </div>
        </div>
      )}
      <Sec title="💰 Ingresos" color="#22d07a">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="TRABAJOS" val={fmt(ingresos)} color="#22d07a"/>
          <Card2 label="REPUESTOS" val={fmt(ingresosRepuestos)} color="#22d07a"/>
          <Card2 label="TOTAL INGRESOS" val={fmt(ingresosTotal)} color="#22d07a" sub="trabajos + repuestos"/>
          <Card2 label="TRABAJOS" val={trabajos} color="#e8edf5" sub={"ticket prom: "+fmt(ticket)}/>
          <Card2 label="PROM. DIARIO" val={fmt(promDiario)} color="#22d07a" sub={diasTrabajados+" días trabajados"}/>
          <Card2 label="PROM. SEMANAL" val={fmt(promSemanal)} color="#22d07a" sub="(6 días/semana)"/>
          <Card2 label="PROYEC. MES COMPLETO" val={fmt(proyeccionMesCompleto)} color="#4f8cff" sub={diasTotalesMes+"d hábiles sin dom."}/>
          <Card2 label="PROYEC. RESTO MES" val={fmt(proyeccion)} color="#22d07a" sub="lo ya generado + lo que falta"/>
        </div>
      </Sec>

      {/* Proyección */}
      <Sec title="📈 Proyección del Mes" color="#4f8cff">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="DÍAS HÁB. RESTANTES" val={diasRestantes} color="#e8edf5"/>
          <Card2 label="PROYECCIÓN TOTAL" val={fmt(proyeccion)} color="#4f8cff" sub="incl. lo ya generado"/>
          <Card2 label="GASTO FIJO MENSUAL" val={fmt(totalFijoMensual)} color="#ff8a8a"/>
          <Card2 label="PUNTO EQUILIBRIO" val={ptoEquilibrio+" trab."} color="#ffb432" sub="para cubrir gastos fijos"/>
        </div>
      </Sec>

      {/* Balance real */}
      <Sec title="📊 Balance Real" color="#ffb432">
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {[
            {label:"Ingresos trabajos", val:ingresos, color:"#22d07a", sign:"+"},
            ingresosRepuestos>0?{label:"Ingresos repuestos", val:ingresosRepuestos, color:"#22d07a", sign:"+"}:null,
            {label:"Pagado al Ayudante", val:pagadoMauricio, color:"#4f8cff", sign:"-"},
            {label:"Gastos fijos (proporcional)", val:gastoFijoPeriodo, color:"#ff8a8a", sign:"-"},
            {label:"Gastos variables", val:gastosVarPeriodo, color:"#ff8a8a", sign:"-"},
            repuestos>0?{label:"Repuestos", val:repuestos, color:"#ffb432", sign:"-"}:null,
            garantiaDev>0?{label:"Devoluciones garantía", val:garantiaDev, color:"#ff5a5a", sign:"-"}:null,
            garantiaCob>0?{label:"Cobro extra garantía", val:garantiaCob, color:"#22d07a", sign:"+"}:null,
          ].filter(Boolean).map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{item.sign === "-" ? "−" : "+"} {item.label}</span>
              <span style={{color:item.color,fontWeight:700,fontSize:13,fontFamily:"'DM Mono',monospace"}}>{fmt(item.val)}</span>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0 4px",borderTop:"2px solid rgba(255,255,255,0.12)"}}>
            <span style={{color:"#e8edf5",fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:800}}>NETO REAL</span>
            <span style={{color:neto>=0?"#22d07a":"#ff5a5a",fontWeight:800,fontSize:18,fontFamily:"'DM Mono',monospace"}}>{fmt(neto)}</span>
          </div>
        </div>
      </Sec>

      {/* IVA */}
      <Sec title="🧾 IVA" color="#7a8aaa">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <Card2 label="IVA ESTIMADO (19%)" val={fmt(ivaEstimado)} color="#7a8aaa" sub="Solo referencia"/>
          <Card2 label="IVA PAGADO REAL" val={ivaReal>0?fmt(ivaReal):"No ingresado"} color={ivaReal>0?"#ff8a8a":"#7a8aaa"} sub="Ingresado en gastos var."/>
        </div>
        <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>
          💡 Para registrar el IVA pagado, agrégalo en Gastos Variables con la descripción "IVA".
        </div>
      </Sec>

      {/* Gastos Fijos */}
      <Sec title="🏠 Gastos Fijos Mensuales" color="#ff8a8a" action={
        <button onClick={()=>setShowAddFijo(p=>!p)} style={{background:"rgba(79,140,255,0.15)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"5px 12px",color:"#4f8cff",fontSize:12,cursor:"pointer",fontWeight:700}}>➕</button>
      }>
        {showAddFijo&&<AddGastoFijo onGuardar={agregarFijo} onCancelar={()=>setShowAddFijo(false)}/>}
        {gastosFijos.length===0&&!showAddFijo&&(
          <div style={{color:"#7a8aaa",fontSize:12,textAlign:"center",padding:"8px 0"}}>Sin gastos fijos ingresados</div>
        )}
        {gastosFijos.map(g=>(
          <GastoFijoRow key={g.id} g={g} onEditar={editarFijo} onEliminar={eliminarGasto}/>
        ))}
        {gastosFijos.length>0&&(
          <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:10,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:4}}>
            <Card2 label="TOTAL/MES" val={fmt(totalFijoMensual)} color="#ff8a8a"/>
            <Card2 label="DIARIO" val={fmt(totalFijoDiario)} color="#ff8a8a"/>
            <Card2 label="SEMANAL" val={fmt(totalFijoSemanal)} color="#ff8a8a"/>
          </div>
        )}
      </Sec>

      {/* Gastos Variables */}
      <Sec title="📝 Gastos Variables" color="#ffb432" action={
        <button onClick={()=>setShowAddVar(p=>!p)} style={{background:"rgba(255,180,50,0.15)",border:"1px solid rgba(255,180,50,0.3)",borderRadius:8,padding:"5px 12px",color:"#ffb432",fontSize:12,cursor:"pointer",fontWeight:700}}>➕</button>
      }>
        {showAddVar&&<AddGastoVar onGuardar={agregarVar} onCancelar={()=>setShowAddVar(false)}/>}
        {gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)).length===0&&!showAddVar&&(
          <div style={{color:"#7a8aaa",fontSize:12,textAlign:"center",padding:"8px 0"}}>Sin gastos variables en este período</div>
        )}
        {gastosVar.filter(g=>enRango(g.fecha,filtro,desde,hasta)).map(g=>(
          <div key={g.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
            <div>
              <span style={{color:"#c8d0e0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{g.descripcion}</span>
              <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace"}}>{new Date(g.fecha).toLocaleDateString("es-CL")}</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{color:"#ffb432",fontWeight:700,fontSize:13,fontFamily:"'DM Mono',monospace"}}>{fmt(g.monto)}</span>
              <button onClick={()=>eliminarGasto(g.id,"variable")} style={{background:"transparent",border:"none",color:"rgba(255,90,90,0.5)",cursor:"pointer",fontSize:13}}>🗑</button>
            </div>
          </div>
        ))}
      </Sec>
    </div>
  );
}

// ── PESTAÑA ASISTENCIA ────────────────────────────────────────────────────────
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

// ── PESTAÑA REPUESTOS ─────────────────────────────────────────────────────────
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

// ── MAURICIO MEJORADO: todos los registros + por día ──────────────────────────
function PestañaMauricioV2({ registros, asistenciaData }) {
  const [subTab, setSubTab] = useState("porPagar");
  const [filtro, setFiltro] = useState("mes");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const FILTROS = [{k:"hoy",l:"Hoy"},{k:"ayer",l:"Ayer"},{k:"semana",l:"Esta sem."},{k:"semana_pasada",l:"Sem. ant."},{k:"mes",l:"Este mes"},{k:"mes_pasado",l:"Mes ant."},{k:"custom",l:"📅"}];

  // Todos los registros con Mauricio
  const todosConMauri = registros.filter(r => r.ayudante === "con_ayudante");
  const porPagar = todosConMauri.filter(r => !r.ayudante_pagado);
  const pagados = todosConMauri.filter(r => r.ayudante_pagado);

  // Resumen en período
  const enPeriodo = todosConMauri.filter(r => enRango(r.fecha_completado||r.fecha_presupuesto||r.fecha, filtro, desde, hasta));
  // Total pagado = todos los registros donde se marcó pagado (sin importar estado)
  const pagadosEnPeriodo = enPeriodo.filter(r=>r.ayudante_pagado);
  const totalPagado = pagadosEnPeriodo.reduce((s,r)=>s+(Number(r.ayudante_monto)||0),0);
  const completadosM = enPeriodo.filter(r=>r.estado==="completado");
  const trabajos = enPeriodo.length; // todos los trabajos en el período
  const promXTrabajo = trabajos>0?Math.round(totalPagado/trabajos):0;

  // Días trabajados
  // Días trabajados basado en todos los registros con Mauricio
  const diasTrabajados = calcularDiasTrabajados(registros.filter(r=>r.ayudante==="con_ayudante"), asistenciaData, filtro, desde, hasta);
  const promDiario = Math.round(totalPagado/diasTrabajados);
  const diasRestantes = diasHabilesRestantesMes();
  const proyeccion = promDiario*diasRestantes + totalPagado;

  // Por día — agrupar completados por fecha
  const porDia = {};
  // Por día usa todos los registros con Mauricio, agrupados por la fecha más relevante
  enPeriodo.forEach(r => {
    const fechaRef = r.fecha_completado || r.fecha_presupuesto || r.fecha;
    if(!fechaRef) return;
    const dia = new Date(fechaRef).toLocaleDateString("es-CL");
    if(!porDia[dia]) porDia[dia] = { fecha: fechaRef, trabajos: 0, pagado: 0 };
    porDia[dia].trabajos++;
    if(r.ayudante_pagado) porDia[dia].pagado += Number(r.ayudante_monto)||0;
  });
  const listaDias = Object.values(porDia).sort((a,b)=>new Date(b.fecha)-new Date(a.fecha));

  const Card2=({label,val,color,sub})=>(
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
      <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{color:color||"#e8edf5",fontWeight:800,fontSize:14,fontFamily:"'DM Mono',monospace"}}>{val}</div>
      {sub&&<div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{sub}</div>}
    </div>
  );
  const Sec=({title,color,children})=>(
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{color:color||"#7a8aaa",fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase",fontFamily:"'DM Mono',monospace"}}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {/* Sub-tabs */}
      <div style={{display:"flex",background:"rgba(255,255,255,0.03)",borderRadius:10,padding:3,border:"1px solid rgba(255,255,255,0.06)",gap:2}}>
        {[
          {k:"porPagar",l:"⚠ Por pagar ("+porPagar.length+")"},
          {k:"pagados",l:"✅ Pagado ("+pagados.length+")"},
          {k:"resumen",l:"📊 Resumen"},
          {k:"porDia",l:"📅 Por día"},
        ].map(s=>(
          <button key={s.k} onClick={()=>setSubTab(s.k)} style={{flex:1,padding:"8px 3px",borderRadius:8,border:"none",background:subTab===s.k?"rgba(79,140,255,0.18)":"transparent",color:subTab===s.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{s.l}</button>
        ))}
      </div>

      {/* Por pagar */}
      {subTab==="porPagar"&&(
        porPagar.length===0
          ?<div style={{textAlign:"center",padding:"40px 20px",color:"#7a8aaa"}}><div style={{fontSize:36,marginBottom:8}}>✅</div><div>Todo pagado</div></div>
          :<div style={{display:"flex",flexDirection:"column",gap:10}}>
            {porPagar.map(r=><MauricioCard key={r.id} r={r} onActualizar={async(datos)=>{await actualizarDB(r.id,datos);}}/>)}
          </div>
      )}

      {/* Pagados */}
      {subTab==="pagados"&&(
        pagados.length===0
          ?<div style={{textAlign:"center",padding:"40px 20px",color:"#7a8aaa"}}><div style={{fontSize:36,marginBottom:8}}>📭</div><div>Sin pagos</div></div>
          :<div style={{display:"flex",flexDirection:"column",gap:10}}>
            {pagados.map(r=>(
              <div key={r.id} style={{background:"rgba(34,208,122,0.04)",border:"1px solid rgba(34,208,122,0.15)",borderRadius:12,padding:14,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                <div>
                  <div style={{color:"#e8edf5",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
                  <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Mono',monospace"}}>{r.n_orden?"N° "+r.n_orden+" · ":""}{new Date(r.fecha_completado||r.fecha).toLocaleDateString("es-CL")}</div>
                  <div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{r.estado==="completado"?"✅":"⏳"} {r.estado}</div>
                  {r.ayudante_trabajo&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>{r.ayudante_trabajo}</div>}
                </div>
                <div style={{background:"rgba(34,208,122,0.15)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:8,padding:"6px 12px",textAlign:"center"}}>
                  <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace"}}>PAGADO</div>
                  <div style={{color:"#22d07a",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{fmt(r.ayudante_monto)}</div>
                </div>
              </div>
            ))}
          </div>
      )}

      {/* Resumen */}
      {subTab==="resumen"&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,border:"1px solid rgba(255,255,255,0.07)",gap:2}}>
            {FILTROS.map(f=>(
              <button key={f.k} onClick={()=>setFiltro(f.k)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",background:filtro===f.k?"rgba(79,140,255,0.2)":"transparent",color:filtro===f.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",borderBottom:filtro===f.k?"2px solid #4f8cff":"2px solid transparent"}}>{f.l}</button>
            ))}
          </div>
          {filtro==="custom"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>DESDE</label>
                <input type="date" value={desde} onChange={e=>setDesde(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",width:"100%",colorScheme:"dark"}}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600}}>HASTA</label>
                <input type="date" value={hasta} onChange={e=>setHasta(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"9px 10px",color:"#e8edf5",fontSize:13,outline:"none",width:"100%",colorScheme:"dark"}}/>
              </div>
            </div>
          )}
          <Sec title="👥 Mauricio" color="#4f8cff">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <Card2 label="TRABAJOS" val={trabajos} color="#e8edf5"/>
              <Card2 label="DÍAS TRABAJADOS" val={diasTrabajados} color="#e8edf5"/>
              <Card2 label="TOTAL PAGADO" val={fmt(totalPagado)} color="#4f8cff"/>
              <Card2 label="PROM. X TRABAJO" val={fmt(promXTrabajo)} color="#4f8cff"/>
            </div>
          </Sec>
          <Sec title="📈 Proyección" color="#22d07a">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <Card2 label="PROM. DIARIO" val={fmt(promDiario)} color="#22d07a"/>
              <Card2 label="DÍAS HÁB. RESTANTES" val={diasRestantes} color="#e8edf5"/>
              <Card2 label="PROYECCIÓN MES" val={fmt(proyeccion)} color="#22d07a" sub="incl. lo ya generado"/>
            </div>
          </Sec>
        </div>
      )}

      {/* Por día */}
      {subTab==="porDia"&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,border:"1px solid rgba(255,255,255,0.07)",gap:2}}>
            {FILTROS.map(f=>(
              <button key={f.k} onClick={()=>setFiltro(f.k)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",background:filtro===f.k?"rgba(79,140,255,0.2)":"transparent",color:filtro===f.k?"#4f8cff":"#7a8aaa",fontWeight:700,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",borderBottom:filtro===f.k?"2px solid #4f8cff":"2px solid transparent"}}>{f.l}</button>
            ))}
          </div>
          {listaDias.length===0
            ?<div style={{textAlign:"center",padding:"40px 20px",color:"#7a8aaa"}}><div style={{fontSize:36,marginBottom:8}}>📅</div><div>Sin trabajos en este período</div></div>
            :<div style={{display:"flex",flexDirection:"column",gap:8}}>
              {listaDias.map((d,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:12,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{color:"#e8edf5",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>{new Date(d.fecha).toLocaleDateString("es-CL",{weekday:"long",day:"numeric",month:"short"})}</div>
                    <div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{d.trabajos} trabajo{d.trabajos!==1?"s":""}</div>
                  </div>
                  <div style={{background:"rgba(79,140,255,0.15)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:8,padding:"6px 12px",textAlign:"center"}}>
                    <div style={{color:"#7a8aaa",fontSize:9,fontFamily:"'DM Mono',monospace"}}>PAGADO</div>
                    <div style={{color:"#4f8cff",fontWeight:800,fontSize:15,fontFamily:"'DM Mono',monospace"}}>{fmt(d.pagado)}</div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  );
}


// ── BARRA DE FILTRO ───────────────────────────────────────────────────────────
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

// ── HELPERS ───────────────────────────────────────────────────────────────────
function diasEnTaller(fecha) {
  return diasHabilesEnTaller(fecha);
}

function urgenciaBadge(dias) {
  if(dias >= 4) return { color:"#ff5a5a", bg:"rgba(255,90,90,0.15)", border:"rgba(255,90,90,0.4)", label:"🔴 URGENTE", dias };
  if(dias >= 2) return { color:"#ffb432", bg:"rgba(255,180,50,0.15)", border:"rgba(255,180,50,0.4)", label:"🟡 REVISAR", dias };
  return { color:"#22d07a", bg:"rgba(34,208,122,0.1)", border:"rgba(34,208,122,0.2)", label:"🟢 OK", dias };
}

// ── MODAL FORM INGRESO ────────────────────────────────────────────────────────
function ModalFormIngreso({ onGuardar, onCerrar, prefill }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",borderRadius:"20px 20px 0 0",padding:"20px 16px 40px",width:"100%",maxWidth:480,maxHeight:"95vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{color:"#e8edf5",fontWeight:800,fontSize:17,fontFamily:"'DM Sans',sans-serif"}}>➕ Nuevo Ingreso</div>
          <button onClick={onCerrar} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"6px 12px",color:"#7a8aaa",fontSize:14,cursor:"pointer"}}>✕</button>
        </div>
        <FormIngreso onGuardar={onGuardar} prefill={prefill}/>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
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

// ── MODAL FICHA COMPLETA ──────────────────────────────────────────────────────
function ModalFicha({ r, onCerrar, onAyudante, onEditar, onPresupuesto, onCompletar }) {
  const dias = diasEnTaller(r.fecha);
  const u = urgenciaBadge(dias);
  const wa = "56"+r.telefono.replace(/\D/g,"");
  const estadoLabel = {pendiente:"⏳ Pendiente", presupuesto:"📋 Presupuesto", completado:"✅ Completado"}[r.estado]||r.estado;
  const estadoColor = {pendiente:"#ffb432", presupuesto:"#4f8cff", completado:"#22d07a"}[r.estado]||"#7a8aaa";

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:400,backdropFilter:"blur(6px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",borderRadius:"20px 20px 0 0",padding:"20px 16px 40px",width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:14}}>
        
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{color:"#e8edf5",fontWeight:800,fontSize:18,fontFamily:"'DM Sans',sans-serif"}}>{r.cliente}</div>
            <div style={{color:"#7a8aaa",fontSize:12,fontFamily:"'DM Mono',monospace",marginTop:2}}>
              {r.n_orden?"N° "+r.n_orden+" · ":""}{new Date(r.fecha).toLocaleDateString("es-CL")}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
            <button onClick={onCerrar} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"5px 11px",color:"#7a8aaa",fontSize:16,cursor:"pointer"}}>✕</button>
            <div style={{background:estadoColor==="#ffb432"?"rgba(255,180,50,0.15)":estadoColor==="#4f8cff"?"rgba(79,140,255,0.15)":"rgba(34,208,122,0.15)",border:"1px solid "+estadoColor+"44",borderRadius:6,padding:"2px 9px",color:estadoColor,fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{estadoLabel}</div>
            {r.estado==="pendiente"&&<div style={{background:u.bg,border:"1px solid "+u.border,borderRadius:6,padding:"2px 9px",color:u.color,fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{dias}d hábiles</div>}
          </div>
        </div>

        {/* Foto */}
        {r.foto_url&&<img src={r.foto_url} alt="equipo" style={{width:"100%",borderRadius:12,maxHeight:220,objectFit:"contain",background:"rgba(0,0,0,0.4)"}}/>}

        {/* Contacto */}
        <div style={{display:"flex",gap:8}}>
          <a href={"https://wa.me/"+wa} target="_blank" rel="noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"rgba(34,208,122,0.12)",border:"1px solid rgba(34,208,122,0.3)",borderRadius:10,padding:"11px",color:"#22d07a",fontSize:14,fontWeight:700,textDecoration:"none",fontFamily:"'DM Sans',sans-serif"}}>
            💬 WhatsApp
          </a>
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,padding:"11px",color:"#7a8aaa",fontSize:13,fontFamily:"'DM Mono',monospace"}}>
            +56 {r.telefono}
          </div>
        </div>

        {/* Fallas */}
        <div style={{background:"rgba(255,90,90,0.07)",border:"1px solid rgba(255,90,90,0.18)",borderRadius:12,padding:"12px 14px"}}>
          <div style={{color:"#ff8a8a",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1,marginBottom:8}}>FALLA REPORTADA</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:r.motivo_ingreso?8:0}}>
            {(r.tipos_falla||[]).map(id=>{const tf=TIPOS_FALLA.find(t=>t.id===id);return tf?<span key={id} style={{background:"rgba(255,90,90,0.15)",border:"1px solid rgba(255,138,138,0.3)",borderRadius:6,padding:"3px 8px",color:"#ff8a8a",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>{tf.icon} {tf.label}</span>:null;})}
          </div>
          {r.motivo_ingreso&&<div style={{color:"#d0a0a0",fontSize:12,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{r.motivo_ingreso}</div>}
        </div>

        {/* Revisión */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[{icon:"⚡",label:"Motor",val:r.motor_funciona},{icon:"🔦",label:"Luces",val:r.luces_bocina},{icon:"🛞",label:"Neumát.",val:r.neumaticos}].map(it=>(
            <div key={it.label} style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"8px 6px",textAlign:"center",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:15}}>{it.icon}</div>
              <div style={{color:"#7a8aaa",fontSize:10,fontFamily:"'DM Mono',monospace",marginBottom:3}}>{it.label}</div>
              <Badge val={it.val}/>
            </div>
          ))}
        </div>

        {/* Observaciones */}
        {r.comentario&&<div style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"10px 12px",color:"#a0a8bc",fontSize:13,fontFamily:"'DM Sans',sans-serif",borderLeft:"3px solid rgba(79,140,255,0.4)"}}>{r.comentario}</div>}

        {/* Presupuesto si existe */}
        {r.presupuesto_problema&&<div style={{background:"rgba(255,180,50,0.07)",border:"1px solid rgba(255,180,50,0.2)",borderRadius:12,padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
          <div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:1}}>PRESUPUESTO</div>
          <div><div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",marginBottom:2}}>PROBLEMA</div><div style={{color:"#e0d0a0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{r.presupuesto_problema}</div></div>
          <div><div style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace",marginBottom:2}}>TRABAJO</div><div style={{color:"#e0d0a0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{r.presupuesto_trabajo}</div></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"#ffb432",fontSize:10,fontFamily:"'DM Mono',monospace"}}>VALOR</span>
            <span style={{color:"#ffb432",fontWeight:800,fontSize:17,fontFamily:"'DM Mono',monospace"}}>{fmt(r.presupuesto_valor)}</span>
          </div>
        </div>}

        {/* Ayudante */}
        {r.ayudante==="con_ayudante"&&<div style={{background:"rgba(79,140,255,0.06)",border:"1px solid rgba(79,140,255,0.15)",borderRadius:12,padding:"10px 14px"}}>
          <div style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>👥 {r.ayudante_nombre||"Mauricio"}</div>
          {r.ayudante_trabajo&&<div style={{color:"#7a8aaa",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:3}}>{r.ayudante_trabajo}</div>}
          <div style={{display:"flex",gap:7,marginTop:4,alignItems:"center"}}>
            {r.ayudante_monto?<span style={{color:"#4f8cff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{fmt(r.ayudante_monto)}</span>:null}
            <span style={{background:r.ayudante_pagado?"rgba(34,208,122,0.15)":"rgba(255,90,90,0.12)",color:r.ayudante_pagado?"#22d07a":"#ff8a8a",borderRadius:5,padding:"2px 7px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{r.ayudante_pagado?"✅ Pagado":"⚠ Sin pagar"}</span>
          </div>
        </div>}

        {/* Acciones según estado */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={onEditar} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"12px",color:"#c8d0e0",fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>✏️ Editar</button>
          <button onClick={onAyudante} style={{flex:1,background:"rgba(79,140,255,0.1)",border:"1px solid rgba(79,140,255,0.25)",borderRadius:10,padding:"12px",color:"#4f8cff",fontSize:13,cursor:"pointer",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>👥 Ayudante</button>
          {r.estado==="pendiente"&&<button onClick={onPresupuesto} style={{flex:1,background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:10,padding:"12px",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>📋 Presupuesto</button>}
          {(r.estado==="pendiente"||r.estado==="presupuesto")&&<button onClick={onCompletar} style={{flex:1,background:"linear-gradient(135deg,#22d07a,#4f8cff)",border:"none",borderRadius:10,padding:"12px",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>✅ Completar</button>}
        </div>
      </div>
    </div>
  );
}

// ── PESTAÑA CATÁLOGO ──────────────────────────────────────────────────────────
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

// ── PESTAÑA AYUDANTE PAGOS ────────────────────────────────────────────────────
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

// ── MODAL REGISTRO RÁPIDO ─────────────────────────────────────────────────────
function ModalRegistroRapido({ onGuardar, onCerrar }) {
  const [detalle, setDetalle] = useState("");
  const [valor, setValor] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleFoto = async (e) => {
    const file = e.target.files[0]; if(!file) return;
    const rd = new FileReader();
    rd.onload = async ev => {
      const comprimida = await comprimirImagen(ev.target.result);
      setFotoPreview(comprimida);
      const res = await fetch(comprimida);
      const blob = await res.blob();
      setFotoFile(new File([blob],"foto.jpg",{type:"image/jpeg"}));
    };
    rd.readAsDataURL(file);
  };

  const guardar = async () => {
    if(!detalle.trim()) { alert("Ingresa una descripción"); return; }
    if(!valor) { alert("Ingresa el valor cobrado"); return; }
    setLoading(true);
    const nOrden = await getNextOrden();
    const { data: { user } } = await sb.auth.getUser();
    let foto_url = null;

    if(fotoFile) {
      const path = user.id+"/"+Date.now()+".jpg";
      const { error } = await sb.storage.from("fotos").upload(path, fotoFile);
      if(!error) {
        const { data: signed } = await sb.storage.from("fotos").createSignedUrl(path, 60*60*24*365*5);
        foto_url = signed?.signedUrl || null;
      }
    }

    const registro = {
      user_id: user.id,
      n_orden: nOrden,
      cliente: "Registro rápido",
      telefono: "",
      foto_url,
      tipos_falla: [],
      motivo_ingreso: detalle,
      motor_funciona: null,
      luces_bocina: null,
      neumaticos: null,
      comentario: "",
      estado: "completado",
      detalle_reparacion: detalle,
      valor_cobrado: Number(valor),
      fecha: new Date(fecha+"T12:00:00").toISOString(),
      fecha_completado: new Date(fecha+"T12:00:00").toISOString(),
      ayudante: null,
      ayudante_nombre: "",
      ayudante_trabajo: "",
      ayudante_monto: null,
      ayudante_pagado: false,
    };

    const { data, error } = await sb.from("registros").insert([registro]).select().single();
    if(error) { alert("Error: "+error.message); setLoading(false); return; }
    onGuardar(data);
    setLoading(false);
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}} onClick={onCerrar}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",borderRadius:"20px 20px 0 0",padding:"20px 16px 40px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:14}}>
        
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#ffb432",fontWeight:800,fontSize:17,fontFamily:"'DM Sans',sans-serif"}}>⚡ Registro Rápido</div>
          <button onClick={onCerrar} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,padding:"6px 12px",color:"#7a8aaa",fontSize:14,cursor:"pointer"}}>✕</button>
        </div>

        {/* Foto opcional */}
        <div>
          <label style={LBL}>Foto (opcional)</label>
          <div onClick={()=>fotoPreview&&setFotoPreview(null)} style={{marginTop:6,border:"1.5px dashed rgba(255,255,255,0.12)",borderRadius:12,minHeight:80,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"rgba(255,255,255,0.02)"}}>
            {fotoPreview
              ?<img src={fotoPreview} alt="prev" style={{width:"100%",maxHeight:160,objectFit:"contain"}}/>
              :<div style={{textAlign:"center",color:"rgba(255,255,255,0.3)",padding:16}}><div style={{fontSize:24}}>📷</div><div style={{fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Opcional</div></div>}
          </div>
          <div style={{display:"flex",gap:8,marginTop:6}}>
            <button onClick={()=>{fileRef.current.removeAttribute("capture");fileRef.current.click();}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"9px",color:"#c8d0e0",fontSize:12,cursor:"pointer"}}>🖼 Galería</button>
            <button onClick={()=>{fileRef.current.setAttribute("capture","environment");fileRef.current.click();}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"9px",color:"#c8d0e0",fontSize:12,cursor:"pointer"}}>📷 Cámara</button>
            {fotoPreview&&<button onClick={()=>{setFotoPreview(null);setFotoFile(null);}} style={{background:"rgba(255,90,90,0.1)",border:"1px solid rgba(255,90,90,0.2)",borderRadius:8,padding:"9px 12px",color:"#ff5a5a",fontSize:12,cursor:"pointer"}}>✕</button>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFoto}/>
        </div>

        {/* Descripción */}
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <label style={LBL}>Descripción del trabajo *</label>
          <textarea value={detalle} onChange={e=>setDetalle(e.target.value)} placeholder="Ej: Cambio de batería, ajuste de frenos..." rows={3}
            style={{...INP,fontSize:14,resize:"vertical"}}/>
        </div>

        {/* Valor y fecha */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={LBL}>Valor cobrado *</label>
            <input type="number" value={valor} onChange={e=>setValor(e.target.value)} placeholder="Ej: 25000" style={{...INP,fontSize:14}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={LBL}>Fecha</label>
            <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={{...INP,fontSize:14,colorScheme:"dark"}}/>
          </div>
        </div>

        <button onClick={guardar} disabled={loading} style={{background:"linear-gradient(135deg,#ffb432,#ff6432)",border:"none",borderRadius:12,padding:"15px",color:"#fff",fontSize:16,fontWeight:800,fontFamily:"'DM Sans',sans-serif",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1,marginTop:4}}>
          {loading?"⏳ Guardando...":"⚡ Registrar Trabajo"}
        </button>
      </div>
    </div>
  );
}
