import { z } from 'zod';
export declare const subscriberContextSchema: z.ZodObject<{
    vars: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    vars?: Record<string, any> | undefined;
}, {
    vars?: Record<string, any> | undefined;
}>;
export type SubscriberContext = z.infer<typeof subscriberContextSchema>;
