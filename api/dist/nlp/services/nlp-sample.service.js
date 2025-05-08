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
exports.NlpSampleService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("mongoose");
const papaparse_1 = __importDefault(require("papaparse"));
const language_service_1 = require("../../i18n/services/language.service");
const base_service_1 = require("../../utils/generics/base-service");
const nlp_sample_repository_1 = require("../repositories/nlp-sample.repository");
const types_1 = require("../schemas/types");
const nlp_entity_service_1 = require("./nlp-entity.service");
const nlp_sample_entity_service_1 = require("./nlp-sample-entity.service");
let NlpSampleService = class NlpSampleService extends base_service_1.BaseService {
    constructor(repository, nlpSampleEntityService, nlpEntityService, languageService) {
        super(repository);
        this.repository = repository;
        this.nlpSampleEntityService = nlpSampleEntityService;
        this.nlpEntityService = nlpEntityService;
        this.languageService = languageService;
    }
    async getAllSamplesAndEntitiesByType(type) {
        const samples = await this.findAndPopulate({
            type,
        });
        const entities = await this.nlpEntityService.findAllAndPopulate();
        return { samples, entities };
    }
    async deleteCascadeOne(id) {
        return await this.repository.deleteOne(id);
    }
    async parseAndSaveDataset(data) {
        const allEntities = await this.nlpEntityService.findAll();
        if (allEntities.length === 0) {
            throw new common_1.NotFoundException('No entities found, please create them first.');
        }
        const result = papaparse_1.default.parse(data, {
            header: true,
            skipEmptyLines: true,
        });
        if (result.errors && result.errors.length > 0) {
            this.logger.warn(`Errors parsing the file: ${JSON.stringify(result.errors)}`);
            throw new common_1.BadRequestException(result.errors, {
                cause: result.errors,
                description: 'Error while parsing CSV',
            });
        }
        const filteredData = result.data.filter((d) => d.intent !== 'none');
        const languages = await this.languageService.getLanguages();
        const defaultLanguage = await this.languageService.getDefaultLanguage();
        const nlpSamples = [];
        for (const d of filteredData) {
            try {
                const existingSamples = await this.find({
                    text: d.text,
                });
                if (Array.isArray(existingSamples) && existingSamples.length > 0) {
                    continue;
                }
                if (!d.language || !(d.language in languages)) {
                    if (d.language) {
                        this.logger.warn(`Language "${d.language}" does not exist, falling back to default.`);
                    }
                    d.language = defaultLanguage.code;
                }
                const sample = {
                    text: d.text,
                    trained: false,
                    language: languages[d.language].id,
                };
                const entities = allEntities
                    .filter(({ name }) => name in d)
                    .map(({ name }) => ({
                    entity: name,
                    value: d[name],
                }));
                const storedEntities = await this.nlpEntityService.storeNewEntities(sample.text, entities, ['trait']);
                const createdSample = await this.create(sample);
                nlpSamples.push(createdSample);
                const sampleEntities = storedEntities.map((storedEntity) => ({
                    ...storedEntity,
                    sample: createdSample?.id,
                }));
                await this.nlpSampleEntityService.createMany(sampleEntities);
            }
            catch (err) {
                this.logger.error('Error occurred when extracting data. ', err);
            }
        }
        return nlpSamples;
    }
    async annotateWithKeywordEntity(entity) {
        for (const value of entity.values) {
            const keywords = [value.value, ...value.expressions];
            const samples = await this.find({
                text: { $regex: `\\b(${keywords.join('|')})\\b`, $options: 'i' },
                type: ['train', 'test'],
            });
            if (samples.length > 0) {
                this.logger.debug(`Annotating ${entity.name} - ${value.value} in ${samples.length} sample(s) ...`);
                for (const sample of samples) {
                    try {
                        const matches = this.nlpSampleEntityService.extractKeywordEntities(sample, value);
                        if (!matches.length) {
                            throw new Error('Something went wrong, unable to match keywords');
                        }
                        const updates = matches.map((dto) => this.nlpSampleEntityService.findOneOrCreate(dto, dto));
                        await Promise.all(updates);
                        this.logger.debug(`Successfully annotate sample with ${updates.length} matches: ${sample.text}`);
                    }
                    catch (err) {
                        this.logger.error(`Failed to annotate sample: ${sample.text}`);
                    }
                }
            }
        }
    }
    async handleLanguageDelete(_query, criteria) {
        const deletedLanguages = await this.languageService.find(criteria, undefined, {
            id: 1,
        });
        const deletedLanguagesIds = deletedLanguages.map((deletedLanguage) => deletedLanguage.id);
        this.logger.debug(`Found ${deletedLanguagesIds.length} languages to clean up`);
        if (deletedLanguagesIds.length > 0) {
            await this.updateMany({
                language: {
                    $in: deletedLanguagesIds,
                },
            }, {
                language: null,
            }).then((result) => {
                this.logger.debug(`Cleaned up languageId from ${result.modifiedCount} NLP samples`);
            });
        }
    }
    async handleNewMessage(doc) {
        if ('sender' in doc &&
            doc.sender &&
            'message' in doc &&
            'text' in doc.message) {
            const defaultLang = await this.languageService.getDefaultLanguage();
            const record = {
                text: doc.message.text,
                type: types_1.NlpSampleState.inbox,
                trained: false,
                language: defaultLang.id,
            };
            try {
                await this.findOneOrCreate(record, record);
                this.logger.debug('User message saved as a inbox sample !');
            }
            catch (err) {
                this.logger.warn('Unable to add message as a new inbox sample!', err);
            }
        }
    }
};
exports.NlpSampleService = NlpSampleService;
__decorate([
    (0, event_emitter_1.OnEvent)('hook:language:preDelete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Query, Object]),
    __metadata("design:returntype", Promise)
], NlpSampleService.prototype, "handleLanguageDelete", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:message:preCreate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NlpSampleService.prototype, "handleNewMessage", null);
exports.NlpSampleService = NlpSampleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nlp_sample_repository_1.NlpSampleRepository,
        nlp_sample_entity_service_1.NlpSampleEntityService,
        nlp_entity_service_1.NlpEntityService,
        language_service_1.LanguageService])
], NlpSampleService);
//# sourceMappingURL=nlp-sample.service.js.map