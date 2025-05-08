import { StdOutgoingListMessage } from '@/chat/schemas/types/message';
import { ContentOptions } from '@/chat/schemas/types/options';
import { BaseService } from '@/utils/generics/base-service';
import { ContentDto } from '../dto/content.dto';
import { ContentRepository } from '../repositories/content.repository';
import { ContentType } from '../schemas/content-type.schema';
import { Content, ContentFull, ContentPopulate } from '../schemas/content.schema';
export declare class ContentService extends BaseService<Content, ContentPopulate, ContentFull, ContentDto> {
    readonly repository: ContentRepository;
    constructor(repository: ContentRepository);
    textSearch(query: string): Promise<Content[]>;
    getContent(options: ContentOptions, skip: number): Promise<Omit<StdOutgoingListMessage, 'options'>>;
    parseAndSaveDataset(data: string, targetContentType: string, contentType: ContentType): Promise<Content[] | undefined>;
}
