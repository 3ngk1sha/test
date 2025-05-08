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
var I18nModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const nestjs_i18n_1 = require("nestjs-i18n");
const rxjs_1 = require("rxjs");
const chat_module_1 = require("../chat/chat.module");
const i18n_controller_1 = require("./controllers/i18n.controller");
const language_controller_1 = require("./controllers/language.controller");
const translation_controller_1 = require("./controllers/translation.controller");
const language_repository_1 = require("./repositories/language.repository");
const translation_repository_1 = require("./repositories/translation.repository");
const language_schema_1 = require("./schemas/language.schema");
const translation_schema_1 = require("./schemas/translation.schema");
const language_seed_1 = require("./seeds/language.seed");
const translation_seed_1 = require("./seeds/translation.seed");
const i18n_service_1 = require("./services/i18n.service");
const language_service_1 = require("./services/language.service");
const translation_service_1 = require("./services/translation.service");
let I18nModule = I18nModule_1 = class I18nModule extends nestjs_i18n_1.I18nModule {
    constructor(i18n, translations, i18nOptions, adapter) {
        super(i18n, translations, i18nOptions, adapter);
    }
    static forRoot(options) {
        const { imports, providers, controllers, exports } = super.forRoot(options);
        if (!providers || !exports) {
            throw new common_1.InternalServerErrorException('I18n: Unable to find providers and/or exports forRoot()');
        }
        return {
            module: I18nModule_1,
            imports: (imports || []).concat([
                mongoose_1.MongooseModule.forFeature([language_schema_1.LanguageModel, translation_schema_1.TranslationModel]),
                (0, common_1.forwardRef)(() => chat_module_1.ChatModule),
            ]),
            controllers: (controllers || []).concat([
                language_controller_1.LanguageController,
                translation_controller_1.TranslationController,
                i18n_controller_1.I18nController,
            ]),
            providers: providers.concat([
                i18n_service_1.I18nService,
                language_repository_1.LanguageRepository,
                language_service_1.LanguageService,
                language_seed_1.LanguageSeeder,
                translation_repository_1.TranslationRepository,
                translation_service_1.TranslationService,
                translation_seed_1.TranslationSeeder,
            ]),
            exports: exports.concat(i18n_service_1.I18nService, language_service_1.LanguageService),
        };
    }
};
exports.I18nModule = I18nModule;
exports.I18nModule = I18nModule = I18nModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({}),
    __param(1, (0, common_1.Inject)(nestjs_i18n_1.I18N_TRANSLATIONS)),
    __param(2, (0, common_1.Inject)(nestjs_i18n_1.I18N_OPTIONS)),
    __metadata("design:paramtypes", [i18n_service_1.I18nService,
        rxjs_1.Observable, Object, core_1.HttpAdapterHost])
], I18nModule);
//# sourceMappingURL=i18n.module.js.map