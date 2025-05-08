import { Setting } from './setting.schema';
export declare enum SettingType {
    text = "text",
    textarea = "textarea",
    secret = "secret",
    multiple_text = "multiple_text",
    checkbox = "checkbox",
    select = "select",
    number = "number",
    attachment = "attachment",
    multiple_attachment = "multiple_attachment"
}
export declare enum FieldType {
    text = "text",
    url = "url",
    textarea = "textarea",
    checkbox = "checkbox",
    file = "file",
    html = "html"
}
export interface TextSetting extends Setting {
    type: SettingType.text;
    value: string;
    options: never;
    config: never;
}
export interface TextareaSetting extends Setting {
    type: SettingType.textarea;
    value: string;
    options: never;
    config: never;
}
export interface SecretSetting extends Setting {
    type: SettingType.secret;
    value: string;
    options: never;
    config: never;
}
export interface MultiTextSetting extends Setting {
    type: SettingType.multiple_text;
    value: string[];
    options: never;
    config: never;
}
export interface CheckboxSetting extends Setting {
    type: SettingType.checkbox;
    value: boolean;
    options: never;
    config: never;
}
export interface SelectSetting extends Setting {
    type: SettingType.select;
    value: string;
    options: string[];
    config: never;
}
export interface NumberSetting extends Setting {
    type: SettingType.number;
    value: number;
    options: never;
    config?: {
        min: number;
        max: number;
        step: number;
    };
}
export interface AttachmentSetting extends Setting {
    type: SettingType.attachment;
    value: string | null;
    options: never;
    config: never;
}
export interface MultipleAttachmentSetting extends Setting {
    type: SettingType.multiple_attachment;
    value: string[];
    options: never;
    config: never;
}
export type SettingByType<T extends SettingType> = T extends SettingType.text ? TextSetting : T extends SettingType.textarea ? TextareaSetting : T extends SettingType.secret ? SecretSetting : T extends SettingType.multiple_text ? MultiTextSetting : T extends SettingType.checkbox ? CheckboxSetting : T extends SettingType.select ? SelectSetting : T extends SettingType.number ? NumberSetting : T extends SettingType.attachment ? AttachmentSetting : T extends SettingType.multiple_attachment ? MultipleAttachmentSetting : never;
export type AnySetting = TextSetting | MultiTextSetting | CheckboxSetting | SelectSetting | NumberSetting | AttachmentSetting | MultipleAttachmentSetting;
export type SettingDict = {
    [group: string]: Setting[];
};
