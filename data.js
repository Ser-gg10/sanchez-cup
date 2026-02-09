// Funciones para guardar y leer del localStorage
function LS(key){ return JSON.parse(localStorage.getItem(key)) || []; }
function SS(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

// Variables globales
let equipos = LS('equipos');
let partidos = LS('partidos');
let clasificacion = LS('clasificacion');

function guardarDatos(){
  SS('equipos', equipos);
  SS('partidos', partidos);
  SS('clasificacion', clasificacion);
}
