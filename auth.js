const ROLE_KEY="sc_role";

function getRole(){
return localStorage.getItem(ROLE_KEY)||"public";
}

function setRole(role){
localStorage.setItem(ROLE_KEY,role);
location.reload();
}

function loginAdmin(){
const pass=prompt("Contraseña admin:");
if(pass==="sanchezcup") setRole("admin");
else alert("Incorrecta");
}

function isAdmin(){return getRole()==="admin"}
function isTV(){return getRole()==="tv"}

function applyPermissions(){
const admin=document.querySelectorAll('.admin-only');
const pub=document.querySelectorAll('.public-only');

if(isAdmin()){
admin.forEach(e=>e.style.display='block');
pub.forEach(e=>e.style.display='block');
}
else if(isTV()){
admin.forEach(e=>e.style.display='none');
pub.forEach(e=>e.style.display='none');
}
else{
admin.forEach(e=>e.style.display='none');
pub.forEach(e=>e.style.display='block');
}
}

document.addEventListener('DOMContentLoaded',applyPermissions);
