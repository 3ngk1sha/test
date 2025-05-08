"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installMessageFixtures = exports.messageFixtures = exports.messageDefaultValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const message_schema_1 = require("../../../chat/schemas/message.schema");
const defaultValues_1 = require("../defaultValues");
const subscriber_1 = require("./subscriber");
const messages = [
    {
        mid: 'mid-1',
        sender: '1',
        recipient: '1',
        sentBy: '0',
        message: { text: 'Hello from the past' },
        read: true,
        delivery: true,
    },
    {
        mid: 'mid-2',
        sender: '1',
        recipient: '1',
        sentBy: '0',
        message: { text: 'Hello' },
        delivery: true,
    },
    {
        mid: 'mid-3',
        sender: '1',
        recipient: '1',
        sentBy: '0',
        message: { text: 'Hello back' },
    },
];
exports.messageDefaultValues = {
    read: false,
    delivery: false,
    handover: false,
    createdAt: new Date('2024-01-01T00:00:00.00Z'),
};
exports.messageFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: messages,
    defaultValues: exports.messageDefaultValues,
});
const installMessageFixtures = async () => {
    const { subscribers, users } = await (0, subscriber_1.installSubscriberFixtures)();
    const Message = mongoose_1.default.model(message_schema_1.MessageModel.name, message_schema_1.MessageModel.schema);
    return await Message.insertMany(exports.messageFixtures.map((m) => {
        return {
            ...m,
            sender: m.sender ? subscribers[parseInt(m.sender)].id : null,
            recipient: m.recipient ? subscribers[parseInt(m.recipient)].id : null,
            sentBy: m.sentBy ? users[parseInt(m.sentBy)].id : null,
        };
    }));
};
exports.installMessageFixtures = installMessageFixtures;
//# sourceMappingURL=message.js.map