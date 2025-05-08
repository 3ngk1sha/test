"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installNlpSampleEntityFixtures = exports.nlpSampleEntityFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nlp_sample_entity_schema_1 = require("../../../nlp/schemas/nlp-sample-entity.schema");
const nlpsample_1 = require("./nlpsample");
const nlpvalue_1 = require("./nlpvalue");
exports.nlpSampleEntityFixtures = [
    {
        sample: '0',
        entity: '0',
        value: '0',
    },
    {
        sample: '1',
        entity: '0',
        value: '1',
    },
    {
        sample: '2',
        entity: '0',
        value: '2',
    },
    {
        sample: '3',
        entity: '0',
        value: '3',
    },
    {
        sample: '3',
        entity: '1',
        value: '4',
    },
];
const installNlpSampleEntityFixtures = async () => {
    const { nlpValues, nlpEntities } = await (0, nlpvalue_1.installNlpValueFixtures)();
    const nlpSamples = await (0, nlpsample_1.installNlpSampleFixtures)();
    const NlpSampleEntity = mongoose_1.default.model(nlp_sample_entity_schema_1.NlpSampleEntityModel.name, nlp_sample_entity_schema_1.NlpSampleEntityModel.schema);
    return await NlpSampleEntity.insertMany(exports.nlpSampleEntityFixtures.map((s) => {
        return {
            ...s,
            sample: nlpSamples[parseInt(s.sample)].id,
            entity: nlpEntities[parseInt(s.entity)].id,
            value: nlpValues[parseInt(s.value)].id,
        };
    }));
};
exports.installNlpSampleEntityFixtures = installNlpSampleEntityFixtures;
//# sourceMappingURL=nlpsampleentity.js.map