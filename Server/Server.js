var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/trafficPlanner', function(req, res) {
	res.send(req.body);
});

app.listen(3000, function () {
	console.log('The Mobiliteit Server is running.');
});