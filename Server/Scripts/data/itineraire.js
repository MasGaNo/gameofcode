/// <reference path="../typings/googlemaps/googlemaps.d.ts" />
var GoogleMapsAPI = require('googlemaps');
/// <reference path="Scripts/typings/lodash/lodash.d.ts"/>
var _ = require('lodash');
var publicConfig = {
    key: 'AIzaSyDE5v5BvgE7zpYBHlH5g9_HlqAPgXXsHpQ',
    stagger_time: 1000,
    encode_polylines: false,
    secure: true
};
var gmAPI = new GoogleMapsAPI(publicConfig);
var Positions = {};
function isNullOrUndefined(value) {
    return _.isNull(value) === true || _.isUndefined(value) === true;
}
function isInclude(collection, key) {
    return collection[key] || false;
}
function populatePositionsWithWaypoints(waypoints, uid, time) {
    var result = true;
    _(waypoints.reverse()).each(function (waypoint) {
        var positionKey = waypoint.position.to.lat + "_" + waypoint.position.to.lng;
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
    waypoints.reverse();
    return result;
}
function formatSteps(steps) {
    return steps.map(function (step) {
        return {
            description: step.html_instructions,
            distance: step.distance.value,
            duration: step.duration.value,
            mode: step.travel_mode,
            position: {
                from: step.start_location,
                to: step.end_location
            }
        };
    });
}
function directionApi(params, uid) {
    return new Promise(function (resolve, reject) {
        gmAPI.directions(params, function (err, data) {
            if (err) {
                return reject({
                    message: 'Error while we try to contact Directions Server.',
                    error: err.toString()
                });
            }
            else {
                if (data.status === 'ZERO_RESULTS') {
                    return resolve({ status: 'empty' });
                }
                var steps = formatSteps(data.routes[0].legs[0].steps);
                if (isNullOrUndefined(steps)) {
                    return reject({
                        message: "No route found for this trajet."
                    });
                }
                var dontNeedToRecalculate = populatePositionsWithWaypoints(steps, uid, params.departure_time);
                if (dontNeedToRecalculate !== true && false) {
                    params.alternatives = true;
                    return directionApi(params, uid).then(resolve, reject);
                }
                resolve(steps);
            }
        });
    });
}
function getBestItineraire(req, res) {
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
    directionApi(params, uid).then(function (steps) {
        res.send(steps);
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
}
exports.getBestItineraire = getBestItineraire;
//# sourceMappingURL=itineraire.js.map