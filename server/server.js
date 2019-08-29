
var express = require('express');
var app = express();

var fs = require('file-system');

const path = require('path');
const http = require('http').Server(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist/week4/')));

var http = require("http").Server(app);
var server = http.listen(3000, function() {
    console.log("Server listening on port 3000");
});

require('./routes/api-login.js')(app, path);
require('./listen.js')(http);

app.post('/api/auth', function(req,res){

    if (!req.body){
        return res.sendStatus(400)
    }

    var userCredentials = {};
    userCredentials.username = req.body.username;
    userCredentials.pwd = req.body.pwd;
    userCredentials.valid = "false";
    
    fs.readFile('./server/data/users.json', 'utf8', function(err, data){
        if (err) throw err;
        let userArray = JSON.parse(data);
        console.log(userArray);

        let i = userArray.findIndex(user => (
            (user.username == userCredentials.username) 
            && (user.pwd == userCredentials.pwd)
        ));
    
        if (i == -1){
            res.send(userCredentials);
        } else {
            console.log(userArray[i]);
            userCredentials.valid = "true";
            res.send(userCredentials);
        }

    });
});

/*
app.post('/testing', require('./router/testing'));
app.post('/logout', require('./router/logout'));
*/