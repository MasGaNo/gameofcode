/// <reference path="./advSearch.ts"/>


module GameOfCode {
    "use strict";

    export module Application {

        export function start() {

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

        function onMapInit(map) {
            console.log('Map init!');
        }

    }
}