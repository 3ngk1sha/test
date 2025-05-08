import { Request } from 'express';
import { ChannelService } from '@/channel/channel.service';
import { BaseController } from '@/utils/generics/base-controller';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { MessageCreateDto } from '../dto/message.dto';
import { Message, MessageFull, MessagePopulate, MessageStub } from '../schemas/message.schema';
import { AnyMessage } from '../schemas/types/message';
import { MessageService } from '../services/message.service';
import { SubscriberService } from '../services/subscriber.service';
export declare class MessageController extends BaseController<AnyMessage, MessageStub, MessagePopulate, MessageFull> {
    private readonly messageService;
    private readonly subscriberService;
    private readonly channelService;
    constructor(messageService: MessageService, subscriberService: SubscriberService, channelService: ChannelService);
    findPage(pageQuery: PageQueryDto<AnyMessage>, populate: string[], filters: TFilterQuery<Message>): Promise<AnyMessage[] | MessageFull[]>;
    filterCount(filters?: TFilterQuery<Message>): Promise<{
        count: number;
    }>;
    findOne(id: string, populate: string[]): Promise<MessageFull | AnyMessage>;
    create(messageDto: MessageCreateDto, req: Request): Promise<{
        success: boolean;
    }>;
}
