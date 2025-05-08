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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const handlebars_1 = __importDefault(require("handlebars"));
const helper_service_1 = require("../../../helper/helper.service");
const base_nlp_helper_1 = __importDefault(require("../../../helper/lib/base-nlp-helper"));
const types_1 = require("../../../helper/types");
const language_service_1 = require("../../../i18n/services/language.service");
const logger_service_1 = require("../../../logger/logger.service");
const nlp_entity_service_1 = require("../../../nlp/services/nlp-entity.service");
const setting_service_1 = require("../../../setting/services/setting.service");
const settings_1 = require("./settings");
let LlmNluHelper = class LlmNluHelper extends base_nlp_helper_1.default {
    constructor(settingService, helperService, logger, languageService, nlpEntityService) {
        super(settings_1.LLM_NLU_HELPER_NAME, settingService, helperService, logger);
        this.languageService = languageService;
        this.nlpEntityService = nlpEntityService;
    }
    getPath() {
        return __dirname;
    }
    async buildLanguageClassifierPrompt() {
        const settings = await this.getSettings();
        if (settings) {
            const languages = await this.languageService.findAll();
            const delegate = handlebars_1.default.compile(settings.language_classifier_prompt_template);
            this.languageClassifierPrompt = delegate({ languages });
        }
    }
    async buildClassifiersPrompt() {
        const settings = await this.getSettings();
        if (settings) {
            const entities = await this.nlpEntityService.findAndPopulate({
                lookups: 'trait',
            });
            const traitEntities = entities.filter(({ lookups }) => lookups.includes('trait'));
            this.traitClassifierPrompts = traitEntities.map((entity) => ({
                ...entity,
                prompt: handlebars_1.default.compile(settings.trait_classifier_prompt_template)({
                    entity,
                }),
            }));
        }
    }
    async onModuleInit() {
        super.onModuleInit();
        await this.buildLanguageClassifierPrompt();
        await this.buildClassifiersPrompt();
    }
    findKeywordEntities(text, entity) {
        return (entity.values
            .flatMap(({ value, expressions }) => {
            const allValues = [value, ...expressions];
            return allValues
                .flatMap((term) => {
                const regex = new RegExp(`\\b${term}\\b`, 'g');
                const matches = [...text.matchAll(regex)];
                return matches.map((match) => ({
                    entity: entity.name,
                    value: term,
                    start: match.index,
                    end: match.index + term.length,
                    confidence: 1,
                }));
            })
                .shift();
        })
            .filter((v) => !!v) || []);
    }
    async predict(text) {
        const settings = await this.getSettings();
        const helper = await this.helperService.getDefaultLlmHelper();
        const defaultLanguage = await this.languageService.getDefaultLanguage();
        const language = await helper.generateStructuredResponse?.(`input text: ${text}`, settings.model, this.languageClassifierPrompt, {
            type: types_1.LLM.ResponseSchemaType.STRING,
            description: 'Language of the input text',
        });
        const traits = [
            {
                entity: 'language',
                value: language || defaultLanguage.code,
                confidence: 1,
            },
        ];
        for await (const { name, doc, prompt, values } of this
            .traitClassifierPrompts) {
            const allowedValues = values.map(({ value }) => value);
            const result = await helper.generateStructuredResponse?.(`input text: ${text}`, settings.model, prompt, {
                type: types_1.LLM.ResponseSchemaType.STRING,
                description: `${name}${doc ? `: ${doc}` : ''}`,
                enum: allowedValues.concat('unknown'),
            });
            const safeValue = result?.toLowerCase().trim();
            const value = safeValue && allowedValues.includes(safeValue) ? safeValue : '';
            traits.push({
                entity: name,
                value,
                confidence: 1,
            });
        }
        const keywordEntities = await this.nlpEntityService.findAndPopulate({
            lookups: 'keywords',
        });
        const entities = keywordEntities.flatMap((keywordEntity) => this.findKeywordEntities(text, keywordEntity));
        return { entities: traits.concat(entities) };
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('hook:language:*'),
    (0, event_emitter_1.OnEvent)('hook:llm_nlu_helper:language_classifier_prompt_template'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LlmNluHelper.prototype, "buildLanguageClassifierPrompt", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:nlpEntity:*'),
    (0, event_emitter_1.OnEvent)('hook:nlpValue:*'),
    (0, event_emitter_1.OnEvent)('hook:llm_nlu_helper:trait_classifier_prompt_template'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LlmNluHelper.prototype, "buildClassifiersPrompt", null);
LlmNluHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [setting_service_1.SettingService,
        helper_service_1.HelperService,
        logger_service_1.LoggerService,
        language_service_1.LanguageService,
        nlp_entity_service_1.NlpEntityService])
], LlmNluHelper);
exports.default = LlmNluHelper;
//# sourceMappingURL=index.helper.js.map