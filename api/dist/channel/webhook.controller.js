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
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../logger/logger.service");
const roles_decorator_1 = require("../utils/decorators/roles.decorator");
const channel_service_1 = require("./channel.service");
let WebhookController = class WebhookController {
    constructor(channelService, logger) {
        this.channelService = channelService;
        this.logger = logger;
    }
    async handleDownload(channel, name, token, req) {
        this.logger.log('Channel download request: ', channel, name);
        return await this.channelService.download(channel, token, req);
    }
    async handleGet(channel, req, res) {
        this.logger.log('Channel notification : ', req.method, channel);
        return await this.channelService.handle(channel, req, res);
    }
    async handlePost(channel, req, res) {
        this.logger.log('Channel notification : ', req.method, channel);
        return await this.channelService.handle(channel, req, res);
    }
    async handleNotFound(res) {
        return res.status(404).send({ error: 'Not found!' });
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)(':channel/download/:name'),
    __param(0, (0, common_1.Param)('channel')),
    __param(1, (0, common_1.Param)('name')),
    __param(2, (0, common_1.Query)('t')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handleDownload", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)(':channel'),
    __param(0, (0, common_1.Param)('channel')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handleGet", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Post)(':channel'),
    __param(0, (0, common_1.Param)('channel')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handlePost", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)(':channel/not-found'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handleNotFound", null);
exports.WebhookController = WebhookController = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService,
        logger_service_1.LoggerService])
], WebhookController);
//# sourceMappingURL=webhook.controller.js.map