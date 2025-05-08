"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldType = exports.SettingType = void 0;
var SettingType;
(function (SettingType) {
    SettingType["text"] = "text";
    SettingType["textarea"] = "textarea";
    SettingType["secret"] = "secret";
    SettingType["multiple_text"] = "multiple_text";
    SettingType["checkbox"] = "checkbox";
    SettingType["select"] = "select";
    SettingType["number"] = "number";
    SettingType["attachment"] = "attachment";
    SettingType["multiple_attachment"] = "multiple_attachment";
})(SettingType || (exports.SettingType = SettingType = {}));
var FieldType;
(function (FieldType) {
    FieldType["text"] = "text";
    FieldType["url"] = "url";
    FieldType["textarea"] = "textarea";
    FieldType["checkbox"] = "checkbox";
    FieldType["file"] = "file";
    FieldType["html"] = "html";
})(FieldType || (exports.FieldType = FieldType = {}));
//# sourceMappingURL=types.js.map