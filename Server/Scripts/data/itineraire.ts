/// <reference path="../typings/googlemaps/googlemaps.d.ts" />
var GoogleMapsAPI = require('googlemaps');

/// <reference path="Scripts/typings/lodash/lodash.d.ts"/>
import _ = require('lodash');

import Express = require('express');

declare var Promise: any;

var publicConfig = {
    key: 'AIzaSyDE5v5BvgE7zpYBHlH5g9_HlqAPgXXsHpQ',
    stagger_time: 1000,
    encode_polylines: false,
    secure: true
};
var gmAPI = new GoogleMapsAPI(publicConfig);

interface IGoogleWaypoints {
    geocoder_status: string;//'OK',
    partial_match: boolean;// true,
    place_id: string;//'ChIJ0X0Wi4hubIcRQTQt_4vqs1U',
    types: any;
}

interface IGoogleResponse {
    geocoded_waypoints: IGoogleWaypoints[];
    routes: any[];
    status: string;
}

interface IUserPoint {
    uid: string;
    time: Date;
}

interface IGoogleParams {
    origin: string;
    destination: string;
    mode: string;
    departure_time: number;
    alternatives?: boolean;
}

var Positions: { [coordonate: string]: IUserPoint[] } = {};


function isNullOrUndefined(value) {
    return _.isNull(value) === true || _.isUndefined(value) === true
}

function isInclude(collection, key) {
    return collection[key] || false
}

function populatePositionsWithWaypoints(waypoints, uid, time) {
    var result: any = true;
    _(waypoints.reverse()).each(function (waypoint) {
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

function directionApi(params: IGoogleParams, uid: string) {

    return new Promise((resolve, reject) => {

        gmAPI.directions(params, function (err, data: IGoogleResponse) {
            if (err) {
                return reject({
                    message: 'Error while we try to contact Directions Server.',
                    error: err.toString()
                });
            } else {

                if (data.status === 'ZERO_RESULTS') {
                    return resolve({ status: 'empty' });
                }

                var steps = data.routes[0].legs[0].steps;

                if (isNullOrUndefined(steps)) {
                    return reject({
                        message: "No route found for this trajet."
                    });
                }
                var dontNeedToRecalculate = populatePositionsWithWaypoints(steps, uid, params.departure_time)

                console.log(dontNeedToRecalculate);
                if (dontNeedToRecalculate !== true && false) {
                    params.alternatives = true;
                    return directionApi(params, uid).then(resolve, reject);
                }

                resolve(steps);
            }
        })
    });
}

export function getBestItineraire(req, res: Express.Response) {

    var uid = req.body.uid,
        position = req.body.position;

    if (isNullOrUndefined(uid) || isNullOrUndefined(position) || isNullOrUndefined(position.from)
        || isNullOrUndefined(position.to)) {
        res.status(422);
        res.json({ message: 'Unprocessable entity.' });
    }

    // Call Google Api
    var params: IGoogleParams = {
        origin: `${position.from.lng},${position.from.lat}`,
        destination: `${position.to.lng},${position.to.lat}`,
        mode: 'driving',
        departure_time: Date.now()
    };

    directionApi(params, uid).then((steps) => {
        res.send(steps);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    });

}