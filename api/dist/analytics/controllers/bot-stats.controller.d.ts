import { BotStatsFindDatumDto, BotStatsFindDto } from '../dto/bot-stats.dto';
import { BotStatsService } from '../services/bot-stats.service';
import { ToLinesType } from './../schemas/bot-stats.schema';
export declare class BotStatsController {
    private readonly botStatsService;
    constructor(botStatsService: BotStatsService);
    findMessages(dto: BotStatsFindDto): Promise<ToLinesType[]>;
    datum(dto: BotStatsFindDatumDto): Promise<ToLinesType[]>;
    conversation(dto: BotStatsFindDto): Promise<ToLinesType[]>;
    audiance(dto: BotStatsFindDto): Promise<ToLinesType[]>;
    popularBlocks(dto: BotStatsFindDto): Promise<{
        id: string;
        name: string;
        value: number;
    }[]>;
}
