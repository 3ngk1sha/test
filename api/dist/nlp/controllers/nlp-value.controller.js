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
exports.NlpValueController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const populate_pipe_1 = require("../../utils/pipes/populate.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const format_types_1 = require("../../utils/types/format.types");
const nlp_value_dto_1 = require("../dto/nlp-value.dto");
const nlp_entity_service_1 = require("../services/nlp-entity.service");
const nlp_value_service_1 = require("../services/nlp-value.service");
let NlpValueController = class NlpValueController extends base_controller_1.BaseController {
    constructor(nlpValueService, nlpEntityService) {
        super(nlpValueService);
        this.nlpValueService = nlpValueService;
        this.nlpEntityService = nlpEntityService;
    }
    async create(createNlpValueDto) {
        this.validate({
            dto: createNlpValueDto,
            allowedIds: {
                entity: createNlpValueDto.entity
                    ? (await this.nlpEntityService.findOne(createNlpValueDto.entity))?.id
                    : null,
            },
        });
        return await this.nlpValueService.create(createNlpValueDto);
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id, populate) {
        const doc = this.canPopulate(populate)
            ? await this.nlpValueService.findOneAndPopulate(id)
            : await this.nlpValueService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find NLP Value by id ${id}`);
            throw new common_1.NotFoundException(`NLP Value with ID ${id} not found`);
        }
        return doc;
    }
    async findWithCount(pageQuery, populate, filters) {
        return await this.nlpValueService.findWithCount(this.canPopulate(populate) ? format_types_1.Format.FULL : format_types_1.Format.STUB, pageQuery, filters);
    }
    async updateOne(id, updateNlpValueDto) {
        return await this.nlpValueService.updateOne(id, updateNlpValueDto);
    }
    async deleteOne(id) {
        const result = await this.nlpValueService.deleteCascadeOne(id);
        if (result.deletedCount === 0) {
            this.logger.warn(`Unable to delete NLP Value by id ${id}`);
            throw new common_1.NotFoundException(`NLP Value with ID ${id} not found`);
        }
        return result;
    }
    async deleteMany(ids) {
        if (!ids?.length) {
            throw new common_1.BadRequestException('No IDs provided for deletion.');
        }
        const deleteResult = await this.nlpValueService.deleteMany({
            _id: { $in: ids },
        });
        if (deleteResult.deletedCount === 0) {
            this.logger.warn(`Unable to delete NLP values with provided IDs: ${ids}`);
            throw new common_1.NotFoundException('NLP values with provided IDs not found');
        }
        this.logger.log(`Successfully deleted NLP values with IDs: ${ids}`);
        return deleteResult;
    }
};
exports.NlpValueController = NlpValueController;
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nlp_value_dto_1.NlpValueCreateDto]),
    __metadata("design:returntype", Promise)
], NlpValueController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['entity', 'value', 'doc'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NlpValueController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], NlpValueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __param(2, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['entity', 'value', 'doc'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], NlpValueController.prototype, "findWithCount", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, nlp_value_dto_1.NlpValueUpdateDto]),
    __metadata("design:returntype", Promise)
], NlpValueController.prototype, "updateOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NlpValueController.prototype, "deleteOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(''),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], NlpValueController.prototype, "deleteMany", null);
exports.NlpValueController = NlpValueController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('nlpvalue'),
    __metadata("design:paramtypes", [nlp_value_service_1.NlpValueService,
        nlp_entity_service_1.NlpEntityService])
], NlpValueController);
//# sourceMappingURL=nlp-value.controller.js.map