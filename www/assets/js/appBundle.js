/**
 * Created by Joe on 09/04/16.
 */
var GameOfCode;
(function (GameOfCode) {
    var Configuration;
    (function (Configuration) {
        Configuration.Server = {
            host: 'realmobiliteitserver.westeurope.cloudapp.azure.com',
            port: 80,
            protocole: 'http'
        };
        Object.defineProperty(Configuration.Server, 'url', {
            enumerable: true,
            get: function () {
                return Configuration.Server.protocole + "://" + Configuration.Server.host + ":" + Configuration.Server.port;
            }
        });
    })(Configuration = GameOfCode.Configuration || (GameOfCode.Configuration = {}));
})(GameOfCode || (GameOfCode = {}));
/**
 * Created by Joe on 09/04/16.
 */
///<reference path="./typings/jquery/jquery.d.ts" />
///<reference path="./configuration/configuration" />
var GameOfCode;
(function (GameOfCode) {
    "use strict";
    var AdvSearch;
    (function (AdvSearch) {
        function start() {
            $.get(GameOfCode.Configuration.Server.url + '/addressSuggest', {
                dataType: 'json'
            }).then(function (data) {
                console.log(data);
            }).fail(function (error) {
                console.log(error);
            });
        }
        AdvSearch.start = start;
    })(AdvSearch = GameOfCode.AdvSearch || (GameOfCode.AdvSearch = {}));
})(GameOfCode || (GameOfCode = {}));
var GameOfCode;
(function (GameOfCode) {
    var Maps;
    (function (Maps_1) {
        var Google;
        (function (Google) {
            var Maps;
            (function (Maps) {
                var mapInstance = null;
                function init(callback) {
                    if (!window.plugin || !window.plugin.google || !window.plugin.google.maps) {
                        return;
                    }
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
                    function onMapInit(map) {
                        console.log('Map init!');
                        //map.showDialog();
                        mapInstance = map;
                        if (callback) {
                            callback();
                        }
                    }
                }
                Maps.init = init;
                function show() {
                    if (mapInstance) {
                        mapInstance.showDialog();
                    }
                }
                Maps.show = show;
                function hide() {
                    if (mapInstance) {
                        mapInstance.closeDialog();
                    }
                }
                Maps.hide = hide;
            })(Maps = Google.Maps || (Google.Maps = {}));
        })(Google = Maps_1.Google || (Maps_1.Google = {}));
    })(Maps = GameOfCode.Maps || (GameOfCode.Maps = {}));
})(GameOfCode || (GameOfCode = {}));
/// <reference path="./advSearch.ts"/>
///<reference path="./maps/google/maps.ts"/>
var GameOfCode;
(function (GameOfCode) {
    "use strict";
    var Application;
    (function (Application) {
        function start() {
            GameOfCode.Maps.Google.Maps.init(function () {
                GameOfCode.AdvSearch.start();
            });
        }
        Application.start = start;
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
        var loadId = -1;
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
            loadId = setTimeout(onDeviceReady, 2000);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            clearTimeout(loadId);
            loadId = -1;
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