import { SessionData } from 'express-session';
import { Socket } from 'socket.io';
import { SubscriberStub } from '@/chat/schemas/subscriber.schema';
import { User } from '@/user/schemas/user.schema';
import { IOIncomingMessage } from '../pipes/io-message.pipe';
export declare class SocketRequest {
    transport: string;
    protocol: string;
    isSocket: boolean;
    ip: string;
    ips: string[];
    port: number | null;
    socket: Socket;
    url: string;
    path: string;
    query: Record<string, any>;
    method: string;
    body: Record<string, any>;
    headers: {
        host?: string;
        cookie?: string;
        nosession?: boolean;
        origin?: string;
        ['user-agent']?: string;
        [key: string]: string | boolean | undefined;
    };
    sessionID: string;
    private _session;
    get session(): SessionData<SubscriberStub>;
    set session(data: SessionData<SubscriberStub>);
    user: User;
    constructor(socket: Socket, method: string, incomingMessage: IOIncomingMessage);
}
