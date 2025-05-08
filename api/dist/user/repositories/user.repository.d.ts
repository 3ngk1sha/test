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
import { Document, Model, Query, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { BaseRepository } from '@/utils/generics/base-repository';
import { TFilterQuery } from '@/utils/types/filter.types';
import { UserDto } from '../dto/user.dto';
import { User, UserDocument, UserFull, UserPopulate } from '../schemas/user.schema';
export declare class UserRepository extends BaseRepository<User, UserPopulate, UserFull, UserDto> {
    readonly model: Model<User>;
    constructor(model: Model<User>);
    preCreate(_doc: UserDocument): Promise<void>;
    preUpdate(_query: Query<Document<User, any, any>, Document<User, any, any>, unknown, User, 'findOneAndUpdate'>, _criteria: TFilterQuery<User>, _updates: UpdateWithAggregationPipeline | UpdateQuery<Document<User, any, any>>): Promise<void>;
}
