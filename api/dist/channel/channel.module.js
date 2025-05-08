"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const nestjs_dynamic_providers_1 = require("nestjs-dynamic-providers");
const attachment_module_1 = require("../attachment/attachment.module");
const chat_module_1 = require("../chat/chat.module");
const cms_module_1 = require("../cms/cms.module");
const channel_controller_1 = require("./channel.controller");
const channel_middleware_1 = require("./channel.middleware");
const channel_service_1 = require("./channel.service");
const webhook_controller_1 = require("./webhook.controller");
let ChannelModule = class ChannelModule {
    configure(consumer) {
        consumer
            .apply(channel_middleware_1.ChannelMiddleware)
            .forRoutes({ path: 'webhook/*', method: common_1.RequestMethod.ALL });
    }
};
exports.ChannelModule = ChannelModule;
exports.ChannelModule = ChannelModule = __decorate([
    (0, common_1.Global)(),
    (0, nestjs_dynamic_providers_1.InjectDynamicProviders)('dist/extensions/**/*.channel.js', 'dist/.hexabot/contrib/extensions/channels/**/*.channel.js', 'dist/.hexabot/custom/extensions/channels/**/*.channel.js'),
    (0, common_1.Module)({
        imports: [chat_module_1.ChatModule, attachment_module_1.AttachmentModule, cms_module_1.CmsModule, axios_1.HttpModule, jwt_1.JwtModule],
        controllers: [webhook_controller_1.WebhookController, channel_controller_1.ChannelController],
        providers: [channel_service_1.ChannelService],
        exports: [channel_service_1.ChannelService],
    })
], ChannelModule);
//# sourceMappingURL=channel.module.js.map