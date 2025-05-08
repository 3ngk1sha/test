import { SettingType } from '@/setting/schemas/types';
import { Messenger } from './types';
export declare const MESSENGER_CHANNEL_NAME = "messenger-channel";
export declare const MESSENGER_GROUP_NAME = "messenger_channel";
declare const _default: [{
    readonly group: "messenger_channel";
    readonly label: Messenger.SettingLabel.app_secret;
    readonly value: "";
    readonly type: SettingType.secret;
}, {
    readonly group: "messenger_channel";
    readonly label: Messenger.SettingLabel.access_token;
    readonly value: "";
    readonly type: SettingType.secret;
}, {
    readonly group: "messenger_channel";
    readonly label: Messenger.SettingLabel.verify_token;
    readonly value: "";
    readonly type: SettingType.secret;
}, {
    readonly group: "messenger_channel";
    readonly label: Messenger.SettingLabel.get_started_button;
    readonly value: false;
    readonly type: SettingType.checkbox;
}, {
    readonly group: "messenger_channel";
    readonly label: Messenger.SettingLabel.composer_input_disabled;
    readonly value: false;
    readonly type: SettingType.checkbox;
}, {
    readonly group: "messenger_channel";
    readonly label: Messenger.SettingLabel.greeting_text;
    readonly value: "Welcome! Ready to start a conversation with our chatbot?";
    readonly type: SettingType.textarea;
}, {
    readonly group: "messenger_channel";
    readonly label: Messenger.SettingLabel.user_fields;
    readonly value: "first_name,last_name,profile_pic,locale,timezone,gender";
    readonly type: SettingType.text;
}];
export default _default;
