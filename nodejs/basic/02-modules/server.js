var http = require('http');
var module1 = require('./module1');
var module2 = require('./module2');

function onRequest(request, response) {
  if (request.url != '/favicon.ico') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    console.log(request.url);
    response.write(module1.myString);
    response.write(module2.ourString);
    module1.myFunction();
    module2.ourFunction();
    response.end();
  }
}

http.createServer(onRequest).listen(5000);
