/// <reference path="./advSearch.ts"/>
///<reference path="./maps/google/maps.ts"/>

module GameOfCode {
    "use strict";

    export module Application {

        export function start() {

            GameOfCode.Maps.Google.Maps.init(() => {

                
                GameOfCode.AdvSearch.start();

                });

        }



    }
}