import { z } from 'zod';
import { ChannelName } from '@/channel/types';
export type SubscriberChannelData<C extends ChannelName = 'unknown-channel'> = C extends 'unknown-channel' ? {
    name: ChannelName;
} : {
    name: C;
} & {
    [P in keyof SubscriberChannelDict[C]]: SubscriberChannelDict[C][P];
};
export declare const channelDataSchema: z.ZodObject<{
    name: z.ZodType<`${string}-channel`, z.ZodTypeDef, `${string}-channel`>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodType<`${string}-channel`, z.ZodTypeDef, `${string}-channel`>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodType<`${string}-channel`, z.ZodTypeDef, `${string}-channel`>;
}, z.ZodTypeAny, "passthrough">>;
export type Channel = z.infer<typeof channelDataSchema>;
