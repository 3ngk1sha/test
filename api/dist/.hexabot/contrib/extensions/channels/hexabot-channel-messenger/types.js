"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messenger = void 0;
var Messenger;
(function (Messenger) {
    let SettingLabel;
    (function (SettingLabel) {
        SettingLabel["app_secret"] = "app_secret";
        SettingLabel["access_token"] = "access_token";
        SettingLabel["verify_token"] = "verify_token";
        SettingLabel["get_started_button"] = "get_started_button";
        SettingLabel["composer_input_disabled"] = "composer_input_disabled";
        SettingLabel["greeting_text"] = "greeting_text";
        SettingLabel["page_id"] = "page_id";
        SettingLabel["app_id"] = "app_id";
        SettingLabel["user_fields"] = "user_fields";
    })(SettingLabel = Messenger.SettingLabel || (Messenger.SettingLabel = {}));
    let AttachmentType;
    (function (AttachmentType) {
        AttachmentType["audio"] = "audio";
        AttachmentType["file"] = "file";
        AttachmentType["image"] = "image";
        AttachmentType["video"] = "video";
        AttachmentType["location"] = "location";
        AttachmentType["fallback"] = "fallback";
    })(AttachmentType = Messenger.AttachmentType || (Messenger.AttachmentType = {}));
    let TopElementStyle;
    (function (TopElementStyle) {
        TopElementStyle["large"] = "large";
        TopElementStyle["compact"] = "compact";
    })(TopElementStyle = Messenger.TopElementStyle || (Messenger.TopElementStyle = {}));
    let ImageAspectRatio;
    (function (ImageAspectRatio) {
        ImageAspectRatio["horizontal"] = "horizontal";
        ImageAspectRatio["square"] = "square";
    })(ImageAspectRatio = Messenger.ImageAspectRatio || (Messenger.ImageAspectRatio = {}));
    let TemplateType;
    (function (TemplateType) {
        TemplateType["button"] = "button";
        TemplateType["template"] = "template";
        TemplateType["generic"] = "generic";
        TemplateType["list"] = "list";
    })(TemplateType = Messenger.TemplateType || (Messenger.TemplateType = {}));
    let ActionType;
    (function (ActionType) {
        ActionType["mark_seen"] = "mark_seen";
        ActionType["typing_on"] = "typing_on";
        ActionType["typing_off"] = "typing_off";
    })(ActionType = Messenger.ActionType || (Messenger.ActionType = {}));
    let MessageTag;
    (function (MessageTag) {
        MessageTag[MessageTag["COMMUNITY_ALERT"] = 0] = "COMMUNITY_ALERT";
        MessageTag[MessageTag["CONFIRMED_EVENT_REMINDER"] = 1] = "CONFIRMED_EVENT_REMINDER";
        MessageTag[MessageTag["NON_PROMOTIONAL_SUBSCRIPTION"] = 2] = "NON_PROMOTIONAL_SUBSCRIPTION";
        MessageTag[MessageTag["PAIRING_UPDATE"] = 3] = "PAIRING_UPDATE";
        MessageTag[MessageTag["APPLICATION_UPDATE"] = 4] = "APPLICATION_UPDATE";
        MessageTag[MessageTag["ACCOUNT_UPDATE"] = 5] = "ACCOUNT_UPDATE";
        MessageTag[MessageTag["PAYMENT_UPDATE"] = 6] = "PAYMENT_UPDATE";
        MessageTag[MessageTag["PERSONAL_FINANCE_UPDATE"] = 7] = "PERSONAL_FINANCE_UPDATE";
        MessageTag[MessageTag["SHIPPING_UPDATE"] = 8] = "SHIPPING_UPDATE";
        MessageTag[MessageTag["RESERVATION_UPDATE"] = 9] = "RESERVATION_UPDATE";
        MessageTag[MessageTag["ISSUE_RESOLUTION"] = 10] = "ISSUE_RESOLUTION";
        MessageTag[MessageTag["APPOINTMENT_UPDATE"] = 11] = "APPOINTMENT_UPDATE";
        MessageTag[MessageTag["GAME_EVENT"] = 12] = "GAME_EVENT";
        MessageTag[MessageTag["TRANSPORTATION_UPDATE"] = 13] = "TRANSPORTATION_UPDATE";
        MessageTag[MessageTag["FEATURE_FUNCTIONALITY_UPDATE"] = 14] = "FEATURE_FUNCTIONALITY_UPDATE";
        MessageTag[MessageTag["TICKET_UPDATE"] = 15] = "TICKET_UPDATE";
    })(MessageTag = Messenger.MessageTag || (Messenger.MessageTag = {}));
    let NotificationType;
    (function (NotificationType) {
        NotificationType[NotificationType["REGULAR"] = 0] = "REGULAR";
        NotificationType[NotificationType["SILENT_PUSH"] = 1] = "SILENT_PUSH";
        NotificationType[NotificationType["NO_PUSH"] = 2] = "NO_PUSH";
    })(NotificationType = Messenger.NotificationType || (Messenger.NotificationType = {}));
})(Messenger || (exports.Messenger = Messenger = {}));
//# sourceMappingURL=types.js.map