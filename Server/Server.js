var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function isNullOrUndefined(value) {
	return _.isNull(value) === true || _.isUndefined(value) === true
}

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/trafficPlanner', function(req, res) {
	var uid = req.body.uid,
			position = req.body.positionFrom;


});

app.listen(3000, function () {
	console.log('The Mobiliteit Server is running.');
});