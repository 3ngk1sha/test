import { SettingType } from '@/setting/schemas/types';
export declare const LLM_NLU_HELPER_NAME = "llm-nlu-helper";
export declare const LLM_NLU_HELPER_NAMESPACE = "llm_nlu_helper";
declare const _default: [{
    readonly group: "llm_nlu_helper";
    readonly label: "model";
    readonly value: "";
    readonly type: SettingType.text;
}, {
    readonly group: "llm_nlu_helper";
    readonly label: "language_classifier_prompt_template";
    readonly value: "You are an advanced language detection assistant. Your task is to identify the language of the given input text from the following supported languages:\n\n{{#each languages}}\n- {{title}} (code={{code}})\n{{/each}}\n\nProvide a concise result by stating the language code only. If the language is not in the supported list, return an empty string.";
    readonly type: SettingType.textarea;
}, {
    readonly group: "llm_nlu_helper";
    readonly label: "trait_classifier_prompt_template";
    readonly value: "You are an advanced text classification assistant. Your task is to classify the given input text provided in the following {{entity.name}} values:\n\n{{#each entity.values}}\n- {{value}}\n{{/each}}\n\nProvide a concise result by stating only the value of the {{entity.name}}. Return an empty string otherwise.";
    readonly type: SettingType.textarea;
}];
export default _default;
