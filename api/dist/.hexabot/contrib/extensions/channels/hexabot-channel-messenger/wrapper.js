"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attachment_schema_1 = require("../../../../../attachment/schemas/attachment.schema");
const EventWrapper_1 = __importDefault(require("../../../../../channel/lib/EventWrapper"));
const attachment_1 = require("../../../../../chat/schemas/types/attachment");
const button_1 = require("../../../../../chat/schemas/types/button");
const message_1 = require("../../../../../chat/schemas/types/message");
const types_1 = require("./types");
class MessengerEventWrapper extends EventWrapper_1.default {
    constructor(handler, event) {
        super(handler, event);
        this.profile = undefined;
    }
    _init(event) {
        if ('message' in event) {
            if ('is_echo' in event.message) {
                this._adapter.eventType = message_1.StdEventType.echo;
            }
            else {
                this._adapter.eventType = message_1.StdEventType.message;
            }
            const message = event.message;
            if ('quick_reply' in message) {
                this._adapter.messageType = message_1.IncomingMessageType.quick_reply;
            }
            else if ('text' in message) {
                this._adapter.messageType = message_1.IncomingMessageType.message;
            }
            else if (message.attachments &&
                Array.isArray(message.attachments) &&
                message.attachments.length > 0) {
                if (message.attachments[0].type === types_1.Messenger.AttachmentType.location) {
                    this._adapter.messageType = message_1.IncomingMessageType.location;
                }
                else {
                    this._adapter.messageType = message_1.IncomingMessageType.attachments;
                }
            }
            else {
                this._adapter.messageType = message_1.IncomingMessageType.unknown;
            }
        }
        else if ('postback' in event) {
            this._adapter.eventType = message_1.StdEventType.message;
            this._adapter.messageType = message_1.IncomingMessageType.postback;
        }
        else if ('delivery' in event) {
            this._adapter.eventType = message_1.StdEventType.delivery;
        }
        else if ('read' in event) {
            this._adapter.eventType = message_1.StdEventType.read;
        }
        else {
            this._adapter.eventType = message_1.StdEventType.unknown;
        }
        this._adapter.raw = event;
    }
    setProfile(profile) {
        this.profile = profile;
    }
    getProfile() {
        return this.profile;
    }
    getId() {
        if ('message' in this._adapter.raw) {
            if (this._adapter.raw.message.mid) {
                return this._adapter.raw.message.mid;
            }
            throw new Error('The message id `mid` is missing');
        }
        throw new Error('The id (`mid`) is only available in message events (excluding postbacks)');
    }
    getSenderForeignId() {
        return this._adapter.raw.sender.id;
    }
    getRecipientForeignId() {
        return this._adapter.raw.recipient.id;
    }
    getEventType() {
        return this._adapter.eventType;
    }
    getMessageType() {
        return this._adapter.messageType || message_1.IncomingMessageType.unknown;
    }
    getPayload() {
        if (this._adapter.eventType === message_1.StdEventType.message) {
            switch (this._adapter.messageType) {
                case message_1.IncomingMessageType.postback:
                    return this._adapter.raw.postback.payload;
                case message_1.IncomingMessageType.quick_reply:
                    return this._adapter.raw.message.quick_reply.payload;
                case message_1.IncomingMessageType.location: {
                    const coordinates = this._adapter.raw.message.attachments[0].payload.coordinates;
                    return {
                        type: button_1.PayloadType.location,
                        coordinates: {
                            lat: coordinates?.lat || 0,
                            lon: coordinates?.long || 0,
                        },
                    };
                }
                case message_1.IncomingMessageType.attachments: {
                    if (!this._adapter.attachments ||
                        this._adapter.attachments.length === 0) {
                        return {
                            type: button_1.PayloadType.attachments,
                            attachment: { type: attachment_1.FileType.unknown, payload: { id: null } },
                        };
                    }
                    const { type, id } = this._adapter.attachments[0];
                    return {
                        type: button_1.PayloadType.attachments,
                        attachment: {
                            type: attachment_schema_1.Attachment.getTypeByMime(type),
                            payload: { id },
                        },
                    };
                }
            }
        }
        return undefined;
    }
    getMessage() {
        if ([message_1.StdEventType.message, message_1.StdEventType.echo].indexOf(this._adapter.eventType) === -1) {
            throw new Error('Called getMessage() on a non-message event');
        }
        switch (this._adapter.messageType) {
            case message_1.IncomingMessageType.message:
                return {
                    text: this._adapter.raw.message.text,
                };
            case message_1.IncomingMessageType.postback:
                return {
                    postback: this._adapter.raw.postback.payload,
                    text: this._adapter.raw.postback.title,
                };
            case message_1.IncomingMessageType.quick_reply:
                return {
                    postback: this._adapter.raw.message.quick_reply.payload,
                    text: this._adapter.raw.message.text,
                };
            case message_1.IncomingMessageType.location: {
                const coordinates = this._adapter.raw.message.attachments[0].payload.coordinates;
                return {
                    type: button_1.PayloadType.location,
                    coordinates: {
                        lat: coordinates?.lat || 0,
                        lon: coordinates?.long || 0,
                    },
                };
            }
            case message_1.IncomingMessageType.attachments: {
                const attachments = this._adapter.raw.message.attachments;
                let serialized_text = 'attachment:';
                if (attachments[0].type === types_1.Messenger.AttachmentType.fallback) {
                    serialized_text += 'fallback';
                }
                else if (attachments[0].payload &&
                    attachments[0].payload.sticker_id) {
                    serialized_text += `sticker:${attachments[0].payload.sticker_id}`;
                }
                else {
                    serialized_text += `${attachments[0].type}:${attachments[0].payload.title}`;
                }
                const attachmentPayloads = this._adapter.attachments.map(({ id, type }) => ({
                    type: attachment_schema_1.Attachment.getTypeByMime(type),
                    payload: { id },
                }));
                return {
                    type: button_1.PayloadType.attachments,
                    serialized_text,
                    attachment: attachmentPayloads.length === 1
                        ? attachmentPayloads[0]
                        : attachmentPayloads,
                };
            }
            default:
                throw new Error('Unknown incoming message type');
        }
    }
    getDeliveredMessages() {
        return this.getEventType() === message_1.StdEventType.delivery
            ? this._adapter.raw.delivery.mids
            : [];
    }
    getWatermark() {
        return this.getEventType() === message_1.StdEventType.read
            ? this._adapter.raw.read.watermark
            : 0;
    }
}
exports.default = MessengerEventWrapper;
//# sourceMappingURL=wrapper.js.map