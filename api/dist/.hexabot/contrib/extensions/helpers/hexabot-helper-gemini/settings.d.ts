import { SettingType } from '@/setting/schemas/types';
export declare const GEMINI_HELPER_NAME = "gemini-helper";
export declare const GEMINI_HELPER_NAMESPACE = "gemini_helper";
declare const _default: [{
    readonly label: "token";
    readonly group: "gemini_helper";
    readonly type: SettingType.secret;
    readonly value: "";
}, {
    readonly label: "model";
    readonly group: "gemini_helper";
    readonly type: SettingType.text;
    readonly value: "gemini-1.5-flash";
}, {
    readonly label: "temperature";
    readonly group: "gemini_helper";
    readonly subgroup: "options";
    readonly type: SettingType.number;
    readonly value: 0.8;
}, {
    readonly label: "candidate_count";
    readonly group: "gemini_helper";
    readonly subgroup: "options";
    readonly type: SettingType.number;
    readonly value: 1;
}, {
    readonly label: "max_output_tokens";
    readonly group: "gemini_helper";
    readonly subgroup: "options";
    readonly type: SettingType.number;
    readonly value: 1000;
}, {
    readonly label: "top_k";
    readonly group: "gemini_helper";
    readonly subgroup: "options";
    readonly type: SettingType.number;
    readonly value: 40;
}, {
    readonly label: "top_p";
    readonly group: "gemini_helper";
    readonly subgroup: "options";
    readonly type: SettingType.number;
    readonly value: 0.95;
}, {
    readonly label: "presence_penalty";
    readonly group: "gemini_helper";
    readonly subgroup: "options";
    readonly type: SettingType.number;
    readonly value: 0;
}, {
    readonly label: "frequency_penalty";
    readonly group: "gemini_helper";
    readonly subgroup: "options";
    readonly type: SettingType.number;
    readonly value: 0;
}, {
    readonly label: "response_logprobs";
    readonly group: "gemini_helper";
    readonly subgroup: "options";
    readonly type: SettingType.checkbox;
    readonly value: false;
}, {
    readonly label: "logprobs";
    readonly group: "gemini_helper";
    readonly subgroup: "options";
    readonly type: SettingType.number;
    readonly value: null;
}];
export default _default;
