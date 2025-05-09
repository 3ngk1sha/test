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
import { Model } from 'mongoose';
import { BaseRepository, DeleteResult } from '@/utils/generics/base-repository';
import { RoleDto } from '../dto/role.dto';
import { Invitation } from '../schemas/invitation.schema';
import { Permission } from '../schemas/permission.schema';
import { Role, RoleFull, RolePopulate } from '../schemas/role.schema';
export declare class RoleRepository extends BaseRepository<Role, RolePopulate, RoleFull, RoleDto> {
    readonly model: Model<Role>;
    private readonly permissionModel;
    private readonly invitationModel;
    constructor(model: Model<Role>, permissionModel: Model<Permission>, invitationModel: Model<Invitation>);
    deleteOne(id: string): Promise<DeleteResult>;
}
