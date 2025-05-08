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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mime_1 = __importDefault(require("mime"));
const uuid_1 = require("uuid");
const bot_stats_schema_1 = require("../../analytics/schemas/bot-stats.schema");
const attachment_service_1 = require("../../attachment/services/attachment.service");
const types_1 = require("../../attachment/types");
const EventWrapper_1 = __importDefault(require("../../channel/lib/EventWrapper"));
const config_1 = require("../../config");
const helper_service_1 = require("../../helper/helper.service");
const logger_service_1 = require("../../logger/logger.service");
const websocket_gateway_1 = require("../../websocket/websocket.gateway");
const message_dto_1 = require("../dto/message.dto");
const conversation_schema_1 = require("../schemas/conversation.schema");
const bot_service_1 = require("./bot.service");
const conversation_service_1 = require("./conversation.service");
const message_service_1 = require("./message.service");
const subscriber_service_1 = require("./subscriber.service");
let ChatService = class ChatService {
    constructor(eventEmitter, logger, conversationService, messageService, subscriberService, botService, websocketGateway, helperService, attachmentService) {
        this.eventEmitter = eventEmitter;
        this.logger = logger;
        this.conversationService = conversationService;
        this.messageService = messageService;
        this.subscriberService = subscriberService;
        this.botService = botService;
        this.websocketGateway = websocketGateway;
        this.helperService = helperService;
        this.attachmentService = attachmentService;
    }
    async handleEndConversation(convo) {
        try {
            await this.conversationService.end(convo);
            this.logger.debug('Conversation has ended successfully.', convo.id);
        }
        catch (err) {
            this.logger.error('Unable to end conversation !', convo.id);
        }
    }
    async handleCloseConversation(convoId) {
        try {
            await this.conversationService.deleteOne(convoId);
            this.logger.debug('Conversation is closed successfully.', convoId);
        }
        catch (err) {
            this.logger.error('Unable to close conversation.', err);
        }
    }
    async handleSentMessage(sentMessage, _event) {
        if (sentMessage.mid) {
            try {
                const message = await this.messageService.findOneOrCreate({
                    mid: sentMessage.mid,
                }, sentMessage);
                this.websocketGateway.broadcastMessageSent(message);
                this.logger.debug('Message has been logged.', sentMessage.mid);
            }
            catch (err) {
                this.logger.error('Unable to log sent message.', err);
            }
        }
    }
    async handleReceivedMessage(event) {
        let messageId = '';
        this.logger.debug('Received message', event);
        try {
            messageId = event.getId();
        }
        catch (err) {
            this.logger.warn('Failed to get the event id', messageId);
        }
        const subscriber = event.getSender();
        const received = {
            mid: messageId,
            sender: subscriber.id,
            message: event.getMessage(),
            delivery: true,
            read: true,
        };
        this.logger.debug('Logging message', received);
        try {
            const msg = await this.messageService.create(received);
            const populatedMsg = await this.messageService.findOneAndPopulate(msg.id);
            if (!populatedMsg) {
                this.logger.warn('Unable to find populated message.', event);
                throw new Error(`Unable to find Message by ID ${msg.id} not found`);
            }
            this.websocketGateway.broadcastMessageReceived(populatedMsg, subscriber);
            this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.incoming, 'Incoming', subscriber);
            this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.all_messages, 'All Messages', subscriber);
        }
        catch (err) {
            this.logger.error('Unable to log received message.', err, event);
        }
    }
    async handleMessageDelivery(event) {
        if (config_1.config.chatbot.messages.track_delivery) {
            const subscriber = event.getSender();
            const deliveredMessages = event.getDeliveredMessages();
            try {
                await this.messageService.updateMany({ mid: { $in: deliveredMessages } }, { delivery: true });
                this.websocketGateway.broadcastMessageDelivered(deliveredMessages, subscriber);
            }
            catch (err) {
                this.logger.error('Unable to mark message as delivered.', err);
            }
        }
    }
    async handleMessageRead(event) {
        if (config_1.config.chatbot.messages.track_read) {
            const subscriber = event.getSender();
            const watermark = new Date(event.getWatermark());
            const start = new Date(watermark.getTime() - 24 * 3600 * 1000);
            try {
                await this.messageService.updateMany({
                    recipient: subscriber.id,
                    createdAt: { $lte: watermark, $gte: start },
                }, {
                    delivery: true,
                    read: true,
                });
                this.websocketGateway.broadcastMessageRead(watermark.getTime(), subscriber);
            }
            catch (err) {
                this.logger.error('Unable to mark message as read.', err);
            }
        }
    }
    async handleEchoMessage(event) {
        this.logger.verbose('Message echo received', event._adapter._raw);
        const foreignId = event.getRecipientForeignId();
        if (foreignId) {
            try {
                const recipient = await this.subscriberService.findOne({
                    foreign_id: foreignId,
                });
                if (!recipient) {
                    throw new Error(`Subscriber with foreign ID ${foreignId} not found`);
                }
                const sentMessage = {
                    mid: event.getId(),
                    recipient: recipient.id,
                    message: event.getMessage(),
                    delivery: true,
                    read: false,
                };
                this.eventEmitter.emit('hook:chatbot:sent', sentMessage, event);
                this.eventEmitter.emit('hook:stats:entry', 'echo', 'Echo', recipient);
            }
            catch (err) {
                this.logger.error('Unable to log echo message', err, event);
            }
        }
    }
    async handleNewMessage(event) {
        this.logger.debug('New message received', event._adapter.raw);
        const foreignId = event.getSenderForeignId();
        const handler = event.getHandler();
        try {
            let subscriber = await this.subscriberService.findOne({
                foreign_id: foreignId,
            });
            if (!subscriber) {
                const subscriberData = await handler.getSubscriberData(event);
                subscriberData.channel = event.getChannelData();
                subscriber = await this.subscriberService.create(subscriberData);
                if (!subscriber) {
                    throw new Error('Unable to create a new subscriber');
                }
            }
            event.setSender(subscriber);
            this.eventEmitter.emit('hook:user:lastvisit', subscriber);
            this.websocketGateway.broadcastSubscriberUpdate(subscriber);
            if (handler.getSubscriberAvatar) {
                try {
                    const metadata = await handler.getSubscriberAvatar(event);
                    if (metadata) {
                        const { file, type, size } = metadata;
                        const extension = mime_1.default.extension(type);
                        const avatar = await this.attachmentService.store(file, {
                            name: `avatar-${(0, uuid_1.v4)()}.${extension}`,
                            size,
                            type,
                            resourceRef: types_1.AttachmentResourceRef.SubscriberAvatar,
                            access: types_1.AttachmentAccess.Private,
                            createdByRef: types_1.AttachmentCreatedByRef.Subscriber,
                            createdBy: subscriber.id,
                        });
                        if (avatar) {
                            subscriber = await this.subscriberService.updateOne(subscriber.id, {
                                avatar: avatar.id,
                            });
                            if (!subscriber) {
                                throw new Error('Unable to update the subscriber avatar');
                            }
                        }
                    }
                }
                catch (err) {
                    this.logger.error(`Unable to retrieve avatar for subscriber ${event.getSenderForeignId()}`, err);
                }
            }
            event.setSender(subscriber);
            if (event.preprocess) {
                await event.preprocess();
            }
            this.eventEmitter.emit('hook:chatbot:received', event);
            if (subscriber?.assignedTo) {
                this.logger.debug('Conversation taken over', subscriber.assignedTo);
                return;
            }
            if (event.getText() && !event.getNLP()) {
                try {
                    const helper = await this.helperService.getDefaultNluHelper();
                    const nlp = await helper.predict(event.getText(), true);
                    event.setNLP(nlp);
                }
                catch (err) {
                    this.logger.error('Unable to perform NLP parse', err);
                }
            }
            this.botService.handleMessageEvent(event);
        }
        catch (err) {
            this.logger.error('Error handling new message', err);
        }
    }
    async onSubscriberCreate({ _id }) {
        const subscriber = await this.subscriberService.findOne(_id);
        if (subscriber) {
            this.websocketGateway.broadcastSubscriberNew(subscriber);
        }
    }
    async onSubscriberUpdate({ _id }) {
        const subscriber = await this.subscriberService.findOne(_id);
        if (subscriber) {
            this.websocketGateway.broadcastSubscriberUpdate(subscriber);
        }
    }
};
exports.ChatService = ChatService;
__decorate([
    (0, event_emitter_1.OnEvent)('hook:conversation:end'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conversation_schema_1.Conversation]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "handleEndConversation", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:conversation:close'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "handleCloseConversation", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:chatbot:sent', { promisify: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageCreateDto,
        EventWrapper_1.default]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "handleSentMessage", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:chatbot:received'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventWrapper_1.default]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "handleReceivedMessage", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:chatbot:delivery'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventWrapper_1.default]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "handleMessageDelivery", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:chatbot:read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventWrapper_1.default]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "handleMessageRead", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:chatbot:echo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventWrapper_1.default]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "handleEchoMessage", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:chatbot:message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventWrapper_1.default]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "handleNewMessage", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:subscriber:postCreate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "onSubscriberCreate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:subscriber:postUpdate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "onSubscriberUpdate", null);
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        logger_service_1.LoggerService,
        conversation_service_1.ConversationService,
        message_service_1.MessageService,
        subscriber_service_1.SubscriberService,
        bot_service_1.BotService,
        websocket_gateway_1.WebsocketGateway,
        helper_service_1.HelperService,
        attachment_service_1.AttachmentService])
], ChatService);
//# sourceMappingURL=chat.service.js.map