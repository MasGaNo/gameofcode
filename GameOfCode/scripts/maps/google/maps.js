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
                    mapInstance.showDialog();
                }
                Maps.show = show;
                function hide() {
                    mapInstance.closeDialog();
                }
                Maps.hide = hide;
            })(Maps = Google.Maps || (Google.Maps = {}));
        })(Google = Maps_1.Google || (Maps_1.Google = {}));
    })(Maps = GameOfCode.Maps || (GameOfCode.Maps = {}));
})(GameOfCode || (GameOfCode = {}));
//# sourceMappingURL=maps.js.map