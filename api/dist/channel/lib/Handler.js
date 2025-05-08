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
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const class_transformer_1 = require("class-transformer");
const mime_1 = __importDefault(require("mime"));
const uuid_1 = require("uuid");
const attachment_schema_1 = require("../../attachment/schemas/attachment.schema");
const attachment_service_1 = require("../../attachment/services/attachment.service");
const types_1 = require("../../attachment/types");
const message_1 = require("../../chat/schemas/types/message");
const config_1 = require("../../config");
const logger_service_1 = require("../../logger/logger.service");
const setting_service_1 = require("../../setting/services/setting.service");
const extension_1 = require("../../utils/generics/extension");
const URL_1 = require("../../utils/helpers/URL");
const channel_service_1 = require("../channel.service");
let ChannelHandler = class ChannelHandler extends extension_1.Extension {
    constructor(name, settingService, channelService, logger) {
        super(name);
        this.settingService = settingService;
        this.channelService = channelService;
        this.logger = logger;
        this.jwtSignOptions = {
            secret: config_1.config.parameters.signedUrl.secret,
            expiresIn: config_1.config.parameters.signedUrl.expiresIn,
            algorithm: 'HS256',
            encoding: 'utf-8',
        };
        this.settings = require(path_1.default.join(this.getPath(), 'settings')).default;
    }
    getName() {
        return this.name;
    }
    async onModuleInit() {
        await super.onModuleInit();
        this.channelService.setChannel(this.getName(), this);
        this.setup();
    }
    async setup() {
        await this.settingService.seedIfNotExist(this.getName(), this.settings.map((s, i) => ({
            ...s,
            weight: i + 1,
        })));
        this.init();
    }
    async getSettings() {
        const settings = await this.settingService.getSettings();
        return settings[this.getNamespace()];
    }
    async getUserData(event) {
        return await this.getSubscriberData(event);
    }
    async persistMessageAttachments(event) {
        if (event._adapter.eventType === message_1.StdEventType.message &&
            event._adapter.messageType === message_1.IncomingMessageType.attachments &&
            this.getMessageAttachments) {
            const metadatas = await this.getMessageAttachments(event);
            const subscriber = event.getSender();
            event._adapter.attachments = await Promise.all(metadatas.map(({ file, name, type, size }) => {
                return this.attachmentService.store(file, {
                    name: `${name ? `${name}-` : ''}${(0, uuid_1.v4)()}.${mime_1.default.extension(type)}`,
                    type,
                    size,
                    resourceRef: types_1.AttachmentResourceRef.MessageAttachment,
                    access: types_1.AttachmentAccess.Private,
                    createdByRef: types_1.AttachmentCreatedByRef.Subscriber,
                    createdBy: subscriber.id,
                });
            }));
        }
    }
    async middleware(_req, _res, next) {
        next();
    }
    async getPublicUrl(attachment) {
        const [name, _suffix] = this.getName().split('-');
        if ('id' in attachment) {
            if (!attachment || !attachment.id) {
                return (0, URL_1.buildURL)(config_1.config.apiBaseUrl, `/webhook/${name}/not-found`);
            }
            const resource = await this.attachmentService.findOne(attachment.id);
            if (!resource) {
                this.logger.warn('Unable to find attachment sending fallback image');
                return (0, URL_1.buildURL)(config_1.config.apiBaseUrl, `/webhook/${name}/not-found`);
            }
            const token = this.jwtService.sign({ ...resource }, this.jwtSignOptions);
            return (0, URL_1.buildURL)(config_1.config.apiBaseUrl, `/webhook/${name}/download/${resource.name}?t=${encodeURIComponent(token)}`);
        }
        else if ('url' in attachment && attachment.url) {
            return attachment.url;
        }
        else {
            return (0, URL_1.buildURL)(config_1.config.apiBaseUrl, `/webhook/${name}/not-found`);
        }
    }
    async hasDownloadAccess(attachment, _req) {
        return attachment.access === types_1.AttachmentAccess.Public;
    }
    async download(token, req) {
        try {
            const { exp: _exp, iat: _iat, ...result } = this.jwtService.verify(token, this.jwtSignOptions);
            const attachment = (0, class_transformer_1.plainToClass)(attachment_schema_1.Attachment, result);
            const canDownload = await this.hasDownloadAccess(attachment, req);
            if (!canDownload) {
                throw new common_1.ForbiddenException('You are not authorized to download the attachment');
            }
            return await this.attachmentService.download(attachment);
        }
        catch (err) {
            this.logger.error('Failed to download attachment', err);
            throw new common_1.NotFoundException('Unable to locate attachment');
        }
    }
};
__decorate([
    (0, common_1.Inject)(attachment_service_1.AttachmentService),
    __metadata("design:type", attachment_service_1.AttachmentService)
], ChannelHandler.prototype, "attachmentService", void 0);
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], ChannelHandler.prototype, "jwtService", void 0);
ChannelHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, setting_service_1.SettingService,
        channel_service_1.ChannelService,
        logger_service_1.LoggerService])
], ChannelHandler);
exports.default = ChannelHandler;
//# sourceMappingURL=Handler.js.map