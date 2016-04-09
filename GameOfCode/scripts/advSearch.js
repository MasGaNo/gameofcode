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
                console.log(JSON.parse(data));
            }).fail(function (error) {
                console.log(error);
            });
        }
        AdvSearch.start = start;
    })(AdvSearch = GameOfCode.AdvSearch || (GameOfCode.AdvSearch = {}));
})(GameOfCode || (GameOfCode = {}));
//# sourceMappingURL=advSearch.js.map