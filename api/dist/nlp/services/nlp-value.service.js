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
exports.NlpValueService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../utils/generics/base-service");
const nlp_value_repository_1 = require("../repositories/nlp-value.repository");
const nlp_entity_service_1 = require("./nlp-entity.service");
let NlpValueService = class NlpValueService extends base_service_1.BaseService {
    constructor(repository, nlpEntityService) {
        super(repository);
        this.repository = repository;
        this.nlpEntityService = nlpEntityService;
    }
    async deleteCascadeOne(id) {
        return await this.repository.deleteOne(id);
    }
    async storeNewValues(sampleText, sampleEntities, storedEntities) {
        const eMap = storedEntities.reduce((acc, curr) => {
            if (curr.name)
                acc[curr?.name] = curr;
            return acc;
        }, {});
        const values = sampleEntities.map((e) => e.value);
        let storedValues = await this.find({
            value: {
                $in: values,
            },
        });
        const valuesToAdd = sampleEntities
            .filter((e) => storedValues.findIndex((v) => v.value === e.value) === -1)
            .filter((e, idx, self) => self.findIndex(({ value }) => e.value === value) === idx)
            .map((e) => {
            const newValue = {
                entity: eMap[e.entity].id,
                value: e.value,
                expressions: [],
            };
            if ('start' in e && 'end' in e) {
                const word = sampleText.slice(e.start, e.end);
                if (word !== e.value) {
                    newValue.expressions = [word];
                }
            }
            return newValue;
        });
        const newValues = await this.createMany(valuesToAdd);
        storedValues = storedValues.concat(newValues);
        const vMap = storedValues.reduce((acc, curr) => {
            acc[curr.value] = curr;
            return acc;
        }, {});
        const synonymsToAdd = sampleEntities
            .filter((e) => {
            if ('start' in e && 'end' in e) {
                const word = sampleText.slice(e.start, e.end);
                return (word !== e.value && vMap[e.value].expressions?.indexOf(word) === -1);
            }
            return false;
        })
            .map((e) => {
            return this.updateOne(vMap[e.value].id, {
                ...vMap[e.value],
                expressions: vMap[e.value].expressions?.concat([
                    sampleText.slice(e.start, e.end),
                ]),
            });
        });
        await Promise.all(synonymsToAdd);
        const result = sampleEntities.map((e) => {
            return {
                ...e,
                entity: eMap[e.entity].id,
                value: vMap[e.value].id,
            };
        });
        return result;
    }
    async storeValues(sampleText, sampleEntities) {
        const entities = sampleEntities.map((e) => e.entity);
        const storedEntities = await this.nlpEntityService.find({
            name: { $in: entities },
        });
        const valuesToAdd = sampleEntities.map((e) => {
            let expressions = [];
            if ('start' in e &&
                e.start &&
                e.start >= 0 &&
                'end' in e &&
                e.end &&
                e.end > 0) {
                const word = sampleText.slice(e.start, e.end);
                if (word !== e.value) {
                    expressions = [word];
                }
            }
            const storedEntity = storedEntities.find((se) => se.name === e.entity);
            if (!storedEntity) {
                throw new Error(`Unable to find the stored entity ${e.entity}`);
            }
            return {
                entity: storedEntity.id,
                value: e.value,
                expressions,
            };
        });
        const promises = valuesToAdd.map(async (v) => {
            const createdOrFound = await this.findOneOrCreate({ value: v.value }, v);
            const expressions = v.expressions
                ? createdOrFound.expressions
                    ?.concat(v.expressions)
                    .filter((v, i, a) => a.indexOf(v) === i)
                : createdOrFound.expressions?.filter((v, i, a) => a.indexOf(v) === i);
            const result = await this.updateOne({ value: v.value }, { expressions });
            if (!result)
                throw new Error(`Unable to update NLP value ${v.value}`);
            return result;
        });
        return Promise.all(promises);
    }
    async findWithCount(format, pageQuery, filters) {
        return await this.repository.findWithCount(format, pageQuery, filters);
    }
};
exports.NlpValueService = NlpValueService;
exports.NlpValueService = NlpValueService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => nlp_entity_service_1.NlpEntityService))),
    __metadata("design:paramtypes", [nlp_value_repository_1.NlpValueRepository,
        nlp_entity_service_1.NlpEntityService])
], NlpValueService);
//# sourceMappingURL=nlp-value.service.js.map