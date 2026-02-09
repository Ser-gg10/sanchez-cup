// --- Helpers para LocalStorage ---
function LS(k){ return JSON.parse(localStorage.getItem(k)) || []; }
function SS(k,v){ localStorage.setItem(k,JSON.stringify(v)); }

// --- Datos principales ---
let equipos = LS('equipos');        // Array de equipos {nombre, jugadores:[]}
let partidos = LS('partidos');      // Array de partidos {a, b, acta}
let clasificacion = LS('clasificacion'); // Calculada

// --- Inicialización ---
if(!localStorage.getItem('equipos')) SS('equipos', []);
if(!localStorage.getItem('partidos')) SS('partidos', []);
if(!localStorage.getItem('clasificacion')) SS('clasificacion', []);

// Guardar cambios
function guardarDatos(){
  SS('equipos', equipos);
  SS('partidos', partidos);
  SS('clasificacion', clasificacion);
}
