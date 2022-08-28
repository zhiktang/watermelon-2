var submit = document.getElementById('button');
var members = [];
var status = [];
var ongoing = false;
// console.log(submit.id);
var gameplay = document.getElementById('gamepage');
//???????????
console.log("script works lol");
submit.addEventListener('click', ()=> {
    console.log("join click");
    var username = document.getElementById('username-input').value;
    document.getElementById('opener').style.visibility = 'hidden';
    console.log(username);
    document.getElementById('username-display').innerHTML = username;
    // document.getElementById('sus-surround').hidden = false;
    // document.getElementById('sus').hidden = false;
    // document.getElementById('sus-surround').style.zIndex = '1';
    joinGame(username);
    updateMembers();
    initialize();
});
window.onbeforeunload = function() {
    leaveGame();
    return "we do a lil game leavin'";
}
function tick() {
    update();
}
function joinGame(username) {
    //send request to server to join game
}
function initialize() {
    console.log("game in progress: " + ongoing);
    if (ongoing == false) {
        reset();
        updateDisplay();
        gameplay.hidden = false;
        gameplay.style.zIndex = '3';
    }
    else {
        document.getElementById('in-progress-text').hidden = false;
    }
}
function updateMembers() {
    //make html request to get members names
}
function Eliminate(person) {
    status[memebers.indexOf(person)] = false;
}
function reset() {
    console.log("status reset");
    status = [];
    for (var i = 0; i < members.length; i++) {
        status[i] = true;
    }
}
function updateDisplay(){
    console.log("updating display");
    gameplay.innerHTML = "";
    members.forEach(person => {
        var personDiv = document.createElement('div');
        personDiv.className = 'personDiv';
        var name = document.createElement('p');
        name.className = person;
        if (status[members.indexOf(person)]) {
            personDiv.style.opacity = '1';
        }
        else {
            personDiv.style.opacity = '0.5';
        }
        gameplay.appendChild(personDiv);
    });
    console.log("display updated");
}
function leaveGame(){
    //send request to server to leave game
    console.log("leaving game");
}
function update() {
    //make html request to get status of game
}