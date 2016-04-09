/// <reference path="../../typings/gameofcode/gameofcode.d.ts" />
/// <reference path="../../typings/ioredis/ioredis.ts" />
"use strict";
var IoRedis = require('ioredis');
var GameOfCode;
(function (GameOfCode) {
    var Data;
    (function (Data) {
        var Redis;
        (function (Redis) {
            var redisInstance = null;
            function init() {
                redisInstance = new IoRedis({
                    host: 'realmobiliteit.redis.cache.windows.net',
                    port: 6379,
                    family: 4,
                    password: 'ur7g38REPcKI2HZhqptnKXN7RA / abHQ2CvugMsblR6c=',
                    ssl: false,
                    abortConnect: false
                });
            }
            function getClosePoints(type, position) {
            }
            Redis.getClosePoints = getClosePoints;
        })(Redis = Data.Redis || (Data.Redis = {}));
    })(Data = GameOfCode.Data || (GameOfCode.Data = {}));
})(GameOfCode || (GameOfCode = {}));
//# sourceMappingURL=redis.js.map