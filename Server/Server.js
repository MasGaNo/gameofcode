"use strict";
/// <reference path="Scripts/typings/express/express.d.ts"/>
var express = require('express');
/// <reference path="Scripts/typings/body-parser/body-parser.d.ts"/>
var bodyParser = require('body-parser');
/// <reference path="Scripts/typings/lodash/lodash.d.ts"/>
var _ = require('lodash');
/// <reference path="Scripts/typings/googlemaps/googlemaps.d.ts"/>
var GoogleMapsAPI = require('googlemaps');
var Positions = {};
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
function directionsApi(param) {
    console.log('toto');
    return new Promise(function (resolve, reject) {
        var publicConfig = {
            key: 'AIzaSyDE5v5BvgE7zpYBHlH5g9_HlqAPgXXsHpQ',
            stagger_time: 1000,
            encode_polylines: false,
            secure: true
        };
        var gmAPI = new GoogleMapsAPI(publicConfig);
        gmAPI.directions(param, function (err, data) {
            if (err) {
                return reject({
                    status: 500,
                    message: 'Error while we try to contact Directions Server.',
                    error: err.toString()
                });
            }
            else {
                var steps = data.routes[0].legs[0].steps;
                if (isNullOrUndefined(steps)) {
                    return {
                        status: 404,
                        message: "No route found for this trajet."
                    };
                }
                var dontNeedToRecalculate = populatePositionsWithWaypoints(steps, uid, params.departure_time);
                if (dontNeedToRecalculate !== true) {
                    param.alternatives = true;
                    directionsApi(param).then(resolve, reject);
                }
                resolve(steps);
            }
        });
    });
}
function isNullOrUndefined(value) {
    return _.isNull(value) === true || _.isUndefined(value) === true;
}
function isInclude(collection, key) {
    return collection[key] || false;
}
function populatePositionsWithWaypoints(waypoints, uid, time) {
    var result = true;
    _(waypoints.reverse()).each(function (waypoint) {
        var positionKey = waypoint.end_location.lat + "_" + waypoint.end_location.lng;
        if (isInclude(Positions, positionKey) !== false) {
            result = positionKey;
            return false;
        }
        else {
            Positions[positionKey] = [{
                    uid: uid,
                    time: time
                }];
        }
    });
    return result;
}
app.post('/trafficPlanner', function (req, res) {
    var uid = req.body.uid, position = req.body.position;
    if (isNullOrUndefined(uid) || isNullOrUndefined(position) || isNullOrUndefined(position.from)
        || isNullOrUndefined(position.to)) {
        res.status(422);
        res.json({ message: 'Unprocessable entity.' });
    }
    // Call Google Api
    var params = {
        origin: position.from.lng + "," + position.from.lat,
        destination: position.to.lng + "," + position.to.lat,
        mode: 'driving',
        departure_time: Date.now()
    };
    directionsApi(params).then(function (steps) {
        res.json(steps);
    }).catch(function (error) {
        console.log(error);
    });
});
app.listen(3000, function () {
    console.log('The Mobiliteit Server is running.');
});
//# sourceMappingURL=server.js.map 
//# sourceMappingURL=server.js.map