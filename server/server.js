

var express = require('express');
var app = express();

const path = require('path');
const http = require('http').Server(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist/week5/')));

require('./routes/api-login.js')(app, path);
require('./listen.js')(http);


//app.get('/account', function(req,res){
//});

app.post('/api/login', function(req,res){
    let users = [
        {'email':'123@com.au', 'pwd':'123'},
        {'email':'abc@com.au', 'pwd':'123'},
        {'email':'xyz@com.au', 'pwd':'123'}
    ]
    if (!req.body){
        return res.sendStatus(400)
    }
    var customer = {}; //create a new customer object that can be sent back as a response
    customer.email = req.body.email; //add in the value of the typed email
    customer.upwd = req.body.upwd; //add in the value of the type password. (This is an ill advised method of sending passwords.)
    customer.valid = false //set to false by default
    for (let i = 0; i < users.length; i++){ //loop over each of the users to test for a match. (This would be better to do with a database.)
        if (req.body.email == users[i].email && req.body.upwd == users[i].pwd){
            customer.valid = true;
        }
    }
    res.send(customer);
});
