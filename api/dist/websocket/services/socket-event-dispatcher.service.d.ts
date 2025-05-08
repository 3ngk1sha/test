import { OnModuleInit } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SocketRequest } from '../utils/socket-request';
import { SocketResponse } from '../utils/socket-response';
export type SocketMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | string;
export declare class SocketEventDispatcherService implements OnModuleInit {
    private readonly eventEmitter;
    private readonly modulesContainer;
    private routeHandlers;
    constructor(eventEmitter: EventEmitter2, modulesContainer: ModulesContainer);
    handleEvent(socketMethod: SocketMethod, path: string, req: SocketRequest, res: SocketResponse): Promise<any>;
    onModuleInit(): void;
    private handleException;
}
