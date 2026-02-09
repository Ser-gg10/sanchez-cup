const ADMIN_PASS = 'sanchezcup';

// Iniciar sesión como admin
function loginAdmin(){
  const p = prompt('Contraseña admin');
  if(p === ADMIN_PASS){
    localStorage.setItem('sc_role','admin'); // Guardamos rol admin
    alert('Modo admin activado');
    location.reload(); // recarga para mostrar botones
  } else {
    alert('Contraseña incorrecta');
  }
}

// Comprobar si el usuario es admin
function isAdmin(){
  return localStorage.getItem('sc_role') === 'admin';
}

// Modo oscuro
function toggleDark(){
  document.body.classList.toggle('dark');
  localStorage.setItem('sc_dark', document.body.classList.contains('dark') ? '1' : '0');
}
