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
exports.Ability = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const event_emitter_1 = require("@nestjs/event-emitter");
const permission_service_1 = require("../services/permission.service");
const action_type_1 = require("../types/action.type");
let Ability = class Ability {
    constructor(reflector, permissionService, eventEmitter) {
        this.reflector = reflector;
        this.permissionService = permissionService;
        this.eventEmitter = eventEmitter;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (roles?.includes('public')) {
            return true;
        }
        const { user, method, _parsedUrl, session } = context
            .switchToHttp()
            .getRequest();
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        if (!session?.cookie || session.cookie.expires < new Date()) {
            throw new common_1.UnauthorizedException('Session expired');
        }
        if (user?.roles?.length) {
            if (_parsedUrl.pathname &&
                [
                    '/auth/logout',
                    '/logout',
                    '/auth/me',
                    '/channel',
                    '/i18n',
                    `/user/edit/${user.id}`,
                    `/user/${user.id}/profile_pic`,
                ].includes(_parsedUrl.pathname)) {
                return true;
            }
            const modelFromPathname = _parsedUrl?.pathname
                ?.split('/')[1]
                .toLowerCase();
            const permissions = await this.permissionService.getPermissions();
            if (permissions) {
                const permissionsFromRoles = Object.entries(permissions)
                    .filter(([key, _]) => user.roles.includes(key))
                    .map(([_, value]) => value);
                if (modelFromPathname &&
                    permissionsFromRoles.some((permission) => permission[modelFromPathname]?.includes(action_type_1.MethodToAction[method]))) {
                    return true;
                }
            }
            else {
                throw new common_1.NotFoundException('Failed to load permissions');
            }
        }
        return false;
    }
};
exports.Ability = Ability;
exports.Ability = Ability = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        permission_service_1.PermissionService,
        event_emitter_1.EventEmitter2])
], Ability);
//# sourceMappingURL=ability.guard.js.map