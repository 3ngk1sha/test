"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messengerEvents = void 0;
const attachment_1 = require("../../../../../../chat/schemas/types/attachment");
const message_1 = require("../../../../../../chat/schemas/types/message");
const button_1 = require("../../../../../../chat/schemas/types/button");
const settings_1 = require("../settings");
const types_1 = require("../types");
const img_url = 'http://demo.hexabot.io/attachment/download/5c334078e2c41d11206bd152/myimage.png';
const payloadEvent = {
    sender: {
        id: '2743096055733217',
    },
    recipient: {
        id: '219372162010940',
    },
    timestamp: 1584118824568,
    postback: {
        title: 'Get Started',
        payload: 'GET_STARTED',
    },
};
const textEvent = {
    sender: {
        id: '2743096055733217',
    },
    recipient: {
        id: '219372162010940',
    },
    timestamp: 1584118824568,
    message: {
        mid: 'text-event-id',
        text: 'Hello world',
        nlp: {
            entities: {},
        },
    },
};
const echoEvent = {
    sender: {
        id: '219372162010940',
    },
    recipient: {
        id: '2743096055733217',
    },
    timestamp: 1584118824968,
    message: {
        mid: 'echo-event-id',
        text: 'Hello back',
        is_echo: true,
        nlp: {
            entities: {},
        },
    },
};
const locationEvent = {
    message: {
        mid: 'location-event-id',
        attachments: [
            {
                type: types_1.Messenger.AttachmentType.location,
                payload: {
                    coordinates: {
                        lat: 2.0545,
                        long: 12.2558,
                    },
                },
            },
        ],
    },
    sender: {
        id: '15841188',
    },
    recipient: {
        id: '15841183',
    },
    timestamp: 52477,
};
const fileEvent = {
    sender: {
        id: '2743096055733217',
    },
    recipient: {
        id: '219372162010940',
    },
    timestamp: 1584031883977,
    message: {
        mid: 'file-event-id',
        attachments: [
            {
                type: types_1.Messenger.AttachmentType.image,
                payload: {
                    url: img_url,
                },
            },
        ],
    },
};
exports.messengerEvents = [
    [
        'Payload Event',
        payloadEvent,
        {
            channelData: { name: settings_1.MESSENGER_CHANNEL_NAME },
            id: undefined,
            eventType: message_1.IncomingMessageType.message,
            messageType: message_1.IncomingMessageType.postback,
            payload: payloadEvent.postback.payload,
            message: {
                postback: payloadEvent.postback.payload,
                text: payloadEvent.postback.title,
            },
        },
    ],
    [
        'Text Event',
        textEvent,
        {
            channelData: { name: settings_1.MESSENGER_CHANNEL_NAME },
            id: textEvent.message.mid,
            eventType: message_1.IncomingMessageType.message,
            messageType: message_1.IncomingMessageType.message,
            payload: undefined,
            message: {
                text: textEvent.message.text,
            },
        },
    ],
    [
        'Echo Event',
        echoEvent,
        {
            channelData: { name: settings_1.MESSENGER_CHANNEL_NAME },
            id: echoEvent.message.mid,
            eventType: message_1.StdEventType.echo,
            messageType: message_1.IncomingMessageType.message,
            payload: undefined,
            message: {
                text: echoEvent.message.text,
            },
        },
    ],
    [
        'File Event',
        fileEvent,
        {
            channelData: { name: settings_1.MESSENGER_CHANNEL_NAME },
            id: fileEvent.message.mid,
            eventType: message_1.IncomingMessageType.message,
            messageType: message_1.IncomingMessageType.attachments,
            payload: {
                type: button_1.PayloadType.attachments,
                attachment: {
                    type: attachment_1.FileType.image,
                    payload: {
                        id: '9'.repeat(24),
                    },
                },
            },
            message: {
                type: button_1.PayloadType.attachments,
                attachment: {
                    payload: {
                        id: '9'.repeat(24),
                    },
                    type: attachment_1.FileType.image,
                },
                serialized_text: `attachment:image:undefined`,
            },
        },
    ],
    [
        'Location Event',
        locationEvent,
        {
            channelData: { name: settings_1.MESSENGER_CHANNEL_NAME },
            id: locationEvent.message.mid,
            eventType: message_1.IncomingMessageType.message,
            messageType: message_1.IncomingMessageType.location,
            payload: {
                type: button_1.PayloadType.location,
                coordinates: {
                    lat: locationEvent.message.attachments[0].payload.coordinates?.lat,
                    lon: locationEvent.message.attachments[0].payload.coordinates?.long,
                },
            },
            message: {
                type: button_1.PayloadType.location,
                coordinates: {
                    lat: locationEvent.message.attachments[0].payload.coordinates?.lat,
                    lon: locationEvent.message.attachments[0].payload.coordinates?.long,
                },
            },
        },
    ],
];
//# sourceMappingURL=events.mock.js.map