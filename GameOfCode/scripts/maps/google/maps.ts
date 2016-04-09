module GameOfCode {

    export module Maps {
        export module Google {
            export module Maps {

                let mapInstance = null;

                export function init(callback?: () => void) {

                    if (!(window as any).plugin || !(window as any).plugin.google || !(window as any).plugin.google.maps) {
                        return;
                    }

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

                export function activeTraffic(active: boolean = true) {
                    if (mapInstance) {
                        mapInstance.setTrafficEnabled(active);
                    }
                }

                export function show() {
                    if (mapInstance) {
                        mapInstance.showDialog();
                    }
                }

                export function hide() {
                    if (mapInstance) {
                        mapInstance.closeDialog();
                    }
                }

                export function clearInfo() {
                  if (mapInstance) {
                    mapInstance.clear();
                  }

                }

                export function setItineraire(listPoint: any[]) {

                      mapInstance.addPolyline({
                          points: listPoint.map((point) => {
                            return new (window as any).plugin.google.maps.LatLng(point.lat, point.lng);
                          }),
                          'color' : '#AA00FF',
                          'width': 8,
                          'geodesic': false
                      });
                }

                export function centerCameraTo(point) {

                  if (mapInstance) {
                      let target = new (window as any).plugin.google.maps.LatLng(point.lat, point.lng);
                      mapInstance.animateCamera({
                          'target': target,
                          'tilt': 60,
                          'zoom': 18,
                          'bearing': 140,
                          'duration': 5000 // = 5 sec.
                      }, function() {
                      });
                  }

                }

            }
        }
    }
}
