import { Request, Response } from 'express';
import { LoggerService } from '@/logger/logger.service';
import { ChannelService } from './channel.service';
export declare class WebhookController {
    private readonly channelService;
    private readonly logger;
    constructor(channelService: ChannelService, logger: LoggerService);
    handleDownload(channel: string, name: string, token: string, req: Request): Promise<import("@nestjs/common").StreamableFile>;
    handleGet(channel: string, req: Request, res: Response): Promise<any>;
    handlePost(channel: string, req: Request, res: Response): Promise<void>;
    handleNotFound(res: Response): Promise<Response<any, Record<string, any>>>;
}
