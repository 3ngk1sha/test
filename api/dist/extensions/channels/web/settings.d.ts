import { SettingType } from '@/setting/schemas/types';
export declare const WEB_CHANNEL_NAME: "web-channel";
export declare const WEB_CHANNEL_NAMESPACE = "web_channel";
declare const _default: [{
    readonly group: "web_channel";
    readonly label: "allowed_domains";
    readonly value: "http://localhost:8080,http://localhost:4000,http://localhost:5173";
    readonly type: SettingType.text;
}, {
    readonly group: "web_channel";
    readonly label: "start_button";
    readonly value: true;
    readonly type: SettingType.checkbox;
}, {
    readonly group: "web_channel";
    readonly label: "input_disabled";
    readonly value: false;
    readonly type: SettingType.checkbox;
}, {
    readonly group: "web_channel";
    readonly label: "persistent_menu";
    readonly value: true;
    readonly type: SettingType.checkbox;
}, {
    readonly group: "web_channel";
    readonly label: "greeting_message";
    readonly value: "Welcome! Ready to start a conversation with our chatbot?";
    readonly type: SettingType.textarea;
    readonly translatable: true;
}, {
    readonly group: "web_channel";
    readonly label: "theme_color";
    readonly value: "teal";
    readonly type: SettingType.select;
    readonly options: ["teal", "orange", "red", "green", "blue", "dark"];
}, {
    readonly group: "web_channel";
    readonly label: "window_title";
    readonly value: "Widget Title";
    readonly type: SettingType.text;
    readonly translatable: true;
}, {
    readonly group: "web_channel";
    readonly label: "avatar_url";
    readonly value: "";
    readonly type: SettingType.text;
}, {
    readonly group: "web_channel";
    readonly label: "show_emoji";
    readonly value: true;
    readonly type: SettingType.checkbox;
}, {
    readonly group: "web_channel";
    readonly label: "show_file";
    readonly value: true;
    readonly type: SettingType.checkbox;
}, {
    readonly group: "web_channel";
    readonly label: "show_location";
    readonly value: true;
    readonly type: SettingType.checkbox;
}, {
    readonly group: "web_channel";
    readonly label: "allowed_upload_types";
    readonly value: "audio/mpeg,audio/x-ms-wma,audio/vnd.rn-realaudio,audio/x-wav,image/gif,image/jpeg,image/png,image/tiff,image/vnd.microsoft.icon,image/vnd.djvu,image/svg+xml,text/css,text/csv,text/html,text/plain,text/xml,video/mpeg,video/mp4,video/quicktime,video/x-ms-wmv,video/x-msvideo,video/x-flv,video/web,application/msword,application/vnd.ms-powerpoint,application/pdf,application/vnd.ms-excel,application/vnd.oasis.opendocument.presentation,application/vnd.oasis.opendocument.tex,application/vnd.oasis.opendocument.spreadsheet,application/vnd.oasis.opendocument.graphics,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    readonly type: SettingType.textarea;
}];
export default _default;
