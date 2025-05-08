import { Subscriber } from '@/chat/schemas/subscriber.schema';
import { BaseService } from '@/utils/generics/base-service';
import { BotStatsRepository } from '../repositories/bot-stats.repository';
import { BotStats, BotStatsType } from '../schemas/bot-stats.schema';
export declare class BotStatsService extends BaseService<BotStats> {
    readonly repository: BotStatsRepository;
    constructor(repository: BotStatsRepository);
    findMessages(from: Date, to: Date, types: BotStatsType[]): Promise<BotStats[]>;
    findPopularBlocks(from: Date, to: Date): Promise<{
        id: string;
        value: number;
    }[]>;
    handleLastVisit(subscriber: Subscriber): void;
    handleStatEntry(type: BotStatsType, name: string, _subscriber: Subscriber): Promise<void>;
}
