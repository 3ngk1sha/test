"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installAttachmentFixtures = exports.attachmentFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const attachment_schema_1 = require("../../../attachment/schemas/attachment.schema");
const types_1 = require("../../../attachment/types");
exports.attachmentFixtures = [
    {
        name: 'store1.jpg',
        type: 'image/jpeg',
        size: 3539,
        location: '39991e51-55c6-4a26-9176-b6ba04f180dc.jpg',
        channel: {
            'web-channel': {
                id: '1',
            },
        },
        resourceRef: types_1.AttachmentResourceRef.ContentAttachment,
        access: types_1.AttachmentAccess.Public,
        createdByRef: types_1.AttachmentCreatedByRef.User,
        createdBy: '9'.repeat(24),
    },
    {
        name: 'store2.jpg',
        type: 'image/jpeg',
        size: 3539,
        location: '39991e51-55c6-4a26-9176-b6ba04f180dd.jpg',
        channel: {
            'web-channel': {
                id: '2',
            },
        },
        resourceRef: types_1.AttachmentResourceRef.ContentAttachment,
        access: types_1.AttachmentAccess.Public,
        createdByRef: types_1.AttachmentCreatedByRef.User,
        createdBy: '9'.repeat(24),
    },
];
const installAttachmentFixtures = async () => {
    const Attachment = mongoose_1.default.model(attachment_schema_1.AttachmentModel.name, attachment_schema_1.AttachmentModel.schema);
    return await Attachment.insertMany(exports.attachmentFixtures);
};
exports.installAttachmentFixtures = installAttachmentFixtures;
//# sourceMappingURL=attachment.js.map