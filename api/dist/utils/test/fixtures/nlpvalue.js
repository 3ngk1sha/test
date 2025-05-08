"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installNlpValueFixtures = exports.nlpValueFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nlp_value_schema_1 = require("../../../nlp/schemas/nlp-value.schema");
const nlpentity_1 = require("./nlpentity");
exports.nlpValueFixtures = [
    {
        entity: '0',
        value: 'positive',
        expressions: [],
        builtin: true,
        doc: '',
    },
    {
        entity: '0',
        value: 'negative',
        expressions: [],
        builtin: true,
        doc: '',
    },
    {
        entity: '1',
        value: 'jhon',
        expressions: ['john', 'joohn', 'jhonny'],
        builtin: true,
        doc: '',
    },
    {
        entity: '0',
        value: 'greeting',
        expressions: ['heello', 'Hello', 'hi', 'heyy'],
        builtin: true,
        doc: '',
    },
    {
        entity: '0',
        value: 'goodbye',
        expressions: ['bye', 'bye bye'],
        builtin: true,
        doc: '',
    },
];
const installNlpValueFixtures = async () => {
    const nlpEntities = await (0, nlpentity_1.installNlpEntityFixtures)();
    const NlpValue = mongoose_1.default.model(nlp_value_schema_1.NlpValueModel.name, nlp_value_schema_1.NlpValueModel.schema);
    const nlpValues = await NlpValue.insertMany(exports.nlpValueFixtures.map((v) => ({
        ...v,
        entity: v?.entity ? nlpEntities[parseInt(v.entity)].id : null,
    })));
    return { nlpEntities, nlpValues };
};
exports.installNlpValueFixtures = installNlpValueFixtures;
//# sourceMappingURL=nlpvalue.js.map