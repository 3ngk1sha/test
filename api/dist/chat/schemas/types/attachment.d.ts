import { z } from 'zod';
export declare enum FileType {
    image = "image",
    video = "video",
    audio = "audio",
    file = "file",
    unknown = "unknown"
}
export declare const fileTypeSchema: z.ZodNativeEnum<typeof FileType>;
export declare const attachmentRefSchema: z.ZodUnion<[z.ZodObject<{
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
export type AttachmentRef = z.infer<typeof attachmentRefSchema>;
export declare const attachmentPayloadSchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof FileType>;
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
    type: FileType;
    payload: {
        id: string | null;
    } | {
        url: string;
    };
}, {
    type: FileType;
    payload: {
        id: string | null;
    } | {
        url: string;
    };
}>;
export type AttachmentPayload = z.infer<typeof attachmentPayloadSchema>;
export type WithUrl<A> = A & {
    url?: string;
};
