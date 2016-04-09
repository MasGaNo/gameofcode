
declare module IoRedis {
    export class Redis {
        constructor(options?: any);
    }
}

declare module "ioredis" {
    export = IoRedis.Redis;
}