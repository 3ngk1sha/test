import { EventEmitter2 } from '@nestjs/event-emitter';
import EventWrapper from '@/channel/lib/EventWrapper';
import { LoggerService } from '@/logger/logger.service';
import { SettingService } from '@/setting/services/setting.service';
import { BlockFull } from '../schemas/block.schema';
import { Conversation, ConversationFull } from '../schemas/conversation.schema';
import { Context } from '../schemas/types/context';
import { StdOutgoingMessageEnvelope } from '../schemas/types/message';
import { BlockService } from './block.service';
import { ConversationService } from './conversation.service';
import { SubscriberService } from './subscriber.service';
export declare class BotService {
    private readonly eventEmitter;
    private readonly logger;
    private readonly blockService;
    private readonly conversationService;
    private readonly subscriberService;
    private readonly settingService;
    constructor(eventEmitter: EventEmitter2, logger: LoggerService, blockService: BlockService, conversationService: ConversationService, subscriberService: SubscriberService, settingService: SettingService);
    sendMessageToSubscriber(envelope: StdOutgoingMessageEnvelope, event: EventWrapper<any, any>, block: BlockFull, context?: Context, fallback?: boolean): Promise<void>;
    triggerBlock(event: EventWrapper<any, any>, convo: Conversation, block: BlockFull, fallback?: boolean): any;
    handleIncomingMessage(convo: ConversationFull, event: EventWrapper<any, any>): Promise<boolean>;
    processConversationMessage(event: EventWrapper<any, any>): Promise<boolean | null>;
    startConversation(event: EventWrapper<any, any>, block: BlockFull): Promise<any>;
    getGlobalFallbackBlock(settings: Settings): Promise<BlockFull>;
    handleMessageEvent(event: EventWrapper<any, any>): Promise<any>;
}
