var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send("<h1>Welcome to the Conserta.me</h1>");
});

app.listen(3000);

console.log('Server running at port 3000');