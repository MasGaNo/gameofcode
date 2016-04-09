module GameOfCode {

    export module Maps {
        export module Google {
            export module Maps {

                let mapInstance = null;

                export function init(callback?: () => void) {

                    (window as any).plugin.google.maps.Map.isAvailable(function (isAvailable, message) {
                        if (isAvailable) {
                            let mapDiv = document.getElementById('map_canvas');
                            let map = (window as any).plugin.google.maps.Map.getMap(mapDiv);
                            map.on((window as any).plugin.google.maps.event.MAP_READY, onMapInit);
                        } else {
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

                export function show() {
                    mapInstance.showDialog();
                }

                export function hide() {
                    mapInstance.closeDialog();
                }

            }
        }
    }
}
