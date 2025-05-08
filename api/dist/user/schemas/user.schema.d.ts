import { ModelDefinition } from '@nestjs/mongoose';
import { Attachment } from '@/attachment/schemas/attachment.schema';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { UserProvider } from '../types/user-provider.type';
import { Role } from './role.schema';
export declare class UserStub extends BaseSchema {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    roles: unknown;
    avatar: unknown;
    sendEmail?: boolean;
    state?: boolean;
    language?: string;
    timezone?: string;
    resetCount?: number;
    resetToken?: string | null;
    provider?: UserProvider;
}
export declare class User extends UserStub {
    roles: string[];
    avatar: string | null;
}
export declare class UserFull extends UserStub {
    roles: Role[];
    avatar: Attachment | null;
}
export type UserDocument = THydratedDocument<User>;
export declare const UserModel: ModelDefinition;
declare const _default: any;
export default _default;
export type UserPopulate = keyof TFilterPopulateFields<User, UserStub>;
export declare const USER_POPULATE: UserPopulate[];
