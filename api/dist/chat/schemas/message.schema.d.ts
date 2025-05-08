import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields } from '@/utils/types/filter.types';
import { Subscriber } from './subscriber.schema';
import { StdIncomingMessage, StdOutgoingMessage } from './types/message';
export declare class MessageStub extends BaseSchema {
    mid?: string;
    sender?: unknown;
    recipient?: unknown;
    sentBy?: unknown;
    message: StdOutgoingMessage | StdIncomingMessage;
    read?: boolean;
    delivery?: boolean;
    handover?: boolean;
}
export declare class Message extends MessageStub {
    sender?: string;
    recipient?: string;
    sentBy?: string;
}
export declare class MessageFull extends MessageStub {
    sender?: Subscriber;
    recipient?: Subscriber;
    sentBy?: string;
}
export declare const MessageModel: ModelDefinition;
declare const _default: any;
export default _default;
export type MessagePopulate = keyof TFilterPopulateFields<Message, MessageStub>;
export declare const MESSAGE_POPULATE: MessagePopulate[];
