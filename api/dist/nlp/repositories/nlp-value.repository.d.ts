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
import { Document, Model, Query } from 'mongoose';
import { BaseRepository, DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { Format } from '@/utils/types/format.types';
import { NlpValueDto } from '../dto/nlp-value.dto';
import { NlpValue, NlpValueDocument, NlpValueFull, NlpValuePopulate, TNlpValueCount } from '../schemas/nlp-value.schema';
import { NlpSampleEntityRepository } from './nlp-sample-entity.repository';
export declare class NlpValueRepository extends BaseRepository<NlpValue, NlpValuePopulate, NlpValueFull, NlpValueDto> {
    readonly model: Model<NlpValue>;
    private readonly nlpSampleEntityRepository;
    constructor(model: Model<NlpValue>, nlpSampleEntityRepository: NlpSampleEntityRepository);
    postCreate(created: NlpValueDocument): Promise<void>;
    postUpdate(_query: Query<Document<NlpValue, any, any>, Document<NlpValue, any, any>, unknown, NlpValue, 'findOneAndUpdate'>, updated: NlpValue): Promise<void>;
    preDelete(_query: Query<DeleteResult, Document<NlpValue, any, any>, unknown, NlpValue, 'deleteOne' | 'deleteMany'>, criteria: TFilterQuery<NlpValue>): Promise<void>;
    private getSortDirection;
    private aggregateWithCount;
    findWithCount<F extends Format>(format: F, pageQuery: PageQueryDto<NlpValue>, filterQuery: TFilterQuery<NlpValue>): Promise<TNlpValueCount<F>[]>;
}
