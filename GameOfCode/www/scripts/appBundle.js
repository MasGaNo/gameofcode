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
            window.plugin.google.maps.Map.isAvailable(function (isAvailable, message) {
                if (isAvailable) {
                    var mapDiv = document.getElementById('map_canvas');
                    var map = window.plugin.google.maps.Map.getMap(mapDiv);
                    map.on(window.plugin.google.maps.event.MAP_READY, onMapInit);
                }
                else {
                    alert(message);
                }
            });
        }
        Application.start = start;
        function onMapInit(map) {
            console.log('Map init!');
            map.setDebuggable(true);
            //map.showDialog();
        }
    })(Application = GameOfCode.Application || (GameOfCode.Application = {}));
})(GameOfCode || (GameOfCode = {}));
/// <reference path="application.ts" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var GameOfCode;
(function (GameOfCode) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            GameOfCode.Application.start();
        }
        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }
        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    })(Application = GameOfCode.Application || (GameOfCode.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(GameOfCode || (GameOfCode = {}));
//# sourceMappingURL=appBundle.js.map