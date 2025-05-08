"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webEvents = exports.webEventText = void 0;
const attachment_1 = require("../../../../chat/schemas/types/attachment");
const message_1 = require("../../../../chat/schemas/types/message");
const types_1 = require("../types");
const webEventPayload = {
    type: types_1.Web.IncomingMessageType.postback,
    data: {
        text: 'Get Started',
        payload: 'GET_STARTED',
    },
    author: 'web-9be7aq09-b45a-452q-bcs0-f145b9qce1cad',
    mid: 'web-event-payload',
    read: true,
};
exports.webEventText = {
    type: types_1.Web.IncomingMessageType.text,
    data: {
        text: 'Hello',
    },
    author: 'web-9qsdfgqxac09-f83a-452d-bca0-f1qsdqg457c1ad',
    mid: 'web-event-text',
    read: true,
};
const webEventLocation = {
    type: types_1.Web.IncomingMessageType.location,
    data: {
        coordinates: {
            lat: 2.0545,
            lng: 12.2558,
        },
    },
    author: 'web-9beqsdqa09-b489a-438c-bqd0-f11buykkhl851ad',
    mid: 'web-event-location',
    read: true,
};
const webEventFile = {
    type: types_1.Web.IncomingMessageType.file,
    data: {
        type: 'image/png',
        size: 500,
        name: 'filename.extension',
        file: Buffer.from('my-image', 'utf-8'),
    },
    author: 'web-9be8ac09-b43a-432d-bca0-f11b98cec1ad',
    mid: 'web-event-file',
    read: true,
};
const payloadChannelData = {
    isSocket: true,
    ipAddress: '0.0.0.0',
};
const textChannelData = {
    isSocket: false,
    ipAddress: '1.1.1.1',
};
const locationChannelData = {
    isSocket: true,
    ipAddress: '2.2.2.2',
};
const fileChannelData = {
    isSocket: false,
    ipAddress: '3.3.3.3',
};
exports.webEvents = [
    [
        'Payload Event',
        webEventPayload,
        {
            channelData: payloadChannelData,
            id: webEventPayload.mid,
            eventType: message_1.StdEventType.message,
            messageType: message_1.IncomingMessageType.postback,
            payload: webEventPayload.data.payload,
            message: {
                postback: webEventPayload.data.payload,
                text: webEventPayload.data.text,
            },
        },
    ],
    [
        'Text Event',
        exports.webEventText,
        {
            channelData: textChannelData,
            id: exports.webEventText.mid,
            eventType: message_1.StdEventType.message,
            messageType: message_1.IncomingMessageType.message,
            payload: undefined,
            message: {
                text: exports.webEventText.data.text,
            },
        },
    ],
    [
        'Location Event',
        webEventLocation,
        {
            channelData: locationChannelData,
            id: webEventLocation.mid,
            eventType: message_1.StdEventType.message,
            messageType: message_1.IncomingMessageType.location,
            payload: {
                type: types_1.Web.IncomingMessageType.location,
                coordinates: {
                    lat: webEventLocation.data.coordinates.lat,
                    lon: webEventLocation.data.coordinates.lng,
                },
            },
            message: {
                type: types_1.Web.IncomingMessageType.location,
                coordinates: {
                    lat: webEventLocation.data.coordinates.lat,
                    lon: webEventLocation.data.coordinates.lng,
                },
            },
        },
    ],
    [
        'File Event',
        webEventFile,
        {
            channelData: fileChannelData,
            id: webEventFile.mid,
            eventType: message_1.StdEventType.message,
            messageType: message_1.IncomingMessageType.attachments,
            payload: {
                type: message_1.IncomingMessageType.attachments,
                attachment: {
                    type: attachment_1.FileType.image,
                    payload: {
                        id: '9'.repeat(24),
                    },
                },
            },
            message: {
                attachment: {
                    payload: {
                        id: '9'.repeat(24),
                    },
                    type: attachment_1.FileType.image,
                },
                serialized_text: 'attachment:image:filename.extension',
                type: message_1.IncomingMessageType.attachments,
            },
        },
    ],
];
//# sourceMappingURL=events.mock.js.map