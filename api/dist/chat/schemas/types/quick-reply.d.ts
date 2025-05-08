import { z } from 'zod';
import { PayloadType } from './button';
export declare enum QuickReplyType {
    text = "text",
    location = "location",
    user_phone_number = "user_phone_number",
    user_email = "user_email"
}
export declare const cordinatesSchema: z.ZodObject<{
    lat: z.ZodNumber;
    lon: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    lat: number;
    lon: number;
}, {
    lat: number;
    lon: number;
}>;
export declare const payloadSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    type: PayloadType.attachments;
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    };
}, {
    type: PayloadType.attachments;
    attachment: {
        type: import("./attachment").FileType;
        payload: {
            id: string | null;
        } | {
            url: string;
        };
    };
}>]>;
export declare const stdQuickReplySchema: z.ZodObject<{
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
}>;
export type Payload = z.infer<typeof payloadSchema>;
export type StdQuickReply = z.infer<typeof stdQuickReplySchema>;
