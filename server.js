var bodyParser = require('body-parser');
var express = require('express');
const fs = require('fs');
var app = express();
var date = new Date();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-headers", "Content-Type");
    next();
}
);
app.get('/', function (req, res) {
    res.send(JSON.stringify({members:members, status:status}));
    console.log('GET /');
});
app.post('/', function (req, res) {
    console.log('POST /');
    console.log(req.body);
    if (req.body.type == "joingame") {
        var user = req.body.username;
        serverJoinGame(user);
    }
    else if (req.body.type == "leavegame") {
        var user = req.body.username;
        serverLeaveGame(user);
    }
    else if (req.body.type =="updateMembers") {
        res.send(JSON.stringify({members:memebers}));
    }
    else if (req.body.type == "makemove") {
        var user = req.body.username;
        var move = req.body.move;
        serverMove(user, move, flip);
    }
}
);
var members = [];
var status = [];
var watermelon = 0;
var direction = 0;
var lastMoving = 0; //not actual last moving, for use for repeat, does not include flip
var lastMoveTime = 0;
var gameStarted = false;
var membersInGame = [];
var flipped = true;
var numberPlaying = 0;
function serverJoinGame(user) {
    if (members.includes(user)) {
        console.log("User already in game");
    }
    else {
        members.push(user);
        status.push(0);
        console.log(user + " joined game");
    }
}
function serverLeaveGame(user) {
    if (members.includes(user)) {
        var index = members.indexOf(user);
        members.splice(index, 1);
        status.splice(index, 1);
        console.log(user + " left game");
    }
    else {
        console.log("User not in game");
    }
}
function serverStartGame(){
    gameStarted = true;
    numberPlaying = members.length;
    watermelon = 0;
    lastMoving = 0;
    direction = 0;

}
// -1 is flipped, 1 is move cw, 2 is upskip, 3 is repeat
function serverMove(user, move, flip){
    var moving = 0;
    if(user != members.indexOf(user)){
        serverELiminate(members.indexOf(user));
        //send request back
    }
    else{
        if(move == 1){
            moving = 1;
            direction = 1;
        }
        else if(move == -1){
            moving = -1;
            direction = -1;
        }
        else if(move == 2){
            moving = 2 * direction;
        }
        else if(move == -2){
            moving = -2 * direction;
        }
        else if(move == 3){
            moving = lastMoving;
        }
        else if(move == 3){
            moving = lastMoving * -1;
        }
        lastMoving = moving;
        if(flip){
            moving *= -1;
        }
        watermelon = (watermelon + moving) % numberPlaying;
    }
}
function serverELiminate(user){
    status[user]=1
    membersInGame.splice(user,1);
}