var http = require('http');
var app = require('./app');

function onRequest(request, response) {
  app.handleRequest(request, response);
}

http.createServer(onRequest).listen(5000);
