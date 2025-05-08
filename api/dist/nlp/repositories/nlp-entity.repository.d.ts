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
import { TFilterQuery } from '@/utils/types/filter.types';
import { NlpEntityDto } from '../dto/nlp-entity.dto';
import { NlpEntity, NlpEntityDocument, NlpEntityFull, NlpEntityPopulate } from '../schemas/nlp-entity.schema';
import { NlpSampleEntityRepository } from './nlp-sample-entity.repository';
import { NlpValueRepository } from './nlp-value.repository';
export declare class NlpEntityRepository extends BaseRepository<NlpEntity, NlpEntityPopulate, NlpEntityFull, NlpEntityDto> {
    readonly model: Model<NlpEntity>;
    private readonly nlpValueRepository;
    private readonly nlpSampleEntityRepository;
    constructor(model: Model<NlpEntity>, nlpValueRepository: NlpValueRepository, nlpSampleEntityRepository: NlpSampleEntityRepository);
    postCreate(_created: NlpEntityDocument): Promise<void>;
    postUpdate(_query: Query<Document<NlpEntity, any, any>, Document<NlpEntity, any, any>, unknown, NlpEntity, 'findOneAndUpdate'>, updated: NlpEntity): Promise<void>;
    preDelete(_query: Query<DeleteResult, Document<NlpEntity, any, any>, unknown, NlpEntity, 'deleteOne' | 'deleteMany'>, criteria: TFilterQuery<NlpEntity>): Promise<void>;
}
