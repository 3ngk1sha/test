"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationGetStarted = exports.contextGetStartedInstance = exports.contextEmailVarInstance = exports.subscriberContextBlankInstance = exports.contextBlankInstance = void 0;
const block_1 = require("./block");
const misc_1 = require("./misc");
const subscriber_1 = require("./subscriber");
exports.contextBlankInstance = {
    channel: 'web-channel',
    text: '',
    payload: undefined,
    nlp: { entities: [] },
    vars: {},
    user_location: {
        lat: 0,
        lon: 0,
    },
    user: subscriber_1.subscriberInstance,
    skip: {},
    attempt: 1,
};
exports.subscriberContextBlankInstance = {
    vars: {},
};
exports.contextEmailVarInstance = {
    ...exports.contextBlankInstance,
    vars: {
        email: 'email@example.com',
    },
};
exports.contextGetStartedInstance = {
    channel: 'web-channel',
    text: 'Get Started',
    payload: 'GET_STARTED',
    nlp: { entities: [] },
    vars: {
        email: 'email@example.com',
    },
    user_location: {
        lat: 0,
        lon: 0,
    },
    user: subscriber_1.subscriberInstance,
    skip: {},
    attempt: 1,
};
exports.conversationGetStarted = {
    sender: subscriber_1.subscriberInstance,
    active: true,
    context: exports.contextGetStartedInstance,
    current: block_1.textBlock,
    next: [block_1.quickRepliesBlock],
    ...misc_1.modelInstance,
};
//# sourceMappingURL=conversation.js.map