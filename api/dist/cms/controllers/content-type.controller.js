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
exports.ContentTypeController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const contentType_dto_1 = require("../dto/contentType.dto");
const content_type_service_1 = require("../services/content-type.service");
let ContentTypeController = class ContentTypeController extends base_controller_1.BaseController {
    constructor(contentTypeService) {
        super(contentTypeService);
        this.contentTypeService = contentTypeService;
    }
    async create(contentTypeDto) {
        return await this.contentTypeService.create(contentTypeDto);
    }
    async findPage(pageQuery, filters) {
        return await this.contentTypeService.find(filters, pageQuery);
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id) {
        const foundContentType = await this.contentTypeService.findOne(id);
        if (!foundContentType) {
            this.logger.warn(`Failed to fetch content type with id ${id}. Content type not found.`);
            throw new common_1.NotFoundException(`Content type with id ${id} not found`);
        }
        return foundContentType;
    }
    async deleteOne(id) {
        const removedType = await this.contentTypeService.deleteCascadeOne(id);
        if (removedType.deletedCount === 0) {
            this.logger.warn(`Failed to delete content type with id ${id}. Content type not found.`);
            throw new common_1.NotFoundException(`Content type with id ${id} not found`);
        }
        return removedType;
    }
    async updateOne(contentTypeDto, id) {
        return await this.contentTypeService.updateOne(id, contentTypeDto);
    }
};
exports.ContentTypeController = ContentTypeController;
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contentType_dto_1.ContentTypeCreateDto]),
    __metadata("design:returntype", Promise)
], ContentTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['name'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentTypeController.prototype, "findPage", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['name'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentTypeController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentTypeController.prototype, "findOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentTypeController.prototype, "deleteOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contentType_dto_1.ContentTypeUpdateDto, String]),
    __metadata("design:returntype", Promise)
], ContentTypeController.prototype, "updateOne", null);
exports.ContentTypeController = ContentTypeController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('contenttype'),
    __metadata("design:paramtypes", [content_type_service_1.ContentTypeService])
], ContentTypeController);
//# sourceMappingURL=content-type.controller.js.map