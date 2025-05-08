"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attachment_schema_1 = require("../../../attachment/schemas/attachment.schema");
const EventWrapper_1 = __importDefault(require("../../../channel/lib/EventWrapper"));
const button_1 = require("../../../chat/schemas/types/button");
const message_1 = require("../../../chat/schemas/types/message");
const types_1 = require("./types");
class WebEventWrapper extends EventWrapper_1.default {
    constructor(handler, event, channelAttrs) {
        super(handler, event, channelAttrs);
    }
    _init(event) {
        switch (event.type) {
            case types_1.Web.StatusEventType.delivery:
                this._adapter.eventType = message_1.StdEventType.delivery;
                break;
            case types_1.Web.StatusEventType.read:
                this._adapter.eventType = message_1.StdEventType.read;
                break;
            case types_1.Web.StatusEventType.typing:
                this._adapter.eventType = message_1.StdEventType.typing;
                break;
            case types_1.Web.IncomingMessageType.text:
                this._adapter.eventType = message_1.StdEventType.message;
                this._adapter.messageType = message_1.IncomingMessageType.message;
                break;
            case types_1.Web.IncomingMessageType.quick_reply:
                this._adapter.eventType = message_1.StdEventType.message;
                this._adapter.messageType = message_1.IncomingMessageType.quick_reply;
                break;
            case types_1.Web.IncomingMessageType.postback:
                this._adapter.eventType = message_1.StdEventType.message;
                this._adapter.messageType = message_1.IncomingMessageType.postback;
                break;
            case types_1.Web.IncomingMessageType.location:
                this._adapter.eventType = message_1.StdEventType.message;
                this._adapter.messageType = message_1.IncomingMessageType.location;
                break;
            case types_1.Web.IncomingMessageType.file:
                this._adapter.eventType = message_1.StdEventType.message;
                this._adapter.messageType = message_1.IncomingMessageType.attachments;
                break;
            default:
                this._adapter.eventType = message_1.StdEventType.unknown;
                break;
        }
        this._adapter.raw = event;
    }
    getId() {
        if (this._adapter.eventType === message_1.StdEventType.message) {
            if (this._adapter.raw.mid) {
                return this._adapter.raw.mid;
            }
            throw new Error('The message id `mid` has not been set');
        }
        throw new Error('The id (`mid`) is only available in message events');
    }
    getSenderForeignId() {
        if (this._adapter.eventType === message_1.StdEventType.message) {
            if (this._adapter.raw.author) {
                return this._adapter.raw.author;
            }
            throw new Error('The message author has not been set');
        }
        throw new Error('The `author` is only available in message events');
    }
    getRecipientForeignId() {
        return '';
    }
    getEventType() {
        return this._adapter.eventType;
    }
    getMessageType() {
        return this._adapter.messageType || message_1.IncomingMessageType.unknown;
    }
    getPayload() {
        switch (this._adapter.messageType) {
            case message_1.IncomingMessageType.postback:
            case message_1.IncomingMessageType.quick_reply:
                return this._adapter.raw.data.payload;
            case message_1.IncomingMessageType.location: {
                const coordinates = this._adapter.raw.data.coordinates;
                return {
                    type: button_1.PayloadType.location,
                    coordinates: {
                        lat: coordinates.lat,
                        lon: coordinates.lng,
                    },
                };
            }
            case message_1.IncomingMessageType.attachments:
                if (!this._adapter.attachment) {
                    throw new Error('Attachment has not been processed');
                }
                return {
                    type: button_1.PayloadType.attachments,
                    attachment: {
                        type: attachment_schema_1.Attachment.getTypeByMime(this._adapter.raw.data.type),
                        payload: {
                            id: this._adapter.attachment.id,
                        },
                    },
                };
            default:
                return undefined;
        }
    }
    getMessage() {
        switch (this._adapter.messageType) {
            case message_1.IncomingMessageType.message:
                return {
                    text: this._adapter.raw.data.text,
                };
            case message_1.IncomingMessageType.quick_reply:
            case message_1.IncomingMessageType.postback:
                return {
                    postback: this._adapter.raw.data.payload,
                    text: this._adapter.raw.data.text,
                };
            case message_1.IncomingMessageType.location: {
                const coordinates = this._adapter.raw.data.coordinates;
                return {
                    type: button_1.PayloadType.location,
                    coordinates: {
                        lat: coordinates.lat,
                        lon: coordinates.lng,
                    },
                };
            }
            case message_1.IncomingMessageType.attachments: {
                if (!this._adapter.attachment) {
                    throw new Error('Attachment has not been processed');
                }
                const fileType = attachment_schema_1.Attachment.getTypeByMime(this._adapter.attachment.type);
                return {
                    type: button_1.PayloadType.attachments,
                    serialized_text: `attachment:${fileType}:${this._adapter.attachment.name}`,
                    attachment: {
                        type: fileType,
                        payload: {
                            id: this._adapter.attachment.id,
                        },
                    },
                };
            }
            default:
                return {
                    text: '',
                };
        }
    }
    getDeliveredMessages() {
        return this._adapter.eventType === message_1.StdEventType.delivery
            ? [this._adapter.raw.mid]
            : [];
    }
    getWatermark() {
        return this._adapter.eventType === message_1.StdEventType.read
            ? (this._adapter.raw.watermark || 0) / 1000
            : 0;
    }
}
exports.default = WebEventWrapper;
//# sourceMappingURL=wrapper.js.map