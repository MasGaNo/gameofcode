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
            var mapDiv = document.getElementById('map_canvas');
            var map = window.plugin.google.maps.Map.getMap(mapDiv);
            map.on(window.plugin.google.maps.event.MAP_READY, onMapInit);
        }
        Application.start = start;
        function onMapInit(map) {
            console.log('Map init!');
        }
    })(Application = GameOfCode.Application || (GameOfCode.Application = {}));
})(GameOfCode || (GameOfCode = {}));
//# sourceMappingURL=application.js.map