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
exports.NlpEntityService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../utils/generics/base-service");
const nlp_entity_repository_1 = require("../repositories/nlp-entity.repository");
const nlp_value_service_1 = require("./nlp-value.service");
let NlpEntityService = class NlpEntityService extends base_service_1.BaseService {
    constructor(repository, nlpValueService) {
        super(repository);
        this.repository = repository;
        this.nlpValueService = nlpValueService;
    }
    async deleteCascadeOne(id) {
        return await this.repository.deleteOne(id);
    }
    async storeNewEntities(sampleText, sampleEntities, lookups = ['keywords']) {
        const entities = sampleEntities.map((e) => e.entity);
        let storedEntities = (await this.find({ name: { $in: entities } })) || [];
        const entitiesToAdd = entities
            .filter((e) => storedEntities.findIndex((se) => se.name === e) === -1)
            .filter((e, idx, self) => self.indexOf(e) === idx)
            .map((e) => ({ name: e, lookups }));
        const newEntities = await this.createMany(entitiesToAdd);
        storedEntities = storedEntities.concat(newEntities);
        return await this.nlpValueService.storeNewValues(sampleText, sampleEntities, storedEntities);
    }
    storeEntities(sampleEntities) {
        const findOrCreate = sampleEntities.map((e) => this.findOneOrCreate({ name: e.entity }, { name: e.entity }));
        return Promise.all(findOrCreate);
    }
};
exports.NlpEntityService = NlpEntityService;
exports.NlpEntityService = NlpEntityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nlp_entity_repository_1.NlpEntityRepository,
        nlp_value_service_1.NlpValueService])
], NlpEntityService);
//# sourceMappingURL=nlp-entity.service.js.map