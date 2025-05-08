import { BaseController } from '@/utils/generics/base-controller';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { ContentTypeCreateDto, ContentTypeUpdateDto } from '../dto/contentType.dto';
import { ContentType } from '../schemas/content-type.schema';
import { ContentTypeService } from '../services/content-type.service';
export declare class ContentTypeController extends BaseController<ContentType> {
    private readonly contentTypeService;
    constructor(contentTypeService: ContentTypeService);
    create(contentTypeDto: ContentTypeCreateDto): Promise<ContentType>;
    findPage(pageQuery: PageQueryDto<ContentType>, filters: TFilterQuery<ContentType>): Promise<ContentType[]>;
    filterCount(filters: TFilterQuery<ContentType>): Promise<{
        count: number;
    }>;
    findOne(id: string): Promise<ContentType>;
    deleteOne(id: string): Promise<import("../../utils/generics/base-repository").DeleteResult>;
    updateOne(contentTypeDto: ContentTypeUpdateDto, id: string): Promise<ContentType>;
}
