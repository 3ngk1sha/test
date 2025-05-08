import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export interface IOOutgoingMessage {
    statusCode: number;
    body: any;
    headers: Record<string, string>;
}
export interface IOIncomingMessage {
    method: string;
    headers: Record<string, string>;
    data: Record<string, any>;
    params: Record<string, any>;
    url: string;
}
export declare class IOMessagePipe implements PipeTransform<string, IOIncomingMessage> {
    transform(value: string, _metadata: ArgumentMetadata): IOIncomingMessage;
}
