"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installNlpEntityFixtures = exports.nlpEntityFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nlp_entity_schema_1 = require("../../../nlp/schemas/nlp-entity.schema");
exports.nlpEntityFixtures = [
    {
        name: 'intent',
        lookups: ['trait'],
        doc: '',
        builtin: false,
    },
    {
        name: 'first_name',
        lookups: ['keywords'],
        doc: '',
        builtin: false,
    },
    {
        name: 'built_in',
        lookups: ['trait'],
        doc: '',
        builtin: true,
    },
];
const installNlpEntityFixtures = async () => {
    const NlpEntity = mongoose_1.default.model(nlp_entity_schema_1.NlpEntityModel.name, nlp_entity_schema_1.NlpEntityModel.schema);
    return await NlpEntity.insertMany(exports.nlpEntityFixtures);
};
exports.installNlpEntityFixtures = installNlpEntityFixtures;
//# sourceMappingURL=nlpentity.js.map