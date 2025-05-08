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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NlpSampleEntityService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../utils/generics/base-service");
const nlp_sample_entity_repository_1 = require("../repositories/nlp-sample-entity.repository");
const nlp_entity_service_1 = require("./nlp-entity.service");
const nlp_value_service_1 = require("./nlp-value.service");
let NlpSampleEntityService = class NlpSampleEntityService extends base_service_1.BaseService {
    constructor(repository, nlpEntityService, nlpValueService) {
        super(repository);
        this.repository = repository;
        this.nlpEntityService = nlpEntityService;
        this.nlpValueService = nlpValueService;
    }
    async storeSampleEntities(sample, entities) {
        const storedEntities = await this.nlpEntityService.storeEntities(entities);
        const storedValues = await this.nlpValueService.storeValues(sample.text, entities);
        const sampleEntities = entities.map((e) => {
            const storedEntity = storedEntities.find((se) => se.name === e.entity);
            const storedValue = storedValues.find((sv) => sv.value === e.value);
            if (!storedEntity || !storedValue) {
                throw new Error('Unable to find the stored entity or value');
            }
            return {
                sample: sample.id,
                entity: storedEntity.id,
                value: storedValue.id,
                start: 'start' in e ? e.start : undefined,
                end: 'end' in e ? e.end : undefined,
            };
        });
        return await this.createMany(sampleEntities);
    }
    extractKeywordEntities(sample, value) {
        const keywords = [value.value, ...value.expressions];
        const regex = `(?<!\\p{L})${keywords.join('|')}(?!\\p{L})`;
        const regexPattern = new RegExp(regex, 'giu');
        const matches = [];
        let match;
        while ((match = regexPattern.exec(sample.text)) !== null) {
            matches.push({
                sample: sample.id,
                entity: value.entity,
                value: value.id,
                start: match.index,
                end: match.index + match[0].length,
            });
            if (match.index === regexPattern.lastIndex) {
                regexPattern.lastIndex++;
            }
        }
        return matches;
    }
};
exports.NlpSampleEntityService = NlpSampleEntityService;
exports.NlpSampleEntityService = NlpSampleEntityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nlp_sample_entity_repository_1.NlpSampleEntityRepository,
        nlp_entity_service_1.NlpEntityService,
        nlp_value_service_1.NlpValueService])
], NlpSampleEntityService);
//# sourceMappingURL=nlp-sample-entity.service.js.map