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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("mongoose");
const attachment_service_1 = require("../../attachment/services/attachment.service");
const base_service_1 = require("../../utils/generics/base-service");
const socket_method_decorator_1 = require("../../websocket/decorators/socket-method.decorator");
const socket_req_decorator_1 = require("../../websocket/decorators/socket-req.decorator");
const socket_res_decorator_1 = require("../../websocket/decorators/socket-res.decorator");
const types_1 = require("../../websocket/types");
const socket_request_1 = require("../../websocket/utils/socket-request");
const socket_response_1 = require("../../websocket/utils/socket-response");
const websocket_gateway_1 = require("../../websocket/websocket.gateway");
const message_repository_1 = require("../repositories/message.repository");
let MessageService = class MessageService extends base_service_1.BaseService {
    constructor(messageRepository, attachmentService, gateway) {
        super(messageRepository);
        this.messageRepository = messageRepository;
        this.attachmentService = attachmentService;
        if (gateway)
            this.gateway = gateway;
    }
    subscribe(req, res) {
        try {
            this.gateway.io.socketsJoin(types_1.Room.MESSAGE);
            return res.status(200).json({
                success: true,
            });
        }
        catch (e) {
            this.logger.error('Websocket subscription', e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async findHistoryUntilDate(subscriber, until = new Date(), limit = 30) {
        return await this.messageRepository.findHistoryUntilDate(subscriber, until, limit);
    }
    async findHistorySinceDate(subscriber, since = new Date(), limit = 30) {
        return await this.messageRepository.findHistorySinceDate(subscriber, since, limit);
    }
    async findLastMessages(subscriber, limit = 5) {
        const lastMessages = await this.find({
            $or: [{ sender: subscriber.id }, { recipient: subscriber.id }],
        }, { sort: ['createdAt', 'desc'], skip: 0, limit });
        return lastMessages.reverse();
    }
    async handleDeleteImage(_query, criteria) {
        try {
            this.logger.log('deleting attachment messages containing deleted images', criteria);
            const foundAttachments = await this.attachmentService.find(criteria);
            for (const attachment of foundAttachments) {
                await this.updateMany({
                    'message.attachment.payload.id': attachment.id,
                }, {
                    ['message.attachment.payload.id']: null,
                });
            }
        }
        catch (error) {
            this.logger.error('Unable to cleanup old messages with attachment ids', error);
        }
    }
};
exports.MessageService = MessageService;
__decorate([
    (0, socket_method_decorator_1.SocketGet)('/message/subscribe/'),
    (0, socket_method_decorator_1.SocketPost)('/message/subscribe/'),
    __param(0, (0, socket_req_decorator_1.SocketReq)()),
    __param(1, (0, socket_res_decorator_1.SocketRes)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_request_1.SocketRequest, socket_response_1.SocketResponse]),
    __metadata("design:returntype", void 0)
], MessageService.prototype, "subscribe", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:attachment:preDelete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Query, Object]),
    __metadata("design:returntype", Promise)
], MessageService.prototype, "handleDeleteImage", null);
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository,
        attachment_service_1.AttachmentService,
        websocket_gateway_1.WebsocketGateway])
], MessageService);
//# sourceMappingURL=message.service.js.map