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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const channel_service_1 = require("../../channel/channel.service");
const EventWrapper_1 = require("../../channel/lib/EventWrapper");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const populate_pipe_1 = require("../../utils/pipes/populate.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const message_dto_1 = require("../dto/message.dto");
const subscriber_schema_1 = require("../schemas/subscriber.schema");
const message_1 = require("../schemas/types/message");
const message_service_1 = require("../services/message.service");
const subscriber_service_1 = require("../services/subscriber.service");
let MessageController = class MessageController extends base_controller_1.BaseController {
    constructor(messageService, subscriberService, channelService) {
        super(messageService);
        this.messageService = messageService;
        this.subscriberService = subscriberService;
        this.channelService = channelService;
    }
    async findPage(pageQuery, populate, filters) {
        return this.canPopulate(populate)
            ? await this.messageService.findAndPopulate(filters, pageQuery)
            : await this.messageService.find(filters, pageQuery);
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id, populate) {
        const doc = this.canPopulate(populate)
            ? await this.messageService.findOneAndPopulate(id)
            : await this.messageService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find Message by id ${id}`);
            throw new common_1.NotFoundException(`Message with ID ${id} not found`);
        }
        return doc;
    }
    async create(messageDto, req) {
        if (!messageDto.recipient || !messageDto.inReplyTo) {
            throw new common_1.BadRequestException('MessageController send : invalid params');
        }
        const subscriber = await this.subscriberService.findOne(messageDto.recipient);
        if (!subscriber) {
            this.logger.warn(`Unable to find subscriber by id ${messageDto.recipient}`);
            throw new common_1.NotFoundException(`Subscriber with ID ${messageDto.recipient} not found`);
        }
        const channelData = subscriber_schema_1.Subscriber.getChannelData(subscriber);
        if (!this.channelService.findChannel(channelData.name)) {
            throw new common_1.BadRequestException(`Subscriber channel not found`);
        }
        const envelope = {
            format: message_1.OutgoingMessageFormat.text,
            message: messageDto.message,
        };
        const channelHandler = this.channelService.getChannelHandler(channelData.name);
        const event = new EventWrapper_1.GenericEventWrapper(channelHandler, {
            senderId: subscriber.foreign_id,
            messageId: messageDto.inReplyTo,
        });
        event.setSender(subscriber);
        try {
            const { mid } = await channelHandler.sendMessage(event, envelope, {}, {});
            const sentMessage = {
                mid,
                recipient: subscriber.id,
                message: messageDto.message,
                sentBy: req.session?.passport?.user.id,
                read: false,
                delivery: false,
            };
            this.eventEmitter.emit('hook:chatbot:sent', sentMessage, event);
            return {
                success: true,
            };
        }
        catch (err) {
            this.logger.debug('Unable to send message', err);
            throw new common_1.BadRequestException('MessageController send : unable to send message');
        }
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __param(2, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['recipient', 'sender'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findPage", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['recipient', 'sender'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageCreateDto, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "create", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        subscriber_service_1.SubscriberService,
        channel_service_1.ChannelService])
], MessageController);
//# sourceMappingURL=message.controller.js.map