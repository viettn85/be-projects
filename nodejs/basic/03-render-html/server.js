var http = require('http');
var fs = require('fs');

function onRequest(request, response) {
  fs.readFile('./templates/index.html', null, function (error, data) {
    if (error) {
      response.writeHead(404);
      response.write('File Not Found');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
    }
    response.end();
  });
}

http.createServer(onRequest).listen(5000);
