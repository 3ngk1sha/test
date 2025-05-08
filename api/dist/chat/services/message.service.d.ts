/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Document, Query } from 'mongoose';
import { Attachment } from '@/attachment/schemas/attachment.schema';
import { AttachmentService } from '@/attachment/services/attachment.service';
import { DeleteResult } from '@/utils/generics/base-repository';
import { BaseService } from '@/utils/generics/base-service';
import { TFilterQuery } from '@/utils/types/filter.types';
import { SocketRequest } from '@/websocket/utils/socket-request';
import { SocketResponse } from '@/websocket/utils/socket-response';
import { WebsocketGateway } from '@/websocket/websocket.gateway';
import { MessageRepository } from '../repositories/message.repository';
import { MessageFull, MessagePopulate } from '../schemas/message.schema';
import { Subscriber } from '../schemas/subscriber.schema';
import { AnyMessage } from '../schemas/types/message';
export declare class MessageService extends BaseService<AnyMessage, MessagePopulate, MessageFull> {
    private readonly messageRepository;
    private attachmentService;
    private readonly gateway;
    constructor(messageRepository: MessageRepository, attachmentService: AttachmentService, gateway?: WebsocketGateway);
    subscribe(req: SocketRequest, res: SocketResponse): Partial<import("../../websocket/pipes/io-message.pipe").IOOutgoingMessage>;
    findHistoryUntilDate(subscriber: Subscriber, until?: Date, limit?: number): Promise<AnyMessage[]>;
    findHistorySinceDate(subscriber: Subscriber, since?: Date, limit?: number): Promise<AnyMessage[]>;
    findLastMessages(subscriber: Subscriber, limit?: number): Promise<AnyMessage[]>;
    handleDeleteImage(_query: Query<DeleteResult, Document<Attachment, any, any>, unknown, Attachment, 'deleteOne' | 'deleteMany'>, criteria: TFilterQuery<Attachment>): Promise<void>;
}
