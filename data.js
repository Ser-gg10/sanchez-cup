function LS(k){ return JSON.parse(localStorage.getItem(k)) || []; }
function SS(k,v){ localStorage.setItem(k,JSON.stringify(v)); }

let equipos = LS('equipos');
let partidos = LS('partidos');
let clasificacion = LS('clasificacion');

if(!localStorage.getItem('equipos')) SS('equipos', []);
if(!localStorage.getItem('partidos')) SS('partidos', []);
if(!localStorage.getItem('clasificacion')) SS('clasificacion', []);

function guardarDatos(){
  SS('equipos', equipos);
  SS('partidos', partidos);
  SS('clasificacion', clasificacion);
}
