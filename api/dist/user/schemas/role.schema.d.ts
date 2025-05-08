import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { Permission } from './permission.schema';
import { User } from './user.schema';
export type TRole = 'admin' | 'public';
export declare class RoleStub extends BaseSchema {
    name: string;
    active: boolean;
}
export declare class Role extends RoleStub {
    permissions?: never;
    users?: never;
}
export declare class RoleFull extends RoleStub {
    permissions: Permission[];
    users: User[];
}
export type RoleDocument = THydratedDocument<Role>;
export declare const RoleModel: ModelDefinition;
declare const _default: any;
export default _default;
export type RolePopulate = keyof TFilterPopulateFields<Role, RoleStub>;
export declare const ROLE_POPULATE: RolePopulate[];
