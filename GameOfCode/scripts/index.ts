﻿/// <reference path="application.ts" />

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
module GameOfCode {
    "use strict";

    export module Application {

        var loadId = -1;

        export function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);

            loadId = setTimeout(onDeviceReady, 2000);

        }

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

    }

    window.onload = function () {
        Application.initialize();
    }
}
