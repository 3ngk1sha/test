"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webAttachment = exports.webCarousel = exports.webList = exports.webButtons = exports.webQuickReplies = exports.webText = void 0;
const common_mock_1 = require("../../../../channel/lib/__test__/common.mock");
const constants_1 = require("../../../../chat/helpers/constants");
const button_1 = require("../../../../chat/schemas/types/button");
const message_1 = require("../../../../chat/schemas/types/message");
const quick_reply_1 = require("../../../../chat/schemas/types/quick-reply");
const types_1 = require("../types");
exports.webText = {
    type: types_1.Web.OutgoingMessageType.text,
    data: common_mock_1.textMessage,
};
exports.webQuickReplies = {
    data: {
        quick_replies: [
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
        text: 'Choose one option',
    },
    type: types_1.Web.OutgoingMessageType.quick_replies,
};
exports.webButtons = {
    data: {
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
        text: 'Hit one of these buttons :',
    },
    type: types_1.Web.OutgoingMessageType.buttons,
};
exports.webList = {
    data: {
        buttons: [
            {
                payload: constants_1.VIEW_MORE_PAYLOAD,
                title: 'View More',
                type: button_1.ButtonType.postback,
            },
        ],
        elements: [
            {
                buttons: [
                    {
                        payload: 'More:First',
                        title: 'More',
                        type: button_1.ButtonType.postback,
                    },
                ],
                image_url: 'http://public.url/download/filename.extension?t=any',
                subtitle: 'About being first',
                title: 'First',
            },
            {
                buttons: [
                    {
                        payload: 'More:Second',
                        title: 'More',
                        type: button_1.ButtonType.postback,
                    },
                ],
                image_url: 'http://public.url/download/filename.extension?t=any',
                subtitle: 'About being second',
                title: 'Second',
            },
        ],
    },
    type: types_1.Web.OutgoingMessageType.list,
};
exports.webCarousel = {
    data: {
        elements: [
            {
                buttons: [
                    {
                        payload: 'More:First',
                        title: 'More',
                        type: button_1.ButtonType.postback,
                    },
                ],
                image_url: 'http://public.url/download/filename.extension?t=any',
                subtitle: 'About being first',
                title: 'First',
            },
            {
                buttons: [
                    {
                        payload: 'More:Second',
                        title: 'More',
                        type: button_1.ButtonType.postback,
                    },
                ],
                image_url: 'http://public.url/download/filename.extension?t=any',
                subtitle: 'About being second',
                title: 'Second',
            },
        ],
    },
    type: types_1.Web.OutgoingMessageType.carousel,
};
exports.webAttachment = {
    data: {
        quick_replies: [
            {
                content_type: quick_reply_1.QuickReplyType.text,
                payload: 'NEXT',
                title: 'Next >',
            },
        ],
        type: message_1.FileType.image,
        url: 'http://public.url/download/filename.extension?t=any',
    },
    type: types_1.Web.OutgoingMessageType.file,
};
//# sourceMappingURL=data.mock.js.map