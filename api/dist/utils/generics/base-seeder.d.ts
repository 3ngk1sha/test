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
import { FlattenMaps } from 'mongoose';
import { DtoAction, DtoConfig, DtoInfer } from '../types/dto.types';
import { BaseRepository } from './base-repository';
import { BaseSchema } from './base-schema';
export declare abstract class BaseSeeder<T extends FlattenMaps<unknown>, P extends string = never, TFull extends Omit<T, P> = never, Dto extends DtoConfig = object, U extends Omit<T, keyof BaseSchema> = Omit<T, keyof BaseSchema>> {
    protected readonly repository: BaseRepository<T, P, TFull, Dto>;
    constructor(repository: BaseRepository<T, P, TFull, Dto>);
    findAll(): Promise<T[]>;
    isEmpty(): Promise<boolean>;
    seed(models: DtoInfer<DtoAction.Create, Dto, U>[]): Promise<boolean>;
}
