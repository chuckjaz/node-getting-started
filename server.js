var express = require('express');
var app = express();

// Add routes
app.get("/", function(req, res) {
  res.send('Hello World!\n');
});

// Start server
var server = app.listen(8080, function () {
  console.log('Server running at http://localhost:%s', server.address().port);
});
