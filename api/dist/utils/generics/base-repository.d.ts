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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClassTransformOptions } from 'class-transformer';
import { Document, FilterQuery, FlattenMaps, HydratedDocument, Model, ProjectionType, Query, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline, UpdateWriteOpResult } from 'mongoose';
import { LoggerService } from '@/logger/logger.service';
import { TFilterQuery } from '@/utils/types/filter.types';
import { PageQueryDto, QuerySortDto } from '../pagination/pagination-query.dto';
import { DtoAction, DtoConfig, DtoInfer } from '../types/dto.types';
import { BaseSchema } from './base-schema';
export type DeleteResult = {
    acknowledged: boolean;
    deletedCount: number;
};
export declare enum EHook {
    preCreateValidate = "preCreateValidate",
    preCreate = "preCreate",
    preUpdateValidate = "preUpdateValidate",
    preUpdate = "preUpdate",
    preUpdateMany = "preUpdateMany",
    preDelete = "preDelete",
    postCreateValidate = "postCreateValidate",
    postCreate = "postCreate",
    postUpdateValidate = "postUpdateValidate",
    postUpdate = "postUpdate",
    postUpdateMany = "postUpdateMany",
    postDelete = "postDelete"
}
export declare abstract class BaseRepository<T extends FlattenMaps<unknown>, P extends string = never, TFull extends Omit<T, P> = never, Dto extends DtoConfig = object, U extends Omit<T, keyof BaseSchema> = Omit<T, keyof BaseSchema>, D = Document<T>> {
    readonly model: Model<T>;
    private readonly cls;
    protected readonly populate: P[];
    protected readonly clsPopulate?: (new () => TFull) | undefined;
    private readonly transformOpts;
    private readonly leanOpts;
    readonly eventEmitter: EventEmitter2;
    readonly logger: LoggerService;
    constructor(model: Model<T>, cls: new () => T, populate?: P[], clsPopulate?: (new () => TFull) | undefined);
    canPopulate(populate: string[]): boolean;
    getEventName(suffix: EHook): "hook:model:*" | "hook:model:preCreateValidate" | "hook:model:preCreate" | "hook:model:preUpdateValidate" | "hook:model:preUpdate" | "hook:model:preUpdateMany" | "hook:model:preDelete" | "hook:model:postCreateValidate" | "hook:model:postCreate" | "hook:model:postUpdateValidate" | "hook:model:postUpdate" | "hook:model:postUpdateMany" | "hook:model:postDelete" | "hook:label:*" | "hook:label:preCreateValidate" | "hook:label:preCreate" | "hook:label:preUpdateValidate" | "hook:label:preUpdate" | "hook:label:preUpdateMany" | "hook:label:preDelete" | "hook:label:postCreateValidate" | "hook:label:postCreate" | "hook:label:postUpdateValidate" | "hook:label:postUpdate" | "hook:label:postUpdateMany" | "hook:label:postDelete" | "hook:attachment:*" | "hook:attachment:preCreateValidate" | "hook:attachment:preCreate" | "hook:attachment:preUpdateValidate" | "hook:attachment:preUpdate" | "hook:attachment:preUpdateMany" | "hook:attachment:preDelete" | "hook:attachment:postCreateValidate" | "hook:attachment:postCreate" | "hook:attachment:postUpdateValidate" | "hook:attachment:postUpdate" | "hook:attachment:postUpdateMany" | "hook:attachment:postDelete" | "hook:user:*" | "hook:user:preCreateValidate" | "hook:user:preCreate" | "hook:user:preUpdateValidate" | "hook:user:preUpdate" | "hook:user:preUpdateMany" | "hook:user:preDelete" | "hook:user:postCreateValidate" | "hook:user:postCreate" | "hook:user:postUpdateValidate" | "hook:user:postUpdate" | "hook:user:postUpdateMany" | "hook:user:postDelete" | "hook:menu:*" | "hook:menu:preCreateValidate" | "hook:menu:preCreate" | "hook:menu:preUpdateValidate" | "hook:menu:preUpdate" | "hook:menu:preUpdateMany" | "hook:menu:preDelete" | "hook:menu:postCreateValidate" | "hook:menu:postCreate" | "hook:menu:postUpdateValidate" | "hook:menu:postUpdate" | "hook:menu:postUpdateMany" | "hook:menu:postDelete" | "hook:stats:*" | "hook:stats:preCreateValidate" | "hook:stats:preCreate" | "hook:stats:preUpdateValidate" | "hook:stats:preUpdate" | "hook:stats:preUpdateMany" | "hook:stats:preDelete" | "hook:stats:postCreateValidate" | "hook:stats:postCreate" | "hook:stats:postUpdateValidate" | "hook:stats:postUpdate" | "hook:stats:postUpdateMany" | "hook:stats:postDelete" | "hook:block:*" | "hook:block:preCreateValidate" | "hook:block:preCreate" | "hook:block:preUpdateValidate" | "hook:block:preUpdate" | "hook:block:preUpdateMany" | "hook:block:preDelete" | "hook:block:postCreateValidate" | "hook:block:postCreate" | "hook:block:postUpdateValidate" | "hook:block:postUpdate" | "hook:block:postUpdateMany" | "hook:block:postDelete" | "hook:category:*" | "hook:category:preCreateValidate" | "hook:category:preCreate" | "hook:category:preUpdateValidate" | "hook:category:preUpdate" | "hook:category:preUpdateMany" | "hook:category:preDelete" | "hook:category:postCreateValidate" | "hook:category:postCreate" | "hook:category:postUpdateValidate" | "hook:category:postUpdate" | "hook:category:postUpdateMany" | "hook:category:postDelete" | "hook:contextVar:*" | "hook:contextVar:preCreateValidate" | "hook:contextVar:preCreate" | "hook:contextVar:preUpdateValidate" | "hook:contextVar:preUpdate" | "hook:contextVar:preUpdateMany" | "hook:contextVar:preDelete" | "hook:contextVar:postCreateValidate" | "hook:contextVar:postCreate" | "hook:contextVar:postUpdateValidate" | "hook:contextVar:postUpdate" | "hook:contextVar:postUpdateMany" | "hook:contextVar:postDelete" | "hook:conversation:*" | "hook:conversation:preCreateValidate" | "hook:conversation:preCreate" | "hook:conversation:preUpdateValidate" | "hook:conversation:preUpdate" | "hook:conversation:preUpdateMany" | "hook:conversation:preDelete" | "hook:conversation:postCreateValidate" | "hook:conversation:postCreate" | "hook:conversation:postUpdateValidate" | "hook:conversation:postUpdate" | "hook:conversation:postUpdateMany" | "hook:conversation:postDelete" | "hook:message:*" | "hook:message:preCreateValidate" | "hook:message:preCreate" | "hook:message:preUpdateValidate" | "hook:message:preUpdate" | "hook:message:preUpdateMany" | "hook:message:preDelete" | "hook:message:postCreateValidate" | "hook:message:postCreate" | "hook:message:postUpdateValidate" | "hook:message:postUpdate" | "hook:message:postUpdateMany" | "hook:message:postDelete" | "hook:subscriber:*" | "hook:subscriber:preCreateValidate" | "hook:subscriber:preCreate" | "hook:subscriber:preUpdateValidate" | "hook:subscriber:preUpdate" | "hook:subscriber:preUpdateMany" | "hook:subscriber:preDelete" | "hook:subscriber:postCreateValidate" | "hook:subscriber:postCreate" | "hook:subscriber:postUpdateValidate" | "hook:subscriber:postUpdate" | "hook:subscriber:postUpdateMany" | "hook:subscriber:postDelete" | "hook:contentType:*" | "hook:contentType:preCreateValidate" | "hook:contentType:preCreate" | "hook:contentType:preUpdateValidate" | "hook:contentType:preUpdate" | "hook:contentType:preUpdateMany" | "hook:contentType:preDelete" | "hook:contentType:postCreateValidate" | "hook:contentType:postCreate" | "hook:contentType:postUpdateValidate" | "hook:contentType:postUpdate" | "hook:contentType:postUpdateMany" | "hook:contentType:postDelete" | "hook:content:*" | "hook:content:preCreateValidate" | "hook:content:preCreate" | "hook:content:preUpdateValidate" | "hook:content:preUpdate" | "hook:content:preUpdateMany" | "hook:content:preDelete" | "hook:content:postCreateValidate" | "hook:content:postCreate" | "hook:content:postUpdateValidate" | "hook:content:postUpdate" | "hook:content:postUpdateMany" | "hook:content:postDelete" | "hook:language:*" | "hook:language:preCreateValidate" | "hook:language:preCreate" | "hook:language:preUpdateValidate" | "hook:language:preUpdate" | "hook:language:preUpdateMany" | "hook:language:preDelete" | "hook:language:postCreateValidate" | "hook:language:postCreate" | "hook:language:postUpdateValidate" | "hook:language:postUpdate" | "hook:language:postUpdateMany" | "hook:language:postDelete" | "hook:translation:*" | "hook:translation:preCreateValidate" | "hook:translation:preCreate" | "hook:translation:preUpdateValidate" | "hook:translation:preUpdate" | "hook:translation:preUpdateMany" | "hook:translation:preDelete" | "hook:translation:postCreateValidate" | "hook:translation:postCreate" | "hook:translation:postUpdateValidate" | "hook:translation:postUpdate" | "hook:translation:postUpdateMany" | "hook:translation:postDelete" | "hook:nlpEntity:*" | "hook:nlpEntity:preCreateValidate" | "hook:nlpEntity:preCreate" | "hook:nlpEntity:preUpdateValidate" | "hook:nlpEntity:preUpdate" | "hook:nlpEntity:preUpdateMany" | "hook:nlpEntity:preDelete" | "hook:nlpEntity:postCreateValidate" | "hook:nlpEntity:postCreate" | "hook:nlpEntity:postUpdateValidate" | "hook:nlpEntity:postUpdate" | "hook:nlpEntity:postUpdateMany" | "hook:nlpEntity:postDelete" | "hook:nlpSampleEntity:*" | "hook:nlpSampleEntity:preCreateValidate" | "hook:nlpSampleEntity:preCreate" | "hook:nlpSampleEntity:preUpdateValidate" | "hook:nlpSampleEntity:preUpdate" | "hook:nlpSampleEntity:preUpdateMany" | "hook:nlpSampleEntity:preDelete" | "hook:nlpSampleEntity:postCreateValidate" | "hook:nlpSampleEntity:postCreate" | "hook:nlpSampleEntity:postUpdateValidate" | "hook:nlpSampleEntity:postUpdate" | "hook:nlpSampleEntity:postUpdateMany" | "hook:nlpSampleEntity:postDelete" | "hook:nlpSample:*" | "hook:nlpSample:preCreateValidate" | "hook:nlpSample:preCreate" | "hook:nlpSample:preUpdateValidate" | "hook:nlpSample:preUpdate" | "hook:nlpSample:preUpdateMany" | "hook:nlpSample:preDelete" | "hook:nlpSample:postCreateValidate" | "hook:nlpSample:postCreate" | "hook:nlpSample:postUpdateValidate" | "hook:nlpSample:postUpdate" | "hook:nlpSample:postUpdateMany" | "hook:nlpSample:postDelete" | "hook:nlpValue:*" | "hook:nlpValue:preCreateValidate" | "hook:nlpValue:preCreate" | "hook:nlpValue:preUpdateValidate" | "hook:nlpValue:preUpdate" | "hook:nlpValue:preUpdateMany" | "hook:nlpValue:preDelete" | "hook:nlpValue:postCreateValidate" | "hook:nlpValue:postCreate" | "hook:nlpValue:postUpdateValidate" | "hook:nlpValue:postUpdate" | "hook:nlpValue:postUpdateMany" | "hook:nlpValue:postDelete" | "hook:setting:*" | "hook:setting:preCreateValidate" | "hook:setting:preCreate" | "hook:setting:preUpdateValidate" | "hook:setting:preUpdate" | "hook:setting:preUpdateMany" | "hook:setting:preDelete" | "hook:setting:postCreateValidate" | "hook:setting:postCreate" | "hook:setting:postUpdateValidate" | "hook:setting:postUpdate" | "hook:setting:postUpdateMany" | "hook:setting:postDelete" | "hook:invitation:*" | "hook:invitation:preCreateValidate" | "hook:invitation:preCreate" | "hook:invitation:preUpdateValidate" | "hook:invitation:preUpdate" | "hook:invitation:preUpdateMany" | "hook:invitation:preDelete" | "hook:invitation:postCreateValidate" | "hook:invitation:postCreate" | "hook:invitation:postUpdateValidate" | "hook:invitation:postUpdate" | "hook:invitation:postUpdateMany" | "hook:invitation:postDelete" | "hook:permission:*" | "hook:permission:preCreateValidate" | "hook:permission:preCreate" | "hook:permission:preUpdateValidate" | "hook:permission:preUpdate" | "hook:permission:preUpdateMany" | "hook:permission:preDelete" | "hook:permission:postCreateValidate" | "hook:permission:postCreate" | "hook:permission:postUpdateValidate" | "hook:permission:postUpdate" | "hook:permission:postUpdateMany" | "hook:permission:postDelete" | "hook:role:*" | "hook:role:preCreateValidate" | "hook:role:preCreate" | "hook:role:preUpdateValidate" | "hook:role:preUpdate" | "hook:role:preUpdateMany" | "hook:role:preDelete" | "hook:role:postCreateValidate" | "hook:role:postCreate" | "hook:role:postUpdateValidate" | "hook:role:postUpdate" | "hook:role:postUpdateMany" | "hook:role:postDelete";
    private registerLifeCycleHooks;
    protected execute<R extends Omit<T, P>>(query: Query<T[], T>, cls: new () => R): Promise<R[]>;
    protected executeOne<R extends Omit<T, P>>(query: Query<T | null, T>, cls: new () => R, options?: ClassTransformOptions): Promise<R | null>;
    protected findOneQuery(criteria: string | TFilterQuery<T>, projection?: ProjectionType<T>): Query<T | null, T, object, T, 'findOne', object>;
    findOne(criteria: string | TFilterQuery<T>, options?: ClassTransformOptions, projection?: ProjectionType<T>): Promise<T | null>;
    findOneAndPopulate(criteria: string | TFilterQuery<T>, projection?: ProjectionType<T>): Promise<TFull | null>;
    protected findQuery(filter: TFilterQuery<T>, pageQuery?: PageQueryDto<T>, projection?: ProjectionType<T>): Query<T[], T, object, T, 'find', object>;
    protected findQuery(filter: TFilterQuery<T>, pageQuery?: QuerySortDto<T>, projection?: ProjectionType<T>): Query<T[], T, object, T, 'find', object>;
    find(filter: TFilterQuery<T>, pageQuery?: PageQueryDto<T>, projection?: ProjectionType<T>): Promise<T[]>;
    find(filter: TFilterQuery<T>, pageQuery?: QuerySortDto<T>, projection?: ProjectionType<T>): Promise<T[]>;
    private ensureCanPopulate;
    findAndPopulate(filters: TFilterQuery<T>, pageQuery?: PageQueryDto<T>, projection?: ProjectionType<T>): Promise<TFull[]>;
    findAndPopulate(filters: TFilterQuery<T>, pageQuery?: QuerySortDto<T>, projection?: ProjectionType<T>): Promise<TFull[]>;
    protected findAllQuery(sort?: QuerySortDto<T>): Query<T[], T, object, T, 'find', object>;
    findAll(sort?: QuerySortDto<T>): Promise<T[]>;
    findAllAndPopulate(sort?: QuerySortDto<T>): Promise<TFull[]>;
    protected findPageQuery(filters: TFilterQuery<T>, { skip, limit, sort }: PageQueryDto<T>): Query<T[], T, object, T, 'find', object>;
    findPage(filters: TFilterQuery<T>, pageQuery: PageQueryDto<T>): Promise<T[]>;
    findPageAndPopulate(filters: TFilterQuery<T>, pageQuery: PageQueryDto<T>): Promise<TFull[]>;
    countAll(): Promise<number>;
    count(criteria?: TFilterQuery<T>): Promise<number>;
    create(dto: DtoInfer<DtoAction.Create, Dto, U>): Promise<T>;
    createMany(dtoArray: DtoInfer<DtoAction.Create, Dto, U>[]): Promise<T[]>;
    updateOne<D extends Partial<U>>(criteria: string | TFilterQuery<T>, dto: UpdateQuery<DtoInfer<DtoAction.Update, Dto, D>>, options?: QueryOptions<D> | null): Promise<T>;
    updateMany<D extends Partial<U>>(filter: TFilterQuery<T>, dto: UpdateQuery<D>): Promise<UpdateWriteOpResult>;
    deleteOne(criteria: string | TFilterQuery<T>): Promise<DeleteResult>;
    deleteMany(criteria: TFilterQuery<T>): Promise<DeleteResult>;
    preCreateValidate(_doc: HydratedDocument<T>, _filterCriteria?: FilterQuery<T>, _updates?: UpdateWithAggregationPipeline | UpdateQuery<T>): Promise<void>;
    postCreateValidate(_validated: HydratedDocument<T>): Promise<void>;
    preUpdateValidate(_filterCriteria: FilterQuery<T>, _updates: UpdateWithAggregationPipeline | UpdateQuery<T>): Promise<void>;
    postUpdateValidate(_filterCriteria: FilterQuery<T>, _updates: UpdateWithAggregationPipeline | UpdateQuery<T>): Promise<void>;
    preCreate(_doc: HydratedDocument<T>): Promise<void>;
    postCreate(_created: HydratedDocument<T>): Promise<void>;
    preUpdate(_query: Query<D, D, unknown, T, 'findOneAndUpdate'>, _criteria: TFilterQuery<T>, _updates: UpdateWithAggregationPipeline | UpdateQuery<D>): Promise<void>;
    preUpdateMany(_query: Query<D, D, unknown, T, 'updateMany'>, _criteria: TFilterQuery<T>, _updates: UpdateWithAggregationPipeline | UpdateQuery<D>): Promise<void>;
    postUpdateMany(_query: Query<D, D, unknown, T, 'updateMany'>, _updated: any): Promise<void>;
    postUpdate(_query: Query<D, D, unknown, T, 'findOneAndUpdate'>, _updated: T): Promise<void>;
    preDelete(_query: Query<DeleteResult, D, unknown, T, 'deleteOne' | 'deleteMany'>, _criteria: TFilterQuery<T>): Promise<void>;
    postDelete(_query: Query<DeleteResult, D, unknown, T, 'deleteOne' | 'deleteMany'>, _result: DeleteResult): Promise<void>;
}
