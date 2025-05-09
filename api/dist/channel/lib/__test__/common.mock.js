"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentMessage = exports.contentMessage = exports.urlButtonsMessage = exports.buttonsMessage = exports.quickRepliesMessage = exports.textMessage = void 0;
const types_1 = require("../../../attachment/types");
const button_1 = require("../../../chat/schemas/types/button");
const message_1 = require("../../../chat/schemas/types/message");
const quick_reply_1 = require("../../../chat/schemas/types/quick-reply");
exports.textMessage = {
    text: 'Hello World',
};
exports.quickRepliesMessage = {
    text: 'Choose one option',
    quickReplies: [
        {
            content_type: quick_reply_1.QuickReplyType.text,
            title: 'First option',
            payload: 'first_option',
        },
        {
            content_type: quick_reply_1.QuickReplyType.text,
            title: 'Second option',
            payload: 'second_option',
        },
    ],
};
exports.buttonsMessage = {
    text: 'Hit one of these buttons :',
    buttons: [
        {
            type: button_1.ButtonType.postback,
            title: 'First button',
            payload: 'first_button',
        },
        {
            type: button_1.ButtonType.web_url,
            title: 'Second button',
            url: 'http://button.com',
            messenger_extensions: true,
            webview_height_ratio: 'compact',
        },
    ],
};
exports.urlButtonsMessage = {
    text: 'Hit one of these buttons :',
    buttons: [
        {
            type: button_1.ButtonType.web_url,
            title: 'First button',
            url: 'http://button1.com',
            messenger_extensions: true,
            webview_height_ratio: 'compact',
        },
        {
            type: button_1.ButtonType.web_url,
            title: 'Second button',
            url: 'http://button2.com',
            messenger_extensions: true,
            webview_height_ratio: 'compact',
        },
    ],
};
const attachment = {
    id: '1'.repeat(24),
    name: 'attachment.jpg',
    type: 'image/jpeg',
    size: 3539,
    location: '39991e51-55c6-4a26-9176-b6ba04f180dc.jpg',
    channel: {
        ['any-channel']: {
            id: 'any-channel-attachment-id',
        },
    },
    resourceRef: types_1.AttachmentResourceRef.BlockAttachment,
    access: types_1.AttachmentAccess.Public,
    createdByRef: types_1.AttachmentCreatedByRef.User,
    createdBy: null,
    createdAt: new Date(),
    updatedAt: new Date(),
};
exports.contentMessage = {
    options: {
        display: message_1.OutgoingMessageFormat.list,
        fields: {
            title: 'title',
            subtitle: 'desc',
            image_url: 'thumbnail',
        },
        buttons: [
            {
                type: button_1.ButtonType.postback,
                title: 'More',
                payload: '',
            },
        ],
        limit: 2,
    },
    elements: [
        {
            id: '1',
            entity: 'rank',
            title: 'First',
            desc: 'About being first',
            thumbnail: {
                type: 'image',
                payload: { id: attachment.id },
            },
            getPayload() {
                return this.title;
            },
            createdAt: new Date(),
            updatedAt: new Date(),
            status: true,
        },
        {
            id: '2',
            entity: 'rank',
            title: 'Second',
            desc: 'About being second',
            thumbnail: {
                type: 'image',
                payload: { id: attachment.id },
            },
            getPayload() {
                return this.title;
            },
            createdAt: new Date(),
            updatedAt: new Date(),
            status: true,
        },
    ],
    pagination: {
        total: 3,
        skip: 0,
        limit: 2,
    },
};
exports.attachmentMessage = {
    attachment: {
        type: message_1.FileType.image,
        payload: { id: attachment.id },
    },
    quickReplies: [
        {
            content_type: quick_reply_1.QuickReplyType.text,
            title: 'Next >',
            payload: 'NEXT',
        },
    ],
};
//# sourceMappingURL=common.mock.js.map