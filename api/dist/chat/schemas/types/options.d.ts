import { z } from 'zod';
export declare const contentOptionsSchema: z.ZodObject<{
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
export type ContentOptions = z.infer<typeof contentOptionsSchema>;
export declare const BlockOptionsSchema: z.ZodObject<{
    typing: z.ZodOptional<z.ZodNumber>;
    content: z.ZodOptional<z.ZodObject<{
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
    }>>;
    fallback: z.ZodOptional<z.ZodObject<{
        active: z.ZodBoolean;
        message: z.ZodArray<z.ZodString, "many">;
        max_attempts: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        message: string[];
        active: boolean;
        max_attempts: number;
    }, {
        message: string[];
        active: boolean;
        max_attempts: number;
    }>>;
    assignTo: z.ZodOptional<z.ZodString>;
    effects: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    content?: {
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
    } | undefined;
    typing?: number | undefined;
    fallback?: {
        message: string[];
        active: boolean;
        max_attempts: number;
    } | undefined;
    assignTo?: string | undefined;
    effects?: string[] | undefined;
}, {
    content?: {
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
    } | undefined;
    typing?: number | undefined;
    fallback?: {
        message: string[];
        active: boolean;
        max_attempts: number;
    } | undefined;
    assignTo?: string | undefined;
    effects?: string[] | undefined;
}>;
export type BlockOptions = z.infer<typeof BlockOptionsSchema>;
