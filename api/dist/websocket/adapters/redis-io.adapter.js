"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = void 0;
const common_1 = require("@nestjs/common");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redis_1 = require("redis");
const config_1 = require("../../config");
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    async connectToRedis() {
        if (config_1.config.cache.host !== 'redis') {
            throw new common_1.InternalServerErrorException(`Unable to run connect to redis host is ${config_1.config.cache.host} instead of 'redis'`);
        }
        const redisConfig = {
            socket: {
                host: config_1.config.cache.host,
                port: config_1.config.cache.port,
            },
        };
        const pubClient = (0, redis_1.createClient)(redisConfig);
        const subClient = pubClient.duplicate();
        pubClient.on('error', (error) => {
            throw error;
        });
        subClient.on('error', (error) => {
            throw error;
        });
        await Promise.all([pubClient.connect(), subClient.connect()]);
        this.adapter = (0, redis_adapter_1.createAdapter)(pubClient, subClient);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapter);
        return server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=redis-io.adapter.js.map