import { z } from 'zod';
export declare const captureVarSchema: z.ZodObject<{
    entity: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    context_var: z.ZodString;
}, "strip", z.ZodTypeAny, {
    entity: string | number;
    context_var: string;
}, {
    entity: string | number;
    context_var: string;
}>;
export type CaptureVar = z.infer<typeof captureVarSchema>;
