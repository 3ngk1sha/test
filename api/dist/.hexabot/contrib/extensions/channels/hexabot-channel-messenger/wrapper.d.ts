import { Attachment } from '@/attachment/schemas/attachment.schema';
import EventWrapper from '@/channel/lib/EventWrapper';
import { IncomingMessageType, StdEventType, StdIncomingMessage } from '@/chat/schemas/types/message';
import { Payload } from '@/chat/schemas/types/quick-reply';
import MessengerHandler from './index.channel';
import { MESSENGER_CHANNEL_NAME } from './settings';
import { Messenger } from './types';
type MessengerEventAdapter = {
    eventType: StdEventType.unknown;
    messageType: never;
    raw: Messenger.Event;
    attachments: never;
} | {
    eventType: StdEventType.read;
    messageType: never;
    raw: Messenger.MessageReadEvent;
    attachments: never;
} | {
    eventType: StdEventType.delivery;
    messageType: never;
    raw: Messenger.MessageDeliveryEvent;
    attachments: never;
} | {
    eventType: StdEventType.message;
    messageType: IncomingMessageType.postback;
    raw: Messenger.IncomingMessage<Messenger.IncomingPostback>;
    attachments: never;
} | {
    eventType: StdEventType.message | StdEventType.echo;
    messageType: IncomingMessageType.message;
    raw: Messenger.IncomingMessage<Messenger.IncomingAnyMessage<Messenger.IncomingTextMessage>>;
    attachments: never;
} | {
    eventType: StdEventType.message;
    messageType: IncomingMessageType.quick_reply;
    raw: Messenger.IncomingMessage<Messenger.IncomingAnyMessage<Messenger.IncomingQuickReplyMessage>>;
    attachments: never;
} | {
    eventType: StdEventType.message | StdEventType.echo;
    messageType: IncomingMessageType.location | IncomingMessageType.attachments;
    raw: Messenger.IncomingMessage<Messenger.IncomingAnyMessage<Messenger.IncomingAttachmentMessage>>;
    attachments: Attachment[];
} | {
    eventType: StdEventType.message | StdEventType.echo;
    messageType: IncomingMessageType.unknown;
    raw: Messenger.IncomingMessage;
    attachments: never;
};
export default class MessengerEventWrapper extends EventWrapper<MessengerEventAdapter, Messenger.Event, typeof MESSENGER_CHANNEL_NAME, MessengerHandler> {
    private profile;
    constructor(handler: MessengerHandler, event: Messenger.Event);
    _init(event: Messenger.Event): void;
    setProfile(profile: Messenger.UserData): void;
    getProfile(): Messenger.UserData | undefined;
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
