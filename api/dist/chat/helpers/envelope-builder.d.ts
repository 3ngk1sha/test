import { z } from 'zod';
import { OutgoingMessageFormat, StdOutgoingAttachmentEnvelope, StdOutgoingButtonsEnvelope, StdOutgoingEnvelope, StdOutgoingListEnvelope, StdOutgoingMessageEnvelope, StdOutgoingQuickRepliesEnvelope, StdOutgoingSystemEnvelope, StdOutgoingTextEnvelope } from '../schemas/types/message';
type ArrayKeys<T> = {
    [K in keyof T]: NonNullable<T[K]> extends Array<any> ? K : never;
}[keyof T];
export type IEnvelopeBuilder<T extends StdOutgoingEnvelope> = {
    [K in keyof T['message'] as `set${Capitalize<string & K>}`]-?: (arg: T['message'][K]) => IEnvelopeBuilder<T>;
} & {
    [K in keyof T['message'] as `get${Capitalize<string & K>}`]-?: () => T['message'][K];
} & {
    [K in ArrayKeys<T['message']> as `appendTo${Capitalize<string & K>}`]: (item: NonNullable<T['message'][K]> extends (infer U)[] ? U : never) => IEnvelopeBuilder<T>;
} & {
    build(): T;
};
export declare function EnvelopeBuilder<T extends StdOutgoingEnvelope>(format: T['format'], template: Partial<T["message"]> | undefined, schema: z.ZodSchema): IEnvelopeBuilder<T>;
type EnvelopeTypeByFormat<F extends OutgoingMessageFormat> = F extends OutgoingMessageFormat.text ? StdOutgoingTextEnvelope : F extends OutgoingMessageFormat.quickReplies ? StdOutgoingQuickRepliesEnvelope : F extends OutgoingMessageFormat.buttons ? StdOutgoingButtonsEnvelope : F extends OutgoingMessageFormat.attachment ? StdOutgoingAttachmentEnvelope : F extends OutgoingMessageFormat.carousel ? StdOutgoingListEnvelope : F extends OutgoingMessageFormat.list ? StdOutgoingListEnvelope : F extends OutgoingMessageFormat.system ? StdOutgoingSystemEnvelope : StdOutgoingMessageEnvelope;
export declare const getEnvelopeBuilder: <F extends OutgoingMessageFormat>(format: F) => IEnvelopeBuilder<EnvelopeTypeByFormat<F>>;
export {};
