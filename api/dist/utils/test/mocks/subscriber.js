"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberWithLabels = exports.subscriberWithoutLabels = exports.subscriberInstance = void 0;
const label_mock_1 = require("../../../channel/lib/__test__/label.mock");
const misc_1 = require("./misc");
exports.subscriberInstance = {
    foreign_id: 'foreign-id-for-jhon-doe',
    first_name: 'John',
    last_name: 'Doe',
    language: 'fr',
    locale: 'fr_FR',
    gender: 'male',
    timezone: -1,
    country: 'TN',
    assignedTo: null,
    assignedAt: null,
    lastvisit: new Date(),
    retainedFrom: new Date(),
    channel: {
        name: 'web-channel',
    },
    labels: [],
    avatar: null,
    context: {},
    ...misc_1.modelInstance,
};
exports.subscriberWithoutLabels = {
    ...exports.subscriberInstance,
    labels: [],
};
exports.subscriberWithLabels = {
    ...exports.subscriberWithoutLabels,
    labels: label_mock_1.customerLabelsMock,
    assignedTo: null,
    avatar: null,
};
//# sourceMappingURL=subscriber.js.map