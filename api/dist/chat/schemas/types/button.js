"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadType = exports.buttonSchema = exports.ButtonType = void 0;
const zod_1 = require("zod");
var ButtonType;
(function (ButtonType) {
    ButtonType["postback"] = "postback";
    ButtonType["web_url"] = "web_url";
})(ButtonType || (exports.ButtonType = ButtonType = {}));
const postBackButtonSchema = zod_1.z.object({
    type: zod_1.z.literal(ButtonType.postback),
    title: zod_1.z.string(),
    payload: zod_1.z.string(),
});
const webUrlButtonSchema = zod_1.z.object({
    type: zod_1.z.literal(ButtonType.web_url),
    title: zod_1.z.string(),
    url: zod_1.z.string().url(),
    messenger_extensions: zod_1.z.boolean().optional(),
    webview_height_ratio: zod_1.z.enum(['compact', 'tall', 'full']).optional(),
});
exports.buttonSchema = zod_1.z.union([postBackButtonSchema, webUrlButtonSchema]);
var PayloadType;
(function (PayloadType) {
    PayloadType["location"] = "location";
    PayloadType["attachments"] = "attachments";
    PayloadType["quick_reply"] = "quick_reply";
    PayloadType["button"] = "button";
    PayloadType["outcome"] = "outcome";
    PayloadType["menu"] = "menu";
    PayloadType["content"] = "content";
})(PayloadType || (exports.PayloadType = PayloadType = {}));
//# sourceMappingURL=button.js.map