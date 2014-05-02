var connect = require('connect');

var port = 8080;

connect().use(connect.static(__dirname)).listen(port);

console.log("Server running at http://127.0.0.1:" + port + "/");