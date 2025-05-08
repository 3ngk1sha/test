import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { Action } from '../types/action.type';
import { TRelation } from '../types/index.type';
import { Model } from './model.schema';
import { Role } from './role.schema';
export declare class PermissionStub extends BaseSchema {
    model: unknown;
    action: Action;
    role: unknown;
    relation: TRelation;
}
export declare class Permission extends PermissionStub {
    model: string;
    role: string;
}
export declare class PermissionFull extends PermissionStub {
    model: Model;
    role: Role;
}
export type PermissionDocument = THydratedDocument<Permission>;
export declare const PermissionModel: ModelDefinition;
declare const _default: any;
export default _default;
export type PermissionPopulate = keyof TFilterPopulateFields<Permission, PermissionStub>;
export declare const PERMISSION_POPULATE: PermissionPopulate[];
