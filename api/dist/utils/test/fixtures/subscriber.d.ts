import { SubscriberCreateDto } from '@/chat/dto/subscriber.dto';
import { Subscriber } from '@/chat/schemas/subscriber.schema';
import { FixturesTypeBuilder } from '../types';
type TSubscriberFixtures = FixturesTypeBuilder<Subscriber, SubscriberCreateDto>;
export declare const subscriberDefaultValues: TSubscriberFixtures['defaultValues'];
export declare const subscriberFixtures: import("../types").TFixtures<import("../types").OptionalProperties<Subscriber, "createdAt" | "context" | "lastvisit" | "avatar" | "timezone" | "assignedTo" | "locale" | "gender" | "country" | "foreign_id" | "assignedAt" | "retainedFrom">>[];
export declare const installSubscriberFixtures: () => Promise<{
    labels: any[];
    subscribers: any[];
    users: any[];
}>;
export {};
