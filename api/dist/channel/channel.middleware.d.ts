import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ChannelService } from './channel.service';
export declare class ChannelMiddleware implements NestMiddleware {
    private readonly channelService;
    constructor(channelService: ChannelService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
