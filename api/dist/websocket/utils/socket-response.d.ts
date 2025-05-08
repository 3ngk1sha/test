import { IOOutgoingMessage } from '../pipes/io-message.pipe';
export declare class SocketResponse {
    private statusCode;
    private headers;
    private sendResponseHeaders;
    private sendStatusCode;
    private promise;
    private resolve;
    private reject;
    constructor(sendResponseHeaders?: boolean, sendStatusCode?: boolean);
    private init;
    status(code: number): SocketResponse;
    set(key: string, value: any): SocketResponse;
    setHeaders(headers: {
        [key: string]: any;
    }): SocketResponse;
    send(body: any): Partial<IOOutgoingMessage>;
    json(data: any): Partial<IOOutgoingMessage>;
    getPromise(): Promise<any>;
}
