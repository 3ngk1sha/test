import { ModelDefinition } from '@nestjs/mongoose';
import { Attachment } from '@/attachment/schemas/attachment.schema';
import { ChannelName } from '@/channel/types';
import { User } from '@/user/schemas/user.schema';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { Label } from './label.schema';
import { SubscriberChannelData } from './types/channel';
import { SubscriberContext } from './types/subscriberContext';
export declare class SubscriberStub extends BaseSchema {
    first_name: string;
    last_name: string;
    locale: string;
    timezone?: number;
    language: string;
    gender: string;
    country: string;
    foreign_id: string;
    labels: unknown;
    assignedTo: unknown;
    assignedAt: Date | null;
    lastvisit?: Date;
    retainedFrom?: Date;
    channel: SubscriberChannelData;
    avatar: unknown;
    context: SubscriberContext;
    static getChannelData<C extends ChannelName, S extends SubscriberStub = Subscriber>(subscriber: S): SubscriberChannelData<C>;
}
export declare class Subscriber extends SubscriberStub {
    labels: string[];
    assignedTo: string | null;
    avatar: string | null;
}
export declare class SubscriberFull extends SubscriberStub {
    labels: Label[];
    assignedTo: User | null;
    avatar: Attachment | null;
}
export type SubscriberDocument = THydratedDocument<Subscriber>;
export declare const SubscriberModel: ModelDefinition;
declare const _default: any;
export default _default;
export type SubscriberPopulate = keyof TFilterPopulateFields<Subscriber, SubscriberStub>;
export declare const SUBSCRIBER_POPULATE: SubscriberPopulate[];
