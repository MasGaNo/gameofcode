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
//# sourceMappingURL=application.js.map