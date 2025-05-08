import { ChannelName } from '@/channel/types';
import { NLU } from '@/helper/types';
import { Subscriber } from '../subscriber.schema';
import { Payload } from './quick-reply';
export interface Context {
    channel?: ChannelName;
    text?: string;
    payload?: Payload | string;
    nlp?: NLU.ParseEntities | null;
    vars: {
        [key: string]: any;
    };
    user_location: {
        address?: Record<string, string>;
        lat: number;
        lon: number;
    };
    user: Subscriber;
    skip: Record<string, number>;
    attempt: number;
}
export interface TemplateContext {
    context: Context;
    contact: Settings['contact'];
}
