"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberWithLabels = exports.subscriberWithoutLabels = exports.subscriberInstance = void 0;
const base_mock_1 = require("./base.mock");
const label_mock_1 = require("./label.mock");
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
    ...base_mock_1.modelInstance,
};
exports.subscriberWithoutLabels = {
    ...exports.subscriberInstance,
    labels: [],
};
exports.subscriberWithLabels = {
    ...exports.subscriberWithoutLabels,
    labels: label_mock_1.customerLabelsMock.map(({ id }) => id),
    assignedTo: null,
};
//# sourceMappingURL=subscriber.mock.js.map