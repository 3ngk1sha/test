"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachments = exports.attachmentFile = exports.attachment = void 0;
const node_stream_1 = require("node:stream");
const types_1 = require("../types");
exports.attachment = {
    name: 'Screenshot from 2022-03-11 08-41-27-2a9799a8b6109c88fd9a7a690c1101934c.png',
    type: 'image/png',
    size: 343370,
    location: '/Screenshot from 2022-03-11 08-41-27-2a9799a8b6109c88fd9a7a690c1101934c.png',
    resourceRef: types_1.AttachmentResourceRef.BlockAttachment,
    access: types_1.AttachmentAccess.Public,
    id: '65940d115178607da65c82b6',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '1',
    createdByRef: types_1.AttachmentCreatedByRef.User,
};
exports.attachmentFile = {
    filename: exports.attachment.name,
    mimetype: exports.attachment.type,
    size: exports.attachment.size,
    buffer: Buffer.from(new Uint8Array([])),
    destination: '',
    fieldname: '',
    originalname: exports.attachment.name,
    path: '',
    stream: new node_stream_1.Stream.Readable(),
    encoding: '7bit',
};
exports.attachments = [
    exports.attachment,
    {
        name: 'Screenshot from 2022-03-11 08-41-27-2a9799a8b6109c88fd9a7a690c1101934c.png',
        type: 'image/png',
        size: 343370,
        location: '/app/src/attachment/uploads/Screenshot from 2022-03-11 08-41-27-2a9799a8b6109c88fd9a7a690c1101934c.png',
        channel: { ['some-channel']: {} },
        resourceRef: types_1.AttachmentResourceRef.BlockAttachment,
        access: types_1.AttachmentAccess.Public,
        id: '65940d115178607da65c82b7',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: '1',
        createdByRef: types_1.AttachmentCreatedByRef.User,
    },
    {
        name: 'Screenshot from 2022-03-18 08-58-15-af61e7f71281f9fd3f1ad7ad10107741c.png',
        type: 'image/png',
        size: 33829,
        location: '/app/src/attachment/uploads/Screenshot from 2022-03-18 08-58-15-af61e7f71281f9fd3f1ad7ad10107741c.png',
        channel: { ['some-channel']: {} },
        resourceRef: types_1.AttachmentResourceRef.BlockAttachment,
        access: types_1.AttachmentAccess.Public,
        id: '65940d115178607da65c82b8',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: '1',
        createdByRef: types_1.AttachmentCreatedByRef.User,
    },
];
//# sourceMappingURL=attachment.mock.js.map