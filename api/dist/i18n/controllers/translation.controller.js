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
exports.TranslationController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const translation_dto_1 = require("../dto/translation.dto");
const language_service_1 = require("../services/language.service");
const translation_service_1 = require("../services/translation.service");
let TranslationController = class TranslationController extends base_controller_1.BaseController {
    constructor(languageService, translationService) {
        super(translationService);
        this.languageService = languageService;
        this.translationService = translationService;
    }
    async findPage(pageQuery, filters) {
        return await this.translationService.find(filters, pageQuery);
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id) {
        const doc = await this.translationService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find Translation by id ${id}`);
            throw new common_1.NotFoundException(`Translation with ID ${id} not found`);
        }
        return doc;
    }
    async updateOne(id, translationUpdate) {
        return await this.translationService.updateOne(id, translationUpdate);
    }
    async refresh() {
        const defaultLanguage = await this.languageService.getDefaultLanguage();
        const languages = await this.languageService.getLanguages();
        const defaultTrans = Object.keys(languages)
            .filter((lang) => lang !== defaultLanguage.code)
            .reduce((acc, curr) => {
            acc[curr] = '';
            return acc;
        }, {});
        let strings = await this.translationService.getAllBlockStrings();
        const settingStrings = await this.translationService.getSettingStrings();
        strings = strings.concat(settingStrings);
        strings = strings.filter((str, pos) => {
            return str && strings.indexOf(str) == pos;
        });
        const queue = strings.map((str) => this.translationService.findOneOrCreate({ str }, { str, translations: defaultTrans }));
        await Promise.all(queue);
        return await this.translationService.deleteMany({
            str: { $nin: strings },
        });
    }
    async deleteOne(id) {
        const result = await this.translationService.deleteOne(id);
        if (result.deletedCount === 0) {
            this.logger.warn(`Unable to delete Translation by id ${id}`);
            throw new common_1.BadRequestException(`Unable to delete Translation with ID ${id}`);
        }
        return result;
    }
};
exports.TranslationController = TranslationController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['str'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "findPage", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['str'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "findOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, translation_dto_1.TranslationUpdateDto]),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "updateOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)('refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "refresh", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "deleteOne", null);
exports.TranslationController = TranslationController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('translation'),
    __metadata("design:paramtypes", [language_service_1.LanguageService,
        translation_service_1.TranslationService])
], TranslationController);
//# sourceMappingURL=translation.controller.js.map