// --- INSCRIPCIONES ---
const formEquipo = document.getElementById('formEquipo');
formEquipo.onsubmit = e => {
  e.preventDefault();
  const eqName = document.getElementById('equipo').value;
  const jugadores = [...document.querySelectorAll('.jugador')].map(j=>j.value);
  equipos.push({nombre: eqName, jugadores});
  guardarDatos();
  formEquipo.reset();
  renderPartidos();
  calcularTodo();
};

// --- BOTONES ADMIN DINÁMICOS ---
function renderAdminButtons(){
  if(!isAdmin()) return;

  // Mostrar aviso de modo admin
  const header = document.querySelector('header');
  if(!document.getElementById('adminLabel')){
    const span = document.createElement('span');
    span.id = 'adminLabel';
    span.textContent = ' – Modo Admin';
    span.style.fontSize = '1rem';
    span.style.marginLeft = '10px';
    header.appendChild(span);
  }

  // Botón Generar Liga
  const ligaCont = document.getElementById('ligaContainer');
  if(!document.getElementById('btnGenerarLiga')){
    const btnLiga = document.createElement('button');
    btnLiga.id = 'btnGenerarLiga';
    btnLiga.className = 'main alt';
    btnLiga.textContent = 'Generar Liga';
    btnLiga.onclick = generarLiga;
    ligaCont.prepend(btnLiga);
  }

  // Botón Generar Eliminatorias
  const elimCont = document.getElementById('elimContainer');
  if(!document.getElementById('btnGenerarElim')){
    const btnElim = document.createElement('button');
    btnElim.id = 'btnGenerarElim';
    btnElim.className = 'main';
    btnElim.textContent = 'Generar Eliminatorias';
    btnElim.onclick = generarEliminatorias;
    elimCont.prepend(btnElim);
  }
}

// --- GENERAR LIGA ---
function generarLiga(){
  if(!isAdmin()) return alert('Solo admin');
  partidos = [];
  for(let i=0;i<equipos.length;i++){
    for(let j=i+1;j<equipos.length;j++){
      partidos.push({a:equipos[i].nombre,b:equipos[j].nombre,acta:null});
    }
  }
  guardarDatos();
  renderPartidos();
  calcularTodo();
}

// --- RENDER PARTIDOS ---
function renderPartidos(){
  const c = document.getElementById('partidos');
  c.innerHTML = '';
  partidos.forEach((p,i)=>{
    const d = document.createElement('div');
    d.className = 'card match';
    d.innerHTML = `
      <div>${p.a}</div>
      <div class='score'>${p.acta ? `${p.acta.ga}-${p.acta.gb}` : 'vs'}</div>
      <div>${p.b}</div>
    `;
    if(isAdmin()){
      const btnActa = document.createElement('button');
      btnActa.className = 'main';
      btnActa.textContent = 'Acta';
      btnActa.onclick = ()=>editarActa(i);
      d.appendChild(btnActa);
    }
    c.appendChild(d);
  });
}

// --- EDITAR ACTA ---
function editarActa(i){
  if(!isAdmin()) return alert('Solo admin');
  const p = partidos[i];
  let ga=0, gb=0;
  const datos = {};
  equipos.find(e=>e.nombre===p.a).jugadores.forEach(j=>{
    const g = +prompt(`Goles ${j}`,0);
    const a = +prompt(`Asistencias ${j}`,0);
    ga += g; datos[j] = {g,a};
  });
  equipos.find(e=>e.nombre===p.b).jugadores.forEach(j=>{
    const g = +prompt(`Goles ${j}`,0);
    const a = +prompt(`Asistencias ${j}`,0);
    gb += g; datos[j] = {g,a};
  });
  p.acta = {ga,gb,datos};
  partidos[i] = p;
  guardarDatos();
  renderPartidos();
  calcularTodo();
}

// --- CLASIFICACION ---
function clasificacionFunc(){
  clasificacion = equipos.map(e=>({nombre:e.nombre,PJ:0,PG:0,PE:0,PP:0,pts:0}));
  partidos.forEach(p=>{
    if(!p.acta) return;
    const A = clasificacion.find(e=>e.nombre===p.a);
    const B = clasificacion.find(e=>e.nombre===p.b);
    A.PJ++; B.PJ++;
    if(p.acta.ga > p.acta.gb){ A.PG++; A.pts+=3; B.PP++; }
    else if(p.acta.ga < p.acta.gb){ B.PG++; B.pts+=3; A.PP++; }
    else { A.PE++; B.PE++; A.pts++; B.pts++; }
  });
  clasificacion.sort((a,b)=>b.pts-a.pts);
  const tabla = document.getElementById('tablaClas');
  if(tabla){
    tabla.innerHTML = '';
    clasificacion.forEach((e,i)=>{
      tabla.innerHTML += `<tr>
        <td>${i+1}</td><td>${e.nombre}</td><td>${e.PJ}</td><td>${e.PG}</td><td>${e.PE}</td><td>${e.PP}</td><td>${e.pts}</td>
      </tr>`;
    });
  }
  guardarDatos();
}

// --- RANKING ---
function rankingFunc(){
  const g={}, a={};
  equipos.forEach(eq=>eq.jugadores.forEach(j=>{g[j]=0; a[j]=0;}));
  partidos.forEach(p=>{
    if(!p.acta) return;
    Object.entries(p.acta.datos).forEach(([j,d])=>{
      g[j] += d.g;
      a[j] += d.a;
    });
  });
  const tGoles = document.getElementById('rankingGoles');
  const tAsist = document.getElementById('rankingAsist');
  if(tGoles){ tGoles.innerHTML=''; Object.entries(g).sort((x,y)=>y[1]-x[1]).forEach(([j,v])=>tGoles.innerHTML += `<tr><td>${j}</td><td>${v}</td></tr>`);}
  if(tAsist){ tAsist.innerHTML=''; Object.entries(a).sort((x,y)=>y[1]-x[1]).forEach(([j,v])=>tAsist.innerHTML += `<tr><td>${j}</td><td>${v}</td></tr>`);}
}

// --- CALCULAR TODO ---
function calcularTodo(){ clasificacionFunc(); rankingFunc(); }

// --- ELIMINATORIAS ---
function generarEliminatorias(){
  if(!isAdmin()) return alert('Solo admin');
  const top = clasificacion.slice(0,4);
  const b = document.getElementById('bracket');
  if(!b) return;
  b.innerHTML='';
  b.innerHTML += `<div class='round'><strong>Semifinal 1</strong><p>${top[0].nombre} vs ${top[3].nombre}</p></div>`;
  b.innerHTML += `<div class='round'><strong>Semifinal 2</strong><p>${top[1].nombre} vs ${top[2].nombre}</p></div>`;
  b.innerHTML += `<div class='round'><strong>Final</strong><p>Ganadores semifinales</p></div>`;
}
