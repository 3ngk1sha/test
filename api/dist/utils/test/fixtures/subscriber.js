"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installSubscriberFixtures = exports.subscriberFixtures = exports.subscriberDefaultValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subscriber_schema_1 = require("../../../chat/schemas/subscriber.schema");
const defaultValues_1 = require("../defaultValues");
const label_1 = require("./label");
const user_1 = require("./user");
exports.subscriberDefaultValues = {
    timezone: 0,
    assignedTo: null,
    assignedAt: null,
    lastvisit: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    retainedFrom: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    avatar: null,
};
const subscribers = [
    {
        foreign_id: 'foreign-id-messenger',
        first_name: 'Jhon',
        last_name: 'Doe',
        language: 'fr',
        locale: 'en_EN',
        gender: 'male',
        country: 'FR',
        channel: {
            name: 'messenger-channel',
        },
        labels: [],
        lastvisit: new Date('2020-01-01T20:40:03.249Z'),
        retainedFrom: new Date('2020-01-01T20:40:03.249Z'),
    },
    {
        foreign_id: 'foreign-id-web-1',
        first_name: 'Maynard',
        last_name: 'James Keenan',
        language: 'en',
        locale: 'en_EN',
        gender: 'male',
        country: 'US',
        channel: {
            name: 'web-channel',
        },
        labels: [],
        lastvisit: new Date('2021-01-01T20:40:03.249Z'),
        retainedFrom: new Date('2021-01-02T20:40:03.249Z'),
    },
    {
        foreign_id: 'foreign-id-web-2',
        first_name: 'Queen',
        last_name: 'Elisabeth',
        language: 'en',
        locale: 'en_EN',
        gender: 'male',
        country: 'US',
        channel: {
            name: 'web-channel',
        },
        labels: [],
        lastvisit: new Date('2022-01-01T20:40:03.249Z'),
        retainedFrom: new Date('2022-01-02T20:40:03.249Z'),
    },
    {
        foreign_id: 'foreign-id-dimelo',
        first_name: 'Carl',
        last_name: 'Jung',
        language: 'en',
        locale: 'en_EN',
        gender: 'male',
        country: 'US',
        channel: {
            name: 'web-channel',
        },
        labels: [],
        lastvisit: new Date('2024-01-01T20:40:03.249Z'),
        retainedFrom: new Date('2024-01-02T20:40:03.249Z'),
    },
];
exports.subscriberFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: subscribers,
    defaultValues: exports.subscriberDefaultValues,
});
const installSubscriberFixtures = async () => {
    const Subscriber = mongoose_1.default.model(subscriber_schema_1.SubscriberModel.name, subscriber_schema_1.SubscriberModel.schema);
    const { users } = await (0, user_1.installUserFixtures)();
    const labels = await (0, label_1.installLabelFixtures)();
    const subscribers = await Subscriber.insertMany(exports.subscriberFixtures.map((subscriberFixture) => ({
        ...subscriberFixture,
        labels: labels.map(({ _id }) => _id.toString()),
        assignedTo: users[0].id,
    })));
    return { labels, subscribers, users };
};
exports.installSubscriberFixtures = installSubscriberFixtures;
//# sourceMappingURL=subscriber.js.map