"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messengerAttachment = exports.messengerCarousel = exports.messengerList = exports.messengerButtons = exports.messengerQuickReplies = exports.messengerText = void 0;
const common_mock_1 = require("../../../../../../channel/lib/__test__/common.mock");
const constants_1 = require("../../../../../../chat/helpers/constants");
const button_1 = require("../../../../../../chat/schemas/types/button");
const quick_reply_1 = require("../../../../../../chat/schemas/types/quick-reply");
const types_1 = require("../types");
exports.messengerText = common_mock_1.textMessage;
exports.messengerQuickReplies = {
    text: 'Choose one option',
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
};
exports.messengerButtons = {
    attachment: {
        type: types_1.Messenger.TemplateType.template,
        payload: {
            template_type: types_1.Messenger.TemplateType.button,
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
        },
    },
};
exports.messengerList = {
    attachment: {
        type: types_1.Messenger.TemplateType.template,
        payload: {
            template_type: types_1.Messenger.TemplateType.generic,
            elements: [
                {
                    title: 'First',
                    subtitle: 'About being first',
                    image_url: 'http://localhost:4000/webhook/messenger/download/1/attachment.jpg',
                    buttons: [
                        {
                            type: button_1.ButtonType.postback,
                            title: 'More',
                            payload: 'More:First',
                        },
                    ],
                },
                {
                    title: 'Second',
                    subtitle: 'About being second',
                    image_url: 'http://localhost:4000/webhook/messenger/download/1/attachment.jpg',
                    buttons: [
                        {
                            type: button_1.ButtonType.postback,
                            title: 'More',
                            payload: 'More:Second',
                        },
                    ],
                },
                {
                    title: 'More',
                    subtitle: 'Click on the button below to view more of the content',
                    buttons: [
                        {
                            type: button_1.ButtonType.postback,
                            title: 'View More',
                            payload: constants_1.VIEW_MORE_PAYLOAD,
                        },
                    ],
                },
            ],
        },
    },
};
exports.messengerCarousel = {
    attachment: {
        type: types_1.Messenger.TemplateType.template,
        payload: {
            template_type: types_1.Messenger.TemplateType.generic,
            elements: [
                {
                    title: 'First',
                    subtitle: 'About being first',
                    image_url: 'http://localhost:4000/webhook/messenger/download/1/attachment.jpg',
                    buttons: [
                        {
                            type: button_1.ButtonType.postback,
                            title: 'More',
                            payload: 'More:First',
                        },
                    ],
                },
                {
                    title: 'Second',
                    subtitle: 'About being second',
                    image_url: 'http://localhost:4000/webhook/messenger/download/1/attachment.jpg',
                    buttons: [
                        {
                            type: button_1.ButtonType.postback,
                            title: 'More',
                            payload: 'More:Second',
                        },
                    ],
                },
            ],
        },
    },
};
exports.messengerAttachment = {
    attachment: {
        type: types_1.Messenger.AttachmentType.image,
        payload: {
            url: 'http://localhost:4000/webhook/messenger/download/1/attachment.jpg',
            is_reusable: false,
        },
    },
    quick_replies: [
        {
            content_type: quick_reply_1.QuickReplyType.text,
            title: 'Next >',
            payload: 'NEXT',
        },
    ],
};
//# sourceMappingURL=data.mock.js.map