import { z } from 'zod';
import { PayloadType } from './button';
export declare const payloadPatternSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodString;
    type: z.ZodOptional<z.ZodNativeEnum<typeof PayloadType>>;
}, "strip", z.ZodTypeAny, {
    value: string;
    label: string;
    type?: PayloadType | undefined;
}, {
    value: string;
    label: string;
    type?: PayloadType | undefined;
}>;
export type PayloadPattern = z.infer<typeof payloadPatternSchema>;
export declare const nlpPatternSchema: z.ZodDiscriminatedUnion<"match", [z.ZodObject<{
    entity: z.ZodString;
    match: z.ZodLiteral<"entity">;
}, "strip", z.ZodTypeAny, {
    match: "entity";
    entity: string;
}, {
    match: "entity";
    entity: string;
}>, z.ZodObject<{
    entity: z.ZodString;
    match: z.ZodLiteral<"value">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    match: "value";
    value: string;
    entity: string;
}, {
    match: "value";
    value: string;
    entity: string;
}>]>;
export type NlpPattern = z.infer<typeof nlpPatternSchema>;
export declare const stringRegexPatternSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const patternSchema: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodObject<{
    label: z.ZodString;
    value: z.ZodString;
    type: z.ZodOptional<z.ZodNativeEnum<typeof PayloadType>>;
}, "strip", z.ZodTypeAny, {
    value: string;
    label: string;
    type?: PayloadType | undefined;
}, {
    value: string;
    label: string;
    type?: PayloadType | undefined;
}>, z.ZodArray<z.ZodDiscriminatedUnion<"match", [z.ZodObject<{
    entity: z.ZodString;
    match: z.ZodLiteral<"entity">;
}, "strip", z.ZodTypeAny, {
    match: "entity";
    entity: string;
}, {
    match: "entity";
    entity: string;
}>, z.ZodObject<{
    entity: z.ZodString;
    match: z.ZodLiteral<"value">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    match: "value";
    value: string;
    entity: string;
}, {
    match: "value";
    value: string;
    entity: string;
}>]>, "many">]>;
export type Pattern = z.infer<typeof patternSchema>;
