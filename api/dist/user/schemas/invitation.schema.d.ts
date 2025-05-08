import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { Role } from './role.schema';
declare class InvitationStub extends BaseSchema {
    roles: unknown;
    email: string;
    token: string;
}
export declare class Invitation extends InvitationStub {
    roles: string[];
}
export declare class InvitationFull extends InvitationStub {
    roles: Role[];
}
export type InvitationDocument = THydratedDocument<Invitation>;
export declare const InvitationModel: ModelDefinition;
declare const _default: any;
export default _default;
export type InvitationPopulate = keyof TFilterPopulateFields<Invitation, InvitationStub>;
export declare const INVITATION_POPULATE: InvitationPopulate[];
