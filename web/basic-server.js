// The first will be a web service that serve pages over the web using a RESTful API
var requestHandler = require("./request-handler");
var http = require("http");
var path = require('path');

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(requestHandler.handleRequest); // incoming messages are processed by ./request-handler.js.handleRequest
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);