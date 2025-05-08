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
exports.NlpValueSeeder = void 0;
const common_1 = require("@nestjs/common");
const base_seeder_1 = require("../../utils/generics/base-seeder");
const nlp_entity_repository_1 = require("../repositories/nlp-entity.repository");
const nlp_value_repository_1 = require("../repositories/nlp-value.repository");
let NlpValueSeeder = class NlpValueSeeder extends base_seeder_1.BaseSeeder {
    constructor(nlpValueRepository, nlpEntityRepository) {
        super(nlpValueRepository);
        this.nlpEntityRepository = nlpEntityRepository;
    }
    async seed(models) {
        if (await this.isEmpty()) {
            const entities = await this.nlpEntityRepository.findAll();
            const modelDtos = models.map((v) => ({
                ...v,
                entity: entities.find(({ name }) => name === v.entity)?.id || null,
            }));
            await this.repository.createMany(modelDtos);
            return true;
        }
        return false;
    }
};
exports.NlpValueSeeder = NlpValueSeeder;
exports.NlpValueSeeder = NlpValueSeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nlp_value_repository_1.NlpValueRepository,
        nlp_entity_repository_1.NlpEntityRepository])
], NlpValueSeeder);
//# sourceMappingURL=nlp-value.seed.js.map