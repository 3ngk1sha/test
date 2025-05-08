"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installConversationTypeFixtures = exports.conversationFixtures = exports.conversationDefaultValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conversation_schema_1 = require("../../../chat/schemas/conversation.schema");
const defaultValues_1 = require("../defaultValues");
const block_1 = require("./block");
const subscriber_1 = require("./subscriber");
const conversations = [
    {
        sender: '0',
        active: true,
        context: {
            channel: 'messenger-channel',
            text: 'Hi',
            payload: '',
            nlp: {
                entities: [
                    {
                        entity: 'intent',
                        value: 'greeting',
                        confidence: 0.999,
                    },
                ],
            },
            vars: {
                age: 30,
                email: 'email@example.com',
            },
            user_location: {
                address: { country: 'FR' },
                lat: 35,
                lon: 45,
            },
            user: {
                id: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
                first_name: 'Jhon',
                last_name: 'Doe',
                language: 'fr',
                locale: 'en_EN',
                timezone: 0,
                gender: 'male',
                country: 'FR',
                foreign_id: '',
                labels: [],
                assignedTo: null,
                channel: { name: 'messenger-channel' },
                avatar: null,
                context: {},
                assignedAt: new Date(),
            },
            skip: {},
            attempt: 0,
        },
        current: '0',
        next: ['1', '2'],
    },
    {
        sender: '1',
        context: {
            channel: 'web-channel',
            text: 'Hello',
            payload: '',
            nlp: {
                entities: [
                    {
                        entity: 'intent',
                        value: 'greeting',
                        confidence: 0.999,
                    },
                ],
            },
            vars: {
                age: 30,
                email: 'email@example.com',
            },
            user_location: {
                address: { country: 'US' },
                lat: 15,
                lon: 45,
            },
            user: {
                id: '2',
                createdAt: new Date(),
                updatedAt: new Date(),
                first_name: 'Maynard',
                last_name: 'James Keenan',
                language: 'en',
                locale: 'en_EN',
                timezone: 0,
                gender: 'male',
                country: 'US',
                foreign_id: '',
                labels: [],
                assignedTo: null,
                channel: { name: 'web-channel' },
                avatar: null,
                context: {},
                assignedAt: new Date(),
            },
            skip: {},
            attempt: 0,
        },
        current: '4',
        next: ['3', '4'],
    },
];
exports.conversationDefaultValues = {
    active: false,
};
exports.conversationFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: conversations,
    defaultValues: exports.conversationDefaultValues,
});
const installConversationTypeFixtures = async () => {
    const subscribers = await (0, subscriber_1.installSubscriberFixtures)();
    const blocks = await (0, block_1.installBlockFixtures)();
    const Conversation = mongoose_1.default.model(conversation_schema_1.ConversationModel.name, conversation_schema_1.ConversationModel.schema);
    return await Conversation.insertMany(exports.conversationFixtures.map((conversationFixture) => ({
        ...conversationFixture,
        sender: subscribers[parseInt(conversationFixture.sender)].id,
        current: conversationFixture.current
            ? blocks[parseInt(conversationFixture.current)]?.id
            : undefined,
        next: conversationFixture.next?.map((n) => blocks[parseInt(n)].id),
    })));
};
exports.installConversationTypeFixtures = installConversationTypeFixtures;
//# sourceMappingURL=conversation.js.map