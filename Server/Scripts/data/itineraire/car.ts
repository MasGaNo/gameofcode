﻿/// <reference path="../../typings/googlemaps/googlemaps.d.ts" />
/// <reference path="../../typings/gameofcode/gameofcode.d.ts" />

var GoogleMapsAPI = require('googlemaps');

/// <reference path="Scripts/typings/lodash/lodash.d.ts"/>
import _ = require('lodash');

import Express = require('express');

declare var Promise: any;

var publicConfig = {
    key: 'THE_API_KEY',
    stagger_time: 1000,
    encode_polylines: false,
    secure: true
};
var gmAPI = new GoogleMapsAPI(publicConfig);


var Positions: { [coordonate: string]: GameOfCode.IUserPoint[] } = {};


function isNullOrUndefined(value) {
    return _.isNull(value) === true || _.isUndefined(value) === true
}

function isInclude(collection, key) {
    return collection[key] || false
}

function populatePositionsWithWaypoints(waypoints: GameOfCode.RealApi.IRealStep[], uid, time) {
    var result: any = true;
    /*_(waypoints).each(function (waypoint, index) {
        var positionKey = `${waypoint.position.from.lng}_${waypoint.position.from.lat}__${waypoint.position.to.lat}_${waypoint.position.to.lng}`;

        if (isInclude(Positions, positionKey) !== false) {
            result = positionKey;
            return false;
        } else {
            Positions[positionKey] = [{
                uid: uid,
                time: time
            }];
        }
    });*/
    let itineraireHash = waypoints.map((waypoint, index) => {
        if (!index) {
            return `${waypoint.position.from.lng}_${waypoint.position.from.lat}__${waypoint.position.to.lat}_${waypoint.position.to.lng}`;
        }
        return `${waypoint.position.to.lat}_${waypoint.position.to.lng}`;
    }).join('__');

    if (isInclude(Positions, itineraireHash) !== false) {
        let currentUser = Positions[itineraireHash].filter((userPoint) => {
            return userPoint.uid === uid;
        });
        for (let i = currentUser.length - 1; i >= 0; --i) {
            Positions[itineraireHash].splice(Positions[itineraireHash].indexOf(currentUser[i], 1));
        }
        return false;
    } else {
        Positions[itineraireHash] = [{
            uid: uid,
            time: time
        }];
    }

    return result;
}

function formatSteps(steps: GameOfCode.GoogleApi.IGoogleStep[]): GameOfCode.RealApi.IRealStep[] {
    return steps.map((step) => {
        return <GameOfCode.RealApi.IRealStep>{
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

function directionApi(params: GameOfCode.GoogleApi.IGoogleDirectionParams, options: GameOfCode.IDirectionApiOptions) {

    return new Promise((resolve, reject) => {

        gmAPI.directions(params, function (err, data: GameOfCode.GoogleApi.IGoogleResponse) {
            if (err) {
                return reject({
                    message: 'Error while we try to contact Directions Server.',
                    error: err.toString()
                });
            } else {

                if (data.status === 'ZERO_RESULTS') {
                    return resolve({ status: 'empty' });
                }

                let bestRoute: GameOfCode.RealApi.IRealRoute = null;

                for (var i = 0, max = data.routes.length; i < max; ++i) {
                    var steps = formatSteps(data.routes[i].legs[0].steps);

                    if (isNullOrUndefined(steps)) {
                        return reject({
                            message: "No route found for this trajet."
                        });
                    }

                    var dontNeedToRecalculate = populatePositionsWithWaypoints(steps, options.uid, params.departure_time);

                    let currentRoute: GameOfCode.RealApi.IRealRoute = {
                        infos: {
                            bounds: data.routes[i].bounds,
                            distance: data.routes[i].legs[0].distance.value,
                            duration: data.routes[i].legs[0].duration.value
                        }, 
                        steps: steps
                    };

                    if (dontNeedToRecalculate === true) {
                        return resolve(currentRoute);
                    }
                    if (!bestRoute || bestRoute.infos.duration > currentRoute.infos.duration) { //add preference duration/distance
                        bestRoute = currentRoute
                    }
                }

                if (options.isAlternatives) {
                    //penality, increase duration virtually according to weight of the road
                    return resolve(bestRoute);
                }

                params.alternatives = true;
                options.isAlternatives = true;
                directionApi(params, options).then(resolve, reject);
            }
        })
    });
}

export function getBestItineraire(options: GameOfCode.RealApi.IRealQueryDirection) {

    return new Promise((resolve, reject) => {
        var uid = options.uid,
            position = options.position;

        if (isNullOrUndefined(uid) || isNullOrUndefined(position) || isNullOrUndefined(position.from)
            || isNullOrUndefined(position.to)) {
            resolve(null);
        }

        // Call Google Api
        var params: GameOfCode.GoogleApi.IGoogleDirectionParams = {
            origin: `${position.from.lng},${position.from.lat}`,
            destination: `${position.to.lng},${position.to.lat}`,
            mode: 'driving',
            departure_time: Date.now()
        };

        directionApi(params, { uid: uid, isAlternatives: false }).then((steps) => {
            resolve(steps);
        }).catch((error) => {
            console.log(error);
            resolve(null);
        });

    });

}
