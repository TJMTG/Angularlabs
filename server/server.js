
//The express module provides web framework for node (easy routing)
const express = require('express');
//
//this creates an object called app that denotes the Express application
//It is created by calling the top-level express() function exported by the express module
const app = express();

//Cross origin resource sharing to cater for port 4200 to port 3000
const cors = require('cors'); // imports the cors module
app.use(cors()); // add cors middleware to the express application

//This module will act as a middleman between my handlers, parsing data (available under req.body)
const bodyParser = require('body-parser');
//
//mounts the specified middleware function at he specified path: the middlewere function is exectued when the base
//of the requested path matches path. In this case we are using middleware to parse JSON data
app.use(bodyParser.json());

//Used to provide http functionality
const http = require('http').Server(app);

//require MongoClient functionality
const MongoClient = require('mongodb').MongoClient;
//require ObjectID functionality
var ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
MongoClient.connect(
    url, 
    {
        poolSize: 10, 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    },
    function(err, client){
        if (err) {return console.log(err)}
        const dbName = 'mydb';
        const db = client.db(dbName);
        require('./route/api_add.js')(db, app);
        require('./route/api_productCount.js')(db, app);
        require('./route/api_validID.js')(db, app);
        require('./route/api_getList.js')(db, app);
        require('./route/api_getItem.js')(db, app);
        require('./route/api_update.js')(db, app);
        require('./route/api_deleteItem.js')(db, app);
        //start the server listening on port 3000.
        //outputs message to consol once server has started (diagnostic only)
        require('./listen.js')(http);
    });