import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { Block } from './block.schema';
import { Subscriber } from './subscriber.schema';
import { Context } from './types/context';
export declare function getDefaultConversationContext(): Context;
declare class ConversationStub extends BaseSchema {
    sender: unknown;
    active: boolean;
    context: Context;
    current: unknown;
    next: unknown;
}
export declare class Conversation extends ConversationStub {
    sender: string;
    current: string | null;
    next: string[];
}
export declare class ConversationFull extends ConversationStub {
    sender: Subscriber;
    current: Block;
    next: Block[];
}
export type ConversationDocument = THydratedDocument<Conversation>;
export declare const ConversationModel: ModelDefinition;
declare const _default: any;
export default _default;
export type ConversationPopulate = keyof TFilterPopulateFields<Conversation, ConversationStub>;
export declare const CONVERSATION_POPULATE: ConversationPopulate[];
