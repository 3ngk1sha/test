import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { TRelation } from '../types/index.type';
import { Permission } from './permission.schema';
export declare class ModelStub extends BaseSchema {
    name: string;
    identity: string;
    attributes: object;
    relation?: TRelation;
}
export declare class Model extends ModelStub {
    permissions?: never;
}
export declare class ModelFull extends ModelStub {
    permissions: Permission[];
}
export type ModelDocument = THydratedDocument<Model>;
export declare const ModelModel: ModelDefinition;
declare const _default: any;
export default _default;
export type ModelPopulate = keyof TFilterPopulateFields<Model, ModelStub>;
export declare const MODEL_POPULATE: ModelPopulate[];
