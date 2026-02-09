function toggleDark(){
const d=document.documentElement.classList.toggle('dark');
localStorage.setItem('sc_dark',d?'1':'0');
}

function addPlayer(){
const name=document.getElementById('playerName').value.trim();
if(!name)return;
players.push({name,pts:0});
save();
renderPlayers();
}

function renderPlayers(){
const ul=document.getElementById('playerList');
if(!ul)return;
ul.innerHTML='';
players.forEach(p=>{
const li=document.createElement('li');
li.textContent=p.name;
ul.appendChild(li);
});
}

function generateMatches(){
if(!isAdmin())return alert('Solo admin');

matches=[];
for(let i=0;i<players.length;i++){
for(let j=i+1;j<players.length;j++){
matches.push({a:i,b:j,sa:'',sb:''});
}
}
save();
renderMatches();
}

function renderMatches(){
const div=document.getElementById('matches');
if(!div)return;
div.innerHTML='';

matches.forEach((m,idx)=>{
const p1=players[m.a]?.name;
const p2=players[m.b]?.name;

const row=document.createElement('div');
row.innerHTML=`
${p1}
<input type="number" value="${m.sa}" onchange="setScore(${idx},'a',this.value)">
-
<input type="number" value="${m.sb}" onchange="setScore(${idx},'b',this.value)">
${p2}
`;

div.appendChild(row);
});
}

function setScore(i,team,val){
if(!isAdmin())return;
matches[i]['s'+team]=val;
save();
calcTable();
}

function calcTable(){
players.forEach(p=>p.pts=0);

matches.forEach(m=>{
if(m.sa===''||m.sb==='')return;
if(+m.sa>+m.sb)players[m.a].pts+=3;
else if(+m.sb>+m.sa)players[m.b].pts+=3;
else{players[m.a].pts+=1;players[m.b].pts+=1}
});

save();
renderTable();
}

function renderTable(){
const div=document.getElementById('table');
if(!div)return;

const sorted=[...players].sort((a,b)=>b.pts-a.pts);

div.innerHTML=sorted.map(p=>`${p.name} - ${p.pts} pts`).join('<br>');
}

function downloadData(){
if(!isAdmin())return;
const data={players,matches};
const blob=new Blob([JSON.stringify(data)],{type:'application/json'});
const a=document.createElement('a');
a.href=URL.createObjectURL(blob);
a.download='sanchezcup.json';
a.click();
}

function uploadData(){
if(!isAdmin())return;
const input=document.createElement('input');
input.type='file';
input.onchange=e=>{
const file=e.target.files[0];
const reader=new FileReader();
reader.onload=()=>{
const data=JSON.parse(reader.result);
players=data.players;
matches=data.matches;
save();
location.reload();
};
reader.readAsText(file);
};
input.click();
}

document.addEventListener('DOMContentLoaded',()=>{
renderPlayers();
renderMatches();
calcTable();
});
