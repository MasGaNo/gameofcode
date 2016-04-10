/// <reference path="../typings/gameofcode/gameofcode.d.ts" />

import Express = require('express');

import ItineraireCar = require('./itineraire/car');

declare var Promise: any;

export function getBestItineraire(req: Express.Request, res: Express.Response) {

    var options: GameOfCode.RealApi.IRealQueryDirection = req.body;

    //list transport
    let pattern = [ItineraireCar];

    let promiseList = pattern.map((currentMethod) => {
        return currentMethod.getBestItineraire(options);
    });

    Promise.all(promiseList).then((resultList) => {
        let result = resultList.reduce((previousValue: GameOfCode.RealApi.IRealRoute, currentRoute: GameOfCode.RealApi.IRealRoute) => {

            if (!currentRoute) {
                return previousValue;
            }

            if (!previousValue || currentRoute.infos.duration < previousValue.infos.duration) { //check user preferences duration/distance
                return currentRoute;
            }

            return previousValue;
        }, null);

        if (!result) {
            res.send(<GameOfCode.RealApi.IRealResponse>{
                headers: {
                    code: -1,
                    status: 'empty result'
                },
                result: null
            });
        } else {
            res.send(<GameOfCode.RealApi.IRealResponse>{
                headers: {
                    code: 0,
                    status: 'ok'
                }, 
                result: result
            });
        }
    });
}