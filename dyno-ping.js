// pings PING_URL to keep a dyno alive

var pin = require('pin');

pin(process.env.PING_URL)
  .up(function(response) {
    console.log('Failure');
  })
  .down(function(error, response) {
    console.log('Success');
  })
  .check();