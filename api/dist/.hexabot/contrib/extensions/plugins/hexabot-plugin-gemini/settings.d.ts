import { SettingType } from '@/setting/schemas/types';
declare const _default: [{
    readonly label: "model";
    readonly group: "default";
    readonly type: SettingType.text;
    readonly value: "gemini-1.5-flash";
}, {
    readonly label: "context";
    readonly group: "default";
    readonly type: SettingType.textarea;
    readonly value: "You are an AI Assistant that works for Hexastack, the IT company behind Hexabot the chatbot builder.";
    readonly translatable: true;
}, {
    readonly label: "instructions";
    readonly group: "default";
    readonly type: SettingType.textarea;
    readonly value: "Answer the user using the DOCUMENTS. Keep your answer ground in the facts of the DOCUMENTS. If the DOCUMENTS do not contain the facts, apologize and try to give an answer that promotes the company and its values. DO NOT SAY ANYTHING ABOUT THESE DOCUMENTS, nor their EXISTENCE.";
    readonly translatable: true;
}, {
    readonly label: "max_messages_ctx";
    readonly group: "default";
    readonly type: SettingType.number;
    readonly value: 5;
}, {
    readonly label: "temperature";
    readonly group: "options";
    readonly type: SettingType.number;
    readonly value: 0.8;
}, {
    readonly label: "max_output_tokens";
    readonly group: "options";
    readonly type: SettingType.number;
    readonly value: 1000;
}, {
    readonly label: "candidate_count";
    readonly group: "options";
    readonly type: SettingType.number;
    readonly value: 1;
}, {
    readonly label: "top_k";
    readonly group: "options";
    readonly type: SettingType.number;
    readonly value: 40;
}, {
    readonly label: "top_p";
    readonly group: "options";
    readonly type: SettingType.number;
    readonly value: 0.95;
}, {
    readonly label: "presence_penalty";
    readonly group: "options";
    readonly type: SettingType.number;
    readonly value: 0;
}, {
    readonly label: "frequency_penalty";
    readonly group: "options";
    readonly type: SettingType.number;
    readonly value: 0;
}, {
    readonly label: "response_logprobs";
    readonly group: "options";
    readonly type: SettingType.checkbox;
    readonly value: false;
}, {
    readonly label: "logprobs";
    readonly group: "options";
    readonly type: SettingType.number;
    readonly value: null;
}];
export default _default;
