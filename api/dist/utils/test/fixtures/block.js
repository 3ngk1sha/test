"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installBlockFixtures = exports.blockFixtures = exports.blocks = exports.blockDefaultValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const block_schema_1 = require("../../../chat/schemas/block.schema");
const category_schema_1 = require("../../../chat/schemas/category.schema");
const attachment_1 = require("../../../chat/schemas/types/attachment");
const button_1 = require("../../../chat/schemas/types/button");
const quick_reply_1 = require("../../../chat/schemas/types/quick-reply");
const defaultValues_1 = require("../defaultValues");
exports.blockDefaultValues = {
    options: {},
    nextBlocks: [],
    capture_vars: [],
    assign_labels: [],
    trigger_labels: [],
    trigger_channels: [],
    builtin: false,
    starts_conversation: false,
};
exports.blocks = [
    {
        name: 'hasNextBlocks',
        patterns: ['Hi'],
        outcomes: [],
        category: null,
        options: {
            typing: 0,
            fallback: {
                active: false,
                max_attempts: 1,
                message: [],
            },
        },
        message: ['Hi back !'],
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        name: 'hasPreviousBlocks',
        patterns: ['colors'],
        outcomes: [],
        category: null,
        options: {
            typing: 0,
            fallback: {
                active: false,
                max_attempts: 1,
                message: [],
            },
        },
        message: {
            text: 'What"s your favorite color?',
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
        position: {
            x: 0,
            y: 1,
        },
    },
    {
        name: 'buttons',
        patterns: ['about'],
        outcomes: [],
        category: null,
        options: {
            typing: 0,
            fallback: {
                active: false,
                max_attempts: 1,
                message: [],
            },
        },
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
        position: {
            x: 0,
            y: 2,
        },
    },
    {
        name: 'attachment',
        patterns: ['image'],
        outcomes: [],
        category: null,
        options: {
            typing: 0,
            fallback: {
                active: false,
                max_attempts: 1,
                message: [],
            },
        },
        message: {
            attachment: {
                type: attachment_1.FileType.image,
                payload: {
                    id: '1',
                },
            },
            quickReplies: [],
        },
        position: {
            x: 0,
            y: 3,
        },
    },
    {
        name: 'test',
        patterns: ['yes'],
        outcomes: [],
        category: null,
        options: {
            typing: 0,
            fallback: {
                active: false,
                max_attempts: 1,
                message: [],
            },
        },
        message: [':)', ':D', ';)'],
        position: {
            x: 36,
            y: 78,
        },
    },
];
exports.blockFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: exports.blocks,
    defaultValues: exports.blockDefaultValues,
});
const installBlockFixtures = async () => {
    const Category = mongoose_1.default.model(category_schema_1.CategoryModel.name, category_schema_1.CategoryModel.schema);
    const defaultCategory = await Category.create({
        label: 'default',
        builtin: true,
    });
    const Block = mongoose_1.default.model(block_schema_1.BlockModel.name, block_schema_1.BlockModel.schema);
    const blocks = await Block.insertMany(exports.blockFixtures.map((blockFixture) => ({
        ...blockFixture,
        category: defaultCategory.id,
    })));
    return await Block.updateOne({ name: 'hasNextBlocks' }, { $set: { nextBlocks: blocks[1].id } });
};
exports.installBlockFixtures = installBlockFixtures;
//# sourceMappingURL=block.js.map