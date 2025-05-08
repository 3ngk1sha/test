"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockMessageObjectSchema = exports.pluginBlockMessageSchema = exports.textSchema = exports.validMessageTextSchema = exports.stdOutgoingEnvelopeSchema = exports.stdOutgoingMessageEnvelopeSchema = exports.stdOutgoingSystemEnvelopeSchema = exports.stdOutgoingAttachmentEnvelopeSchema = exports.stdOutgoingListEnvelopeSchema = exports.stdOutgoingButtonsEnvelopeSchema = exports.stdOutgoingQuickRepliesEnvelopeSchema = exports.stdOutgoingTextEnvelopeSchema = exports.stdIncomingMessageSchema = exports.stdIncomingAttachmentMessageSchema = exports.stdIncomingLocationMessageSchema = exports.stdIncomingPostBackMessageSchema = exports.stdIncomingTextMessageSchema = exports.StdOutgoingMessageSchema = exports.blockMessageSchema = exports.stdPluginMessageSchema = exports.pluginNameSchema = exports.stdOutgoingSystemMessageSchema = exports.stdOutgoingAttachmentMessageSchema = exports.stdOutgoingListMessageSchema = exports.contentPaginationSchema = exports.contentElementSchema = exports.stdOutgoingButtonsMessageSchema = exports.stdOutgoingQuickRepliesMessageSchema = exports.stdOutgoingTextMessageSchema = exports.payloadTypeSchema = exports.fileTypeSchema = exports.FileType = exports.outgoingMessageFormatSchema = exports.OutgoingMessageFormat = exports.incomingMessageType = exports.IncomingMessageType = exports.StdEventType = void 0;
const zod_1 = require("zod");
const attachment_1 = require("./attachment");
const button_1 = require("./button");
const options_1 = require("./options");
const quick_reply_1 = require("./quick-reply");
var StdEventType;
(function (StdEventType) {
    StdEventType["message"] = "message";
    StdEventType["delivery"] = "delivery";
    StdEventType["read"] = "read";
    StdEventType["typing"] = "typing";
    StdEventType["follow"] = "follow";
    StdEventType["echo"] = "echo";
    StdEventType["unknown"] = "";
})(StdEventType || (exports.StdEventType = StdEventType = {}));
var IncomingMessageType;
(function (IncomingMessageType) {
    IncomingMessageType["message"] = "message";
    IncomingMessageType["postback"] = "postback";
    IncomingMessageType["quick_reply"] = "quick_reply";
    IncomingMessageType["location"] = "location";
    IncomingMessageType["attachments"] = "attachments";
    IncomingMessageType["unknown"] = "";
})(IncomingMessageType || (exports.IncomingMessageType = IncomingMessageType = {}));
exports.incomingMessageType = zod_1.z.nativeEnum(IncomingMessageType);
var OutgoingMessageFormat;
(function (OutgoingMessageFormat) {
    OutgoingMessageFormat["text"] = "text";
    OutgoingMessageFormat["quickReplies"] = "quickReplies";
    OutgoingMessageFormat["buttons"] = "buttons";
    OutgoingMessageFormat["attachment"] = "attachment";
    OutgoingMessageFormat["list"] = "list";
    OutgoingMessageFormat["carousel"] = "carousel";
    OutgoingMessageFormat["system"] = "system";
})(OutgoingMessageFormat || (exports.OutgoingMessageFormat = OutgoingMessageFormat = {}));
exports.outgoingMessageFormatSchema = zod_1.z.nativeEnum(OutgoingMessageFormat);
var FileType;
(function (FileType) {
    FileType["image"] = "image";
    FileType["video"] = "video";
    FileType["audio"] = "audio";
    FileType["file"] = "file";
    FileType["unknown"] = "unknown";
})(FileType || (exports.FileType = FileType = {}));
exports.fileTypeSchema = zod_1.z.nativeEnum(FileType);
exports.payloadTypeSchema = zod_1.z.nativeEnum(button_1.PayloadType);
exports.stdOutgoingTextMessageSchema = zod_1.z.object({
    text: zod_1.z.string(),
});
exports.stdOutgoingQuickRepliesMessageSchema = zod_1.z.object({
    text: zod_1.z.string(),
    quickReplies: zod_1.z.array(quick_reply_1.stdQuickReplySchema),
});
exports.stdOutgoingButtonsMessageSchema = zod_1.z.object({
    text: zod_1.z.string(),
    buttons: zod_1.z.array(button_1.buttonSchema),
});
exports.contentElementSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
})
    .catchall(zod_1.z.any());
exports.contentPaginationSchema = zod_1.z.object({
    total: zod_1.z.number(),
    skip: zod_1.z.number(),
    limit: zod_1.z.number(),
});
exports.stdOutgoingListMessageSchema = zod_1.z.object({
    options: options_1.contentOptionsSchema,
    elements: zod_1.z.array(exports.contentElementSchema),
    pagination: exports.contentPaginationSchema,
});
exports.stdOutgoingAttachmentMessageSchema = zod_1.z.object({
    attachment: attachment_1.attachmentPayloadSchema,
    quickReplies: zod_1.z.array(quick_reply_1.stdQuickReplySchema).optional(),
});
exports.stdOutgoingSystemMessageSchema = zod_1.z.object({
    outcome: zod_1.z.string().optional(),
    data: zod_1.z.any().optional(),
});
exports.pluginNameSchema = zod_1.z
    .string()
    .regex(/-plugin$/);
exports.stdPluginMessageSchema = zod_1.z.object({
    plugin: exports.pluginNameSchema,
    args: zod_1.z.record(zod_1.z.any()),
});
exports.blockMessageSchema = zod_1.z.union([
    zod_1.z.array(zod_1.z.string()),
    exports.stdOutgoingTextMessageSchema,
    exports.stdOutgoingQuickRepliesMessageSchema,
    exports.stdOutgoingButtonsMessageSchema,
    exports.stdOutgoingListMessageSchema,
    exports.stdOutgoingAttachmentMessageSchema,
    exports.stdPluginMessageSchema,
]);
exports.StdOutgoingMessageSchema = zod_1.z.union([
    exports.stdOutgoingTextMessageSchema,
    exports.stdOutgoingQuickRepliesMessageSchema,
    exports.stdOutgoingButtonsMessageSchema,
    exports.stdOutgoingListMessageSchema,
    exports.stdOutgoingAttachmentMessageSchema,
]);
exports.stdIncomingTextMessageSchema = zod_1.z.object({
    text: zod_1.z.string(),
});
exports.stdIncomingPostBackMessageSchema = exports.stdIncomingTextMessageSchema.extend({
    postback: zod_1.z.string(),
});
exports.stdIncomingLocationMessageSchema = zod_1.z.object({
    type: zod_1.z.literal(button_1.PayloadType.location),
    coordinates: zod_1.z.object({
        lat: zod_1.z.number(),
        lon: zod_1.z.number(),
    }),
});
exports.stdIncomingAttachmentMessageSchema = zod_1.z.object({
    type: zod_1.z.literal(button_1.PayloadType.attachments),
    serialized_text: zod_1.z.string(),
    attachment: zod_1.z.union([
        attachment_1.attachmentPayloadSchema,
        zod_1.z.array(attachment_1.attachmentPayloadSchema),
    ]),
});
exports.stdIncomingMessageSchema = zod_1.z.union([
    exports.stdIncomingTextMessageSchema,
    exports.stdIncomingPostBackMessageSchema,
    exports.stdIncomingLocationMessageSchema,
    exports.stdIncomingAttachmentMessageSchema,
]);
exports.stdOutgoingTextEnvelopeSchema = zod_1.z.object({
    format: zod_1.z.literal(OutgoingMessageFormat.text),
    message: exports.stdOutgoingTextMessageSchema,
});
exports.stdOutgoingQuickRepliesEnvelopeSchema = zod_1.z.object({
    format: zod_1.z.literal(OutgoingMessageFormat.quickReplies),
    message: exports.stdOutgoingQuickRepliesMessageSchema,
});
exports.stdOutgoingButtonsEnvelopeSchema = zod_1.z.object({
    format: zod_1.z.literal(OutgoingMessageFormat.buttons),
    message: exports.stdOutgoingButtonsMessageSchema,
});
exports.stdOutgoingListEnvelopeSchema = zod_1.z.object({
    format: zod_1.z.enum(['list', 'carousel']),
    message: exports.stdOutgoingListMessageSchema,
});
exports.stdOutgoingAttachmentEnvelopeSchema = zod_1.z.object({
    format: zod_1.z.literal(OutgoingMessageFormat.attachment),
    message: exports.stdOutgoingAttachmentMessageSchema,
});
exports.stdOutgoingSystemEnvelopeSchema = zod_1.z.object({
    format: zod_1.z.literal(OutgoingMessageFormat.system),
    message: exports.stdOutgoingSystemMessageSchema,
});
exports.stdOutgoingMessageEnvelopeSchema = zod_1.z.union([
    exports.stdOutgoingTextEnvelopeSchema,
    exports.stdOutgoingQuickRepliesEnvelopeSchema,
    exports.stdOutgoingButtonsEnvelopeSchema,
    exports.stdOutgoingListEnvelopeSchema,
    exports.stdOutgoingAttachmentEnvelopeSchema,
]);
exports.stdOutgoingEnvelopeSchema = zod_1.z.union([
    exports.stdOutgoingMessageEnvelopeSchema,
    exports.stdOutgoingSystemEnvelopeSchema,
]);
exports.validMessageTextSchema = zod_1.z.object({
    text: zod_1.z.string(),
});
exports.textSchema = zod_1.z.array(zod_1.z.string().max(1000));
const quickReplySchema = zod_1.z
    .object({
    content_type: zod_1.z.nativeEnum(quick_reply_1.QuickReplyType),
    title: zod_1.z.string().max(20).optional(),
    payload: zod_1.z.string().max(1000).optional(),
})
    .superRefine((data, ctx) => {
    if (data.content_type === quick_reply_1.QuickReplyType.text) {
        if (data.title == null) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "Title is required when content_type is 'text'",
                path: ['title'],
            });
        }
        if (data.payload == null) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "Payload is required when content_type is 'text'",
                path: ['payload'],
            });
        }
    }
});
exports.pluginBlockMessageSchema = zod_1.z
    .record(zod_1.z.any())
    .superRefine((data, ctx) => {
    if (!('plugin' in data)) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "The object must contain the 'plugin' attribute",
            path: ['plugin'],
        });
    }
});
const textBlockMessageSchema = zod_1.z.string().max(1000);
const buttonMessageSchema = zod_1.z.object({
    text: zod_1.z.string(),
    buttons: zod_1.z.array(button_1.buttonSchema).max(3),
});
const quickReplyMessageSchema = zod_1.z.object({
    text: zod_1.z.string(),
    quickReplies: zod_1.z.array(quickReplySchema).max(11).optional(),
});
const listBlockMessageSchema = zod_1.z.object({
    elements: zod_1.z.boolean(),
});
const attachmentBlockMessageSchema = zod_1.z.object({
    text: zod_1.z.string().max(1000).optional(),
    attachment: zod_1.z.object({
        type: zod_1.z.nativeEnum(FileType),
        payload: zod_1.z.union([
            zod_1.z.object({ url: zod_1.z.string().url() }),
            zod_1.z.object({ id: zod_1.z.string().nullable() }),
        ]),
    }),
});
exports.blockMessageObjectSchema = zod_1.z.union([
    exports.textSchema,
    exports.pluginBlockMessageSchema,
    textBlockMessageSchema,
    buttonMessageSchema,
    quickReplyMessageSchema,
    listBlockMessageSchema,
    attachmentBlockMessageSchema,
]);
//# sourceMappingURL=message.js.map