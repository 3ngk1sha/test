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
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const populate_pipe_1 = require("../../utils/pipes/populate.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const content_dto_1 = require("../dto/content.dto");
const content_type_service_1 = require("./../services/content-type.service");
const content_service_1 = require("./../services/content.service");
let ContentController = class ContentController extends base_controller_1.BaseController {
    constructor(contentService, contentTypeService) {
        super(contentService);
        this.contentService = contentService;
        this.contentTypeService = contentTypeService;
    }
    async create(contentDto) {
        const contentType = await this.contentTypeService.findOne(contentDto.entity);
        this.validate({
            dto: contentDto,
            allowedIds: {
                entity: contentType?.id,
            },
        });
        return await this.contentService.create(contentDto);
    }
    async import(file, targetContentType) {
        const datasetContent = file.buffer.toString('utf-8');
        if (!targetContentType) {
            this.logger.warn(`Parameter is missing`);
            throw new common_1.NotFoundException(`Missing parameter`);
        }
        const contentType = await this.contentTypeService.findOne(targetContentType);
        if (!contentType) {
            this.logger.warn(`Failed to fetch content type with id ${targetContentType}. Content type not found.`);
            throw new common_1.NotFoundException(`Content type is not found`);
        }
        return await this.contentService.parseAndSaveDataset(datasetContent, targetContentType, contentType);
    }
    async findPage(pageQuery, populate, filters) {
        return this.canPopulate(populate)
            ? await this.contentService.findAndPopulate(filters, pageQuery)
            : await this.contentService.find(filters, pageQuery);
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id, populate) {
        const doc = this.canPopulate(populate)
            ? await this.contentService.findOneAndPopulate(id)
            : await this.contentService.findOne(id);
        if (!doc) {
            this.logger.warn(`Failed to fetch content with id ${id}. Content not found.`);
            throw new common_1.NotFoundException(`Content of id ${id} not found`);
        }
        return doc;
    }
    async deleteOne(id) {
        const removedContent = await this.contentService.deleteOne(id);
        if (removedContent.deletedCount === 0) {
            this.logger.warn(`Failed to delete content with id ${id}. Content not found.`);
            throw new common_1.NotFoundException(`Content of id ${id} not found`);
        }
        return removedContent;
    }
    async findByType(contentType, pageQuery) {
        const type = await this.contentTypeService.findOne(contentType);
        if (!type) {
            this.logger.warn(`Failed to find content with contentType ${contentType}. ContentType not found.`);
            throw new common_1.NotFoundException(`ContentType of id ${contentType} not found`);
        }
        return await this.contentService.find({ entity: contentType }, pageQuery);
    }
    async updateOne(contentDto, id) {
        return await this.contentService.updateOne(id, contentDto);
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_dto_1.ContentCreateDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "create", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)('import'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('idTargetContentType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "import", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __param(2, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['entity', 'title'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findPage", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['entity', 'title'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.Get)('/type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findByType", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_dto_1.ContentUpdateDto, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "updateOne", null);
exports.ContentController = ContentController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('content'),
    __metadata("design:paramtypes", [content_service_1.ContentService,
        content_type_service_1.ContentTypeService])
], ContentController);
//# sourceMappingURL=content.controller.js.map