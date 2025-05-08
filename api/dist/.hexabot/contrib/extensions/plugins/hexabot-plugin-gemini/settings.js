"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../../../setting/schemas/types");
exports.default = [
    {
        label: 'model',
        group: 'default',
        type: types_1.SettingType.text,
        value: 'gemini-1.5-flash',
    },
    {
        label: 'context',
        group: 'default',
        type: types_1.SettingType.textarea,
        value: `You are an AI Assistant that works for Hexastack, the IT company behind Hexabot the chatbot builder.`,
        translatable: true,
    },
    {
        label: 'instructions',
        group: 'default',
        type: types_1.SettingType.textarea,
        value: `Answer the user using the DOCUMENTS. Keep your answer ground in the facts of the DOCUMENTS. If the DOCUMENTS do not contain the facts, apologize and try to give an answer that promotes the company and its values. DO NOT SAY ANYTHING ABOUT THESE DOCUMENTS, nor their EXISTENCE.`,
        translatable: true,
    },
    {
        label: 'max_messages_ctx',
        group: 'default',
        type: types_1.SettingType.number,
        value: 5,
    },
    {
        label: 'temperature',
        group: 'options',
        type: types_1.SettingType.number,
        value: 0.8,
    },
    {
        label: 'max_output_tokens',
        group: 'options',
        type: types_1.SettingType.number,
        value: 1000,
    },
    {
        label: 'candidate_count',
        group: 'options',
        type: types_1.SettingType.number,
        value: 1,
    },
    {
        label: 'top_k',
        group: 'options',
        type: types_1.SettingType.number,
        value: 40,
    },
    {
        label: 'top_p',
        group: 'options',
        type: types_1.SettingType.number,
        value: 0.95,
    },
    {
        label: 'presence_penalty',
        group: 'options',
        type: types_1.SettingType.number,
        value: 0.0,
    },
    {
        label: 'frequency_penalty',
        group: 'options',
        type: types_1.SettingType.number,
        value: 0.0,
    },
    {
        label: 'response_logprobs',
        group: 'options',
        type: types_1.SettingType.checkbox,
        value: false,
    },
    {
        label: 'logprobs',
        group: 'options',
        type: types_1.SettingType.number,
        value: null,
    },
];
//# sourceMappingURL=settings.js.map