<<<<<<< HEAD
/// <reference path="Scripts/typings/express/express.d.ts"/>
var express = require('express');
/// <reference path="Scripts/typings/body-parser/body-parser.d.ts"/>
var bodyParser = require('body-parser');
var routeDataMapdata = require('./Scripts/data/mapdata');
var routeDataItineraire = require('./Scripts/data/itineraire');
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/trafficPlanner', routeDataItineraire.getBestItineraire);
app.get('/addressSuggest', routeDataMapdata.addressToGeoloc);
app.listen(3000, function () {
    console.log('The Mobiliteit Server is running.');
});
=======
"use strict";
/// <reference path="Scripts/typings/express/express.d.ts"/>
var express = require('express');
/// <reference path="Scripts/typings/body-parser/body-parser.d.ts"/>
var bodyParser = require('body-parser');
var routeDataMapdata = require('./Scripts/data/mapdata');
var routeDataItineraire = require('./Scripts/data/itineraire');
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/trafficPlanner', routeDataItineraire.getBestItineraire);
app.get('/addressSuggest', routeDataMapdata.addressToGeoloc);
app.listen(3000, function () {
    console.log('The Mobiliteit Server is running.');
});
>>>>>>> a1563c3f773f37a0887640d631d1e60f575eaf29
//# sourceMappingURL=server.js.map