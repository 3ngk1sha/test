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
exports.NlpSampleController = void 0;
const stream_1 = require("stream");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const helper_service_1 = require("../../helper/helper.service");
const types_1 = require("../../helper/types");
const language_service_1 = require("../../i18n/services/language.service");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const populate_pipe_1 = require("../../utils/pipes/populate.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const nlp_sample_dto_1 = require("../dto/nlp-sample.dto");
const types_2 = require("../schemas/types");
const nlp_entity_service_1 = require("../services/nlp-entity.service");
const nlp_sample_entity_service_1 = require("../services/nlp-sample-entity.service");
const nlp_sample_service_1 = require("../services/nlp-sample.service");
let NlpSampleController = class NlpSampleController extends base_controller_1.BaseController {
    constructor(nlpSampleService, nlpSampleEntityService, nlpEntityService, languageService, helperService) {
        super(nlpSampleService);
        this.nlpSampleService = nlpSampleService;
        this.nlpSampleEntityService = nlpSampleEntityService;
        this.nlpEntityService = nlpEntityService;
        this.languageService = languageService;
        this.helperService = helperService;
    }
    async annotateWithKeywordEntity(entityId) {
        const entity = await this.nlpEntityService.findOneAndPopulate(entityId);
        if (!entity) {
            throw new common_1.NotFoundException('Unable to find the keyword entity.');
        }
        if (!entity.lookups.includes('keywords')) {
            throw new common_1.BadRequestException('Cannot annotate samples with a non-keyword entity');
        }
        await this.nlpSampleService.annotateWithKeywordEntity(entity);
        return {
            success: true,
        };
    }
    async export(response, type) {
        const samples = await this.nlpSampleService.findAndPopulate(type ? { type } : {});
        const entities = await this.nlpEntityService.findAllAndPopulate();
        const helper = await this.helperService.getDefaultHelper(types_1.HelperType.NLU);
        const result = await helper.format(samples, entities);
        const buffer = Buffer.from(JSON.stringify(result));
        const readableInstance = new stream_1.Readable({
            read() {
                this.push(buffer);
                this.push(null);
            },
        });
        return new common_1.StreamableFile(readableInstance, {
            type: 'application/json',
            disposition: `attachment; filename=nlp_export${type ? `_${type}` : ''}.json`,
        });
    }
    async create({ entities: nlpEntities, language: languageCode, ...createNlpSampleDto }) {
        const language = await this.languageService.getLanguageByCode(languageCode);
        const nlpSample = await this.nlpSampleService.create({
            ...createNlpSampleDto,
            language: language.id,
        });
        const entities = nlpEntities
            ? await this.nlpSampleEntityService.storeSampleEntities(nlpSample, nlpEntities)
            : [];
        return {
            ...nlpSample,
            entities,
            language,
        };
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async message(text) {
        const helper = await this.helperService.getDefaultHelper(types_1.HelperType.NLU);
        return helper.predict(text);
    }
    async train() {
        const { samples, entities } = await this.nlpSampleService.getAllSamplesAndEntitiesByType('train');
        try {
            const helper = await this.helperService.getDefaultHelper(types_1.HelperType.NLU);
            const response = await helper.train?.(samples, entities);
            await this.nlpSampleService.updateMany({ type: 'train' }, { trained: true });
            return response;
        }
        catch (err) {
            this.logger.error(err);
            throw new common_1.InternalServerErrorException('Unable to perform the train operation');
        }
    }
    async evaluate() {
        const { samples, entities } = await this.nlpSampleService.getAllSamplesAndEntitiesByType('test');
        const helper = await this.helperService.getDefaultHelper(types_1.HelperType.NLU);
        return await helper.evaluate?.(samples, entities);
    }
    async findOne(id, populate) {
        const doc = this.canPopulate(populate)
            ? await this.nlpSampleService.findOneAndPopulate(id)
            : await this.nlpSampleService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find NLP Sample by id ${id}`);
            throw new common_1.NotFoundException(`NLP Sample with ID ${id} not found`);
        }
        return doc;
    }
    async findPage(pageQuery, populate, filters) {
        return this.canPopulate(populate)
            ? await this.nlpSampleService.findAndPopulate(filters, pageQuery)
            : await this.nlpSampleService.find(filters, pageQuery);
    }
    async updateOne(id, { entities, language: languageCode, ...sampleAttrs }) {
        const language = await this.languageService.getLanguageByCode(languageCode);
        const sample = await this.nlpSampleService.updateOne(id, {
            ...sampleAttrs,
            language: language.id,
            trained: false,
        });
        await this.nlpSampleEntityService.deleteMany({ sample: id });
        const updatedSampleEntities = await this.nlpSampleEntityService.storeSampleEntities(sample, entities || []);
        return {
            ...sample,
            language,
            entities: updatedSampleEntities,
        };
    }
    async deleteOne(id) {
        const result = await this.nlpSampleService.deleteCascadeOne(id);
        if (result.deletedCount === 0) {
            this.logger.warn(`Unable to delete NLP Sample by id ${id}`);
            throw new common_1.NotFoundException(`NLP Sample with ID ${id} not found`);
        }
        return result;
    }
    async deleteMany(ids) {
        if (!ids?.length) {
            throw new common_1.BadRequestException('No IDs provided for deletion.');
        }
        const deleteResult = await this.nlpSampleService.deleteMany({
            _id: { $in: ids },
        });
        if (deleteResult.deletedCount === 0) {
            this.logger.warn(`Unable to delete NLP samples with provided IDs: ${ids}`);
            throw new common_1.NotFoundException('NLP samples with provided IDs not found');
        }
        this.logger.log(`Successfully deleted NLP samples with IDs: ${ids}`);
        return deleteResult;
    }
    async importFile(file) {
        const datasetContent = file.buffer.toString('utf-8');
        return await this.nlpSampleService.parseAndSaveDataset(datasetContent);
    }
};
exports.NlpSampleController = NlpSampleController;
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)('annotate/:entityId'),
    __param(0, (0, common_1.Param)('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "annotateWithKeywordEntity", null);
__decorate([
    (0, common_1.Get)('export'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "export", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nlp_sample_dto_1.NlpSampleDto]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['text', 'type', 'language'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)('message'),
    __param(0, (0, common_1.Query)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "message", null);
__decorate([
    (0, common_1.Get)('train'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "train", null);
__decorate([
    (0, common_1.Get)('evaluate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "evaluate", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __param(2, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['text', 'type', 'language'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "findPage", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, nlp_sample_dto_1.NlpSampleDto]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "updateOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "deleteOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(''),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "deleteMany", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)('import'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NlpSampleController.prototype, "importFile", null);
exports.NlpSampleController = NlpSampleController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('nlpsample'),
    __metadata("design:paramtypes", [nlp_sample_service_1.NlpSampleService,
        nlp_sample_entity_service_1.NlpSampleEntityService,
        nlp_entity_service_1.NlpEntityService,
        language_service_1.LanguageService,
        helper_service_1.HelperService])
], NlpSampleController);
//# sourceMappingURL=nlp-sample.controller.js.map