

var express = require('express');
var app = express();

const path = require('path');
const http = require('http').Server(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist/week5/')));

require('./routes/api-login.js')(app, path);
require('./listen.js')(http);