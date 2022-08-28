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
var memebers = [];
var status = [];
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
        serverMove(user, move);
    }
}
);
function serverJoinGame(user) {
    //austin time
}
function serverLeaveGame(user) {
    //austin time
}
function serverMove(user, move) {
    //austin time
}