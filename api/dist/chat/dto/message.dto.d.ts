import { StdIncomingMessage, StdOutgoingMessage } from '../schemas/types/message';
export declare class MessageCreateDto {
    mid?: string;
    inReplyTo?: string;
    sender?: string;
    recipient?: string;
    sentBy?: string;
    message: StdOutgoingMessage | StdIncomingMessage;
    read?: boolean;
    delivery?: boolean;
    handover?: boolean;
}
declare const MessageUpdateDto_base: import("@nestjs/common").Type<Partial<MessageCreateDto>>;
export declare class MessageUpdateDto extends MessageUpdateDto_base {
}
export {};
