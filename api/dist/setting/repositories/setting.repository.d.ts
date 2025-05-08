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
import { Document, FilterQuery, Model, Query, Types, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { BaseRepository } from '@/utils/generics/base-repository';
import { Setting } from '../schemas/setting.schema';
import { SettingType } from '../schemas/types';
export declare class SettingRepository extends BaseRepository<Setting> {
    readonly model: Model<Setting>;
    constructor(model: Model<Setting>);
    preCreateValidate(doc: Document<unknown, unknown, Setting> & Setting & {
        _id: Types.ObjectId;
    }): Promise<void>;
    preUpdateValidate(criteria: FilterQuery<Setting>, updates: UpdateWithAggregationPipeline | UpdateQuery<Setting>): Promise<void>;
    postUpdate(_query: Query<Document<Setting, any, any>, Document<Setting, any, any>, unknown, Setting, 'findOneAndUpdate'>, setting: Setting): Promise<void>;
    validateSettingValue(type: SettingType, value: any): void;
    private isArrayOfString;
}
