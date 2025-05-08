"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericEventWrapper = void 0;
const message_1 = require("../../chat/schemas/types/message");
class EventWrapper {
    constructor(handler, event, channelAttrs = {}) {
        this._adapter = {
            raw: {},
            eventType: message_1.StdEventType.unknown,
            attachments: undefined,
        };
        this._handler = handler;
        this._init(event);
        this.channelAttrs = channelAttrs;
    }
    toString() {
        return JSON.stringify({
            handler: this._handler.getName(),
            channelData: this.getChannelData(),
            sender: this.getSender(),
            eventType: this.getEventType(),
            messageType: this.getMessageType(),
            payload: this.getPayload(),
            message: this.getMessage(),
            deliveredMessages: this.getDeliveredMessages(),
            watermark: this.getWatermark(),
        }, null, 4);
    }
    getHandler() {
        return this._handler;
    }
    getChannelData() {
        return {
            name: this._handler.getName(),
            ...this.channelAttrs,
        };
    }
    set(attr, value) {
        this._adapter.raw[attr] = value;
    }
    get(attr, otherwise) {
        return attr in this._adapter.raw
            ? this._adapter.raw[attr]
            : otherwise || {};
    }
    getNLP() {
        return this._nlp;
    }
    setNLP(nlp) {
        this._nlp = nlp;
    }
    getSender() {
        return this.subscriber;
    }
    setSender(profile) {
        this.subscriber = profile;
    }
    async preprocess() {
        if (this._adapter.eventType === message_1.StdEventType.message &&
            this._adapter.messageType === message_1.IncomingMessageType.attachments) {
            await this._handler.persistMessageAttachments(this);
        }
    }
    getEventType() {
        return this._adapter.eventType;
    }
    getMessageType() {
        return this._adapter.messageType;
    }
    getText() {
        const message = this.getMessage();
        if ('text' in message) {
            return message.text;
        }
        else if ('serialized_text' in message) {
            return message.serialized_text;
        }
        return '';
    }
}
exports.default = EventWrapper;
class GenericEventWrapper extends EventWrapper {
    constructor(handler, event) {
        super(handler, event);
    }
    _init(event) {
        this._adapter.eventType = message_1.StdEventType.unknown;
        this._adapter.messageType = message_1.IncomingMessageType.unknown;
        this._adapter.raw = event;
    }
    getId() {
        if (this._adapter.raw.messageId) {
            return this._adapter.raw.messageId;
        }
        throw new Error('The message id `mid` is missing');
    }
    getSenderForeignId() {
        if (this._adapter.raw.senderId) {
            return this._adapter.raw.senderId;
        }
        throw new Error('The sender id is missing');
    }
    getRecipientForeignId() {
        throw new Error('The recipient id is missing');
    }
    getEventType() {
        return this._adapter.eventType;
    }
    getMessageType() {
        return this._adapter.messageType;
    }
    getPayload() {
        return undefined;
    }
    getMessage() {
        throw new Error('Unknown incoming message type');
    }
    getDeliveredMessages() {
        return [];
    }
    getWatermark() {
        return 0;
    }
}
exports.GenericEventWrapper = GenericEventWrapper;
//# sourceMappingURL=EventWrapper.js.map