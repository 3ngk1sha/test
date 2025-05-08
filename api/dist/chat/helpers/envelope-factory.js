"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvelopeFactory = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const safeRandom_1 = require("../../utils/helpers/safeRandom");
const button_1 = require("../schemas/types/button");
const message_1 = require("../schemas/types/message");
const envelope_builder_1 = require("./envelope-builder");
class EnvelopeFactory {
    constructor(context, settings, i18n) {
        this.context = context;
        this.settings = settings;
        this.i18n = i18n;
    }
    static toHandlebars(str) {
        if (/\{\{.*\}\}/.test(str)) {
            return str;
        }
        return str.replaceAll(/{([^}]+)}/g, '{{$1}}');
    }
    static compileHandlebarsTemplate(text, context, settings) {
        const templateContext = {
            context: { ...context },
            contact: { ...settings.contact },
        };
        const compileTemplate = handlebars_1.default.compile(EnvelopeFactory.toHandlebars(text));
        return compileTemplate(templateContext);
    }
    processText(text) {
        let result = Array.isArray(text) ? (0, safeRandom_1.getRandomElement)(text) : text;
        result = this.i18n.t(result, {
            lang: this.context.user.language,
            defaultValue: result,
        });
        result = EnvelopeFactory.compileHandlebarsTemplate(result, this.context, this.settings);
        return result;
    }
    getBuilder(format) {
        return (0, envelope_builder_1.getEnvelopeBuilder)(format);
    }
    buildTextEnvelope(text) {
        const builder = this.getBuilder(message_1.OutgoingMessageFormat.text);
        const processedText = this.processText(text);
        return builder.setText(processedText).build();
    }
    buildQuickRepliesEnvelope(text, quickReplies) {
        const builder = this.getBuilder(message_1.OutgoingMessageFormat.quickReplies);
        const processedText = this.processText(text);
        const envelope = builder.setText(processedText);
        quickReplies.forEach((qr) => {
            envelope.appendToQuickReplies({
                ...qr,
                title: this.processText(qr.title),
                payload: this.processText(qr.payload),
            });
        });
        return envelope.build();
    }
    buildButtonsEnvelope(text, buttons) {
        const builder = this.getBuilder(message_1.OutgoingMessageFormat.buttons);
        const processedText = this.processText(text);
        const envelope = builder.setText(processedText);
        buttons.forEach((btn) => {
            if (btn.type === button_1.ButtonType.postback) {
                envelope.appendToButtons({
                    ...btn,
                    title: this.processText(btn.title),
                    payload: this.processText(btn.payload),
                });
            }
            else {
                envelope.appendToButtons({
                    ...btn,
                    title: this.processText(btn.title),
                });
            }
        });
        return envelope.build();
    }
    buildAttachmentEnvelope(attachment, quickReplies = []) {
        const builder = this.getBuilder(message_1.OutgoingMessageFormat.attachment);
        const envelope = builder.setAttachment(attachment);
        quickReplies.forEach((qr) => {
            envelope.appendToQuickReplies({
                ...qr,
                title: this.processText(qr.title),
                payload: this.processText(qr.payload),
            });
        });
        return envelope.build();
    }
    buildListEnvelope(format, options, elements, pagination) {
        const builder = this.getBuilder(format);
        return builder
            .setOptions(options)
            .setElements(elements)
            .setPagination(pagination)
            .build();
    }
    buildSystemEnvelope(outcome, data) {
        const builder = this.getBuilder(message_1.OutgoingMessageFormat.system);
        return builder.setOutcome(outcome).setData(data).build();
    }
}
exports.EnvelopeFactory = EnvelopeFactory;
//# sourceMappingURL=envelope-factory.js.map