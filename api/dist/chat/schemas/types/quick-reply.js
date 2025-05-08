"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stdQuickReplySchema = exports.payloadSchema = exports.cordinatesSchema = exports.QuickReplyType = void 0;
const zod_1 = require("zod");
const attachment_1 = require("./attachment");
const button_1 = require("./button");
var QuickReplyType;
(function (QuickReplyType) {
    QuickReplyType["text"] = "text";
    QuickReplyType["location"] = "location";
    QuickReplyType["user_phone_number"] = "user_phone_number";
    QuickReplyType["user_email"] = "user_email";
})(QuickReplyType || (exports.QuickReplyType = QuickReplyType = {}));
exports.cordinatesSchema = zod_1.z.object({
    lat: zod_1.z.number(),
    lon: zod_1.z.number(),
});
exports.payloadSchema = zod_1.z.discriminatedUnion('type', [
    zod_1.z.object({
        type: zod_1.z.literal(button_1.PayloadType.location),
        coordinates: exports.cordinatesSchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal(button_1.PayloadType.attachments),
        attachment: attachment_1.attachmentPayloadSchema,
    }),
]);
exports.stdQuickReplySchema = zod_1.z.object({
    content_type: zod_1.z.nativeEnum(QuickReplyType),
    title: zod_1.z.string(),
    payload: zod_1.z.string(),
});
//# sourceMappingURL=quick-reply.js.map