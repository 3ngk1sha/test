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
import { Message } from '@/chat/schemas/message.schema';
import { Language } from '@/i18n/schemas/language.schema';
import { LanguageService } from '@/i18n/services/language.service';
import { DeleteResult } from '@/utils/generics/base-repository';
import { BaseService } from '@/utils/generics/base-service';
import { TFilterQuery, THydratedDocument } from '@/utils/types/filter.types';
import { TNlpSampleDto } from '../dto/nlp-sample.dto';
import { NlpSampleRepository } from '../repositories/nlp-sample.repository';
import { NlpEntityFull } from '../schemas/nlp-entity.schema';
import { NlpSample, NlpSampleFull, NlpSamplePopulate } from '../schemas/nlp-sample.schema';
import { NlpEntityService } from './nlp-entity.service';
import { NlpSampleEntityService } from './nlp-sample-entity.service';
export declare class NlpSampleService extends BaseService<NlpSample, NlpSamplePopulate, NlpSampleFull, TNlpSampleDto> {
    readonly repository: NlpSampleRepository;
    private readonly nlpSampleEntityService;
    private readonly nlpEntityService;
    private readonly languageService;
    constructor(repository: NlpSampleRepository, nlpSampleEntityService: NlpSampleEntityService, nlpEntityService: NlpEntityService, languageService: LanguageService);
    getAllSamplesAndEntitiesByType(type: NlpSample['type']): Promise<{
        samples: NlpSampleFull[];
        entities: NlpEntityFull[];
    }>;
    deleteCascadeOne(id: string): Promise<DeleteResult>;
    parseAndSaveDataset(data: string): Promise<NlpSample[]>;
    annotateWithKeywordEntity(entity: NlpEntityFull): Promise<void>;
    handleLanguageDelete(_query: Query<DeleteResult, Document<Language, any, any>, unknown, Language, 'deleteOne' | 'deleteMany'>, criteria: TFilterQuery<Language>): Promise<void>;
    handleNewMessage(doc: THydratedDocument<Message>): Promise<void>;
}
