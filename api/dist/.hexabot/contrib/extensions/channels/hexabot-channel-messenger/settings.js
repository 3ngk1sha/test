"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSENGER_GROUP_NAME = exports.MESSENGER_CHANNEL_NAME = void 0;
const types_1 = require("../../../../../setting/schemas/types");
const types_2 = require("./types");
exports.MESSENGER_CHANNEL_NAME = 'messenger-channel';
exports.MESSENGER_GROUP_NAME = 'messenger_channel';
exports.default = [
    {
        group: exports.MESSENGER_GROUP_NAME,
        label: types_2.Messenger.SettingLabel.app_secret,
        value: '',
        type: types_1.SettingType.secret,
    },
    {
        group: exports.MESSENGER_GROUP_NAME,
        label: types_2.Messenger.SettingLabel.access_token,
        value: '',
        type: types_1.SettingType.secret,
    },
    {
        group: exports.MESSENGER_GROUP_NAME,
        label: types_2.Messenger.SettingLabel.verify_token,
        value: '',
        type: types_1.SettingType.secret,
    },
    {
        group: exports.MESSENGER_GROUP_NAME,
        label: types_2.Messenger.SettingLabel.get_started_button,
        value: false,
        type: types_1.SettingType.checkbox,
    },
    {
        group: exports.MESSENGER_GROUP_NAME,
        label: types_2.Messenger.SettingLabel.composer_input_disabled,
        value: false,
        type: types_1.SettingType.checkbox,
    },
    {
        group: exports.MESSENGER_GROUP_NAME,
        label: types_2.Messenger.SettingLabel.greeting_text,
        value: 'Welcome! Ready to start a conversation with our chatbot?',
        type: types_1.SettingType.textarea,
    },
    {
        group: exports.MESSENGER_GROUP_NAME,
        label: types_2.Messenger.SettingLabel.user_fields,
        value: 'first_name,last_name,profile_pic,locale,timezone,gender',
        type: types_1.SettingType.text,
    },
];
//# sourceMappingURL=settings.js.map