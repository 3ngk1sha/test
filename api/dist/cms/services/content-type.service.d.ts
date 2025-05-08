import { BaseService } from '@/utils/generics/base-service';
import { ContentTypeDto } from '../dto/contentType.dto';
import { ContentTypeRepository } from '../repositories/content-type.repository';
import { ContentType } from '../schemas/content-type.schema';
export declare class ContentTypeService extends BaseService<ContentType, never, never, ContentTypeDto> {
    readonly repository: ContentTypeRepository;
    constructor(repository: ContentTypeRepository);
    deleteCascadeOne(id: string): Promise<import("../../utils/generics/base-repository").DeleteResult>;
}
