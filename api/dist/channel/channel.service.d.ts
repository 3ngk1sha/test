import { Request, Response } from 'express';
import { SubscriberService } from '@/chat/services/subscriber.service';
import { LoggerService } from '@/logger/logger.service';
import { SocketRequest } from '@/websocket/utils/socket-request';
import { SocketResponse } from '@/websocket/utils/socket-response';
import ChannelHandler from './lib/Handler';
import { ChannelName } from './types';
export declare class ChannelService {
    private readonly logger;
    private readonly subscriberService;
    private registry;
    constructor(logger: LoggerService, subscriberService: SubscriberService);
    setChannel<T extends ChannelName, C extends ChannelHandler<T>>(name: T, channel: C): void;
    getAll(): ChannelHandler<`${string}-channel`>[];
    findChannel(name: ChannelName): ChannelHandler<`${string}-channel`> | undefined;
    getChannelHandler<T extends ChannelName, C extends ChannelHandler<T>>(name: T): C;
    handle(channel: string, req: Request, res: Response): Promise<void>;
    download(channel: string, token: string, req: Request): Promise<import("@nestjs/common").StreamableFile>;
    handleWebsocketForWebChannel(req: SocketRequest, res: SocketResponse): any;
    handleWebsocketForAdminChatConsole(req: SocketRequest, res: SocketResponse): Promise<any>;
}
