"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blocks = exports.blockCarouselMock = exports.blockProductListMock = exports.blockGetStarted = exports.allBlocksStringsResult = exports.attachmentBlock = exports.buttonsBlock = exports.buttonsResult = exports.quickRepliesBlock = exports.quickRepliesResult = exports.textBlock = exports.textResult = exports.blockEmpty = exports.baseBlockInstance = void 0;
const label_mock_1 = require("../../../channel/lib/__test__/label.mock");
const attachment_1 = require("../../../chat/schemas/types/attachment");
const button_1 = require("../../../chat/schemas/types/button");
const message_1 = require("../../../chat/schemas/types/message");
const quick_reply_1 = require("../../../chat/schemas/types/quick-reply");
const misc_1 = require("./misc");
const blockOptions = {
    typing: 0,
    fallback: {
        active: false,
        max_attempts: 1,
        message: [],
    },
};
const blockListOptions = {
    content: {
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
        entity: 1,
    },
};
const blockCarouselOptions = {
    content: {
        display: message_1.OutgoingMessageFormat.carousel,
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
        limit: 3,
        entity: 1,
    },
};
const captureVar = {
    entity: -2,
    context_var: 'string',
};
const position = {
    x: 0,
    y: 0,
};
exports.baseBlockInstance = {
    trigger_labels: [label_mock_1.labelMock],
    assign_labels: [label_mock_1.labelMock],
    options: blockOptions,
    starts_conversation: false,
    capture_vars: [captureVar],
    position,
    builtin: true,
    attachedBlock: null,
    category: undefined,
    previousBlocks: [],
    trigger_channels: [],
    nextBlocks: [],
    ...misc_1.modelInstance,
};
exports.blockEmpty = {
    ...exports.baseBlockInstance,
    name: 'Empty',
    patterns: [],
    message: [''],
    nextBlocks: [],
};
exports.textResult = ['Hi back !'];
exports.textBlock = {
    name: 'message',
    patterns: ['Hi'],
    message: exports.textResult,
    ...exports.baseBlockInstance,
};
exports.quickRepliesResult = [
    "What's your favorite color?",
    'Green',
    'Yellow',
    'Red',
];
exports.quickRepliesBlock = {
    name: 'message',
    patterns: ['colors'],
    message: {
        text: "What's your favorite color?",
        quickReplies: [
            {
                content_type: quick_reply_1.QuickReplyType.text,
                title: 'Green',
                payload: 'Green',
            },
            {
                content_type: quick_reply_1.QuickReplyType.text,
                title: 'Yellow',
                payload: 'Yellow',
            },
            {
                content_type: quick_reply_1.QuickReplyType.text,
                title: 'Red',
                payload: 'Red',
            },
        ],
    },
    ...exports.baseBlockInstance,
};
exports.buttonsResult = [
    'What would you like to know about us?',
    'Vision',
    'Values',
    'Approach',
];
exports.buttonsBlock = {
    name: 'message',
    patterns: ['about'],
    message: {
        text: 'What would you like to know about us?',
        buttons: [
            {
                type: button_1.ButtonType.postback,
                title: 'Vision',
                payload: 'Vision',
            },
            {
                type: button_1.ButtonType.postback,
                title: 'Values',
                payload: 'Values',
            },
            {
                type: button_1.ButtonType.postback,
                title: 'Approach',
                payload: 'Approach',
            },
        ],
    },
    ...exports.baseBlockInstance,
};
exports.attachmentBlock = {
    name: 'message',
    patterns: ['image'],
    message: {
        attachment: {
            type: attachment_1.FileType.image,
            payload: {
                url: 'https://fr.facebookbrand.com/wp-content/uploads/2016/09/messenger_icon2.png',
                id: '1234',
            },
        },
        quickReplies: [],
    },
    ...exports.baseBlockInstance,
};
exports.allBlocksStringsResult = [
    'Hi back !',
    'What"s your favorite color?',
    'Green',
    'Yellow',
    'Red',
    'What would you like to know about us?',
    'Vision',
    'Values',
    'Approach',
    ':)',
    ':D',
    ';)',
];
exports.blockGetStarted = {
    ...exports.baseBlockInstance,
    name: 'Get Started',
    patterns: [
        'Hello',
        '/we*lcome/',
        { label: 'Get Started', value: 'GET_STARTED' },
        {
            label: 'Tounes',
            value: 'Tounes',
            type: button_1.PayloadType.location,
        },
        {
            label: 'Livre',
            value: 'Livre',
            type: button_1.PayloadType.attachments,
        },
        [
            {
                entity: 'intent',
                match: 'value',
                value: 'greeting',
            },
            {
                entity: 'firstname',
                match: 'entity',
            },
        ],
    ],
    trigger_labels: label_mock_1.customerLabelsMock,
    message: ['Welcome! How are you ? '],
};
const patternsProduct = [
    'produit',
    [
        {
            entity: 'intent',
            match: 'value',
            value: 'product',
        },
        {
            entity: 'vetement',
            match: 'entity',
        },
    ],
];
exports.blockProductListMock = {
    ...exports.baseBlockInstance,
    name: 'test_list',
    patterns: patternsProduct,
    trigger_labels: label_mock_1.customerLabelsMock,
    assign_labels: [],
    options: blockListOptions,
    message: {
        options: blockListOptions.content,
        elements: [],
        pagination: {
            total: 0,
            skip: 0,
            limit: 0,
        },
    },
};
exports.blockCarouselMock = {
    ...exports.blockProductListMock,
    options: blockCarouselOptions,
};
exports.blocks = [exports.blockGetStarted, exports.blockEmpty];
//# sourceMappingURL=block.js.map