import { Button, WebUrlButton } from '@/chat/schemas/types/button';
import { StdQuickReply } from '@/chat/schemas/types/quick-reply';
export declare namespace Messenger {
    enum SettingLabel {
        app_secret = "app_secret",
        access_token = "access_token",
        verify_token = "verify_token",
        get_started_button = "get_started_button",
        composer_input_disabled = "composer_input_disabled",
        greeting_text = "greeting_text",
        page_id = "page_id",
        app_id = "app_id",
        user_fields = "user_fields"
    }
    enum AttachmentType {
        audio = "audio",
        file = "file",
        image = "image",
        video = "video",
        location = "location",
        fallback = "fallback"
    }
    interface Attachment {
        type: AttachmentType;
        payload: {
            url?: string;
            title?: string;
            sticker_id?: string;
            coordinates?: {
                lat: number;
                long: number;
            };
        };
    }
    interface MessagingEvent {
        sender: {
            id: string;
        };
        recipient: {
            id: string;
        };
        timestamp: number;
    }
    type IncomingMessageBase = {
        mid: string;
        reply_to?: {
            mid: string;
        };
        nlp?: {
            entities: any;
        };
        is_echo?: boolean;
    };
    interface IncomingPostback {
        postback: {
            title: string;
            payload: string;
            referral?: {
                ref: string;
                source: string;
                type: string;
                referer_uri: string;
            };
        };
    }
    type IncomingTextMessage = {
        text: string;
    };
    type IncomingQuickReplyMessage = IncomingTextMessage & {
        quick_reply: {
            payload: string;
        };
    };
    type IncomingAttachmentMessage = {
        attachments: Attachment[];
    };
    type IncomingAnyMessage<M = IncomingTextMessage | IncomingQuickReplyMessage | IncomingAttachmentMessage> = {
        message: IncomingMessageBase & M;
    };
    type IncomingMessage<T = IncomingPostback | IncomingAnyMessage> = MessagingEvent & T;
    interface MessageReadEvent extends MessagingEvent {
        read: {
            watermark: number;
        };
    }
    interface MessageDeliveryEvent extends MessagingEvent {
        delivery: {
            mids: string[];
            watermark: string;
        };
    }
    type Event = MessageReadEvent | MessageDeliveryEvent | IncomingMessage;
    interface GreetingText {
        locale: string;
        text: string;
    }
    enum TopElementStyle {
        large = "large",
        compact = "compact"
    }
    interface MessageElement {
        title: string;
        subtitle?: string;
        image_url?: string;
        default_action?: Omit<WebUrlButton, 'title'>;
        buttons?: Button[];
    }
    enum ImageAspectRatio {
        horizontal = "horizontal",
        square = "square"
    }
    enum TemplateType {
        button = "button",
        template = "template",
        generic = "generic",
        list = "list"
    }
    interface TemplateButtons {
        template_type: TemplateType.button;
        text: string;
        buttons: Button[];
    }
    interface TemplateGeneric {
        template_type: TemplateType.generic | TemplateType.list;
        elements: MessageElement[];
        buttons?: Button[];
        image_aspect_ratio?: ImageAspectRatio;
        top_element_style?: TopElementStyle;
    }
    interface TemplateContent {
        type: TemplateType.template;
        payload: TemplateButtons | TemplateGeneric;
    }
    interface TemplateFile {
        type: AttachmentType;
        payload: {
            url: string;
            is_reusable: boolean;
        };
    }
    interface OutgoingMessageBase {
        text?: string;
        quick_replies?: StdQuickReply[];
        attachment?: TemplateContent | TemplateFile;
    }
    type Recipient = {
        id: string;
    };
    interface OutgoingMessage {
        recipient: Recipient;
        message: OutgoingMessageBase;
    }
    enum ActionType {
        mark_seen = "mark_seen",
        typing_on = "typing_on",
        typing_off = "typing_off"
    }
    interface Action {
        recipient: Recipient;
        sender_action: ActionType;
    }
    interface Label {
        name?: string;
        user?: string;
    }
    type Profile = {
        fields?: string | string[];
    } | {
        greeting?: GreetingText[];
    } | {
        get_started?: {
            payload: string;
        };
    } | {
        persistent_menu?: Array<{
            locale: string;
            composer_input_disabled: boolean;
            call_to_actions: any;
        }>;
    };
    type RequestBody = OutgoingMessage | Profile | Label | Action | string | BroadcastMessage | {
        messages: OutgoingMessageBase[];
    };
    type Message = OutgoingMessage | IncomingMessage;
    enum MessageTag {
        'COMMUNITY_ALERT' = 0,
        'CONFIRMED_EVENT_REMINDER' = 1,
        'NON_PROMOTIONAL_SUBSCRIPTION' = 2,
        'PAIRING_UPDATE' = 3,
        'APPLICATION_UPDATE' = 4,
        'ACCOUNT_UPDATE' = 5,
        'PAYMENT_UPDATE' = 6,
        'PERSONAL_FINANCE_UPDATE' = 7,
        'SHIPPING_UPDATE' = 8,
        'RESERVATION_UPDATE' = 9,
        'ISSUE_RESOLUTION' = 10,
        'APPOINTMENT_UPDATE' = 11,
        'GAME_EVENT' = 12,
        'TRANSPORTATION_UPDATE' = 13,
        'FEATURE_FUNCTIONALITY_UPDATE' = 14,
        'TICKET_UPDATE' = 15
    }
    enum NotificationType {
        'REGULAR' = 0,
        'SILENT_PUSH' = 1,
        'NO_PUSH' = 2
    }
    interface BroadcastMessage {
        message_creative_id: string;
        notification_type: NotificationType;
        tag: MessageTag;
        custom_label_id?: string;
    }
    type UserData = {
        id: string;
        first_name: string;
        last_name: string;
        profile_pic: string;
        locale: string;
        timezone: number;
        gender: string;
    };
}
