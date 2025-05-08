import { StreamableFile } from '@nestjs/common';
import { AttachmentService } from '@/attachment/services/attachment.service';
import { BaseController } from '@/utils/generics/base-controller';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { SubscriberUpdateDto } from '../dto/subscriber.dto';
import { Subscriber, SubscriberFull, SubscriberPopulate, SubscriberStub } from '../schemas/subscriber.schema';
import { SubscriberService } from '../services/subscriber.service';
export declare class SubscriberController extends BaseController<Subscriber, SubscriberStub, SubscriberPopulate, SubscriberFull> {
    private readonly subscriberService;
    private readonly attachmentService;
    constructor(subscriberService: SubscriberService, attachmentService: AttachmentService);
    findPage(pageQuery: PageQueryDto<Subscriber>, populate: string[], filters: TFilterQuery<Subscriber>): Promise<Subscriber[] | SubscriberFull[]>;
    filterCount(filters?: TFilterQuery<Subscriber>): Promise<{
        count: number;
    }>;
    findOne(id: string, populate: string[]): Promise<Subscriber | SubscriberFull>;
    getAvatar(id: string): Promise<StreamableFile | undefined>;
    updateOne(id: string, subscriberUpdate: SubscriberUpdateDto): Promise<Subscriber>;
}
