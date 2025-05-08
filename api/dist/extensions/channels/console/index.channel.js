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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const attachment_service_1 = require("../../../attachment/services/attachment.service");
const channel_service_1 = require("../../../channel/channel.service");
const message_service_1 = require("../../../chat/services/message.service");
const subscriber_service_1 = require("../../../chat/services/subscriber.service");
const menu_service_1 = require("../../../cms/services/menu.service");
const i18n_service_1 = require("../../../i18n/services/i18n.service");
const logger_service_1 = require("../../../logger/logger.service");
const setting_service_1 = require("../../../setting/services/setting.service");
const websocket_gateway_1 = require("../../../websocket/websocket.gateway");
const base_web_channel_1 = __importDefault(require("../web/base-web-channel"));
const settings_1 = require("./settings");
let ConsoleChannelHandler = class ConsoleChannelHandler extends base_web_channel_1.default {
    constructor(settingService, channelService, logger, eventEmitter, i18n, subscriberService, attachmentService, messageService, menuService, websocketGateway) {
        super(settings_1.CONSOLE_CHANNEL_NAME, settingService, channelService, logger, eventEmitter, i18n, subscriberService, attachmentService, messageService, menuService, websocketGateway);
    }
    getPath() {
        return __dirname;
    }
};
ConsoleChannelHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [setting_service_1.SettingService,
        channel_service_1.ChannelService,
        logger_service_1.LoggerService,
        event_emitter_1.EventEmitter2,
        i18n_service_1.I18nService,
        subscriber_service_1.SubscriberService,
        attachment_service_1.AttachmentService,
        message_service_1.MessageService,
        menu_service_1.MenuService,
        websocket_gateway_1.WebsocketGateway])
], ConsoleChannelHandler);
exports.default = ConsoleChannelHandler;
//# sourceMappingURL=index.channel.js.map