/// <reference path="Scripts/typings/express/express.d.ts"/>
var express = require('express');
/// <reference path="Scripts/typings/body-parser/body-parser.d.ts"/>
var bodyParser = require('body-parser');
/// <reference path="Scripts/typings/lodash/lodash.d.ts"/>
var _ = require('lodash');
var routeDataMapdata = require('./Scripts/data/mapdata');
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
function isNullOrUndefined(value) {
    return _.isNull(value) === true || _.isUndefined(value) === true;
}
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.post('/trafficPlanner', function (req, res) {
    var uid = req.body.uid, position = req.body.position;
    if (isNullOrUndefined(uid) || isNullOrUndefined(position)) {
    }
});
app.get('/addressSuggest', routeDataMapdata.addressToGeoloc);
app.listen(3000, function () {
    console.log('The Mobiliteit Server is running.');
});
//# sourceMappingURL=server.js.map