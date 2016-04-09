/// <reference path="Scripts/typings/express/express.d.ts"/>
import express = require('express');
/// <reference path="Scripts/typings/body-parser/body-parser.d.ts"/>
import bodyParser = require('body-parser');
/// <reference path="Scripts/typings/lodash/lodash.d.ts"/>
import _ = require('lodash');
/// <reference path="Scripts/typings/googlemaps/googlemaps.d.ts"/>
import GoogleMapsAPI = require('googlemaps');

interface UserPoint {
    uid: string;
    time: Date;
}


var Positions:{[coordonate:string]: UserPoint[]} = {};

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var publicConfig = {
    key: 'AIzaSyDE5v5BvgE7zpYBHlH5g9_HlqAPgXXsHpQ',
    stagger_time:       1000,
    encode_polylines:   false,
    secure:             true
};
var gmAPI = new GoogleMapsAPI(publicConfig);

function isNullOrUndefined(value) {
    return _.isNull(value) === true || _.isUndefined(value) === true
}

function isInclude(collection, key) {
    return collection[key] || false
}

function populatePositionsWithWaypoints(waypoints, uid, time) {
    var result = true;
    _(waypoints).each(function(waypoint) {
        var positionKey = `${waypoint.end_location.lat}_${waypoint.end_location.lng}`;

        if (isInclude(Positions, positionKey) !== false) {
            result = positionKey;
            return false;
        } else {
            Positions[positionKey] = [{
                uid: uid,
                time: time
            }];
        }
    })
    return result;
}

app.post('/trafficPlanner', function(req, res) {
    var uid = req.body.uid,
        position = req.body.position;

    if (isNullOrUndefined(uid) || isNullOrUndefined(position) || isNullOrUndefined(position.from)
        || isNullOrUndefined(position.to)) {
        res.status(422);
        res.json({ message: 'Unprocessable entity.'});
    }

    // Call Google Api
    var params = {
        origin: `${position.from.lng},${position.from.lat}`,
        destination: `${position.to.lng},${position.to.lat}`,
        mode: 'driving',
        departure_time: Date.now()
    };

    gmAPI.directions(params, function(err, data) {
        if (err) {
            res.status(500);
            res.json({ message: 'Error while we try to contact Directions Server.',
                        error: err.toString()});
        } else {
            var steps = data.routes[0].legs[0].steps;

            if (isNullOrUndefined(steps)) {
                res.status(404);
                res.json({ message: "No route found for this trajet."});
            }
            var dontNeedToRecalculate = populatePositionsWithWaypoints(steps, uid, params.departure_time)

            console.log(dontNeedToRecalculate);

            res.json(steps);
        }
    })

});

app.listen(3000, function () {
    console.log('The Mobiliteit Server is running.');
});