const ADMIN_PASS = 'sanchezcup';

function loginAdmin(){
  const p = prompt('Contraseña admin');
  if(p === ADMIN_PASS){
    localStorage.setItem('sc_role','admin');
    alert('Modo admin activado');
    location.reload();
  } else {
    alert('Contraseña incorrecta');
  }
}

function isAdmin(){
  return localStorage.getItem('sc_role') === 'admin';
}

function toggleDark(){
  document.body.classList.toggle('dark');
  localStorage.setItem('sc_dark', document.body.classList.contains('dark') ? '1' : '0');
}
