
//The express module provides web framework for node (easy routing)
const express = require('express');
//
//this creates an object called app that denotes the Express application
//It is created by calling the top-level express() function exported by the express module
const app = express();

// The fs module provides an API for interacting with the file system
const fs = require('fs');

//This module provides functionality to extract a filename from a file path
const path = require('path');

//Cross origin resource sharing to cater for port 4200 to port 3000
const cors = require('cors'); // imports the cors module
app.use(cors()); // add cors middleware to the express application

//This module will act as a middleman between my handlers, parsing data (available under req.body)
const bodyParser = require('body-parser');
//
app.use(bodyParser.urlencoded({ extended: true }));
//
//mounts the specified middleware function at he specified path: the middlewere function is exectued when the base
//of the requested path matches path. In this case we are using middleware to parse JSON data
app.use(bodyParser.json());

//Used to provide http functionality
const http = require('http').Server(app);

//const io = require('sicjet.io')(http);

//const sockets = require('./socket.js');

//const server = require('./listen.js');

//Tells express server to allow public files to be hosted in a sub-directory called ""
app.use(express.static(path.join(__dirname + '/../dist/week4/')));
console.log("Here is the dirname: ", __dirname);

var server = http.listen(3000, function() {
    console.log("Server listening on port: 3000");
});

//require('./routes/api-login.js')(app, path);
//require('./listen.js')(http);

//first parameter is a url, second is a callback function- given as a seperate file
app.post('/loginSTART', require('./router/doLoginSTART'));
app.post('/loginEND', require('./router/doLoginEND'));

/*
app.post('/testing', require('./router/testing'));
app.post('/logout', require('./router/logout'));
*/