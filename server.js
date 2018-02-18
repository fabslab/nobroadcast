var staticServe = require('node-static')
  , http = require('http')
  ,  path = require('path');

var fileServer = new staticServe.Server(path.join(__dirname, 'public'));

var port = process.env.PORT || 3000;

http.createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response);
  }).resume();
}).listen(port);