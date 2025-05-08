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
exports.PermissionService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_1 = require("../../utils/constants/cache");
const cacheable_decorator_1 = require("../../utils/decorators/cacheable.decorator");
const base_service_1 = require("../../utils/generics/base-service");
const permission_repository_1 = require("../repositories/permission.repository");
let PermissionService = class PermissionService extends base_service_1.BaseService {
    constructor(repository, cacheManager) {
        super(repository);
        this.repository = repository;
        this.cacheManager = cacheManager;
    }
    async handlePermissionUpdateEvent() {
        await this.cacheManager.del(cache_1.PERMISSION_CACHE_KEY);
    }
    async getPermissions() {
        const currentModels = await this.findAllAndPopulate();
        return this.buildTree(currentModels);
    }
    buildTree(permissions) {
        return permissions.reduce((acc, p) => {
            const role = p.role.id;
            const model = p.model.identity;
            acc[role] = acc[role] || {};
            acc[role][model] = acc[role][model] || [];
            acc[role][model].push(p.action);
            return acc;
        }, {});
    }
};
exports.PermissionService = PermissionService;
__decorate([
    (0, event_emitter_1.OnEvent)('hook:role:*'),
    (0, event_emitter_1.OnEvent)('hook:permission:*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionService.prototype, "handlePermissionUpdateEvent", null);
__decorate([
    (0, cacheable_decorator_1.Cacheable)(cache_1.PERMISSION_CACHE_KEY),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionService.prototype, "getPermissions", null);
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [permission_repository_1.PermissionRepository, Object])
], PermissionService);
//# sourceMappingURL=permission.service.js.map