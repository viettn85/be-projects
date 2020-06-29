var fs = require('fs');
var url = require('url');

function render(path, response) {
  fs.readFile(path, null, function (error, data) {
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

function handleRequest(request, response) {
  var path = url.parse(request.url).path;
  console.log(path);
  switch (path) {
    case '/':
      render('./templates/index.html', response);
      break;
    case '/about':
      render('./templates/about.html', response);
      break;
    default:
      response.writeHead(404);
      response.write('File Not Found');
      break;
  }
}

module.exports = { handleRequest };
