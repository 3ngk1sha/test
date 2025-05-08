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
import { LabelDto } from '../dto/label.dto';
import { Label, LabelDocument, LabelFull, LabelPopulate } from '../schemas/label.schema';
export declare class LabelRepository extends BaseRepository<Label, LabelPopulate, LabelFull, LabelDto> {
    readonly model: Model<Label>;
    constructor(model: Model<Label>);
    postCreate(created: LabelDocument): Promise<void>;
    preDelete(_query: Query<DeleteResult, Document<Label, any, any>, unknown, Label, 'deleteOne' | 'deleteMany'>, _criteria: TFilterQuery<Label>): Promise<void>;
}
