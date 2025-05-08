"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvelopeBuilder = exports.EnvelopeBuilder = void 0;
const message_1 = require("../schemas/types/message");
function getAttributeNameFromProp(prop, prefix) {
    const rawKey = prop.toString().replace(prefix, '');
    const messageKey = rawKey.charAt(0).toLowerCase() + rawKey.slice(1);
    return messageKey;
}
function EnvelopeBuilder(format, template = {}, schema) {
    let built = {
        format,
        message: template,
    };
    const builder = new Proxy({}, {
        get(target, prop) {
            if ('build' === prop) {
                return () => {
                    const result = schema.parse(built);
                    built = {
                        format,
                        message: template,
                    };
                    return result;
                };
            }
            if (typeof prop === 'string' && prop.startsWith('appendTo')) {
                const messageKey = getAttributeNameFromProp(prop, /^appendTo/);
                return (item) => {
                    if (!Array.isArray(built.message[messageKey])) {
                        built.message[messageKey] = [];
                    }
                    built.message[messageKey].push(item);
                    return builder;
                };
            }
            return (...args) => {
                if (0 === args.length) {
                    const messageKey = getAttributeNameFromProp(prop.toString(), /^get/);
                    return built.message[messageKey];
                }
                const value = args[0];
                const messageKey = getAttributeNameFromProp(prop.toString(), /^set/);
                built.message[messageKey] = value;
                return builder;
            };
        },
    });
    return builder;
}
exports.EnvelopeBuilder = EnvelopeBuilder;
const ENVELOP_SCHEMAS_BY_FORMAT = {
    [message_1.OutgoingMessageFormat.text]: message_1.stdOutgoingTextEnvelopeSchema,
    [message_1.OutgoingMessageFormat.quickReplies]: message_1.stdOutgoingQuickRepliesEnvelopeSchema,
    [message_1.OutgoingMessageFormat.buttons]: message_1.stdOutgoingButtonsEnvelopeSchema,
    [message_1.OutgoingMessageFormat.attachment]: message_1.stdOutgoingAttachmentEnvelopeSchema,
    [message_1.OutgoingMessageFormat.carousel]: message_1.stdOutgoingListEnvelopeSchema,
    [message_1.OutgoingMessageFormat.list]: message_1.stdOutgoingListEnvelopeSchema,
    [message_1.OutgoingMessageFormat.system]: message_1.stdOutgoingSystemEnvelopeSchema,
};
const getEnvelopeBuilder = (format) => {
    return EnvelopeBuilder(format, {}, ENVELOP_SCHEMAS_BY_FORMAT[format]);
};
exports.getEnvelopeBuilder = getEnvelopeBuilder;
//# sourceMappingURL=envelope-builder.js.map