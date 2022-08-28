var submit = document.getElementById('button');
var members = [];
var status = [];
var ongoing = false;
// console.log(submit.id);
var gameplay = document.getElementById('gamepage');
var server = "server ip";
var user = "";
var eliminated = false;
//???????????
console.log("script works lol");
submit.addEventListener('click', ()=> {
    console.log("join click");
    user = document.getElementById('username-input').value;
    document.getElementById('opener').style.visibility = 'hidden';
    console.log(user);
    document.getElementById('username-display').innerHTML = user;
    // document.getElementById('sus-surround').hidden = false;
    // document.getElementById('sus').hidden = false;
    // document.getElementById('sus-surround').style.zIndex = '1';
    joinGame(user);
    updateMembers();
});
window.onbeforeunload = function() {
    leaveGame();
    return "we do a lil game leavin'";
}
function tick() {
    update();
}
function joinGame() {
    console.log("joining game");
    //make xttp request to join game
    //make the code copilot
    //me when copilot doesn't make the code 
    //:(
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', server, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({type:"joingame", username: user}));
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            ongoing = response;
            initialize();
        }        
    }
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
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', server, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({type:"updateMember"}));
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            console.log(response);
            members = response;
            updateDisplay();
        }        
    }
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
    var memebersDiv = document.createElement('div');
    memebersDiv.id = "membersDiv";
    gameplay.appendChild(memebersDiv);
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
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', server, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({type:"leavegame", username: user}));
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }        
    }
    console.log("leaving game");
}
function update() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://count.alhub.net', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            console.log(response);
            members = response.members;
            status = response.status;
            updateDisplay();
        }
    }
}
function makeMove(move){
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', server, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({type:"makemove", username: user, move: move}));
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }        
    }
}