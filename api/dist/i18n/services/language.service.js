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
exports.LanguageService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const cache_1 = require("../../utils/constants/cache");
const cacheable_decorator_1 = require("../../utils/decorators/cacheable.decorator");
const base_service_1 = require("../../utils/generics/base-service");
const language_repository_1 = require("../repositories/language.repository");
let LanguageService = class LanguageService extends base_service_1.BaseService {
    constructor(repository, cacheManager) {
        super(repository);
        this.repository = repository;
        this.cacheManager = cacheManager;
    }
    async getLanguages() {
        const languages = await this.findAll();
        return languages.reduce((acc, curr) => {
            return {
                ...acc,
                [curr.code]: curr,
            };
        }, {});
    }
    async getDefaultLanguage() {
        const defaultLanguage = await this.findOne({ isDefault: true });
        if (!defaultLanguage) {
            throw new common_1.InternalServerErrorException('Default language not found: getDefaultLanguage()');
        }
        return defaultLanguage;
    }
    async getLanguageByCode(code) {
        const language = await this.findOne({ code });
        if (!language) {
            this.logger.warn(`Unable to Language by languageCode ${code}`);
            throw new common_1.NotFoundException(`Language with languageCode ${code} not found`);
        }
        return language;
    }
};
exports.LanguageService = LanguageService;
__decorate([
    (0, cacheable_decorator_1.Cacheable)(cache_1.LANGUAGES_CACHE_KEY),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LanguageService.prototype, "getLanguages", null);
__decorate([
    (0, cacheable_decorator_1.Cacheable)(cache_1.DEFAULT_LANGUAGE_CACHE_KEY),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LanguageService.prototype, "getDefaultLanguage", null);
exports.LanguageService = LanguageService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [language_repository_1.LanguageRepository, Object])
], LanguageService);
//# sourceMappingURL=language.service.js.map