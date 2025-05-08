import { Attachment } from '@/attachment/schemas/attachment.schema';
import EventWrapper from '@/channel/lib/EventWrapper';
import { ChannelName } from '@/channel/types';
import { IncomingMessageType, StdEventType, StdIncomingMessage } from '@/chat/schemas/types/message';
import { Payload } from '@/chat/schemas/types/quick-reply';
import BaseWebChannelHandler from './base-web-channel';
import { WEB_CHANNEL_NAME } from './settings';
import { Web } from './types';
type WebEventAdapter = {
    eventType: StdEventType.unknown;
    messageType: never;
    raw: Web.Event;
    attachment: never;
} | {
    eventType: StdEventType.read;
    messageType: never;
    raw: Web.StatusReadEvent;
    attachment: never;
} | {
    eventType: StdEventType.delivery;
    messageType: never;
    raw: Web.StatusDeliveryEvent;
    attachment: never;
} | {
    eventType: StdEventType.typing;
    messageType: never;
    raw: Web.StatusTypingEvent;
    attachment: never;
} | {
    eventType: StdEventType.message;
    messageType: IncomingMessageType.message;
    raw: Web.IncomingMessage<Web.IncomingTextMessage>;
    attachment: never;
} | {
    eventType: StdEventType.message;
    messageType: IncomingMessageType.postback | IncomingMessageType.quick_reply;
    raw: Web.IncomingMessage<Web.IncomingPayloadMessage>;
    attachment: never;
} | {
    eventType: StdEventType.message;
    messageType: IncomingMessageType.location;
    raw: Web.IncomingMessage<Web.IncomingLocationMessage>;
    attachment: never;
} | {
    eventType: StdEventType.message;
    messageType: IncomingMessageType.attachments;
    raw: Web.IncomingMessage<Web.IncomingAttachmentMessage>;
    attachment: Attachment | null;
};
export default class WebEventWrapper<N extends ChannelName> extends EventWrapper<WebEventAdapter, Web.Event, N> {
    constructor(handler: BaseWebChannelHandler<N>, event: Web.Event, channelAttrs: SubscriberChannelDict[typeof WEB_CHANNEL_NAME]);
    _init(event: Web.Event): void;
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
