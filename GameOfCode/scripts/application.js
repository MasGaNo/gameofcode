/// <reference path="./advSearch.ts"/>
var GameOfCode;
(function (GameOfCode) {
    "use strict";
    var Application;
    (function (Application) {
        function start() {
            /*
            navigator.device.capture.captureImage((data) => {
                console.log(data);
            }, (error) => {
                console.error(error);
                });
                */
            /*let mapDiv = document.getElementById('map_canvas');
            let map = (window as any).plugin.google.maps.Map.getMap(mapDiv);
            map.on((window as any).plugin.google.maps.event.MAP_READY, onMapInit);
*/
            GameOfCode.AdvSearch.start();
        }
        Application.start = start;
        function onMapInit(map) {
            console.log('Map init!');
        }
    })(Application = GameOfCode.Application || (GameOfCode.Application = {}));
})(GameOfCode || (GameOfCode = {}));
//# sourceMappingURL=application.js.map