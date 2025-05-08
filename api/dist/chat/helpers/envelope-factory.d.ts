import { I18nService } from '@/i18n/services/i18n.service';
import { AttachmentPayload } from '../schemas/types/attachment';
import { Button, ButtonType } from '../schemas/types/button';
import { Context } from '../schemas/types/context';
import { ContentElement, ContentPagination, OutgoingMessageFormat, StdOutgoingAttachmentEnvelope, StdOutgoingButtonsEnvelope, StdOutgoingListEnvelope, StdOutgoingQuickRepliesEnvelope, StdOutgoingSystemEnvelope, StdOutgoingTextEnvelope } from '../schemas/types/message';
import { ContentOptions } from '../schemas/types/options';
import { StdQuickReply } from '../schemas/types/quick-reply';
export declare class EnvelopeFactory {
    protected readonly context: Context;
    protected readonly settings: Settings;
    protected readonly i18n: I18nService;
    constructor(context: Context, settings: Settings, i18n: I18nService);
    static toHandlebars(str: string): string;
    static compileHandlebarsTemplate(text: string, context: Context, settings: Settings): string;
    processText(text: string | string[]): string;
    getBuilder<F extends OutgoingMessageFormat>(format: F): import("./envelope-builder").IEnvelopeBuilder<F extends OutgoingMessageFormat.text ? {
        format: OutgoingMessageFormat.text;
        message: {
            text: string;
        };
    } : F extends OutgoingMessageFormat.quickReplies ? {
        format: OutgoingMessageFormat.quickReplies;
        message: {
            text: string;
            quickReplies: {
                title: string;
                payload: string;
                content_type: import("../schemas/types/quick-reply").QuickReplyType;
            }[];
        };
    } : F extends OutgoingMessageFormat.buttons ? {
        format: OutgoingMessageFormat.buttons;
        message: {
            text: string;
            buttons: ({
                type: ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
        };
    } : F extends OutgoingMessageFormat.attachment ? {
        format: OutgoingMessageFormat.attachment;
        message: {
            attachment: {
                type: import("../schemas/types/attachment").FileType;
                payload: {
                    id: string | null;
                } | {
                    url: string;
                };
            };
            quickReplies?: {
                title: string;
                payload: string;
                content_type: import("../schemas/types/quick-reply").QuickReplyType;
            }[] | undefined;
        };
    } : F extends OutgoingMessageFormat.carousel ? {
        format: "list" | "carousel";
        message: {
            options: {
                limit: number;
                fields: {
                    title: string;
                    subtitle: string | null;
                    image_url: string | null;
                    url?: string | undefined;
                    action_title?: string | undefined;
                    action_payload?: string | undefined;
                };
                display: "list" | "carousel";
                buttons: ({
                    type: ButtonType.postback;
                    title: string;
                    payload: string;
                } | {
                    type: ButtonType.web_url;
                    url: string;
                    title: string;
                    messenger_extensions?: boolean | undefined;
                    webview_height_ratio?: "compact" | "tall" | "full" | undefined;
                })[];
                query?: any;
                entity?: string | number | undefined;
                top_element_style?: "compact" | "large" | undefined;
            };
            elements: import("zod").objectOutputType<{
                id: import("zod").ZodString;
                title: import("zod").ZodString;
            }, import("zod").ZodAny, "strip">[];
            pagination: {
                skip: number;
                limit: number;
                total: number;
            };
        };
    } : F extends OutgoingMessageFormat.list ? {
        format: "list" | "carousel";
        message: {
            options: {
                limit: number;
                fields: {
                    title: string;
                    subtitle: string | null;
                    image_url: string | null;
                    url?: string | undefined;
                    action_title?: string | undefined;
                    action_payload?: string | undefined;
                };
                display: "list" | "carousel";
                buttons: ({
                    type: ButtonType.postback;
                    title: string;
                    payload: string;
                } | {
                    type: ButtonType.web_url;
                    url: string;
                    title: string;
                    messenger_extensions?: boolean | undefined;
                    webview_height_ratio?: "compact" | "tall" | "full" | undefined;
                })[];
                query?: any;
                entity?: string | number | undefined;
                top_element_style?: "compact" | "large" | undefined;
            };
            elements: import("zod").objectOutputType<{
                id: import("zod").ZodString;
                title: import("zod").ZodString;
            }, import("zod").ZodAny, "strip">[];
            pagination: {
                skip: number;
                limit: number;
                total: number;
            };
        };
    } : F extends OutgoingMessageFormat.system ? {
        format: OutgoingMessageFormat.system;
        message: {
            data?: any;
            outcome?: string | undefined;
        };
    } : {
        format: OutgoingMessageFormat.text;
        message: {
            text: string;
        };
    } | {
        format: OutgoingMessageFormat.quickReplies;
        message: {
            text: string;
            quickReplies: {
                title: string;
                payload: string;
                content_type: import("../schemas/types/quick-reply").QuickReplyType;
            }[];
        };
    } | {
        format: OutgoingMessageFormat.buttons;
        message: {
            text: string;
            buttons: ({
                type: ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
        };
    } | {
        format: "list" | "carousel";
        message: {
            options: {
                limit: number;
                fields: {
                    title: string;
                    subtitle: string | null;
                    image_url: string | null;
                    url?: string | undefined;
                    action_title?: string | undefined;
                    action_payload?: string | undefined;
                };
                display: "list" | "carousel";
                buttons: ({
                    type: ButtonType.postback;
                    title: string;
                    payload: string;
                } | {
                    type: ButtonType.web_url;
                    url: string;
                    title: string;
                    messenger_extensions?: boolean | undefined;
                    webview_height_ratio?: "compact" | "tall" | "full" | undefined;
                })[];
                query?: any;
                entity?: string | number | undefined;
                top_element_style?: "compact" | "large" | undefined;
            };
            elements: import("zod").objectOutputType<{
                id: import("zod").ZodString;
                title: import("zod").ZodString;
            }, import("zod").ZodAny, "strip">[];
            pagination: {
                skip: number;
                limit: number;
                total: number;
            };
        };
    } | {
        format: OutgoingMessageFormat.attachment;
        message: {
            attachment: {
                type: import("../schemas/types/attachment").FileType;
                payload: {
                    id: string | null;
                } | {
                    url: string;
                };
            };
            quickReplies?: {
                title: string;
                payload: string;
                content_type: import("../schemas/types/quick-reply").QuickReplyType;
            }[] | undefined;
        };
    }>;
    buildTextEnvelope(text: string | string[]): StdOutgoingTextEnvelope;
    buildQuickRepliesEnvelope(text: string | string[], quickReplies: StdQuickReply[]): StdOutgoingQuickRepliesEnvelope;
    buildButtonsEnvelope(text: string | string[], buttons: Button[]): StdOutgoingButtonsEnvelope;
    buildAttachmentEnvelope(attachment: AttachmentPayload, quickReplies?: StdQuickReply[]): StdOutgoingAttachmentEnvelope;
    buildListEnvelope(format: OutgoingMessageFormat.carousel | OutgoingMessageFormat.list, options: ContentOptions, elements: ContentElement[], pagination: ContentPagination): StdOutgoingListEnvelope;
    buildSystemEnvelope(outcome: string | undefined, data?: unknown): StdOutgoingSystemEnvelope;
}
