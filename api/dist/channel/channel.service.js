"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const subscriber_service_1 = require("../chat/services/subscriber.service");
const settings_1 = require("../extensions/channels/console/settings");
const settings_2 = require("../extensions/channels/web/settings");
const logger_service_1 = require("../logger/logger.service");
const session_store_1 = require("../utils/constants/session-store");
const socket_method_decorator_1 = require("../websocket/decorators/socket-method.decorator");
const socket_req_decorator_1 = require("../websocket/decorators/socket-req.decorator");
const socket_res_decorator_1 = require("../websocket/decorators/socket-res.decorator");
const socket_request_1 = require("../websocket/utils/socket-request");
const socket_response_1 = require("../websocket/utils/socket-response");
let ChannelService = class ChannelService {
    constructor(logger, subscriberService) {
        this.logger = logger;
        this.subscriberService = subscriberService;
        this.registry = new Map();
    }
    setChannel(name, channel) {
        this.registry.set(name, channel);
    }
    getAll() {
        return Array.from(this.registry.values());
    }
    findChannel(name) {
        return this.getAll().find((c) => {
            return c.getName() === name;
        });
    }
    getChannelHandler(name) {
        const handler = this.registry.get(name);
        if (!handler) {
            throw new Error(`Channel ${name} not found`);
        }
        return handler;
    }
    async handle(channel, req, res) {
        const handler = this.getChannelHandler(`${channel}-channel`);
        handler.handle(req, res);
    }
    async download(channel, token, req) {
        const handler = this.getChannelHandler(`${channel}-channel`);
        return await handler.download(token, req);
    }
    handleWebsocketForWebChannel(req, res) {
        this.logger.log('Channel notification (Web Socket) : ', req.method);
        const handler = this.getChannelHandler(settings_2.WEB_CHANNEL_NAME);
        return handler.handle(req, res);
    }
    async handleWebsocketForAdminChatConsole(req, res) {
        this.logger.log('Channel notification (Admin Chat Console Socket) : ', req.method);
        if (!req.session?.passport?.user?.id) {
            setTimeout(() => {
                req.socket.client.conn.close();
            }, 300);
            throw new common_1.UnauthorizedException('Only authenticated users are allowed to use this channel');
        }
        if (!req.session.web?.profile?.id) {
            const testSubscriber = await this.subscriberService.findOneOrCreate({
                foreign_id: req.session.passport.user.id,
            }, {
                foreign_id: req.session.passport.user.id,
                first_name: req.session.passport.user.first_name || 'Anonymous',
                last_name: req.session.passport.user.last_name || 'Anonymous',
                locale: '',
                language: '',
                gender: '',
                country: '',
                labels: [],
                channel: {
                    name: settings_1.CONSOLE_CHANNEL_NAME,
                    isSocket: true,
                },
            });
            req.session.web = {
                profile: testSubscriber,
                isSocket: true,
                messageQueue: [],
                polling: false,
            };
            (0, session_store_1.getSessionStore)().set(req.sessionID, req.session, (err) => {
                if (err) {
                    this.logger.warn('Unable to store WS Console session', err);
                }
            });
        }
        const handler = this.getChannelHandler(settings_1.CONSOLE_CHANNEL_NAME);
        return handler.handle(req, res);
    }
};
exports.ChannelService = ChannelService;
__decorate([
    (0, socket_method_decorator_1.SocketGet)(`/webhook/${settings_2.WEB_CHANNEL_NAME}/`),
    (0, socket_method_decorator_1.SocketPost)(`/webhook/${settings_2.WEB_CHANNEL_NAME}/`),
    __param(0, (0, socket_req_decorator_1.SocketReq)()),
    __param(1, (0, socket_res_decorator_1.SocketRes)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_request_1.SocketRequest,
        socket_response_1.SocketResponse]),
    __metadata("design:returntype", void 0)
], ChannelService.prototype, "handleWebsocketForWebChannel", null);
__decorate([
    (0, socket_method_decorator_1.SocketGet)(`/webhook/${settings_1.CONSOLE_CHANNEL_NAME}/`),
    (0, socket_method_decorator_1.SocketPost)(`/webhook/${settings_1.CONSOLE_CHANNEL_NAME}/`),
    __param(0, (0, socket_req_decorator_1.SocketReq)()),
    __param(1, (0, socket_res_decorator_1.SocketRes)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_request_1.SocketRequest,
        socket_response_1.SocketResponse]),
    __metadata("design:returntype", Promise)
], ChannelService.prototype, "handleWebsocketForAdminChatConsole", null);
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        subscriber_service_1.SubscriberService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map