import EventWrapper from '@/channel/lib/EventWrapper';
import { BaseService } from '@/utils/generics/base-service';
import { ConversationDto } from '../dto/conversation.dto';
import { ConversationRepository } from '../repositories/conversation.repository';
import { Block, BlockFull } from '../schemas/block.schema';
import { Conversation, ConversationFull, ConversationPopulate } from '../schemas/conversation.schema';
import { ContextVarService } from './context-var.service';
import { SubscriberService } from './subscriber.service';
export declare class ConversationService extends BaseService<Conversation, ConversationPopulate, ConversationFull, ConversationDto> {
    readonly repository: ConversationRepository;
    private readonly contextVarService;
    private readonly subscriberService;
    constructor(repository: ConversationRepository, contextVarService: ContextVarService, subscriberService: SubscriberService);
    end(convo: Conversation | ConversationFull): Promise<Conversation>;
    storeContextData(convo: Conversation | ConversationFull, next: Block | BlockFull, event: EventWrapper<any, any>, captureVars?: boolean): Promise<Conversation>;
}
