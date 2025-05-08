"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const nlp_entity_schema_1 = require("../../nlp/schemas/nlp-entity.schema");
const nlp_value_schema_1 = require("../../nlp/schemas/nlp-value.schema");
const types_1 = require("../types");
const base_helper_1 = __importDefault(require("./base-helper"));
class BaseNlpHelper extends base_helper_1.default {
    constructor(name, settingService, helperService, logger) {
        super(name, settingService, helperService, logger);
        this.type = types_1.HelperType.NLU;
    }
    async updateEntity(entity) {
        return entity;
    }
    addEntity(_entity) {
        return new Promise((resolve, _reject) => {
            return resolve((0, uuid_1.v4)());
        });
    }
    async deleteEntity(entityId) {
        return entityId;
    }
    async updateValue(value) {
        return value;
    }
    addValue(_value) {
        return new Promise((resolve, _reject) => {
            return resolve((0, uuid_1.v4)());
        });
    }
    async deleteValue(value) {
        return value;
    }
    async format(samples, entities) {
        const entityMap = nlp_entity_schema_1.NlpEntity.getEntityMap(entities);
        const valueMap = nlp_value_schema_1.NlpValue.getValueMap(nlp_value_schema_1.NlpValue.getValuesFromEntities(entities));
        const examples = samples
            .filter((s) => s.entities.length > 0)
            .map((s) => {
            const intent = s.entities.find((e) => entityMap[e.entity].name === 'intent');
            if (!intent) {
                throw new Error('Unable to find the `intent` nlp entity.');
            }
            const sampleEntities = s.entities
                .filter((e) => entityMap[e.entity].name !== 'intent')
                .map((e) => {
                const res = {
                    entity: entityMap[e.entity].name,
                    value: valueMap[e.value].value,
                };
                if ('start' in e && 'end' in e) {
                    Object.assign(res, {
                        start: e.start,
                        end: e.end,
                    });
                }
                return res;
            })
                .concat({
                entity: 'language',
                value: s.language.code,
            });
            return {
                text: s.text,
                intent: valueMap[intent.value].value,
                entities: sampleEntities,
            };
        });
        return examples;
    }
    async forget(sample) {
        return sample;
    }
}
exports.default = BaseNlpHelper;
//# sourceMappingURL=base-nlp-helper.js.map