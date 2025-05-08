import { Attachment } from '@/attachment/schemas/attachment.schema';
import { Subscriber } from '@/chat/schemas/subscriber.schema';
import { SubscriberChannelData } from '@/chat/schemas/types/channel';
import { IncomingMessageType, StdEventType, StdIncomingMessage } from '@/chat/schemas/types/message';
import { Payload } from '@/chat/schemas/types/quick-reply';
import { NLU } from '@/helper/types';
import { ChannelName } from '../types';
import ChannelHandler from './Handler';
export interface ChannelEvent {
}
export default abstract class EventWrapper<A extends {
    eventType: StdEventType;
    messageType?: IncomingMessageType;
    raw: E;
    attachments?: Attachment[];
}, E, N extends ChannelName = ChannelName, C extends ChannelHandler = ChannelHandler<N>, S = SubscriberChannelDict[N]> {
    _adapter: A;
    _handler: C;
    channelAttrs: S;
    subscriber: Subscriber;
    _nlp: NLU.ParseEntities;
    constructor(handler: C, event: A['raw'], channelAttrs?: S);
    toString(): string;
    abstract _init(event: A['raw']): void;
    getHandler(): C;
    getChannelData(): SubscriberChannelData<N>;
    abstract getId(): string;
    set(attr: string, value: any): void;
    get(attr: string, otherwise: any): any;
    getNLP(): NLU.ParseEntities | null;
    setNLP(nlp: NLU.ParseEntities): void;
    abstract getSenderForeignId(): string;
    getSender(): Subscriber;
    setSender(profile: Subscriber): void;
    preprocess(): Promise<void>;
    abstract getRecipientForeignId(): string;
    getEventType(): StdEventType;
    getMessageType(): IncomingMessageType | undefined;
    abstract getPayload(): Payload | string | undefined;
    abstract getMessage(): StdIncomingMessage;
    getText(): string;
    abstract getDeliveredMessages(): string[];
    abstract getWatermark(): number;
}
type GenericEvent = {
    senderId: string;
    messageId: string;
};
type GenericEventAdapter = {
    eventType: StdEventType.unknown;
    messageType: IncomingMessageType.unknown;
    raw: GenericEvent;
};
export declare class GenericEventWrapper extends EventWrapper<GenericEventAdapter, GenericEvent, ChannelName> {
    constructor(handler: ChannelHandler, event: GenericEvent);
    _init(event: GenericEvent): void;
    getId(): string;
    getSenderForeignId(): string;
    getRecipientForeignId(): string;
    getEventType(): StdEventType;
    getMessageType(): IncomingMessageType;
    getPayload(): Payload | string | undefined;
    getMessage(): StdIncomingMessage;
    getDeliveredMessages(): string[];
    getWatermark(): number;
}
export {};
