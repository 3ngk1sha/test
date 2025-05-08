import { AttachmentService } from '@/attachment/services/attachment.service';
import { BaseService } from '@/utils/generics/base-service';
import { SocketRequest } from '@/websocket/utils/socket-request';
import { SocketResponse } from '@/websocket/utils/socket-response';
import { WebsocketGateway } from '@/websocket/websocket.gateway';
import { SubscriberDto, SubscriberUpdateDto } from '../dto/subscriber.dto';
import { SubscriberRepository } from '../repositories/subscriber.repository';
import { Label } from '../schemas/label.schema';
import { Subscriber, SubscriberFull, SubscriberPopulate } from '../schemas/subscriber.schema';
export declare class SubscriberService extends BaseService<Subscriber, SubscriberPopulate, SubscriberFull, SubscriberDto> {
    readonly repository: SubscriberRepository;
    protected attachmentService: AttachmentService;
    private readonly gateway;
    constructor(repository: SubscriberRepository, attachmentService: AttachmentService, gateway?: WebsocketGateway);
    subscribe(req: SocketRequest, res: SocketResponse): Partial<import("../../websocket/pipes/io-message.pipe").IOOutgoingMessage>;
    findOneByForeignId(id: string): Promise<Subscriber | null>;
    findOneByForeignIdAndPopulate(id: string): Promise<SubscriberFull>;
    updateOneByForeignId(id: string, updates: SubscriberUpdateDto): Promise<Subscriber>;
    handBackByForeignId(foreignId: string): Promise<Subscriber>;
    handOverByForeignId(foreignId: string, userId: string): Promise<Subscriber>;
    applyUpdates(profile: Subscriber, labels: string[], assignTo: string | null): Promise<Subscriber>;
    handleLastVisit(subscriber: Subscriber): Promise<void>;
    handleLabelDelete(labels: Label[]): Promise<void>;
}
