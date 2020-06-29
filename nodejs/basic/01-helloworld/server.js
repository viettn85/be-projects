var http = require('http');

function onRequest(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hellow World');
  response.end();
}

http.createServer(onRequest).listen(5000);
