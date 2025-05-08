"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWebSocketGatewayOptions = void 0;
const util_1 = __importDefault(require("util"));
const app_instance_1 = require("../../app.instance");
const config_1 = require("../../config");
const setting_service_1 = require("../../setting/services/setting.service");
const buildWebSocketGatewayOptions = () => {
    const opts = {
        allowEIO3: true,
        path: config_1.config.sockets.path,
        ...(typeof config_1.config.sockets.serveClient !== 'undefined' && {
            serveClient: config_1.config.sockets.serveClient,
        }),
        ...(config_1.config.sockets.beforeConnect && {
            allowRequest: (handshake, cb) => {
                try {
                    const result = config_1.config.sockets.beforeConnect(handshake);
                    return cb(null, result);
                }
                catch (e) {
                    console.log(`A socket was rejected via the config.sockets.beforeConnect function.\n` +
                        `It attempted to connect with headers:\n` +
                        `${util_1.default.inspect(handshake.headers, { depth: null })}\n` +
                        `Details: ${e}`);
                    return cb(e, false);
                }
            },
        }),
        ...(config_1.config.sockets.pingTimeout && {
            pingTimeout: config_1.config.sockets.pingTimeout,
        }),
        ...(config_1.config.sockets.pingInterval && {
            pingInterval: config_1.config.sockets.pingInterval,
        }),
        ...(config_1.config.sockets.maxHttpBufferSize && {
            maxHttpBufferSize: config_1.config.sockets.maxHttpBufferSize,
        }),
        ...(config_1.config.sockets.transports && { transports: config_1.config.sockets.transports }),
        ...(config_1.config.sockets.allowUpgrades && {
            allowUpgrades: config_1.config.sockets.allowUpgrades,
        }),
        ...(config_1.config.sockets.cookie && { cookie: config_1.config.sockets.cookie }),
        ...(config_1.config.sockets.onlyAllowOrigins && {
            cors: {
                origin: async (origin, cb) => {
                    const app = app_instance_1.AppInstance.getApp();
                    const settingService = app.get(setting_service_1.SettingService);
                    await settingService
                        .getAllowedOrigins()
                        .then((allowedOrigins) => {
                        if (origin && allowedOrigins.includes(origin)) {
                            cb(null, true);
                        }
                        else {
                            console.log(`A socket was rejected via the config.sockets.onlyAllowOrigins array.\n` +
                                `It attempted to connect with origin: ${origin}`);
                            cb(new Error('Origin not allowed'), false);
                        }
                    })
                        .catch(cb);
                },
            },
        }),
    };
    return opts;
};
exports.buildWebSocketGatewayOptions = buildWebSocketGatewayOptions;
//# sourceMappingURL=gateway-options.js.map