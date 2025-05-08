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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_service_1 = require("../../user/services/model.service");
const permission_service_1 = require("../../user/services/permission.service");
const action_type_1 = require("../../user/types/action.type");
const attachment_service_1 = require("../services/attachment.service");
const types_1 = require("../types");
const utilities_1 = require("../utilities");
let AttachmentGuard = class AttachmentGuard {
    constructor(permissionService, modelService, attachmentService) {
        this.permissionService = permissionService;
        this.modelService = modelService;
        this.attachmentService = attachmentService;
        this.permissionMap = {
            [action_type_1.Action.READ]: {
                [types_1.AttachmentResourceRef.SettingAttachment]: [
                    ['setting', action_type_1.Action.READ],
                    ['attachment', action_type_1.Action.READ],
                ],
                [types_1.AttachmentResourceRef.UserAvatar]: [['user', action_type_1.Action.READ]],
                [types_1.AttachmentResourceRef.BlockAttachment]: [
                    ['block', action_type_1.Action.READ],
                    ['attachment', action_type_1.Action.READ],
                ],
                [types_1.AttachmentResourceRef.ContentAttachment]: [
                    ['content', action_type_1.Action.READ],
                    ['attachment', action_type_1.Action.READ],
                ],
                [types_1.AttachmentResourceRef.SubscriberAvatar]: [['subscriber', action_type_1.Action.READ]],
                [types_1.AttachmentResourceRef.MessageAttachment]: [
                    ['message', action_type_1.Action.READ],
                    ['attachment', action_type_1.Action.READ],
                ],
            },
            [action_type_1.Action.CREATE]: {
                [types_1.AttachmentResourceRef.SettingAttachment]: [
                    ['setting', action_type_1.Action.UPDATE],
                    ['attachment', action_type_1.Action.CREATE],
                ],
                [types_1.AttachmentResourceRef.UserAvatar]: [],
                [types_1.AttachmentResourceRef.BlockAttachment]: [
                    ['block', action_type_1.Action.UPDATE],
                    ['attachment', action_type_1.Action.CREATE],
                ],
                [types_1.AttachmentResourceRef.ContentAttachment]: [
                    ['content', action_type_1.Action.UPDATE],
                    ['attachment', action_type_1.Action.CREATE],
                ],
                [types_1.AttachmentResourceRef.SubscriberAvatar]: [],
                [types_1.AttachmentResourceRef.MessageAttachment]: [
                    ['message', action_type_1.Action.CREATE],
                    ['attachment', action_type_1.Action.CREATE],
                ],
            },
            [action_type_1.Action.DELETE]: {
                [types_1.AttachmentResourceRef.SettingAttachment]: [
                    ['setting', action_type_1.Action.UPDATE],
                    ['attachment', action_type_1.Action.DELETE],
                ],
                [types_1.AttachmentResourceRef.UserAvatar]: [],
                [types_1.AttachmentResourceRef.BlockAttachment]: [
                    ['block', action_type_1.Action.UPDATE],
                    ['attachment', action_type_1.Action.DELETE],
                ],
                [types_1.AttachmentResourceRef.ContentAttachment]: [
                    ['content', action_type_1.Action.UPDATE],
                    ['attachment', action_type_1.Action.DELETE],
                ],
                [types_1.AttachmentResourceRef.SubscriberAvatar]: [],
                [types_1.AttachmentResourceRef.MessageAttachment]: [],
            },
            [action_type_1.Action.UPDATE]: {
                [types_1.AttachmentResourceRef.SettingAttachment]: [],
                [types_1.AttachmentResourceRef.UserAvatar]: [],
                [types_1.AttachmentResourceRef.BlockAttachment]: [],
                [types_1.AttachmentResourceRef.ContentAttachment]: [],
                [types_1.AttachmentResourceRef.SubscriberAvatar]: [],
                [types_1.AttachmentResourceRef.MessageAttachment]: [],
            },
        };
    }
    async hasPermission(user, identity, action) {
        if (Array.isArray(user?.roles)) {
            for (const role of user.roles) {
                const modelObj = await this.modelService.findOne({ identity });
                if (modelObj) {
                    const { id: model } = modelObj;
                    const hasRequiredPermission = await this.permissionService.findOne({
                        action,
                        role,
                        model,
                    });
                    return !!hasRequiredPermission;
                }
            }
        }
        return false;
    }
    async isAuthorized(action, user, resourceRef) {
        if (!action) {
            throw new TypeError('Invalid action');
        }
        if (!resourceRef) {
            throw new TypeError('Invalid resource ref');
        }
        const permissions = this.permissionMap[action][resourceRef];
        if (!permissions.length) {
            return false;
        }
        return (await Promise.all(permissions.map(([identity, action]) => this.hasPermission(user, identity, action)))).every(Boolean);
    }
    async canActivate(ctx) {
        const { query, _parsedUrl, method, user, params } = ctx
            .switchToHttp()
            .getRequest();
        switch (method) {
            case 'GET': {
                if (params && 'id' in params && mongoose_1.Types.ObjectId.isValid(params.id)) {
                    const attachment = await this.attachmentService.findOne(params.id);
                    if (!attachment) {
                        throw new common_1.NotFoundException('Attachment not found!');
                    }
                    return await this.isAuthorized(action_type_1.Action.READ, user, attachment.resourceRef);
                }
                else if (query.where) {
                    const { resourceRef = [] } = query.where;
                    if (!(0, utilities_1.isAttachmentResourceRefArray)(resourceRef)) {
                        throw new common_1.BadRequestException('Invalid resource ref');
                    }
                    return (await Promise.all(resourceRef.map((c) => this.isAuthorized(action_type_1.Action.READ, user, c)))).every(Boolean);
                }
                else {
                    throw new common_1.BadRequestException('Invalid params');
                }
            }
            case 'POST': {
                const { resourceRef = '' } = query;
                if (!(0, utilities_1.isAttachmentResourceRef)(resourceRef)) {
                    throw new common_1.BadRequestException('Invalid resource ref');
                }
                return await this.isAuthorized(action_type_1.Action.CREATE, user, resourceRef);
            }
            case 'DELETE': {
                if (params && 'id' in params && mongoose_1.Types.ObjectId.isValid(params.id)) {
                    const attachment = await this.attachmentService.findOne(params.id);
                    if (!attachment) {
                        throw new common_1.NotFoundException('Invalid attachment ID');
                    }
                    return await this.isAuthorized(action_type_1.Action.DELETE, user, attachment.resourceRef);
                }
                else {
                    throw new common_1.BadRequestException('Invalid params');
                }
            }
            default:
                throw new common_1.BadRequestException('Invalid operation');
        }
    }
};
exports.AttachmentGuard = AttachmentGuard;
exports.AttachmentGuard = AttachmentGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permission_service_1.PermissionService,
        model_service_1.ModelService,
        attachment_service_1.AttachmentService])
], AttachmentGuard);
//# sourceMappingURL=attachment-ability.guard.js.map