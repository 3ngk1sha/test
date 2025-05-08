import { SettingType } from '../schemas/types';
export declare const DEFAULT_SETTINGS: [{
    readonly group: "chatbot_settings";
    readonly label: "default_nlu_helper";
    readonly value: "llm-nlu-helper";
    readonly type: SettingType.select;
    readonly config: {
        readonly multiple: false;
        readonly allowCreate: false;
        readonly entity: "Helper";
        readonly idKey: "name";
        readonly labelKey: "name";
    };
    readonly weight: 1;
}, {
    readonly group: "chatbot_settings";
    readonly label: "default_llm_helper";
    readonly value: "ollama-helper";
    readonly type: SettingType.select;
    readonly config: {
        readonly multiple: false;
        readonly allowCreate: false;
        readonly entity: "Helper";
        readonly idKey: "name";
        readonly labelKey: "name";
    };
    readonly weight: 2;
}, {
    readonly group: "chatbot_settings";
    readonly label: "default_storage_helper";
    readonly value: "local-storage-helper";
    readonly type: SettingType.select;
    readonly config: {
        readonly multiple: false;
        readonly allowCreate: false;
        readonly entity: "Helper";
        readonly idKey: "name";
        readonly labelKey: "name";
    };
    readonly weight: 3;
}, {
    readonly group: "chatbot_settings";
    readonly label: "global_fallback";
    readonly value: true;
    readonly type: SettingType.checkbox;
    readonly weight: 4;
}, {
    readonly group: "chatbot_settings";
    readonly label: "fallback_block";
    readonly value: "";
    readonly options: [];
    readonly type: SettingType.select;
    readonly config: {
        readonly multiple: false;
        readonly allowCreate: false;
        readonly entity: "Block";
        readonly idKey: "id";
        readonly labelKey: "name";
    };
    readonly weight: 5;
}, {
    readonly group: "chatbot_settings";
    readonly label: "fallback_message";
    readonly value: string[];
    readonly type: SettingType.multiple_text;
    readonly weight: 6;
    readonly translatable: true;
}, {
    readonly group: "contact";
    readonly label: "contact_email_recipient";
    readonly value: "admin@example.com";
    readonly type: SettingType.text;
    readonly weight: 1;
}, {
    readonly group: "contact";
    readonly label: "company_name";
    readonly value: "Your company name";
    readonly type: SettingType.text;
    readonly weight: 2;
}, {
    readonly group: "contact";
    readonly label: "company_phone";
    readonly value: "(+999) 9999 9999 999";
    readonly type: SettingType.text;
    readonly weight: 3;
}, {
    readonly group: "contact";
    readonly label: "company_email";
    readonly value: "contact[at]mycompany.com";
    readonly type: SettingType.text;
    readonly weight: 4;
}, {
    readonly group: "contact";
    readonly label: "company_address1";
    readonly value: "71 Pilgrim Avenue";
    readonly type: SettingType.text;
    readonly weight: 5;
}, {
    readonly group: "contact";
    readonly label: "company_address2";
    readonly value: "";
    readonly type: SettingType.text;
    readonly weight: 6;
}, {
    readonly group: "contact";
    readonly label: "company_city";
    readonly value: "Chevy Chase";
    readonly type: SettingType.text;
    readonly weight: 7;
}, {
    readonly group: "contact";
    readonly label: "company_zipcode";
    readonly value: "85705";
    readonly type: SettingType.text;
    readonly weight: 8;
}, {
    readonly group: "contact";
    readonly label: "company_state";
    readonly value: "Orlando";
    readonly type: SettingType.text;
    readonly weight: 9;
}, {
    readonly group: "contact";
    readonly label: "company_country";
    readonly value: "US";
    readonly type: SettingType.text;
    readonly weight: 10;
}];
