let players=JSON.parse(localStorage.getItem('sc_players')||'[]');
let matches=JSON.parse(localStorage.getItem('sc_matches')||'[]');

function save(){
localStorage.setItem('sc_players',JSON.stringify(players));
localStorage.setItem('sc_matches',JSON.stringify(matches));
}
