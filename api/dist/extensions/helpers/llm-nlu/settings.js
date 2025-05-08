"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLM_NLU_HELPER_NAMESPACE = exports.LLM_NLU_HELPER_NAME = void 0;
const types_1 = require("../../../setting/schemas/types");
exports.LLM_NLU_HELPER_NAME = 'llm-nlu-helper';
exports.LLM_NLU_HELPER_NAMESPACE = 'llm_nlu_helper';
exports.default = [
    {
        group: exports.LLM_NLU_HELPER_NAMESPACE,
        label: 'model',
        value: '',
        type: types_1.SettingType.text,
    },
    {
        group: exports.LLM_NLU_HELPER_NAMESPACE,
        label: 'language_classifier_prompt_template',
        value: `You are an advanced language detection assistant. Your task is to identify the language of the given input text from the following supported languages:

{{#each languages}}
- {{title}} (code={{code}})
{{/each}}

Provide a concise result by stating the language code only. If the language is not in the supported list, return an empty string.`,
        type: types_1.SettingType.textarea,
    },
    {
        group: exports.LLM_NLU_HELPER_NAMESPACE,
        label: 'trait_classifier_prompt_template',
        value: `You are an advanced text classification assistant. Your task is to classify the given input text provided in the following {{entity.name}} values:

{{#each entity.values}}
- {{value}}
{{/each}}

Provide a concise result by stating only the value of the {{entity.name}}. Return an empty string otherwise.`,
        type: types_1.SettingType.textarea,
    },
];
//# sourceMappingURL=settings.js.map