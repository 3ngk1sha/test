"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentPayloadSchema = exports.attachmentRefSchema = exports.fileTypeSchema = exports.FileType = void 0;
const zod_1 = require("zod");
var FileType;
(function (FileType) {
    FileType["image"] = "image";
    FileType["video"] = "video";
    FileType["audio"] = "audio";
    FileType["file"] = "file";
    FileType["unknown"] = "unknown";
})(FileType || (exports.FileType = FileType = {}));
exports.fileTypeSchema = zod_1.z.nativeEnum(FileType);
exports.attachmentRefSchema = zod_1.z.union([
    zod_1.z.object({
        id: zod_1.z.string().nullable(),
    }),
    zod_1.z.object({
        url: zod_1.z.string(),
    }),
]);
exports.attachmentPayloadSchema = zod_1.z.object({
    type: exports.fileTypeSchema,
    payload: exports.attachmentRefSchema,
});
//# sourceMappingURL=attachment.js.map