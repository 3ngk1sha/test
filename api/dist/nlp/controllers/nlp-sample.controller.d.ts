/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { HelperService } from '@/helper/helper.service';
import { LanguageService } from '@/i18n/services/language.service';
import { BaseController } from '@/utils/generics/base-controller';
import { DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { NlpSampleDto, TNlpSampleDto } from '../dto/nlp-sample.dto';
import { NlpSample, NlpSampleFull, NlpSamplePopulate, NlpSampleStub } from '../schemas/nlp-sample.schema';
import { NlpSampleState } from '../schemas/types';
import { NlpEntityService } from '../services/nlp-entity.service';
import { NlpSampleEntityService } from '../services/nlp-sample-entity.service';
import { NlpSampleService } from '../services/nlp-sample.service';
export declare class NlpSampleController extends BaseController<NlpSample, NlpSampleStub, NlpSamplePopulate, NlpSampleFull, TNlpSampleDto> {
    private readonly nlpSampleService;
    private readonly nlpSampleEntityService;
    private readonly nlpEntityService;
    private readonly languageService;
    private readonly helperService;
    constructor(nlpSampleService: NlpSampleService, nlpSampleEntityService: NlpSampleEntityService, nlpEntityService: NlpEntityService, languageService: LanguageService, helperService: HelperService);
    annotateWithKeywordEntity(entityId: string): Promise<{
        success: boolean;
    }>;
    export(response: Response, type?: NlpSampleState): Promise<StreamableFile>;
    create({ entities: nlpEntities, language: languageCode, ...createNlpSampleDto }: NlpSampleDto): Promise<NlpSampleFull>;
    filterCount(filters?: TFilterQuery<NlpSample>): Promise<{
        count: number;
    }>;
    message(text: string): Promise<import("@/helper/types").NLU.ParseEntities>;
    train(): Promise<any>;
    evaluate(): Promise<any>;
    findOne(id: string, populate: string[]): Promise<NlpSample | NlpSampleFull>;
    findPage(pageQuery: PageQueryDto<NlpSample>, populate: string[], filters: TFilterQuery<NlpSample>): Promise<NlpSampleFull[] | NlpSample[]>;
    updateOne(id: string, { entities, language: languageCode, ...sampleAttrs }: NlpSampleDto): Promise<NlpSampleFull>;
    deleteOne(id: string): Promise<DeleteResult>;
    deleteMany(ids?: string[]): Promise<DeleteResult>;
    importFile(file: Express.Multer.File): Promise<NlpSample[]>;
}
