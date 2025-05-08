"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const content_service_1 = require("../../cms/services/content.service");
const settings_1 = require("../../extensions/channels/console/settings");
const i18n_service_1 = require("../../i18n/services/i18n.service");
const language_service_1 = require("../../i18n/services/language.service");
const plugins_service_1 = require("../../plugins/plugins.service");
const types_1 = require("../../plugins/types");
const setting_service_1 = require("../../setting/services/setting.service");
const base_service_1 = require("../../utils/generics/base-service");
const safeRandom_1 = require("../../utils/helpers/safeRandom");
const envelope_factory_1 = require("../helpers/envelope-factory");
const block_repository_1 = require("../repositories/block.repository");
const message_1 = require("../schemas/types/message");
let BlockService = class BlockService extends base_service_1.BaseService {
    constructor(repository, contentService, settingService, pluginService, i18n, languageService) {
        super(repository);
        this.repository = repository;
        this.contentService = contentService;
        this.settingService = settingService;
        this.pluginService = pluginService;
        this.i18n = i18n;
        this.languageService = languageService;
    }
    filterBlocksByChannel(blocks, channel) {
        return blocks.filter((b) => {
            return (!b.trigger_channels ||
                b.trigger_channels.length === 0 ||
                [...b.trigger_channels, settings_1.CONSOLE_CHANNEL_NAME].includes(channel));
        });
    }
    filterBlocksBySubscriberLabels(blocks, profile) {
        if (!profile) {
            return blocks;
        }
        return (blocks
            .filter((b) => {
            const triggerLabels = b.trigger_labels.map((l) => typeof l === 'string' ? l : l.id);
            return (triggerLabels.length === 0 ||
                triggerLabels.some((l) => profile.labels.includes(l)));
        })
            .sort((a, b) => b.trigger_labels.length - a.trigger_labels.length));
    }
    async match(blocks, event) {
        if (!blocks.length) {
            return undefined;
        }
        let block = undefined;
        const payload = event.getPayload();
        const filteredBlocks = this.filterBlocksBySubscriberLabels(this.filterBlocksByChannel(blocks, event.getHandler().getName()), event.getSender());
        if (payload) {
            block = filteredBlocks
                .filter((b) => {
                return this.matchPayload(payload, b);
            })
                .shift();
        }
        if (!block) {
            const text = event.getText().trim();
            const nlp = event.getNLP();
            if (nlp) {
                const languages = await this.languageService.getLanguages();
                const lang = nlp.entities.find((e) => e.entity === 'language');
                if (lang && Object.keys(languages).indexOf(lang.value) !== -1) {
                    const profile = event.getSender();
                    profile.language = lang.value;
                    event.setSender(profile);
                }
            }
            block = filteredBlocks
                .filter((b) => {
                return this.matchText(text, b);
            })
                .shift();
            if (!block && nlp) {
                let nlpBest = 0;
                filteredBlocks.forEach((b, index, self) => {
                    const nlpPattern = this.matchNLP(nlp, b);
                    if (nlpPattern && nlpPattern.length > nlpBest) {
                        nlpBest = nlpPattern.length;
                        block = self[index];
                    }
                });
            }
        }
        return block;
    }
    matchPayload(payload, block) {
        const payloadPatterns = block.patterns?.filter((p) => typeof p === 'object' && 'label' in p);
        return payloadPatterns.find((pt) => {
            return ((typeof payload === 'string' &&
                pt.value &&
                (pt.value === payload || payload.startsWith(pt.value + ':'))) ||
                (typeof payload === 'object' && pt.type && pt.type === payload.type));
        });
    }
    matchText(text, block) {
        const patterns = block.patterns?.map((pattern) => {
            if (typeof pattern === 'string' &&
                pattern.endsWith('/') &&
                pattern.startsWith('/')) {
                return new RegExp(pattern.slice(1, -1), 'i');
            }
            return pattern;
        });
        if (patterns?.length)
            for (let i = 0; i < patterns.length; i++) {
                const pattern = patterns[i];
                if (pattern instanceof RegExp) {
                    if (pattern.test(text)) {
                        const matches = text.match(pattern);
                        if (matches) {
                            if (matches.length >= 2) {
                                matches.shift();
                            }
                            return matches;
                        }
                    }
                    continue;
                }
                else if (typeof pattern === 'object' &&
                    'label' in pattern &&
                    text.trim().toLowerCase() === pattern.label.toLowerCase()) {
                    return [text];
                }
                else if (typeof pattern === 'string' &&
                    text.trim().toLowerCase() === pattern.toLowerCase()) {
                    return [text];
                }
            }
        return false;
    }
    matchNLP(nlp, block) {
        if (nlp.entities.length === 0) {
            return undefined;
        }
        const nlpPatterns = block.patterns?.filter((p) => {
            return Array.isArray(p);
        });
        if (nlpPatterns.length === 0) {
            return undefined;
        }
        return nlpPatterns.find((entities) => {
            return entities.every((ev) => {
                if (ev.match === 'value') {
                    return nlp.entities.find((e) => {
                        return e.entity === ev.entity && e.value === ev.value;
                    });
                }
                else if (ev.match === 'entity') {
                    return nlp.entities.find((e) => {
                        return e.entity === ev.entity;
                    });
                }
                else {
                    this.logger.warn('Unknown NLP match type', ev);
                    return false;
                }
            });
        });
    }
    matchOutcome(blocks, event, envelope) {
        const filteredBlocks = this.filterBlocksBySubscriberLabels(this.filterBlocksByChannel(blocks, event.getHandler().getName()), event.getSender());
        return filteredBlocks.find((b) => {
            return b.patterns
                .filter((p) => typeof p === 'object' && 'type' in p && p.type === 'outcome')
                .some((p) => ['any', envelope.message.outcome].includes(p.value));
        });
    }
    processTokenReplacements(text, context, subscriberContext, settings) {
        return envelope_factory_1.EnvelopeFactory.compileHandlebarsTemplate(text, {
            ...context,
            vars: {
                ...(subscriberContext?.vars || {}),
                ...(context.vars || {}),
            },
        }, settings);
    }
    processText(text, context, subscriberContext, settings) {
        const envelopeFactory = new envelope_factory_1.EnvelopeFactory({
            ...context,
            vars: {
                ...context.vars,
                ...subscriberContext.vars,
            },
        }, settings, this.i18n);
        return envelopeFactory.processText(text);
    }
    getRandom(array) {
        return (0, safeRandom_1.getRandomElement)(array);
    }
    checkDeprecatedAttachmentUrl(block) {
        if (block.message &&
            'attachment' in block.message &&
            block.message.attachment.payload &&
            'url' in block.message.attachment.payload) {
            this.logger.error('Attachment Block : `url` payload has been deprecated in favor of `id`', block.id, block.message);
        }
    }
    async processMessage(block, context, subscriberContext, fallback = false, conversationId) {
        const settings = await this.settingService.getSettings();
        const blockMessage = fallback && block.options?.fallback
            ? [...block.options.fallback.message]
            : Array.isArray(block.message)
                ? [...block.message]
                : { ...block.message };
        if (Array.isArray(blockMessage)) {
            const text = this.processText((0, safeRandom_1.getRandomElement)(blockMessage), context, subscriberContext, settings);
            const envelope = {
                format: message_1.OutgoingMessageFormat.text,
                message: { text },
            };
            return envelope;
        }
        else if (blockMessage && 'text' in blockMessage) {
            if ('quickReplies' in blockMessage &&
                Array.isArray(blockMessage.quickReplies) &&
                blockMessage.quickReplies.length > 0) {
                const envelope = {
                    format: message_1.OutgoingMessageFormat.quickReplies,
                    message: {
                        text: this.processText(blockMessage.text, context, subscriberContext, settings),
                        quickReplies: blockMessage.quickReplies.map((qr) => {
                            return qr.title
                                ? {
                                    ...qr,
                                    title: this.processText(qr.title, context, subscriberContext, settings),
                                }
                                : qr;
                        }),
                    },
                };
                return envelope;
            }
            else if ('buttons' in blockMessage &&
                Array.isArray(blockMessage.buttons) &&
                blockMessage.buttons.length > 0) {
                const envelope = {
                    format: message_1.OutgoingMessageFormat.buttons,
                    message: {
                        text: this.processText(blockMessage.text, context, subscriberContext, settings),
                        buttons: blockMessage.buttons.map((btn) => {
                            return btn.title
                                ? {
                                    ...btn,
                                    title: this.processText(btn.title, context, subscriberContext, settings),
                                }
                                : btn;
                        }),
                    },
                };
                return envelope;
            }
        }
        else if (blockMessage && 'attachment' in blockMessage) {
            const attachmentPayload = blockMessage.attachment.payload;
            if (!('id' in attachmentPayload)) {
                this.checkDeprecatedAttachmentUrl(block);
                throw new Error('Remote attachments in blocks are no longer supported!');
            }
            const envelope = {
                format: message_1.OutgoingMessageFormat.attachment,
                message: {
                    attachment: {
                        type: blockMessage.attachment.type,
                        payload: blockMessage.attachment.payload,
                    },
                    quickReplies: blockMessage.quickReplies
                        ? [...blockMessage.quickReplies]
                        : undefined,
                },
            };
            return envelope;
        }
        else if (blockMessage &&
            'elements' in blockMessage &&
            block.options?.content) {
            const contentBlockOptions = block.options.content;
            let skip = 0;
            if (contentBlockOptions.display === message_1.OutgoingMessageFormat.list ||
                contentBlockOptions.display === message_1.OutgoingMessageFormat.carousel) {
                skip =
                    context.skip && context.skip[block.id] ? context.skip[block.id] : 0;
            }
            try {
                const results = await this.contentService.getContent(contentBlockOptions, skip);
                const envelope = {
                    format: contentBlockOptions.display,
                    message: {
                        ...results,
                        options: contentBlockOptions,
                    },
                };
                return envelope;
            }
            catch (err) {
                this.logger.error('Unable to retrieve content for list template process', err);
                throw err;
            }
        }
        else if (blockMessage && 'plugin' in blockMessage) {
            const plugin = this.pluginService.findPlugin(types_1.PluginType.block, blockMessage.plugin);
            try {
                const envelope = await plugin?.process(block, context, conversationId);
                if (!envelope) {
                    throw new Error('Unable to find envelope');
                }
                return envelope;
            }
            catch (e) {
                this.logger.error('Plugin was unable to load/process ', e);
                throw new Error(`Unknown plugin - ${JSON.stringify(blockMessage)}`);
            }
        }
        throw new Error('Invalid message format.');
    }
    async handleLabelDelete(labels) {
        const blocks = await this.find({
            $or: [
                { trigger_labels: { $in: labels.map((l) => l.id) } },
                { assign_labels: { $in: labels.map((l) => l.id) } },
            ],
        });
        for (const block of blocks) {
            const trigger_labels = block.trigger_labels.filter((labelId) => !labels.find((l) => l.id === labelId));
            const assign_labels = block.assign_labels.filter((labelId) => !labels.find((l) => l.id === labelId));
            await this.updateOne(block.id, { trigger_labels, assign_labels });
        }
    }
};
exports.BlockService = BlockService;
__decorate([
    (0, event_emitter_1.OnEvent)('hook:label:delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BlockService.prototype, "handleLabelDelete", null);
exports.BlockService = BlockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [block_repository_1.BlockRepository,
        content_service_1.ContentService,
        setting_service_1.SettingService,
        plugins_service_1.PluginService,
        i18n_service_1.I18nService,
        language_service_1.LanguageService])
], BlockService);
//# sourceMappingURL=block.service.js.map