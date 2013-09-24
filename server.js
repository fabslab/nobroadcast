var connect = require('connect')
  , http = require('http')
  ,  path = require('path');

var app = connect().use(connect.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 3000;
http.createServer(app).listen(port, function() {
  console.log("Server listening on port " + port);
});