import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { THydratedDocument } from '@/utils/types/filter.types';
export declare enum BotStatsType {
    outgoing = "outgoing",
    new_users = "new_users",
    all_messages = "all_messages",
    incoming = "incoming",
    existing_conversations = "existing_conversations",
    popular = "popular",
    new_conversations = "new_conversations",
    returning_users = "returning_users",
    retention = "retention"
}
export type ToLinesType = {
    id: number;
    name: BotStatsType;
    values: any[];
};
export declare class BotStats extends BaseSchema {
    type: BotStatsType;
    day: Date;
    value: number;
    name: string;
    static toLines(stats: BotStats[], types: BotStatsType[]): ToLinesType[];
    static toBars(stats: {
        id: string;
        value: number;
    }[]): {
        id: string;
        name: string;
        value: number;
    }[];
}
export type BotStatsDocument = THydratedDocument<BotStats>;
export declare const BotStatsModel: ModelDefinition;
declare const _default: any;
export default _default;
