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
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const bot_stats_schema_1 = require("../../analytics/schemas/bot-stats.schema");
const logger_service_1 = require("../../logger/logger.service");
const setting_service_1 = require("../../setting/services/setting.service");
const conversation_schema_1 = require("../schemas/conversation.schema");
const message_1 = require("../schemas/types/message");
const block_service_1 = require("./block.service");
const conversation_service_1 = require("./conversation.service");
const subscriber_service_1 = require("./subscriber.service");
let BotService = class BotService {
    constructor(eventEmitter, logger, blockService, conversationService, subscriberService, settingService) {
        this.eventEmitter = eventEmitter;
        this.logger = logger;
        this.blockService = blockService;
        this.conversationService = conversationService;
        this.subscriberService = subscriberService;
        this.settingService = settingService;
    }
    async sendMessageToSubscriber(envelope, event, block, context, fallback) {
        const options = block.options;
        const recipient = event.getSender();
        this.logger.debug('Sending message ... ', event.getSenderForeignId());
        const response = await event
            .getHandler()
            .sendMessage(event, envelope, options, context);
        this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.outgoing, 'Outgoing', recipient);
        this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.all_messages, 'All Messages', recipient);
        const sentMessage = {
            mid: response && 'mid' in response ? response.mid : '',
            message: envelope.message,
            recipient: recipient.id,
            handover: !!(options && options.assignTo),
            read: false,
            delivery: false,
        };
        await this.eventEmitter.emitAsync('hook:chatbot:sent', sentMessage, event);
        if (fallback) {
            this.eventEmitter.emit('hook:analytics:fallback-local', block, event, context);
        }
        else {
            this.eventEmitter.emit('hook:analytics:block', block, event, context);
        }
        const blockLabels = (block.assign_labels || []).map(({ id }) => id);
        const assignTo = block.options?.assignTo || null;
        await this.subscriberService.applyUpdates(event.getSender(), blockLabels, assignTo);
        this.logger.debug('Assigned labels ', blockLabels);
    }
    async triggerBlock(event, convo, block, fallback = false) {
        try {
            const context = convo.context || (0, conversation_schema_1.getDefaultConversationContext)();
            const recipient = event.getSender();
            const envelope = await this.blockService.processMessage(block, context, recipient?.context, fallback, convo.id);
            if (envelope.format !== message_1.OutgoingMessageFormat.system) {
                await this.sendMessageToSubscriber(envelope, event, block, context, fallback);
            }
            if (block.attachedBlock) {
                try {
                    const attachedBlock = await this.blockService.findOneAndPopulate(block.attachedBlock.id);
                    if (!attachedBlock) {
                        throw new Error('No attached block to be found with id ' + block.attachedBlock);
                    }
                    return await this.triggerBlock(event, convo, attachedBlock, fallback);
                }
                catch (err) {
                    this.logger.error('Unable to retrieve attached block', err);
                    this.eventEmitter.emit('hook:conversation:end', convo);
                }
            }
            else if (Array.isArray(block.nextBlocks) &&
                block.nextBlocks.length > 0) {
                try {
                    if (envelope.format === message_1.OutgoingMessageFormat.system) {
                        this.logger.debug('Matching the outcome against the next blocks ...', convo.id);
                        const match = this.blockService.matchOutcome(block.nextBlocks, event, envelope);
                        if (match) {
                            const nextBlock = await this.blockService.findOneAndPopulate(match.id);
                            if (!nextBlock) {
                                throw new Error('No attached block to be found with id ' +
                                    block.attachedBlock);
                            }
                            return await this.triggerBlock(event, convo, nextBlock, fallback);
                        }
                        else {
                            this.logger.warn('Block outcome did not match any of the next blocks', convo);
                            this.eventEmitter.emit('hook:conversation:end', convo);
                        }
                    }
                    else {
                        this.logger.debug('Conversation continues ...', convo.id);
                        const nextIds = block.nextBlocks.map(({ id }) => id);
                        await this.conversationService.updateOne(convo.id, {
                            current: block.id,
                            next: nextIds,
                        });
                    }
                }
                catch (err) {
                    this.logger.error('Unable to continue the flow', convo, err);
                    return;
                }
            }
            else {
                this.logger.debug('No attached/next blocks to execute ...');
                this.eventEmitter.emit('hook:conversation:end', convo);
            }
        }
        catch (err) {
            this.logger.error('Unable to process/send message.', err);
            this.eventEmitter.emit('hook:conversation:end', convo);
        }
    }
    async handleIncomingMessage(convo, event) {
        const nextIds = convo.next.map(({ id }) => id);
        try {
            const nextBlocks = await this.blockService.findAndPopulate({
                _id: { $in: nextIds },
            });
            let fallback = false;
            const fallbackOptions = convo.current?.options?.fallback
                ? convo.current.options.fallback
                : {
                    active: false,
                    max_attempts: 0,
                };
            const matchedBlock = await this.blockService.match(nextBlocks, event);
            let fallbackBlock;
            if (!matchedBlock &&
                event.getMessageType() === message_1.IncomingMessageType.message &&
                fallbackOptions.active &&
                convo.context.attempt < fallbackOptions.max_attempts) {
                const currentBlock = convo.current;
                fallbackBlock = {
                    ...currentBlock,
                    nextBlocks: convo.next,
                    assign_labels: [],
                    trigger_labels: [],
                    attachedBlock: null,
                    category: null,
                    previousBlocks: [],
                };
                convo.context.attempt++;
                fallback = true;
            }
            else {
                convo.context.attempt = 0;
                fallbackBlock = undefined;
            }
            const next = matchedBlock || fallbackBlock;
            this.logger.debug('Responding ...', convo.id);
            if (next) {
                this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.popular, next.name, convo.sender);
                this.logger.debug('Respond to nested conversion! Go next ', next.id);
                try {
                    const updatedConversation = await this.conversationService.storeContextData(convo, next, event, !fallback);
                    await this.triggerBlock(event, updatedConversation, next, fallback);
                }
                catch (err) {
                    this.logger.error('Unable to store context data!', err);
                    return this.eventEmitter.emit('hook:conversation:end', convo);
                }
                return true;
            }
            else {
                this.logger.debug('No matching block found to call next ', convo.id);
                this.eventEmitter.emit('hook:conversation:end', convo);
                return false;
            }
        }
        catch (err) {
            this.logger.error('Unable to populate the next blocks!', err);
            this.eventEmitter.emit('hook:conversation:end', convo);
            throw err;
        }
    }
    async processConversationMessage(event) {
        this.logger.debug('Is this message apart of an active conversation ? Searching ... ');
        const subscriber = event.getSender();
        try {
            const conversation = await this.conversationService.findOneAndPopulate({
                sender: subscriber.id,
                active: true,
            });
            if (!conversation) {
                this.logger.debug('No active conversation found ', subscriber.id);
                return false;
            }
            this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.existing_conversations, 'Existing conversations', subscriber);
            this.logger.debug('Conversation has been captured! Responding ...');
            return await this.handleIncomingMessage(conversation, event);
        }
        catch (err) {
            this.logger.error('An error occurred when searching for a conversation ', err);
            return null;
        }
    }
    async startConversation(event, block) {
        const subscriber = event.getSender();
        this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.popular, block.name, subscriber);
        try {
            const convo = await this.conversationService.create({
                sender: subscriber.id,
            });
            this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.new_conversations, 'New conversations', subscriber);
            try {
                const updatedConversation = await this.conversationService.storeContextData(convo, block, event, true);
                this.logger.debug('Started a new conversation with ', subscriber.id, block.name);
                return await this.triggerBlock(event, updatedConversation, block, false);
            }
            catch (err) {
                this.logger.error('Unable to store context data!', err);
                this.eventEmitter.emit('hook:conversation:end', convo);
            }
        }
        catch (err) {
            this.logger.error('Unable to start a new conversation with ', err);
        }
    }
    async getGlobalFallbackBlock(settings) {
        const chatbot_settings = settings.chatbot_settings;
        if (chatbot_settings.fallback_block) {
            const block = await this.blockService.findOneAndPopulate(chatbot_settings.fallback_block);
            if (!block) {
                throw new Error('Unable to retrieve global fallback block.');
            }
            return block;
        }
        throw new Error('No global fallback block is defined.');
    }
    async handleMessageEvent(event) {
        const settings = await this.settingService.getSettings();
        try {
            const captured = await this.processConversationMessage(event);
            if (captured) {
                return;
            }
            try {
                const blocks = await this.blockService.findAndPopulate({
                    starts_conversation: true,
                });
                if (!blocks.length) {
                    this.logger.debug('No starting message blocks was found');
                }
                const block = await this.blockService.match(blocks, event);
                if (!block) {
                    this.logger.debug('No message blocks available!');
                    if (settings.chatbot_settings &&
                        settings.chatbot_settings.global_fallback) {
                        this.eventEmitter.emit('hook:analytics:fallback-global', event);
                        this.logger.debug('Sending global fallback message ...');
                        try {
                            const fallbackBlock = await this.getGlobalFallbackBlock(settings);
                            return this.startConversation(event, fallbackBlock);
                        }
                        catch (err) {
                            this.logger.warn('No global fallback block defined, sending a message ...', err);
                            const globalFallbackBlock = {
                                id: 'global-fallback',
                                name: 'Global Fallback',
                                message: settings.chatbot_settings.fallback_message,
                                options: {},
                                patterns: [],
                                assign_labels: [],
                                starts_conversation: false,
                                position: { x: 0, y: 0 },
                                capture_vars: [],
                                builtin: true,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                attachedBlock: null,
                            };
                            const envelope = await this.blockService.processMessage(globalFallbackBlock, (0, conversation_schema_1.getDefaultConversationContext)(), { vars: {} });
                            await this.sendMessageToSubscriber(envelope, event, globalFallbackBlock);
                        }
                    }
                    return;
                }
                this.startConversation(event, block);
            }
            catch (err) {
                this.logger.error('An error occurred while retrieving starting message blocks ', err);
            }
        }
        catch (err) {
            this.logger.debug('Either something went wrong, no active conservation was found or user changed subject', err);
        }
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        logger_service_1.LoggerService,
        block_service_1.BlockService,
        conversation_service_1.ConversationService,
        subscriber_service_1.SubscriberService,
        setting_service_1.SettingService])
], BotService);
//# sourceMappingURL=bot.service.js.map