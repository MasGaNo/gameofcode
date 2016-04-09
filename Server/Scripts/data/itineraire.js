/// <reference path="../typings/gameofcode/gameofcode.d.ts" />
var ItineraireCar = require('./itineraire/car');
function getBestItineraire(req, res) {
    var options = req.body;
    //list transport
    var pattern = [ItineraireCar];
    var promiseList = pattern.map(function (currentMethod) {
        return currentMethod.getBestItineraire(options);
    });
    Promise.all(promiseList).then(function (resultList) {
        var result = resultList.reduce(function (previousValue, currentRoute) {
            if (!currentRoute) {
                return previousValue;
            }
            if (!previousValue || currentRoute.infos.duration < previousValue.infos.duration) {
                return currentRoute;
            }
            return previousValue;
        }, null);
        if (!result) {
            res.send({
                headers: {
                    code: -1,
                    status: 'empty result'
                },
                result: null
            });
        }
        else {
            res.send({
                headers: {
                    code: 0,
                    status: 'ok'
                },
                result: result
            });
        }
    });
}
exports.getBestItineraire = getBestItineraire;
//# sourceMappingURL=itineraire.js.map