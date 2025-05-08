import { z } from 'zod';
export declare enum ButtonType {
    postback = "postback",
    web_url = "web_url"
}
declare const postBackButtonSchema: z.ZodObject<{
    type: z.ZodLiteral<ButtonType.postback>;
    title: z.ZodString;
    payload: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: ButtonType.postback;
    title: string;
    payload: string;
}, {
    type: ButtonType.postback;
    title: string;
    payload: string;
}>;
declare const webUrlButtonSchema: z.ZodObject<{
    type: z.ZodLiteral<ButtonType.web_url>;
    title: z.ZodString;
    url: z.ZodString;
    messenger_extensions: z.ZodOptional<z.ZodBoolean>;
    webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
}, "strip", z.ZodTypeAny, {
    type: ButtonType.web_url;
    url: string;
    title: string;
    messenger_extensions?: boolean | undefined;
    webview_height_ratio?: "compact" | "tall" | "full" | undefined;
}, {
    type: ButtonType.web_url;
    url: string;
    title: string;
    messenger_extensions?: boolean | undefined;
    webview_height_ratio?: "compact" | "tall" | "full" | undefined;
}>;
export declare const buttonSchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<ButtonType.postback>;
    title: z.ZodString;
    payload: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: ButtonType.postback;
    title: string;
    payload: string;
}, {
    type: ButtonType.postback;
    title: string;
    payload: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<ButtonType.web_url>;
    title: z.ZodString;
    url: z.ZodString;
    messenger_extensions: z.ZodOptional<z.ZodBoolean>;
    webview_height_ratio: z.ZodOptional<z.ZodEnum<["compact", "tall", "full"]>>;
}, "strip", z.ZodTypeAny, {
    type: ButtonType.web_url;
    url: string;
    title: string;
    messenger_extensions?: boolean | undefined;
    webview_height_ratio?: "compact" | "tall" | "full" | undefined;
}, {
    type: ButtonType.web_url;
    url: string;
    title: string;
    messenger_extensions?: boolean | undefined;
    webview_height_ratio?: "compact" | "tall" | "full" | undefined;
}>]>;
export type PostBackButton = z.infer<typeof postBackButtonSchema>;
export type WebUrlButton = z.infer<typeof webUrlButtonSchema>;
export type Button = z.infer<typeof buttonSchema>;
export declare enum PayloadType {
    location = "location",
    attachments = "attachments",
    quick_reply = "quick_reply",
    button = "button",
    outcome = "outcome",
    menu = "menu",
    content = "content"
}
export {};
