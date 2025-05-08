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
exports.NlpSampleRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const nlp_sample_schema_1 = require("../schemas/nlp-sample.schema");
const nlp_sample_entity_repository_1 = require("./nlp-sample-entity.repository");
let NlpSampleRepository = class NlpSampleRepository extends base_repository_1.BaseRepository {
    constructor(model, nlpSampleEntityRepository) {
        super(model, nlp_sample_schema_1.NlpSample, nlp_sample_schema_1.NLP_SAMPLE_POPULATE, nlp_sample_schema_1.NlpSampleFull);
        this.model = model;
        this.nlpSampleEntityRepository = nlpSampleEntityRepository;
    }
    async preDelete(_query, criteria) {
        if (criteria._id) {
            await this.nlpSampleEntityRepository.deleteMany({
                sample: criteria._id,
            });
        }
        else {
            throw new Error('Attempted to delete a NLP sample using unknown criteria');
        }
    }
};
exports.NlpSampleRepository = NlpSampleRepository;
exports.NlpSampleRepository = NlpSampleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(nlp_sample_schema_1.NlpSample.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        nlp_sample_entity_repository_1.NlpSampleEntityRepository])
], NlpSampleRepository);
//# sourceMappingURL=nlp-sample.repository.js.map