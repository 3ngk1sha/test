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
import { Document, HydratedDocument, Model, Query, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { BaseRepository } from '@/utils/generics/base-repository';
import { TFilterQuery } from '@/utils/types/filter.types';
import { ContentDto } from '../dto/content.dto';
import { Content, ContentFull, ContentPopulate } from '../schemas/content.schema';
export declare class ContentRepository extends BaseRepository<Content, ContentPopulate, ContentFull, ContentDto> {
    readonly model: Model<Content>;
    constructor(model: Model<Content>);
    preCreate(_doc: HydratedDocument<Content>): Promise<void>;
    preUpdate(_query: Query<Document<Content, any, any>, Document<Content, any, any>, unknown, Content, 'findOneAndUpdate'>, _criteria: TFilterQuery<Content>, _updates: UpdateWithAggregationPipeline | UpdateQuery<Document<Content, any, any>>): Promise<void>;
    private stringify;
    textSearch(query: string): Promise<Content[]>;
}
