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
exports.NlpEntityRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const nlp_entity_schema_1 = require("../schemas/nlp-entity.schema");
const nlp_sample_entity_repository_1 = require("./nlp-sample-entity.repository");
const nlp_value_repository_1 = require("./nlp-value.repository");
let NlpEntityRepository = class NlpEntityRepository extends base_repository_1.BaseRepository {
    constructor(model, nlpValueRepository, nlpSampleEntityRepository) {
        super(model, nlp_entity_schema_1.NlpEntity, nlp_entity_schema_1.NLP_ENTITY_POPULATE, nlp_entity_schema_1.NlpEntityFull);
        this.model = model;
        this.nlpValueRepository = nlpValueRepository;
        this.nlpSampleEntityRepository = nlpSampleEntityRepository;
    }
    async postCreate(_created) {
        if (!_created.builtin) {
            this.eventEmitter.emit('hook:nlpEntity:create', _created);
        }
    }
    async postUpdate(_query, updated) {
        if (!updated?.builtin) {
            this.eventEmitter.emit('hook:nlpEntity:update', updated);
        }
    }
    async preDelete(_query, criteria) {
        if (criteria._id) {
            await this.nlpValueRepository.deleteMany({ entity: criteria._id });
            await this.nlpSampleEntityRepository.deleteMany({ entity: criteria._id });
            const entities = await this.find(typeof criteria === 'string' ? { _id: criteria } : criteria);
            entities
                .filter((e) => !e.builtin)
                .map((e) => {
                this.eventEmitter.emit('hook:nlpEntity:delete', e);
            });
        }
        else {
            throw new Error('Attempted to delete NLP entity using unknown criteria');
        }
    }
};
exports.NlpEntityRepository = NlpEntityRepository;
exports.NlpEntityRepository = NlpEntityRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(nlp_entity_schema_1.NlpEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        nlp_value_repository_1.NlpValueRepository,
        nlp_sample_entity_repository_1.NlpSampleEntityRepository])
], NlpEntityRepository);
//# sourceMappingURL=nlp-entity.repository.js.map