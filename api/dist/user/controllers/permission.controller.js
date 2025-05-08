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
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const populate_pipe_1 = require("../../utils/pipes/populate.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const permission_dto_1 = require("../dto/permission.dto");
const model_service_1 = require("../services/model.service");
const permission_service_1 = require("../services/permission.service");
const role_service_1 = require("../services/role.service");
let PermissionController = class PermissionController extends base_controller_1.BaseController {
    constructor(permissionService, roleService, modelService) {
        super(permissionService);
        this.permissionService = permissionService;
        this.roleService = roleService;
        this.modelService = modelService;
    }
    async find(populate, filters) {
        return this.canPopulate(populate)
            ? await this.permissionService.findAndPopulate(filters)
            : await this.permissionService.find(filters);
    }
    async create(permission) {
        const role = await this.roleService.findOne(permission.role);
        if (!role) {
            throw new common_1.NotFoundException('Unable to find role');
        }
        const model = await this.modelService.findOne(permission.model);
        if (!model) {
            throw new common_1.NotFoundException('Unable to find model');
        }
        return await this.permissionService.create(permission);
    }
    async deleteOne(id) {
        const result = await this.permissionService.deleteOne(id);
        if (result.deletedCount === 0) {
            this.logger.warn(`Unable to delete Permission by id ${id}`);
            throw new common_1.NotFoundException(`Permission with ID ${id} not found`);
        }
        return result;
    }
};
exports.PermissionController = PermissionController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __param(1, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['model', 'role'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "find", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_dto_1.PermissionCreateDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "create", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "deleteOne", null);
exports.PermissionController = PermissionController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('permission'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService,
        role_service_1.RoleService,
        model_service_1.ModelService])
], PermissionController);
//# sourceMappingURL=permission.controller.js.map