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

interface IPosition {
    lat: number;
    lng: number;
}

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

interface IGoogleStep {
    "distance": {
        "text": string;//"89 m",
        "value": number;//89
    };
    "duration": {
        "text": string;//"1 min",
        "value": number;//10
    };
    "end_location": IPosition;
    "html_instructions": string;//"Head <b>south</b> on <b>Rue des Abanis</b> toward <b>Rue de Longwy</b>",
    "polyline": {
        "points": string;//"_gcmHygcb@FBBBDB`BxAHJHJ"
    };
    "start_location": IPosition;
    "travel_mode": string;//"DRIVING"
}

interface IRealStep {
    distance: number;//m
    duration: number;//seconds
    position: {
        from: IPosition;
        to: IPosition;
    };
    description: string;
    mode: string;
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

function populatePositionsWithWaypoints(waypoints: IRealStep[], uid, time) {
    var result: any = true;
    _(waypoints.reverse()).each(function (waypoint) {
        var positionKey = `${waypoint.position.to.lat}_${waypoint.position.to.lng}`;

        if (isInclude(Positions, positionKey) !== false) {
            result = positionKey;
            return false;
        } else {
            Positions[positionKey] = [{
                uid: uid,
                time: time
            }];
        }
    });
    waypoints.reverse();
    return result;
}

function formatSteps(steps: IGoogleStep[]): IRealStep[] {
    return steps.map((step) => {
        return <IRealStep>{
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

                var steps = formatSteps(data.routes[0].legs[0].steps);

                if (isNullOrUndefined(steps)) {
                    return reject({
                        message: "No route found for this trajet."
                    });
                }
                var dontNeedToRecalculate = populatePositionsWithWaypoints(steps, uid, params.departure_time)

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