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
import { ClassTransformOptions } from 'class-transformer';
import { ProjectionType, QueryOptions } from 'mongoose';
import { LoggerService } from '@/logger/logger.service';
import { TFilterQuery } from '@/utils/types/filter.types';
import { PageQueryDto, QuerySortDto } from '../pagination/pagination-query.dto';
import { DtoAction, DtoConfig, DtoInfer } from '../types/dto.types';
import { BaseRepository } from './base-repository';
import { BaseSchema } from './base-schema';
export declare abstract class BaseService<T extends BaseSchema, P extends string = never, TFull extends Omit<T, P> = never, Dto extends DtoConfig = object, U extends Omit<T, keyof BaseSchema> = Omit<T, keyof BaseSchema>> {
    protected readonly repository: BaseRepository<T, P, TFull, Dto>;
    eventEmitter: typeof this.repository.eventEmitter;
    readonly logger: LoggerService;
    constructor(repository: BaseRepository<T, P, TFull, Dto>);
    getRepository(): BaseRepository<T, P, TFull, Dto, Omit<T, keyof BaseSchema>, import("mongoose").Document<T, any, any>>;
    canPopulate(populate: string[]): boolean;
    findOne(criteria: string | TFilterQuery<T>, options?: ClassTransformOptions, projection?: ProjectionType<T>): Promise<T | null>;
    findOneAndPopulate(criteria: string | TFilterQuery<T>, projection?: ProjectionType<T>): Promise<TFull | null>;
    find(filter: TFilterQuery<T>, pageQuery?: PageQueryDto<T>, projection?: ProjectionType<T>): Promise<T[]>;
    find(filter: TFilterQuery<T>, pageQuery?: QuerySortDto<T>, projection?: ProjectionType<T>): Promise<T[]>;
    findAndPopulate(filters: TFilterQuery<T>, pageQuery?: PageQueryDto<T>, projection?: ProjectionType<T>): Promise<TFull[]>;
    findAndPopulate(filters: TFilterQuery<T>, pageQuery?: QuerySortDto<T>, projection?: ProjectionType<T>): Promise<TFull[]>;
    findAll(sort?: QuerySortDto<T>): Promise<T[]>;
    findAllAndPopulate(sort?: QuerySortDto<T>): Promise<TFull[]>;
    findPage(filters: TFilterQuery<T>, pageQueryDto: PageQueryDto<T>): Promise<T[]>;
    findPageAndPopulate(filters: TFilterQuery<T>, pageQueryDto: PageQueryDto<T>): Promise<TFull[]>;
    countAll(): Promise<number>;
    count(criteria?: TFilterQuery<T>): Promise<number>;
    create(dto: DtoInfer<DtoAction.Create, Dto, U>): Promise<T>;
    findOneOrCreate(criteria: string | TFilterQuery<T>, dto: DtoInfer<DtoAction.Create, Dto, U>): Promise<T>;
    createMany(dtoArray: DtoInfer<DtoAction.Create, Dto, U>[]): Promise<T[]>;
    updateOne(criteria: string | TFilterQuery<T>, dto: DtoInfer<DtoAction.Update, Dto, Partial<U>>, options?: QueryOptions<Partial<U>> | null): Promise<T>;
    updateMany(filter: TFilterQuery<T>, dto: Partial<U>): Promise<import("mongoose").UpdateWriteOpResult>;
    deleteOne(criteria: string | TFilterQuery<T>): Promise<import("./base-repository").DeleteResult>;
    deleteMany(filter: TFilterQuery<T>): Promise<import("./base-repository").DeleteResult>;
}
