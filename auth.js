const ROLE_KEY='sc_role';

function getRole(){ return localStorage.getItem(ROLE_KEY)||'public'; }
function setRole(role){ localStorage.setItem(ROLE_KEY,role); location.reload(); }

function isAdmin(){ return getRole()==='admin'; }

function loginAdmin(){
  const p=prompt('Contraseña admin');
  if(p==='sanchezcup') setRole('admin');
  else alert('Contraseña incorrecta');
}

function toggleDark(){
  document.body.classList.toggle('dark');
  localStorage.setItem('sc_dark',document.body.classList.contains('dark')?'1':'0');
}
