"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GEMINI_HELPER_NAMESPACE = exports.GEMINI_HELPER_NAME = void 0;
const types_1 = require("../../../../../setting/schemas/types");
exports.GEMINI_HELPER_NAME = 'gemini-helper';
exports.GEMINI_HELPER_NAMESPACE = 'gemini_helper';
exports.default = [
    {
        label: 'token',
        group: exports.GEMINI_HELPER_NAMESPACE,
        type: types_1.SettingType.secret,
        value: '',
    },
    {
        label: 'model',
        group: exports.GEMINI_HELPER_NAMESPACE,
        type: types_1.SettingType.text,
        value: 'gemini-1.5-flash',
    },
    {
        label: 'temperature',
        group: exports.GEMINI_HELPER_NAMESPACE,
        subgroup: 'options',
        type: types_1.SettingType.number,
        value: 0.8,
    },
    {
        label: 'candidate_count',
        group: exports.GEMINI_HELPER_NAMESPACE,
        subgroup: 'options',
        type: types_1.SettingType.number,
        value: 1,
    },
    {
        label: 'max_output_tokens',
        group: exports.GEMINI_HELPER_NAMESPACE,
        subgroup: 'options',
        type: types_1.SettingType.number,
        value: 1000,
    },
    {
        label: 'top_k',
        group: exports.GEMINI_HELPER_NAMESPACE,
        subgroup: 'options',
        type: types_1.SettingType.number,
        value: 40,
    },
    {
        label: 'top_p',
        group: exports.GEMINI_HELPER_NAMESPACE,
        subgroup: 'options',
        type: types_1.SettingType.number,
        value: 0.95,
    },
    {
        label: 'presence_penalty',
        group: exports.GEMINI_HELPER_NAMESPACE,
        subgroup: 'options',
        type: types_1.SettingType.number,
        value: 0.0,
    },
    {
        label: 'frequency_penalty',
        group: exports.GEMINI_HELPER_NAMESPACE,
        subgroup: 'options',
        type: types_1.SettingType.number,
        value: 0.0,
    },
    {
        label: 'response_logprobs',
        group: exports.GEMINI_HELPER_NAMESPACE,
        subgroup: 'options',
        type: types_1.SettingType.checkbox,
        value: false,
    },
    {
        label: 'logprobs',
        group: exports.GEMINI_HELPER_NAMESPACE,
        subgroup: 'options',
        type: types_1.SettingType.number,
        value: null,
    },
];
//# sourceMappingURL=settings.js.map