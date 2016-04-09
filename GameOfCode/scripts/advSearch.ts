/**
 * Created by Joe on 09/04/16.
 */
///<reference path="./typings/jquery/jquery.d.ts" />
///<reference path="./configuration/configuration" />

declare var $:JQueryStatic;

module GameOfCode {
    "use strict";

    export module AdvSearch {

        export function start() {
            $.get(Configuration.Server.url + '/addressSuggest', {
                dataType: 'json'
            }).then((data) => {
                    console.log(data);
                }).fail((error) => {
                    console.log(error);
                });
        }

    }

}
