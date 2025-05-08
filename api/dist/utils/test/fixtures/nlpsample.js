"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installNlpSampleFixtures = exports.nlpSampleFixtures = exports.nlpSampleDefaultValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nlp_sample_schema_1 = require("../../../nlp/schemas/nlp-sample.schema");
const types_1 = require("../../../nlp/schemas/types");
const defaultValues_1 = require("../defaultValues");
const language_1 = require("./language");
exports.nlpSampleDefaultValues = {
    type: types_1.NlpSampleState.train,
    trained: false,
};
const nlpSamples = [
    {
        text: 'yess',
        language: '0',
    },
    {
        text: 'No',
        language: '0',
    },
    {
        text: 'Hello',
        trained: true,
        language: '0',
    },
    {
        text: 'Bye Jhon',
        trained: true,
        language: '0',
    },
];
exports.nlpSampleFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: nlpSamples,
    defaultValues: exports.nlpSampleDefaultValues,
});
const installNlpSampleFixtures = async () => {
    const languages = await (0, language_1.installLanguageFixtures)();
    const NlpSample = mongoose_1.default.model(nlp_sample_schema_1.NlpSampleModel.name, nlp_sample_schema_1.NlpSampleModel.schema);
    return await NlpSample.insertMany(exports.nlpSampleFixtures.map((v) => {
        return {
            ...v,
            language: v.language ? languages[parseInt(v.language)].id : null,
        };
    }));
};
exports.installNlpSampleFixtures = installNlpSampleFixtures;
//# sourceMappingURL=nlpsample.js.map