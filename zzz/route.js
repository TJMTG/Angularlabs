//this file is based on lec 3.2, it should be in the erver folder
//HTTP server using NodeJS

// The url module has utilities for URL resolution and parsing
let url = require('url');

// The fs module provides an API for interacting with the file system
let fs = require('fs');

//This function is used to render/send files. 
//If *.html coudn't be sent, the user would just see regular test
//(Responding back to the client with a HTML page)
//Paramatars: takes in a path and returns a response
//Then read in a file from that path
//If it could not, then resposne back with an error
//Else write back the data (which is the file that we read from the server side hard drive)
function renderHTML(path, response){
    fs.readFile(path, null, function(err, data){
        if(err){
            response.writeHead(404);
            response.write("File not found.");
        } else {
            response.write(data);
        }
        response.end()
    });
}

//modules.exports is a special object
//adding methods to this object will make them public methods
//when we reuire() the module we will then have acces to any methods on that export module
//(in this case the handleRequest() method)
module.exports = {
    handleRequest: function(req, res){
        res.writeHead(200, {'Content-Type':'text/html'});
        var path = url.parse(req.url).pathname;
        if (path == '/'){
            renderHTML('./indes.html', res);
        } else {
            res.writeHead(404);
            res.write("Route not defined.");
            res.end()
        }
    }
}


//this is what the server.js should look like for this file to work:
/*
//The http module
var http = require('http');

//The route module
var routes = require('./routes.js');

//This will start a simple http server on port 3000
http.createServer(routes.handleRequest).listen(3000);

*/