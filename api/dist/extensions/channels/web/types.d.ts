/// <reference types="node" />
import { SubscriberFull } from '@/chat/schemas/subscriber.schema';
import { Button, WebUrlButton } from '@/chat/schemas/types/button';
import { FileType } from '@/chat/schemas/types/message';
import { StdQuickReply } from '@/chat/schemas/types/quick-reply';
export declare namespace Web {
    type RequestSession = {
        web?: {
            profile: SubscriberFull;
            isSocket: boolean;
            messageQueue: any[];
            polling: boolean;
        };
    };
    enum StatusEventType {
        delivery = "delivery",
        read = "read",
        typing = "typing"
    }
    enum IncomingMessageType {
        text = "text",
        quick_reply = "quick_reply",
        postback = "postback",
        location = "location",
        file = "file"
    }
    type EventType = Web.StatusEventType | Web.IncomingMessageType;
    enum OutgoingMessageType {
        text = "text",
        buttons = "buttons",
        quick_replies = "quick_replies",
        file = "file",
        list = "list",
        carousel = "carousel"
    }
    type IncomingTextMessageData = {
        text: string;
    };
    type IncomingPayloadMessageData = IncomingTextMessageData & {
        payload: string;
    };
    type IncomingLocationMessageData = {
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    type IncomingAttachmentMessageData = {
        type: FileType;
        url: string;
    } | {
        type: string;
        size: number;
        name: string;
        file: Buffer;
    };
    type IncomingMessageData = IncomingTextMessageData | IncomingPayloadMessageData | IncomingLocationMessageData | IncomingAttachmentMessageData;
    type StatusDeliveryEvent = {
        type: StatusEventType.delivery;
        mid: string;
    };
    type StatusReadEvent = {
        type: StatusEventType.read;
        watermark: number;
    };
    type StatusTypingEvent = {
        type: StatusEventType.typing;
    };
    type StatusEvent = StatusDeliveryEvent | StatusReadEvent | StatusTypingEvent;
    type IncomingTextMessage = {
        type: IncomingMessageType.text;
        data: IncomingTextMessageData;
    };
    type IncomingPayloadMessage = {
        type: IncomingMessageType.postback | IncomingMessageType.quick_reply;
        data: IncomingPayloadMessageData;
    };
    type IncomingLocationMessage = {
        type: IncomingMessageType.location;
        data: IncomingLocationMessageData;
    };
    type IncomingAttachmentMessage = {
        type: IncomingMessageType.file;
        data: IncomingAttachmentMessageData;
    };
    type IncomingMessageBase = IncomingTextMessage | IncomingPayloadMessage | IncomingLocationMessage | IncomingAttachmentMessage;
    type IncomingMessage<T = IncomingTextMessage | IncomingPayloadMessage | IncomingLocationMessage | IncomingAttachmentMessage> = T & {
        mid?: string;
        author?: string;
        read?: boolean;
        delivery?: boolean;
        sync?: boolean;
        createdAt?: Date;
    };
    type Event = IncomingMessage | StatusEvent;
    interface MessageElement {
        title: string;
        subtitle?: string;
        image_url?: string;
        default_action?: Omit<WebUrlButton, 'title'>;
        buttons?: Button[];
    }
    type OutgoingTextMessageData = {
        text: string;
    };
    type OutgoingQuickRepliesMessageData = OutgoingTextMessageData & {
        quick_replies: StdQuickReply[];
    };
    type OutgoingButtonsMessageData = OutgoingTextMessageData & {
        buttons: Button[];
    };
    type OutgoingFileMessageData = {
        quick_replies?: StdQuickReply[];
        type: FileType;
        url: string;
    };
    type OutgoingCarouselMessageData = {
        elements: MessageElement[];
    };
    type OutgoingListMessageData = OutgoingCarouselMessageData & {
        top_element_style?: 'large' | 'compact';
        buttons: Button[];
    };
    type OutgoingMessageData = OutgoingTextMessageData | OutgoingQuickRepliesMessageData | OutgoingButtonsMessageData | OutgoingFileMessageData | OutgoingCarouselMessageData | OutgoingListMessageData;
    type OutgoingMessageBase = {
        type: OutgoingMessageType.text;
        data: OutgoingTextMessageData;
    } | {
        type: OutgoingMessageType.quick_replies;
        data: OutgoingQuickRepliesMessageData;
    } | {
        type: OutgoingMessageType.buttons;
        data: OutgoingButtonsMessageData;
    } | {
        type: OutgoingMessageType.file;
        data: OutgoingFileMessageData;
    } | {
        type: OutgoingMessageType.carousel;
        data: OutgoingCarouselMessageData;
    } | {
        type: OutgoingMessageType.list;
        data: OutgoingListMessageData;
    };
    type OutgoingMessage = OutgoingMessageBase & {
        mid: string;
        author: string;
        read?: boolean;
        createdAt: Date;
        handover: boolean;
    };
    type Message = OutgoingMessage | IncomingMessage;
}
