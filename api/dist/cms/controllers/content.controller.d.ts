/// <reference types="multer" />
import { BaseController } from '@/utils/generics/base-controller';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { ContentCreateDto, ContentUpdateDto } from '../dto/content.dto';
import { Content, ContentFull, ContentPopulate, ContentStub } from '../schemas/content.schema';
import { ContentTypeService } from './../services/content-type.service';
import { ContentService } from './../services/content.service';
export declare class ContentController extends BaseController<Content, ContentStub, ContentPopulate, ContentFull> {
    private readonly contentService;
    private readonly contentTypeService;
    constructor(contentService: ContentService, contentTypeService: ContentTypeService);
    create(contentDto: ContentCreateDto): Promise<Content>;
    import(file: Express.Multer.File, targetContentType: string): Promise<Content[] | undefined>;
    findPage(pageQuery: PageQueryDto<Content>, populate: string[], filters: TFilterQuery<Content>): Promise<Content[] | ContentFull[]>;
    filterCount(filters?: TFilterQuery<Content>): Promise<{
        count: number;
    }>;
    findOne(id: string, populate: string[]): Promise<Content | ContentFull>;
    deleteOne(id: string): Promise<import("../../utils/generics/base-repository").DeleteResult>;
    findByType(contentType: string, pageQuery: PageQueryDto<Content>): Promise<Content[]>;
    updateOne(contentDto: ContentUpdateDto, id: string): Promise<Content>;
}
