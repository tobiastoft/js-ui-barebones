var connect  = require('connect');
var static = require('serve-static');
var server = connect();
var port = process.env.PORT || 5000;

server.use(  static(__dirname + '/src'));
server.listen(port);

var livereload = require('livereload');
var lrserver = livereload.createServer();
lrserver.watch(__dirname + "/src");

console.log('Running on: http://localhost:' + port)
