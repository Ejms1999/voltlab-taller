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

export default comprimirImagen;
