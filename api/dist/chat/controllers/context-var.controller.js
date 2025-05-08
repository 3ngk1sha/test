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
exports.ContextVarController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const context_var_dto_1 = require("../dto/context-var.dto");
const context_var_service_1 = require("../services/context-var.service");
let ContextVarController = class ContextVarController extends base_controller_1.BaseController {
    constructor(contextVarService) {
        super(contextVarService);
        this.contextVarService = contextVarService;
    }
    async findPage(pageQuery, filters) {
        return await this.contextVarService.find(filters, pageQuery);
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id) {
        const doc = await this.contextVarService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find ContextVar by id ${id}`);
            throw new common_1.NotFoundException(`ContextVar with ID ${id} not found`);
        }
        return doc;
    }
    async create(contextVar) {
        return await this.contextVarService.create(contextVar);
    }
    async updateOne(id, contextVarUpdate) {
        return await this.contextVarService.updateOne(id, contextVarUpdate);
    }
    async deleteOne(id) {
        const result = await this.contextVarService.deleteOne(id);
        if (result.deletedCount === 0) {
            this.logger.warn(`Unable to delete ContextVar by id ${id}`);
            throw new common_1.NotFoundException(`ContextVar with ID ${id} not found`);
        }
        return result;
    }
    async deleteMany(ids) {
        if (!ids?.length) {
            throw new common_1.BadRequestException('No IDs provided for deletion.');
        }
        const deleteResult = await this.contextVarService.deleteMany({
            _id: { $in: ids },
        });
        if (deleteResult.deletedCount === 0) {
            this.logger.warn(`Unable to delete context vars with provided IDs: ${ids}`);
            throw new common_1.NotFoundException('Context vars with provided IDs not found');
        }
        this.logger.log(`Successfully deleted context vars with IDs: ${ids}`);
        return deleteResult;
    }
};
exports.ContextVarController = ContextVarController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['label'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContextVarController.prototype, "findPage", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['label'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContextVarController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContextVarController.prototype, "findOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [context_var_dto_1.ContextVarCreateDto]),
    __metadata("design:returntype", Promise)
], ContextVarController.prototype, "create", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, context_var_dto_1.ContextVarUpdateDto]),
    __metadata("design:returntype", Promise)
], ContextVarController.prototype, "updateOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContextVarController.prototype, "deleteOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(''),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ContextVarController.prototype, "deleteMany", null);
exports.ContextVarController = ContextVarController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('contextvar'),
    __metadata("design:paramtypes", [context_var_service_1.ContextVarService])
], ContextVarController);
//# sourceMappingURL=context-var.controller.js.map