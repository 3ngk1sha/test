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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelMiddleware = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("./channel.service");
let ChannelMiddleware = class ChannelMiddleware {
    constructor(channelService) {
        this.channelService = channelService;
    }
    async use(req, res, next) {
        try {
            const [_, path, channelName] = req.path.split('/');
            if (path === 'webhook' && channelName) {
                const channel = this.channelService.getChannelHandler(`${channelName}-channel`);
                if (channel) {
                    return await channel.middleware(req, res, next);
                }
            }
            next();
        }
        catch (err) {
            next(new Error(`Unable to execute middleware on route ${req.path}`));
        }
    }
};
exports.ChannelMiddleware = ChannelMiddleware;
exports.ChannelMiddleware = ChannelMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelMiddleware);
//# sourceMappingURL=channel.middleware.js.map