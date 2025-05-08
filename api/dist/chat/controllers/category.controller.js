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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const category_dto_1 = require("../dto/category.dto");
const category_service_1 = require("../services/category.service");
let CategoryController = class CategoryController extends base_controller_1.BaseController {
    constructor(categoryService) {
        super(categoryService);
        this.categoryService = categoryService;
    }
    async findPage(pageQuery, filters) {
        return await this.categoryService.find(filters, pageQuery);
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id) {
        const doc = await this.categoryService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find Category by id ${id}`);
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return doc;
    }
    async create(category) {
        return await this.categoryService.create(category);
    }
    async updateOne(id, categoryUpdate) {
        return await this.categoryService.updateOne(id, categoryUpdate);
    }
    async deleteOne(id) {
        const result = await this.categoryService.deleteOne(id);
        if (result.deletedCount === 0) {
            this.logger.warn(`Unable to delete Category by id ${id}`);
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return result;
    }
    async deleteMany(ids) {
        if (!ids?.length) {
            throw new common_1.BadRequestException('No IDs provided for deletion.');
        }
        const deleteResult = await this.categoryService.deleteMany({
            _id: { $in: ids },
        });
        if (deleteResult.deletedCount === 0) {
            this.logger.warn(`Unable to delete categories with provided IDs: ${ids}`);
            throw new common_1.NotFoundException('Categories with provided IDs not found');
        }
        this.logger.log(`Successfully deleted categories with IDs: ${ids}`);
        return deleteResult;
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['label'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findPage", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['label'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryCreateDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_dto_1.CategoryUpdateDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(''),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteMany", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map