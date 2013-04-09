var express = require('express')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , nib = require('nib');
  
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));

app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: function(str, path) {
      return stylus(str).set('filename', path).set('compress', true).use(nib());
    }
  }));
  
app.use(express.static(path.join(__dirname, 'public')));

// development only settings
app.configure('development', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});