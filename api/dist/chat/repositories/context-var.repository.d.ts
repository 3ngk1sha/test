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
import { ContextVarDto } from '../dto/context-var.dto';
import { ContextVar } from '../schemas/context-var.schema';
import { BlockService } from '../services/block.service';
export declare class ContextVarRepository extends BaseRepository<ContextVar, never, never, ContextVarDto> {
    readonly model: Model<ContextVar>;
    private readonly blockService;
    constructor(model: Model<ContextVar>, blockService?: BlockService);
    preDelete(_query: Query<DeleteResult, Document<ContextVar, any, any>, unknown, ContextVar, 'deleteOne' | 'deleteMany'>, criteria: TFilterQuery<ContextVar>): Promise<void>;
}
