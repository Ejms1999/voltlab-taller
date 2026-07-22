import jsPDF from "jspdf";
import { LOGO_B64, TIPOS_FALLA } from "./constants.js";

function generarPDF(r,{descargar=true,nOrdenParam=null}={}) {
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

export default generarPDF;
