/// <reference types="multer" />
import { Request } from 'express';
import { Session as ExpressSession } from 'express-session';
import { AttachmentService } from '@/attachment/services/attachment.service';
import { BaseController } from '@/utils/generics/base-controller';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { InvitationCreateDto } from '../dto/invitation.dto';
import { UserCreateDto, UserEditProfileDto, UserRequestResetDto, UserResetPasswordDto, UserUpdateStateAndRolesDto } from '../dto/user.dto';
import { User, UserFull, UserPopulate, UserStub } from '../schemas/user.schema';
import { InvitationService } from '../services/invitation.service';
import { PasswordResetService } from '../services/passwordReset.service';
import { PermissionService } from '../services/permission.service';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import { ValidateAccountService } from '../services/validate-account.service';
export declare class ReadOnlyUserController extends BaseController<User, UserStub, UserPopulate, UserFull> {
    protected readonly userService: UserService;
    protected readonly roleService: RoleService;
    protected readonly invitationService: InvitationService;
    protected readonly permissionService: PermissionService;
    protected readonly attachmentService: AttachmentService;
    protected readonly passwordResetService: PasswordResetService;
    protected readonly validateAccountService: ValidateAccountService;
    constructor(userService: UserService, roleService: RoleService, invitationService: InvitationService, permissionService: PermissionService, attachmentService: AttachmentService, passwordResetService: PasswordResetService, validateAccountService: ValidateAccountService);
    getBotAvatar(color: string): Promise<import("@nestjs/common").StreamableFile>;
    getAvatar(id: string): Promise<import("@nestjs/common").StreamableFile>;
    permissions(req: Request): Promise<{
        roles: import("../schemas/role.schema").Role[] | undefined;
        permissions: ({
            model: string;
            action: import("../types/action.type").Action;
            relation: import("../types/index.type").TRelation;
        } | undefined)[];
    }>;
    findPage(pageQuery: PageQueryDto<User>, populate: string[], filters: TFilterQuery<User>): Promise<User[] | UserFull[]>;
    filterCount(filters?: TFilterQuery<User>): Promise<{
        count: number;
    }>;
    findOne(id: string, populate: string[]): Promise<User | UserFull>;
}
export declare class ReadWriteUserController extends ReadOnlyUserController {
    create(user: UserCreateDto): Promise<User>;
    updateOne(req: Request, id: string, userUpdate: UserEditProfileDto, avatarFile?: Express.Multer.File): Promise<User>;
    updateStateAndRoles(id: string, body: UserUpdateStateAndRolesDto, session: ExpressSession): Promise<User>;
    deleteOne(id: string): Promise<import("../../utils/generics/base-repository").DeleteResult>;
    invite(invitationCreateDto: InvitationCreateDto): Promise<import("../schemas/invitation.schema").Invitation>;
    requestReset(body: UserRequestResetDto): Promise<void>;
    reset(body: UserResetPasswordDto, token: string): Promise<void>;
    confirmAccount(body: {
        token: string;
    }): Promise<{}>;
}
