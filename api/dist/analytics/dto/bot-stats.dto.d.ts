import { BotStatsType } from '../schemas/bot-stats.schema';
export declare class BotStatsCreateDto {
    type: BotStatsType;
    day: Date;
    value: number;
    name: string;
}
export declare class BotStatsFindDto {
    from?: Date;
    to?: Date;
}
export declare class BotStatsFindDatumDto extends BotStatsFindDto {
    type: BotStatsType;
}
