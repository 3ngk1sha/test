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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const populate_pipe_1 = require("../../utils/pipes/populate.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const role_dto_1 = require("../dto/role.dto");
const role_service_1 = require("../services/role.service");
const user_service_1 = require("../services/user.service");
let RoleController = class RoleController extends base_controller_1.BaseController {
    constructor(roleService, userService) {
        super(roleService);
        this.roleService = roleService;
        this.userService = userService;
    }
    async findPage(pageQuery, populate, filters) {
        return this.canPopulate(populate)
            ? await this.roleService.findAndPopulate(filters, pageQuery)
            : await this.roleService.find(filters, pageQuery);
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id, populate) {
        const doc = this.canPopulate(populate)
            ? await this.roleService.findOneAndPopulate(id)
            : await this.roleService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find Role by id ${id}`);
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        return doc;
    }
    async create(role) {
        return await this.roleService.create(role);
    }
    async updateOne(id, roleUpdate) {
        return await this.roleService.updateOne(id, roleUpdate);
    }
    async deleteOne(id, req) {
        const userRoles = req.user.roles;
        const associatedUser = await this.userService.findOne({
            roles: { $in: [id] },
        });
        if (userRoles.includes(id)) {
            throw new common_1.ForbiddenException("Your account's role can't be deleted");
        }
        else if (associatedUser) {
            throw new common_1.ForbiddenException('Role is associated with other users');
        }
        else {
            const result = await this.roleService.deleteOne(id);
            if (result.deletedCount === 0) {
                throw new common_1.NotFoundException(`Role with ID ${id} not found`);
            }
            return result;
        }
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __param(2, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['name'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findPage", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['name'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleCreateDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, role_dto_1.RoleUpdateDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleteOne", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        user_service_1.UserService])
], RoleController);
//# sourceMappingURL=role.controller.js.map