/**
 * Created by Joe on 09/04/16.
 */
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/request/request.d.ts"/>
"use strict";
var request = require('request');
var options = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&key=AIzaSyDE5v5BvgE7zpYBHlH5g9_HlqAPgXXsHpQs',
    port: 80,
    method: 'GET'
};
function addressToGeoloc(req, res) {
    request(options, function (error, response, body) {
        if (error) {
            res.sendStatus(500);
        }
        else {
            res.send(body);
        }
    });
    req.on('error', function (e) {
        console.log("problem with request: " + e.message);
    });
}
exports.addressToGeoloc = addressToGeoloc;
//# sourceMappingURL=mapdata.js.map