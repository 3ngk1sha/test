"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadWriteUserController = exports.ReadOnlyUserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const express_session_1 = require("express-session");
const multer_1 = require("multer");
const attachment_service_1 = require("../../attachment/services/attachment.service");
const types_1 = require("../../attachment/types");
const config_1 = require("../../config");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const roles_decorator_1 = require("../../utils/decorators/roles.decorator");
const base_controller_1 = require("../../utils/generics/base-controller");
const avatar_1 = require("../../utils/helpers/avatar");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const populate_pipe_1 = require("../../utils/pipes/populate.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const invitation_dto_1 = require("../dto/invitation.dto");
const user_dto_1 = require("../dto/user.dto");
const invitation_service_1 = require("../services/invitation.service");
const passwordReset_service_1 = require("../services/passwordReset.service");
const permission_service_1 = require("../services/permission.service");
const role_service_1 = require("../services/role.service");
const user_service_1 = require("../services/user.service");
const validate_account_service_1 = require("../services/validate-account.service");
let ReadOnlyUserController = class ReadOnlyUserController extends base_controller_1.BaseController {
    constructor(userService, roleService, invitationService, permissionService, attachmentService, passwordResetService, validateAccountService) {
        super(userService);
        this.userService = userService;
        this.roleService = roleService;
        this.invitationService = invitationService;
        this.permissionService = permissionService;
        this.attachmentService = attachmentService;
        this.passwordResetService = passwordResetService;
        this.validateAccountService = validateAccountService;
    }
    async getBotAvatar(color) {
        return await (0, avatar_1.getBotAvatar)(color);
    }
    async getAvatar(id) {
        const user = await this.userService.findOneAndPopulate(id);
        if (!user) {
            throw new common_1.NotFoundException(`user with ID ${id} not found`);
        }
        try {
            if (!user.avatar) {
                throw new Error('User has no avatar');
            }
            return await this.attachmentService.download(user.avatar);
        }
        catch (err) {
            this.logger.verbose('User has no avatar, generating initials avatar ...', err);
            return await (0, avatar_1.generateInitialsAvatar)(user);
        }
    }
    async permissions(req) {
        if (!req.user || !('id' in req.user && req.user.id)) {
            throw new common_1.UnauthorizedException();
        }
        const currentUser = await this.userService.findOneAndPopulate(req.user.id);
        const currentPermissions = await this.permissionService.findAndPopulate({
            role: {
                $in: currentUser?.roles.map(({ id }) => id),
            },
        });
        return {
            roles: currentUser?.roles,
            permissions: currentPermissions.map((permission) => {
                if (permission.model) {
                    return {
                        model: permission.model.name,
                        action: permission.action,
                        relation: permission.relation,
                    };
                }
            }),
        };
    }
    async findPage(pageQuery, populate, filters) {
        return this.canPopulate(populate)
            ? await this.userService.findAndPopulate(filters, pageQuery)
            : await this.userService.find(filters, pageQuery);
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id, populate) {
        const doc = this.canPopulate(populate)
            ? await this.userService.findOneAndPopulate(id)
            : await this.userService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find User by id ${id}`);
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return doc;
    }
};
exports.ReadOnlyUserController = ReadOnlyUserController;
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)('bot/profile_pic'),
    __param(0, (0, common_1.Query)('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReadOnlyUserController.prototype, "getBotAvatar", null);
__decorate([
    (0, common_1.Get)(':id/profile_pic'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReadOnlyUserController.prototype, "getAvatar", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)('permissions/:id?'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReadOnlyUserController.prototype, "permissions", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __param(2, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['first_name', 'last_name'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], ReadOnlyUserController.prototype, "findPage", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['first_name', 'last_name'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReadOnlyUserController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ReadOnlyUserController.prototype, "findOne", null);
exports.ReadOnlyUserController = ReadOnlyUserController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        role_service_1.RoleService,
        invitation_service_1.InvitationService,
        permission_service_1.PermissionService,
        attachment_service_1.AttachmentService,
        passwordReset_service_1.PasswordResetService,
        validate_account_service_1.ValidateAccountService])
], ReadOnlyUserController);
let ReadWriteUserController = class ReadWriteUserController extends ReadOnlyUserController {
    async create(user) {
        this.validate({
            dto: user,
            allowedIds: {
                roles: (await this.roleService.findAll())
                    .filter((role) => user.roles.includes(role.id))
                    .map((role) => role.id),
                avatar: user.avatar
                    ? (await this.attachmentService.findOne(user.avatar))?.id
                    : null,
            },
        });
        return await this.userService.create(user);
    }
    async updateOne(req, id, userUpdate, avatarFile) {
        if (!(req.user && 'id' in req.user && req.user.id) || req.user.id !== id) {
            throw new common_1.ForbiddenException();
        }
        const avatar = avatarFile
            ? await this.attachmentService.store(avatarFile, {
                name: avatarFile.originalname,
                size: avatarFile.size,
                type: avatarFile.mimetype,
                resourceRef: types_1.AttachmentResourceRef.UserAvatar,
                access: types_1.AttachmentAccess.Private,
                createdByRef: types_1.AttachmentCreatedByRef.User,
                createdBy: req.user.id,
            })
            : undefined;
        return await this.userService.updateOne(req.user.id, avatar
            ? {
                ...userUpdate,
                avatar: avatar.id,
            }
            : userUpdate);
    }
    async updateStateAndRoles(id, body, session) {
        const oldRoles = (await this.userService.findOne(id))?.roles;
        const newRoles = body.roles;
        const { id: adminRoleId } = (await this.roleService.findOne({
            name: 'admin',
        })) || {};
        if (id === session.passport?.user?.id && body.state === false) {
            throw new common_1.ForbiddenException('Your account state is protected');
        }
        if (adminRoleId &&
            session?.passport?.user?.id === id &&
            oldRoles?.includes(adminRoleId) &&
            !newRoles?.includes(adminRoleId)) {
            throw new common_1.ForbiddenException('Admin privileges are protected');
        }
        const result = await this.userService.updateOne(id, body);
        if (!result) {
            this.logger.warn(`Unable to update User by id ${id}`);
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return result;
    }
    async deleteOne(id) {
        const result = await this.userService.deleteOne(id);
        if (result.deletedCount === 0) {
            this.logger.warn(`Unable to delete User by id ${id}`);
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return result;
    }
    async invite(invitationCreateDto) {
        return await this.invitationService.create(invitationCreateDto);
    }
    async requestReset(body) {
        return await this.passwordResetService.requestReset(body);
    }
    async reset(body, token) {
        return await this.passwordResetService.reset(body, token);
    }
    async confirmAccount(body) {
        return await this.validateAccountService.confirmAccount(body);
    }
};
exports.ReadWriteUserController = ReadWriteUserController;
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserCreateDto]),
    __metadata("design:returntype", Promise)
], ReadWriteUserController.prototype, "create", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        limits: {
            fileSize: config_1.config.parameters.maxUploadSize,
        },
        storage: (() => {
            if (config_1.config.parameters.storageMode === 'memory') {
                return (0, multer_1.memoryStorage)();
            }
            else {
                return (0, multer_1.diskStorage)({});
            }
        })(),
    })),
    (0, common_1.Patch)('edit/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, user_dto_1.UserEditProfileDto, Object]),
    __metadata("design:returntype", Promise)
], ReadWriteUserController.prototype, "updateOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserUpdateStateAndRolesDto,
        express_session_1.Session]),
    __metadata("design:returntype", Promise)
], ReadWriteUserController.prototype, "updateStateAndRoles", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReadWriteUserController.prototype, "deleteOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)('invite'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invitation_dto_1.InvitationCreateDto]),
    __metadata("design:returntype", Promise)
], ReadWriteUserController.prototype, "invite", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Post)('reset'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserRequestResetDto]),
    __metadata("design:returntype", Promise)
], ReadWriteUserController.prototype, "requestReset", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Post)('reset/:token'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserResetPasswordDto, String]),
    __metadata("design:returntype", Promise)
], ReadWriteUserController.prototype, "reset", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Post)('confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReadWriteUserController.prototype, "confirmAccount", null);
exports.ReadWriteUserController = ReadWriteUserController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('user')
], ReadWriteUserController);
//# sourceMappingURL=user.controller.js.map