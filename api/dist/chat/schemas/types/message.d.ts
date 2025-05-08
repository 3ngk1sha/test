import { z } from 'zod';
import { Message } from '../message.schema';
import { PayloadType } from './button';
import { QuickReplyType } from './quick-reply';
export declare enum StdEventType {
    message = "message",
    delivery = "delivery",
    read = "read",
    typing = "typing",
    follow = "follow",
    echo = "echo",
    unknown = ""
}
export declare enum IncomingMessageType {
    message = "message",
    postback = "postback",
    quick_reply = "quick_reply",
    location = "location",
    attachments = "attachments",
    unknown = ""
}
export declare const incomingMessageType: z.ZodNativeEnum<typeof IncomingMessageType>;
export type IncomingMessageTypeLiteral = z.infer<typeof incomingMessageType>;
export declare enum OutgoingMessageFormat {
    text = "text",
    quickReplies = "quickReplies",
    buttons = "buttons",
    attachment = "attachment",
    list = "list",
    carousel = "carousel",
    system = "system"
}
export declare const outgoingMessageFormatSchema: z.ZodNativeEnum<typeof OutgoingMessageFormat>;
export type OutgoingMessageFormatLiteral = z.infer<typeof outgoingMessageFormatSchema>;
export declare enum FileType {
    image = "image",
    video = "video",
    audio = "audio",
    file = "file",
    unknown = "unknown"
}
export declare const fileTypeSchema: z.ZodNativeEnum<typeof FileType>;
export type FileTypeLiteral = z.infer<typeof fileTypeSchema>;
export declare const payloadTypeSchema: z.ZodNativeEnum<typeof PayloadType>;
export type PayloadTypeLiteral = z.infer<typeof payloadTypeSchema>;
export declare const stdOutgoingTextMessageSchema: z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>;
export type StdOutgoingTextMessage = z.infer<typeof stdOutgoingTextMessageSchema>;
export declare const stdOutgoingQuickRepliesMessageSchema: z.ZodObject<{
    text: z.ZodString;
    quickReplies: z.ZodArray<z.ZodObject<{
        content_type: z.ZodNativeEnum<typeof QuickReplyType>;
        title: z.ZodString;
        payload: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    text: string;
    quickReplies: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[];
}, {
    text: string;
    quickReplies: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[];
}>;
export type StdOutgoingQuickRepliesMessage = z.infer<typeof stdOutgoingQuickRepliesMessageSchema>;
export declare const stdOutgoingButtonsMessageSchema: z.ZodObject<{
    text: z.ZodString;
    buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<import("./button").ButtonType.postback>;
        title: z.ZodString;
        payload: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    }, {
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("./button").ButtonType.web_url>;
        title: z.ZodString;
        url: z.ZodString;
        messenger_extensions: z.ZodOptional<z.ZodBoolean>;
        webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
    }, "strip", z.ZodTypeAny, {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    }, {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    text: string;
    buttons: ({
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    } | {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    })[];
}, {
    text: string;
    buttons: ({
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    } | {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    })[];
}>;
export type StdOutgoingButtonsMessage = z.infer<typeof stdOutgoingButtonsMessageSchema>;
export declare const contentElementSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
}, "strip", z.ZodAny, z.objectOutputType<{
    id: z.ZodString;
    title: z.ZodString;
}, z.ZodAny, "strip">, z.objectInputType<{
    id: z.ZodString;
    title: z.ZodString;
}, z.ZodAny, "strip">>;
export type ContentElement = z.infer<typeof contentElementSchema>;
export declare const contentPaginationSchema: z.ZodObject<{
    total: z.ZodNumber;
    skip: z.ZodNumber;
    limit: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    skip: number;
    limit: number;
    total: number;
}, {
    skip: number;
    limit: number;
    total: number;
}>;
export type ContentPagination = z.infer<typeof contentPaginationSchema>;
export declare const stdOutgoingListMessageSchema: z.ZodObject<{
    options: z.ZodObject<{
        display: z.ZodEnum<["list", "carousel"]>;
        fields: z.ZodObject<{
            title: z.ZodString;
            subtitle: z.ZodNullable<z.ZodString>;
            image_url: z.ZodNullable<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            action_title: z.ZodOptional<z.ZodString>;
            action_payload: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            subtitle: string | null;
            image_url: string | null;
            url?: string | undefined;
            action_title?: string | undefined;
            action_payload?: string | undefined;
        }, {
            title: string;
            subtitle: string | null;
            image_url: string | null;
            url?: string | undefined;
            action_title?: string | undefined;
            action_payload?: string | undefined;
        }>;
        buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.postback>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.web_url>;
            title: z.ZodString;
            url: z.ZodString;
            messenger_extensions: z.ZodOptional<z.ZodBoolean>;
            webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }>]>, "many">;
        limit: z.ZodNumber;
        query: z.ZodOptional<z.ZodAny>;
        entity: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        top_element_style: z.ZodOptional<z.ZodEnum<["large", "compact"]>>;
    }, "strip", z.ZodTypeAny, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    }, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    }>;
    elements: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
    }, "strip", z.ZodAny, z.objectOutputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">, z.objectInputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">>, "many">;
    pagination: z.ZodObject<{
        total: z.ZodNumber;
        skip: z.ZodNumber;
        limit: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        skip: number;
        limit: number;
        total: number;
    }, {
        skip: number;
        limit: number;
        total: number;
    }>;
}, "strip", z.ZodTypeAny, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    };
    elements: z.objectOutputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">[];
    pagination: {
        skip: number;
        limit: number;
        total: number;
    };
}, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    };
    elements: z.objectInputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">[];
    pagination: {
        skip: number;
        limit: number;
        total: number;
    };
}>;
export type StdOutgoingListMessage = z.infer<typeof stdOutgoingListMessageSchema>;
export declare const stdOutgoingAttachmentMessageSchema: z.ZodObject<{
    attachment: z.ZodObject<{
        type: z.ZodNativeEnum<typeof import("./attachment").FileType>;
        payload: z.ZodUnion<[z.ZodObject<{
            id: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string | null;
        }, {
            id: string | null;
        }>, z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }>;
    quickReplies: z.ZodOptional<z.ZodArray<z.ZodObject<{
        content_type: z.ZodNativeEnum<typeof QuickReplyType>;
        title: z.ZodString;
        payload: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    };
    quickReplies?: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[] | undefined;
}, {
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    };
    quickReplies?: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[] | undefined;
}>;
export type StdOutgoingAttachmentMessage = z.infer<typeof stdOutgoingAttachmentMessageSchema>;
export declare const stdOutgoingSystemMessageSchema: z.ZodObject<{
    outcome: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    data?: any;
    outcome?: string | undefined;
}, {
    data?: any;
    outcome?: string | undefined;
}>;
export type StdOutgoingSystemMessage = z.infer<typeof stdOutgoingSystemMessageSchema>;
export declare const pluginNameSchema: z.ZodType<`${string}-plugin`, z.ZodTypeDef, `${string}-plugin`>;
export declare const stdPluginMessageSchema: z.ZodObject<{
    plugin: z.ZodType<`${string}-plugin`, z.ZodTypeDef, `${string}-plugin`>;
    args: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    plugin: `${string}-plugin`;
    args: Record<string, any>;
}, {
    plugin: `${string}-plugin`;
    args: Record<string, any>;
}>;
export type StdPluginMessage = z.infer<typeof stdPluginMessageSchema>;
export declare const blockMessageSchema: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>, z.ZodObject<{
    text: z.ZodString;
    quickReplies: z.ZodArray<z.ZodObject<{
        content_type: z.ZodNativeEnum<typeof QuickReplyType>;
        title: z.ZodString;
        payload: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    text: string;
    quickReplies: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[];
}, {
    text: string;
    quickReplies: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[];
}>, z.ZodObject<{
    text: z.ZodString;
    buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<import("./button").ButtonType.postback>;
        title: z.ZodString;
        payload: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    }, {
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("./button").ButtonType.web_url>;
        title: z.ZodString;
        url: z.ZodString;
        messenger_extensions: z.ZodOptional<z.ZodBoolean>;
        webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
    }, "strip", z.ZodTypeAny, {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    }, {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    text: string;
    buttons: ({
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    } | {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    })[];
}, {
    text: string;
    buttons: ({
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    } | {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    })[];
}>, z.ZodObject<{
    options: z.ZodObject<{
        display: z.ZodEnum<["list", "carousel"]>;
        fields: z.ZodObject<{
            title: z.ZodString;
            subtitle: z.ZodNullable<z.ZodString>;
            image_url: z.ZodNullable<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            action_title: z.ZodOptional<z.ZodString>;
            action_payload: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            subtitle: string | null;
            image_url: string | null;
            url?: string | undefined;
            action_title?: string | undefined;
            action_payload?: string | undefined;
        }, {
            title: string;
            subtitle: string | null;
            image_url: string | null;
            url?: string | undefined;
            action_title?: string | undefined;
            action_payload?: string | undefined;
        }>;
        buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.postback>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.web_url>;
            title: z.ZodString;
            url: z.ZodString;
            messenger_extensions: z.ZodOptional<z.ZodBoolean>;
            webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }>]>, "many">;
        limit: z.ZodNumber;
        query: z.ZodOptional<z.ZodAny>;
        entity: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        top_element_style: z.ZodOptional<z.ZodEnum<["large", "compact"]>>;
    }, "strip", z.ZodTypeAny, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    }, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    }>;
    elements: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
    }, "strip", z.ZodAny, z.objectOutputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">, z.objectInputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">>, "many">;
    pagination: z.ZodObject<{
        total: z.ZodNumber;
        skip: z.ZodNumber;
        limit: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        skip: number;
        limit: number;
        total: number;
    }, {
        skip: number;
        limit: number;
        total: number;
    }>;
}, "strip", z.ZodTypeAny, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    };
    elements: z.objectOutputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">[];
    pagination: {
        skip: number;
        limit: number;
        total: number;
    };
}, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    };
    elements: z.objectInputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">[];
    pagination: {
        skip: number;
        limit: number;
        total: number;
    };
}>, z.ZodObject<{
    attachment: z.ZodObject<{
        type: z.ZodNativeEnum<typeof import("./attachment").FileType>;
        payload: z.ZodUnion<[z.ZodObject<{
            id: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string | null;
        }, {
            id: string | null;
        }>, z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }>;
    quickReplies: z.ZodOptional<z.ZodArray<z.ZodObject<{
        content_type: z.ZodNativeEnum<typeof QuickReplyType>;
        title: z.ZodString;
        payload: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    };
    quickReplies?: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[] | undefined;
}, {
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    };
    quickReplies?: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[] | undefined;
}>, z.ZodObject<{
    plugin: z.ZodType<`${string}-plugin`, z.ZodTypeDef, `${string}-plugin`>;
    args: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    plugin: `${string}-plugin`;
    args: Record<string, any>;
}, {
    plugin: `${string}-plugin`;
    args: Record<string, any>;
}>]>;
export type BlockMessage = z.infer<typeof blockMessageSchema>;
export declare const StdOutgoingMessageSchema: z.ZodUnion<[z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>, z.ZodObject<{
    text: z.ZodString;
    quickReplies: z.ZodArray<z.ZodObject<{
        content_type: z.ZodNativeEnum<typeof QuickReplyType>;
        title: z.ZodString;
        payload: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    text: string;
    quickReplies: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[];
}, {
    text: string;
    quickReplies: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[];
}>, z.ZodObject<{
    text: z.ZodString;
    buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<import("./button").ButtonType.postback>;
        title: z.ZodString;
        payload: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    }, {
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("./button").ButtonType.web_url>;
        title: z.ZodString;
        url: z.ZodString;
        messenger_extensions: z.ZodOptional<z.ZodBoolean>;
        webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
    }, "strip", z.ZodTypeAny, {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    }, {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    text: string;
    buttons: ({
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    } | {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    })[];
}, {
    text: string;
    buttons: ({
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    } | {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    })[];
}>, z.ZodObject<{
    options: z.ZodObject<{
        display: z.ZodEnum<["list", "carousel"]>;
        fields: z.ZodObject<{
            title: z.ZodString;
            subtitle: z.ZodNullable<z.ZodString>;
            image_url: z.ZodNullable<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            action_title: z.ZodOptional<z.ZodString>;
            action_payload: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            subtitle: string | null;
            image_url: string | null;
            url?: string | undefined;
            action_title?: string | undefined;
            action_payload?: string | undefined;
        }, {
            title: string;
            subtitle: string | null;
            image_url: string | null;
            url?: string | undefined;
            action_title?: string | undefined;
            action_payload?: string | undefined;
        }>;
        buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.postback>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.web_url>;
            title: z.ZodString;
            url: z.ZodString;
            messenger_extensions: z.ZodOptional<z.ZodBoolean>;
            webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }>]>, "many">;
        limit: z.ZodNumber;
        query: z.ZodOptional<z.ZodAny>;
        entity: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        top_element_style: z.ZodOptional<z.ZodEnum<["large", "compact"]>>;
    }, "strip", z.ZodTypeAny, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    }, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    }>;
    elements: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
    }, "strip", z.ZodAny, z.objectOutputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">, z.objectInputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">>, "many">;
    pagination: z.ZodObject<{
        total: z.ZodNumber;
        skip: z.ZodNumber;
        limit: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        skip: number;
        limit: number;
        total: number;
    }, {
        skip: number;
        limit: number;
        total: number;
    }>;
}, "strip", z.ZodTypeAny, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    };
    elements: z.objectOutputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">[];
    pagination: {
        skip: number;
        limit: number;
        total: number;
    };
}, {
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
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
        query?: any;
        entity?: string | number | undefined;
        top_element_style?: "compact" | "large" | undefined;
    };
    elements: z.objectInputType<{
        id: z.ZodString;
        title: z.ZodString;
    }, z.ZodAny, "strip">[];
    pagination: {
        skip: number;
        limit: number;
        total: number;
    };
}>, z.ZodObject<{
    attachment: z.ZodObject<{
        type: z.ZodNativeEnum<typeof import("./attachment").FileType>;
        payload: z.ZodUnion<[z.ZodObject<{
            id: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string | null;
        }, {
            id: string | null;
        }>, z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }>;
    quickReplies: z.ZodOptional<z.ZodArray<z.ZodObject<{
        content_type: z.ZodNativeEnum<typeof QuickReplyType>;
        title: z.ZodString;
        payload: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }, {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    };
    quickReplies?: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[] | undefined;
}, {
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    };
    quickReplies?: {
        title: string;
        payload: string;
        content_type: QuickReplyType;
    }[] | undefined;
}>]>;
export type StdOutgoingMessage = z.infer<typeof StdOutgoingMessageSchema>;
export declare const stdIncomingTextMessageSchema: z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>;
export type StdIncomingTextMessage = z.infer<typeof stdIncomingTextMessageSchema>;
export declare const stdIncomingPostBackMessageSchema: z.ZodObject<z.objectUtil.extendShape<{
    text: z.ZodString;
}, {
    postback: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    text: string;
    postback: string;
}, {
    text: string;
    postback: string;
}>;
export type StdIncomingPostBackMessage = z.infer<typeof stdIncomingPostBackMessageSchema>;
export declare const stdIncomingLocationMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<PayloadType.location>;
    coordinates: z.ZodObject<{
        lat: z.ZodNumber;
        lon: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        lat: number;
        lon: number;
    }, {
        lat: number;
        lon: number;
    }>;
}, "strip", z.ZodTypeAny, {
    type: PayloadType.location;
    coordinates: {
        lat: number;
        lon: number;
    };
}, {
    type: PayloadType.location;
    coordinates: {
        lat: number;
        lon: number;
    };
}>;
export type StdIncomingLocationMessage = z.infer<typeof stdIncomingLocationMessageSchema>;
export declare const stdIncomingAttachmentMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<PayloadType.attachments>;
    serialized_text: z.ZodString;
    attachment: z.ZodUnion<[z.ZodObject<{
        type: z.ZodNativeEnum<typeof import("./attachment").FileType>;
        payload: z.ZodUnion<[z.ZodObject<{
            id: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string | null;
        }, {
            id: string | null;
        }>, z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }>, z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof import("./attachment").FileType>;
        payload: z.ZodUnion<[z.ZodObject<{
            id: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string | null;
        }, {
            id: string | null;
        }>, z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }>, "many">]>;
}, "strip", z.ZodTypeAny, {
    type: PayloadType.attachments;
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    } | {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }[];
    serialized_text: string;
}, {
    type: PayloadType.attachments;
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    } | {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }[];
    serialized_text: string;
}>;
export type StdIncomingAttachmentMessage = z.infer<typeof stdIncomingAttachmentMessageSchema>;
export declare const stdIncomingMessageSchema: z.ZodUnion<[z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>, z.ZodObject<z.objectUtil.extendShape<{
    text: z.ZodString;
}, {
    postback: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    text: string;
    postback: string;
}, {
    text: string;
    postback: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<PayloadType.location>;
    coordinates: z.ZodObject<{
        lat: z.ZodNumber;
        lon: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        lat: number;
        lon: number;
    }, {
        lat: number;
        lon: number;
    }>;
}, "strip", z.ZodTypeAny, {
    type: PayloadType.location;
    coordinates: {
        lat: number;
        lon: number;
    };
}, {
    type: PayloadType.location;
    coordinates: {
        lat: number;
        lon: number;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<PayloadType.attachments>;
    serialized_text: z.ZodString;
    attachment: z.ZodUnion<[z.ZodObject<{
        type: z.ZodNativeEnum<typeof import("./attachment").FileType>;
        payload: z.ZodUnion<[z.ZodObject<{
            id: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string | null;
        }, {
            id: string | null;
        }>, z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }>, z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof import("./attachment").FileType>;
        payload: z.ZodUnion<[z.ZodObject<{
            id: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string | null;
        }, {
            id: string | null;
        }>, z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }, {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }>, "many">]>;
}, "strip", z.ZodTypeAny, {
    type: PayloadType.attachments;
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    } | {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }[];
    serialized_text: string;
}, {
    type: PayloadType.attachments;
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    } | {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    }[];
    serialized_text: string;
}>]>;
export type StdIncomingMessage = z.infer<typeof stdIncomingMessageSchema>;
export interface IncomingMessage extends Omit<Message, 'recipient' | 'sentBy'> {
    message: StdIncomingMessage;
    sender: string;
}
export interface OutgoingMessage extends Omit<Message, 'sender'> {
    message: StdOutgoingMessage;
    recipient: string;
    sentBy?: string;
    handover?: boolean;
}
export type AnyMessage = IncomingMessage | OutgoingMessage;
export declare const stdOutgoingTextEnvelopeSchema: z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.text>;
    message: z.ZodObject<{
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
    }, {
        text: string;
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.text;
    message: {
        text: string;
    };
}, {
    format: OutgoingMessageFormat.text;
    message: {
        text: string;
    };
}>;
export type StdOutgoingTextEnvelope = z.infer<typeof stdOutgoingTextEnvelopeSchema>;
export declare const stdOutgoingQuickRepliesEnvelopeSchema: z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.quickReplies>;
    message: z.ZodObject<{
        text: z.ZodString;
        quickReplies: z.ZodArray<z.ZodObject<{
            content_type: z.ZodNativeEnum<typeof QuickReplyType>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    }, {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.quickReplies;
    message: {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    };
}, {
    format: OutgoingMessageFormat.quickReplies;
    message: {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    };
}>;
export type StdOutgoingQuickRepliesEnvelope = z.infer<typeof stdOutgoingQuickRepliesEnvelopeSchema>;
export declare const stdOutgoingButtonsEnvelopeSchema: z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.buttons>;
    message: z.ZodObject<{
        text: z.ZodString;
        buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.postback>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.web_url>;
            title: z.ZodString;
            url: z.ZodString;
            messenger_extensions: z.ZodOptional<z.ZodBoolean>;
            webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    }, {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.buttons;
    message: {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    };
}, {
    format: OutgoingMessageFormat.buttons;
    message: {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    };
}>;
export type StdOutgoingButtonsEnvelope = z.infer<typeof stdOutgoingButtonsEnvelopeSchema>;
export declare const stdOutgoingListEnvelopeSchema: z.ZodObject<{
    format: z.ZodEnum<["list", "carousel"]>;
    message: z.ZodObject<{
        options: z.ZodObject<{
            display: z.ZodEnum<["list", "carousel"]>;
            fields: z.ZodObject<{
                title: z.ZodString;
                subtitle: z.ZodNullable<z.ZodString>;
                image_url: z.ZodNullable<z.ZodString>;
                url: z.ZodOptional<z.ZodString>;
                action_title: z.ZodOptional<z.ZodString>;
                action_payload: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                title: string;
                subtitle: string | null;
                image_url: string | null;
                url?: string | undefined;
                action_title?: string | undefined;
                action_payload?: string | undefined;
            }, {
                title: string;
                subtitle: string | null;
                image_url: string | null;
                url?: string | undefined;
                action_title?: string | undefined;
                action_payload?: string | undefined;
            }>;
            buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                type: z.ZodLiteral<import("./button").ButtonType.postback>;
                title: z.ZodString;
                payload: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            }, {
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<import("./button").ButtonType.web_url>;
                title: z.ZodString;
                url: z.ZodString;
                messenger_extensions: z.ZodOptional<z.ZodBoolean>;
                webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
            }, "strip", z.ZodTypeAny, {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            }, {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            }>]>, "many">;
            limit: z.ZodNumber;
            query: z.ZodOptional<z.ZodAny>;
            entity: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            top_element_style: z.ZodOptional<z.ZodEnum<["large", "compact"]>>;
        }, "strip", z.ZodTypeAny, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        }, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        }>;
        elements: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
        }, "strip", z.ZodAny, z.objectOutputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">, z.objectInputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">>, "many">;
        pagination: z.ZodObject<{
            total: z.ZodNumber;
            skip: z.ZodNumber;
            limit: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            skip: number;
            limit: number;
            total: number;
        }, {
            skip: number;
            limit: number;
            total: number;
        }>;
    }, "strip", z.ZodTypeAny, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectOutputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    }, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectInputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectOutputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    };
}, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectInputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    };
}>;
export type StdOutgoingListEnvelope = z.infer<typeof stdOutgoingListEnvelopeSchema>;
export declare const stdOutgoingAttachmentEnvelopeSchema: z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.attachment>;
    message: z.ZodObject<{
        attachment: z.ZodObject<{
            type: z.ZodNativeEnum<typeof import("./attachment").FileType>;
            payload: z.ZodUnion<[z.ZodObject<{
                id: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string | null;
            }, {
                id: string | null;
            }>, z.ZodObject<{
                url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
            }, {
                url: string;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        }, {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        }>;
        quickReplies: z.ZodOptional<z.ZodArray<z.ZodObject<{
            content_type: z.ZodNativeEnum<typeof QuickReplyType>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    }, {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.attachment;
    message: {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    };
}, {
    format: OutgoingMessageFormat.attachment;
    message: {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    };
}>;
export type StdOutgoingAttachmentEnvelope = z.infer<typeof stdOutgoingAttachmentEnvelopeSchema>;
export declare const stdOutgoingSystemEnvelopeSchema: z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.system>;
    message: z.ZodObject<{
        outcome: z.ZodOptional<z.ZodString>;
        data: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        outcome?: string | undefined;
    }, {
        data?: any;
        outcome?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.system;
    message: {
        data?: any;
        outcome?: string | undefined;
    };
}, {
    format: OutgoingMessageFormat.system;
    message: {
        data?: any;
        outcome?: string | undefined;
    };
}>;
export type StdOutgoingSystemEnvelope = z.infer<typeof stdOutgoingSystemEnvelopeSchema>;
export declare const stdOutgoingMessageEnvelopeSchema: z.ZodUnion<[z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.text>;
    message: z.ZodObject<{
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
    }, {
        text: string;
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.text;
    message: {
        text: string;
    };
}, {
    format: OutgoingMessageFormat.text;
    message: {
        text: string;
    };
}>, z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.quickReplies>;
    message: z.ZodObject<{
        text: z.ZodString;
        quickReplies: z.ZodArray<z.ZodObject<{
            content_type: z.ZodNativeEnum<typeof QuickReplyType>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    }, {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.quickReplies;
    message: {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    };
}, {
    format: OutgoingMessageFormat.quickReplies;
    message: {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    };
}>, z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.buttons>;
    message: z.ZodObject<{
        text: z.ZodString;
        buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.postback>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.web_url>;
            title: z.ZodString;
            url: z.ZodString;
            messenger_extensions: z.ZodOptional<z.ZodBoolean>;
            webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    }, {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.buttons;
    message: {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    };
}, {
    format: OutgoingMessageFormat.buttons;
    message: {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    };
}>, z.ZodObject<{
    format: z.ZodEnum<["list", "carousel"]>;
    message: z.ZodObject<{
        options: z.ZodObject<{
            display: z.ZodEnum<["list", "carousel"]>;
            fields: z.ZodObject<{
                title: z.ZodString;
                subtitle: z.ZodNullable<z.ZodString>;
                image_url: z.ZodNullable<z.ZodString>;
                url: z.ZodOptional<z.ZodString>;
                action_title: z.ZodOptional<z.ZodString>;
                action_payload: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                title: string;
                subtitle: string | null;
                image_url: string | null;
                url?: string | undefined;
                action_title?: string | undefined;
                action_payload?: string | undefined;
            }, {
                title: string;
                subtitle: string | null;
                image_url: string | null;
                url?: string | undefined;
                action_title?: string | undefined;
                action_payload?: string | undefined;
            }>;
            buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                type: z.ZodLiteral<import("./button").ButtonType.postback>;
                title: z.ZodString;
                payload: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            }, {
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<import("./button").ButtonType.web_url>;
                title: z.ZodString;
                url: z.ZodString;
                messenger_extensions: z.ZodOptional<z.ZodBoolean>;
                webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
            }, "strip", z.ZodTypeAny, {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            }, {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            }>]>, "many">;
            limit: z.ZodNumber;
            query: z.ZodOptional<z.ZodAny>;
            entity: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            top_element_style: z.ZodOptional<z.ZodEnum<["large", "compact"]>>;
        }, "strip", z.ZodTypeAny, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        }, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        }>;
        elements: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
        }, "strip", z.ZodAny, z.objectOutputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">, z.objectInputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">>, "many">;
        pagination: z.ZodObject<{
            total: z.ZodNumber;
            skip: z.ZodNumber;
            limit: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            skip: number;
            limit: number;
            total: number;
        }, {
            skip: number;
            limit: number;
            total: number;
        }>;
    }, "strip", z.ZodTypeAny, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectOutputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    }, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectInputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectOutputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    };
}, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectInputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    };
}>, z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.attachment>;
    message: z.ZodObject<{
        attachment: z.ZodObject<{
            type: z.ZodNativeEnum<typeof import("./attachment").FileType>;
            payload: z.ZodUnion<[z.ZodObject<{
                id: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string | null;
            }, {
                id: string | null;
            }>, z.ZodObject<{
                url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
            }, {
                url: string;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        }, {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        }>;
        quickReplies: z.ZodOptional<z.ZodArray<z.ZodObject<{
            content_type: z.ZodNativeEnum<typeof QuickReplyType>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    }, {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.attachment;
    message: {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    };
}, {
    format: OutgoingMessageFormat.attachment;
    message: {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    };
}>]>;
export type StdOutgoingMessageEnvelope = z.infer<typeof stdOutgoingMessageEnvelopeSchema>;
export declare const stdOutgoingEnvelopeSchema: z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.text>;
    message: z.ZodObject<{
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
    }, {
        text: string;
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.text;
    message: {
        text: string;
    };
}, {
    format: OutgoingMessageFormat.text;
    message: {
        text: string;
    };
}>, z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.quickReplies>;
    message: z.ZodObject<{
        text: z.ZodString;
        quickReplies: z.ZodArray<z.ZodObject<{
            content_type: z.ZodNativeEnum<typeof QuickReplyType>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    }, {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.quickReplies;
    message: {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    };
}, {
    format: OutgoingMessageFormat.quickReplies;
    message: {
        text: string;
        quickReplies: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[];
    };
}>, z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.buttons>;
    message: z.ZodObject<{
        text: z.ZodString;
        buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.postback>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }, {
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<import("./button").ButtonType.web_url>;
            title: z.ZodString;
            url: z.ZodString;
            messenger_extensions: z.ZodOptional<z.ZodBoolean>;
            webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
        }, "strip", z.ZodTypeAny, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }, {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    }, {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.buttons;
    message: {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    };
}, {
    format: OutgoingMessageFormat.buttons;
    message: {
        text: string;
        buttons: ({
            type: import("./button").ButtonType.postback;
            title: string;
            payload: string;
        } | {
            type: import("./button").ButtonType.web_url;
            url: string;
            title: string;
            messenger_extensions?: boolean | undefined;
            webview_height_ratio?: "compact" | "tall" | "full" | undefined;
        })[];
    };
}>, z.ZodObject<{
    format: z.ZodEnum<["list", "carousel"]>;
    message: z.ZodObject<{
        options: z.ZodObject<{
            display: z.ZodEnum<["list", "carousel"]>;
            fields: z.ZodObject<{
                title: z.ZodString;
                subtitle: z.ZodNullable<z.ZodString>;
                image_url: z.ZodNullable<z.ZodString>;
                url: z.ZodOptional<z.ZodString>;
                action_title: z.ZodOptional<z.ZodString>;
                action_payload: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                title: string;
                subtitle: string | null;
                image_url: string | null;
                url?: string | undefined;
                action_title?: string | undefined;
                action_payload?: string | undefined;
            }, {
                title: string;
                subtitle: string | null;
                image_url: string | null;
                url?: string | undefined;
                action_title?: string | undefined;
                action_payload?: string | undefined;
            }>;
            buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                type: z.ZodLiteral<import("./button").ButtonType.postback>;
                title: z.ZodString;
                payload: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            }, {
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<import("./button").ButtonType.web_url>;
                title: z.ZodString;
                url: z.ZodString;
                messenger_extensions: z.ZodOptional<z.ZodBoolean>;
                webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
            }, "strip", z.ZodTypeAny, {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            }, {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            }>]>, "many">;
            limit: z.ZodNumber;
            query: z.ZodOptional<z.ZodAny>;
            entity: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            top_element_style: z.ZodOptional<z.ZodEnum<["large", "compact"]>>;
        }, "strip", z.ZodTypeAny, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        }, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        }>;
        elements: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
        }, "strip", z.ZodAny, z.objectOutputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">, z.objectInputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">>, "many">;
        pagination: z.ZodObject<{
            total: z.ZodNumber;
            skip: z.ZodNumber;
            limit: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            skip: number;
            limit: number;
            total: number;
        }, {
            skip: number;
            limit: number;
            total: number;
        }>;
    }, "strip", z.ZodTypeAny, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectOutputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    }, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectInputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectOutputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    };
}, {
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
                type: import("./button").ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: import("./button").ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        };
        elements: z.objectInputType<{
            id: z.ZodString;
            title: z.ZodString;
        }, z.ZodAny, "strip">[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
        };
    };
}>, z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.attachment>;
    message: z.ZodObject<{
        attachment: z.ZodObject<{
            type: z.ZodNativeEnum<typeof import("./attachment").FileType>;
            payload: z.ZodUnion<[z.ZodObject<{
                id: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string | null;
            }, {
                id: string | null;
            }>, z.ZodObject<{
                url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
            }, {
                url: string;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        }, {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        }>;
        quickReplies: z.ZodOptional<z.ZodArray<z.ZodObject<{
            content_type: z.ZodNativeEnum<typeof QuickReplyType>;
            title: z.ZodString;
            payload: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }, {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    }, {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.attachment;
    message: {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    };
}, {
    format: OutgoingMessageFormat.attachment;
    message: {
        attachment: {
            type: import("./attachment").FileType;
            payload: {
                id: string | null;
            } | {
                url: string;
            };
        };
        quickReplies?: {
            title: string;
            payload: string;
            content_type: QuickReplyType;
        }[] | undefined;
    };
}>]>, z.ZodObject<{
    format: z.ZodLiteral<OutgoingMessageFormat.system>;
    message: z.ZodObject<{
        outcome: z.ZodOptional<z.ZodString>;
        data: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        outcome?: string | undefined;
    }, {
        data?: any;
        outcome?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    format: OutgoingMessageFormat.system;
    message: {
        data?: any;
        outcome?: string | undefined;
    };
}, {
    format: OutgoingMessageFormat.system;
    message: {
        data?: any;
        outcome?: string | undefined;
    };
}>]>;
export type StdOutgoingEnvelope = z.infer<typeof stdOutgoingEnvelopeSchema>;
export declare const validMessageTextSchema: z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>;
export declare const textSchema: z.ZodArray<z.ZodString, "many">;
export declare const pluginBlockMessageSchema: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>;
export declare const blockMessageObjectSchema: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>, z.ZodString, z.ZodObject<{
    text: z.ZodString;
    buttons: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<import("./button").ButtonType.postback>;
        title: z.ZodString;
        payload: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    }, {
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("./button").ButtonType.web_url>;
        title: z.ZodString;
        url: z.ZodString;
        messenger_extensions: z.ZodOptional<z.ZodBoolean>;
        webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
    }, "strip", z.ZodTypeAny, {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    }, {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    text: string;
    buttons: ({
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    } | {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    })[];
}, {
    text: string;
    buttons: ({
        type: import("./button").ButtonType.postback;
        title: string;
        payload: string;
    } | {
        type: import("./button").ButtonType.web_url;
        url: string;
        title: string;
        messenger_extensions?: boolean | undefined;
        webview_height_ratio?: "compact" | "tall" | "full" | undefined;
    })[];
}>, z.ZodObject<{
    text: z.ZodString;
    quickReplies: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodObject<{
        content_type: z.ZodNativeEnum<typeof QuickReplyType>;
        title: z.ZodOptional<z.ZodString>;
        payload: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        content_type: QuickReplyType;
        title?: string | undefined;
        payload?: string | undefined;
    }, {
        content_type: QuickReplyType;
        title?: string | undefined;
        payload?: string | undefined;
    }>, {
        content_type: QuickReplyType;
        title?: string | undefined;
        payload?: string | undefined;
    }, {
        content_type: QuickReplyType;
        title?: string | undefined;
        payload?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    text: string;
    quickReplies?: {
        content_type: QuickReplyType;
        title?: string | undefined;
        payload?: string | undefined;
    }[] | undefined;
}, {
    text: string;
    quickReplies?: {
        content_type: QuickReplyType;
        title?: string | undefined;
        payload?: string | undefined;
    }[] | undefined;
}>, z.ZodObject<{
    elements: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    elements: boolean;
}, {
    elements: boolean;
}>, z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    attachment: z.ZodObject<{
        type: z.ZodNativeEnum<typeof FileType>;
        payload: z.ZodUnion<[z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>, z.ZodObject<{
            id: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string | null;
        }, {
            id: string | null;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: FileType;
        payload: {
            url: string;
        } | {
            id: string | null;
        };
    }, {
        type: FileType;
        payload: {
            url: string;
        } | {
            id: string | null;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    attachment: {
        type: FileType;
        payload: {
            url: string;
        } | {
            id: string | null;
        };
    };
    text?: string | undefined;
}, {
    attachment: {
        type: FileType;
        payload: {
            url: string;
        } | {
            id: string | null;
        };
    };
    text?: string | undefined;
}>]>;
