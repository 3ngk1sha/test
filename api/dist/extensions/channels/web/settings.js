"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEB_CHANNEL_NAMESPACE = exports.WEB_CHANNEL_NAME = void 0;
const types_1 = require("../../../setting/schemas/types");
exports.WEB_CHANNEL_NAME = 'web-channel';
exports.WEB_CHANNEL_NAMESPACE = 'web_channel';
exports.default = [
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'allowed_domains',
        value: 'http://localhost:8080,http://localhost:4000,http://localhost:5173',
        type: types_1.SettingType.text,
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'start_button',
        value: true,
        type: types_1.SettingType.checkbox,
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'input_disabled',
        value: false,
        type: types_1.SettingType.checkbox,
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'persistent_menu',
        value: true,
        type: types_1.SettingType.checkbox,
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'greeting_message',
        value: 'Welcome! Ready to start a conversation with our chatbot?',
        type: types_1.SettingType.textarea,
        translatable: true,
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'theme_color',
        value: 'teal',
        type: types_1.SettingType.select,
        options: ['teal', 'orange', 'red', 'green', 'blue', 'dark'],
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'window_title',
        value: 'Widget Title',
        type: types_1.SettingType.text,
        translatable: true,
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'avatar_url',
        value: '',
        type: types_1.SettingType.text,
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'show_emoji',
        value: true,
        type: types_1.SettingType.checkbox,
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'show_file',
        value: true,
        type: types_1.SettingType.checkbox,
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'show_location',
        value: true,
        type: types_1.SettingType.checkbox,
    },
    {
        group: exports.WEB_CHANNEL_NAMESPACE,
        label: 'allowed_upload_types',
        value: 'audio/mpeg,audio/x-ms-wma,audio/vnd.rn-realaudio,audio/x-wav,image/gif,image/jpeg,image/png,image/tiff,image/vnd.microsoft.icon,image/vnd.djvu,image/svg+xml,text/css,text/csv,text/html,text/plain,text/xml,video/mpeg,video/mp4,video/quicktime,video/x-ms-wmv,video/x-msvideo,video/x-flv,video/web,application/msword,application/vnd.ms-powerpoint,application/pdf,application/vnd.ms-excel,application/vnd.oasis.opendocument.presentation,application/vnd.oasis.opendocument.tex,application/vnd.oasis.opendocument.spreadsheet,application/vnd.oasis.opendocument.graphics,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        type: types_1.SettingType.textarea,
    },
];
//# sourceMappingURL=settings.js.map