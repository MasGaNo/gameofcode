/// <reference path="../../typings/gameofcode/gameofcode.d.ts" />
/// <reference path="../../typings/ioredis/ioredis.ts" />

import IoRedis = require('ioredis');

module GameOfCode {
    export module Data {
        export module Redis {

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

                redisInstance.defineCommand('getClosePoints', {
                    numberOfKeys: 0,
                    lua: 'return local res = redis.call("HGET", ARGV[1]);'
                })
                
            }

            export function getClosePoints(type: string, position: any) {

                

            }

        }
    }
}