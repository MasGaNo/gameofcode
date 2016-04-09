/**
 * Created by Joe on 09/04/16.
 */
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/request/request.d.ts"/>

import Express = require('express');
import request = require('request');

var options = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&key=AIzaSyDE5v5BvgE7zpYBHlH5g9_HlqAPgXXsHpQs',
    port: 80,
    method: 'GET'
};

export function addressToGeoloc(req:Express.Request, res:Express.Response) {

    request(options, (error, response, body) => {
        if (error) {
            res.sendStatus(500);
        } else {
            res.send(body);
        }
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });
}