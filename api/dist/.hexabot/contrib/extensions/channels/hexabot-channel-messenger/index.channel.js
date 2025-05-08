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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const attachment_service_1 = require("../../../../../attachment/services/attachment.service");
const channel_service_1 = require("../../../../../channel/channel.service");
const Handler_1 = __importDefault(require("../../../../../channel/lib/Handler"));
const constants_1 = require("../../../../../chat/helpers/constants");
const attachment_1 = require("../../../../../chat/schemas/types/attachment");
const button_1 = require("../../../../../chat/schemas/types/button");
const message_1 = require("../../../../../chat/schemas/types/message");
const label_service_1 = require("../../../../../chat/services/label.service");
const message_service_1 = require("../../../../../chat/services/message.service");
const subscriber_service_1 = require("../../../../../chat/services/subscriber.service");
const content_schema_1 = require("../../../../../cms/schemas/content.schema");
const menu_service_1 = require("../../../../../cms/services/menu.service");
const i18n_service_1 = require("../../../../../i18n/services/i18n.service");
const language_service_1 = require("../../../../../i18n/services/language.service");
const logger_service_1 = require("../../../../../logger/logger.service");
const setting_schema_1 = require("../../../../../setting/schemas/setting.schema");
const setting_service_1 = require("../../../../../setting/services/setting.service");
const graph_api_1 = require("./lib/graph-api");
const settings_1 = require("./settings");
const types_1 = require("./types");
const wrapper_1 = __importDefault(require("./wrapper"));
let MessengerHandler = class MessengerHandler extends Handler_1.default {
    constructor(settingService, channelService, logger, eventEmitter, i18n, languageService, subscriberService, attachmentService, messageService, menuService, labelService, httpService) {
        super(settings_1.MESSENGER_CHANNEL_NAME, settingService, channelService, logger);
        this.eventEmitter = eventEmitter;
        this.i18n = i18n;
        this.languageService = languageService;
        this.subscriberService = subscriberService;
        this.attachmentService = attachmentService;
        this.messageService = messageService;
        this.menuService = menuService;
        this.labelService = labelService;
        this.httpService = httpService;
    }
    getPath() {
        return __dirname;
    }
    async init() {
        this.logger.debug('Messenger Channel Handler : initialization ...');
        const settings = await this.getSettings();
        this.api = new graph_api_1.GraphApi(this.httpService, settings ? settings.access_token : '');
    }
    async getMessageAttachments(event) {
        if (event._adapter.eventType === message_1.StdEventType.message &&
            event._adapter.messageType === message_1.IncomingMessageType.attachments) {
            const remoteFiles = event._adapter.raw.message.attachments.filter((a) => !!a.payload.url);
            const files = [];
            for (const remoteFile of remoteFiles) {
                try {
                    const response = await this.httpService.axiosRef.get(remoteFile.payload.url, {
                        responseType: 'stream',
                    });
                    if (response.headers['content-length']) {
                        files.push({
                            file: response.data,
                            size: parseInt(response.headers['content-length']),
                            type: response.headers['content-type'],
                        });
                    }
                    else {
                        this.logger.warn('Unable to find content-length!');
                    }
                }
                catch (err) {
                    this.logger.error('Failed to fetch Attachment', err);
                }
            }
            return files;
        }
        return [];
    }
    async onLabelCreate(label, callback) {
        try {
            const { id } = await this.api.customLabels.createCustomLabel(label.name);
            await callback({
                [this.getName()]: id,
            });
            this.logger.debug('Messenger Channel Handler : Successfully synced label');
        }
        catch (err) {
            this.logger.error('Messenger Channel Handler : Failed to sync label', err);
        }
    }
    async onLabelDelete(labels) {
        try {
            await Promise.all(labels
                .filter((label) => {
                return label.label_id && this.getName() in label.label_id;
            })
                .map((label) => {
                return this.api.customLabels.deleteCustomLabel(label.label_id[this.getName()]);
            }));
            this.logger.debug('Messenger Channel Handler : Successfully removed label(s)');
        }
        catch (err) {
            this.logger.error('Messenger Channel Handler : Failed to remove label(s)', err);
        }
    }
    async handleSubscriberUpdate(criteria, updates) {
        try {
            const oldSubscriber = await this.subscriberService.findOneAndPopulate(criteria);
            if (!oldSubscriber) {
                this.logger.error('Messenger Channel Handler : Unable to sync user labels: Subscriber(s) not found ', criteria);
                return;
            }
            if (updates.labels) {
                const labels = await this.labelService.find({
                    _id: { $in: updates.labels },
                });
                const channel = this.getName();
                const difference = (a, b) => a.filter((x) => !b.includes(x));
                const oldLabelIds = oldSubscriber.labels
                    .map((l) => l.label_id && channel in l.label_id ? l.label_id[channel] : null)
                    .filter((id) => !!id);
                const newLabelIds = labels
                    .map((l) => l.label_id && channel in l.label_id ? l.label_id[channel] : null)
                    .filter((id) => !!id);
                const diff = difference(oldLabelIds, newLabelIds).concat(difference(newLabelIds, oldLabelIds));
                if (diff.length > 0) {
                    const res = await this.updateUserLabels(oldSubscriber.foreign_id, oldLabelIds, newLabelIds);
                    this.logger.debug('Messenger Channel Handler : Successfully assigned label to user ', res, oldSubscriber.id);
                }
            }
        }
        catch (err) {
            this.logger.warn('Messenger Channel Handler : Unable to sync updates', err);
        }
    }
    async onGreetingTextUpdate(setting) {
        try {
            await this._setGreetingText(setting.value);
            this.logger.log('Messenger Channel Handler : Greeting message has been updated', setting);
        }
        catch (err) {
            this.logger.error('Messenger Channel Handler : Unable to update greeting message', err);
        }
    }
    async onToggleGetStartedButton(setting) {
        try {
            if (setting.value) {
                await this._setGetStartedButton();
                await this._setPersistentMenu();
            }
            else {
                await this._deletePersistentMenu();
                await this._deleteGetStartedButton();
            }
            this.logger.log('Messenger Channel Handler : `Get started` button has been updated', setting);
        }
        catch (err) {
            this.logger.error('Messenger Channel Handler : Unable to update `Get started` button', err);
        }
    }
    async onAccessTokenUpdate(setting) {
        this.api = new graph_api_1.GraphApi(this.httpService, setting.value);
    }
    async onToggleComposerInput(setting) {
        try {
            await this._setPersistentMenu(setting.value);
            this.logger.log('Messenger Channel Handler : `Composer Input` has been updated', setting);
        }
        catch (err) {
            this.logger.error('Messenger Channel Handler : Unable to update `Composer Input`', err);
        }
    }
    async onMenuUpdate() {
        try {
            await this._setPersistentMenu();
            this.logger.log('Messenger Channel Handler : `Persistent Menu` has been updated');
        }
        catch (err) {
            this.logger.error('Messenger Channel Handler : Unable to update `Persistent Menu`', err);
        }
    }
    async middleware(req, _res, next) {
        const signature = req.headers['x-hub-signature'];
        if (!signature) {
            return next();
        }
        const settings = await this.getSettings();
        const expectedHash = crypto_1.default
            .createHmac('sha1', settings.app_secret)
            .update(req.rawBody)
            .digest('hex');
        req.messenger = { expectedHash };
        next();
    }
    _verifySignature(req, res, next) {
        const signature = req.headers['x-hub-signature'];
        const elements = signature.split('=');
        const signatureHash = elements[1];
        const expectedHash = req.messenger && req.messenger.expectedHash
            ?
                req.messenger.expectedHash
            : '';
        if (signatureHash !== expectedHash) {
            this.logger.warn("Messenger Channel Handler : Couldn't match the request signature.", signatureHash, expectedHash);
            return res
                .status(500)
                .json({ err: "Couldn't match the request signature." });
        }
        this.logger.debug('Messenger Channel Handler : Request signature has been validated.');
        return next();
    }
    _validateMessage(req, res, next) {
        const data = req.body;
        if (data.object !== 'page') {
            this.logger.warn('Messenger Channel Handler : Missing `page` attribute!', data);
            return res.status(400).json({ err: 'The page parameter is missing!' });
        }
        return next();
    }
    async subscribe(req, res) {
        const data = req.query;
        const settings = await this.getSettings();
        const verifyToken = settings.verify_token;
        if (!verifyToken) {
            return res.status(500).json({
                err: 'Messenger Channel Handler : You need to specify a verifyToken in your config.',
            });
        }
        if (!data || !data['hub.mode'] || !data['hub.verify_token']) {
            return res.status(500).json({
                err: 'Messenger Channel Handler : Did not recieve any verification token.',
            });
        }
        if (data['hub.mode'] === 'subscribe' &&
            data['hub.verify_token'] === verifyToken) {
            this.logger.log('Messenger Channel Handler : Subscription token has been verified successfully!');
            return res.status(200).send(data['hub.challenge']);
        }
        else {
            this.logger.error('Messenger Channel Handler : Failed validation. Make sure the validation tokens match.');
            return res.status(500).json({
                err: 'Messenger Channel Handler : Failed validation. Make sure the validation tokens match.',
            });
        }
    }
    async handle(req, res) {
        const handler = this;
        if (req.method === 'GET') {
            return await handler.subscribe(req, res);
        }
        return handler._verifySignature(req, res, () => {
            return handler._validateMessage(req, res, () => {
                const data = req.body;
                this.logger.debug('Messenger Channel Handler : Webhook notification received.');
                if (!('entry' in data)) {
                    this.logger.error('Messenger Channel Handler : Webhook received no entry data.');
                    return res.status(500).json({
                        err: 'Messenger Channel Handler : Webhook received no entry data.',
                    });
                }
                data.entry.forEach((entry) => {
                    entry.messaging.forEach((e) => {
                        try {
                            const event = new wrapper_1.default(handler, e);
                            const type = event.getEventType();
                            if (type) {
                                this.eventEmitter.emit(`hook:chatbot:${type}`, event);
                            }
                            else {
                                this.logger.error('Messenger Channel Handler : Webhook received unknown event ', event);
                            }
                        }
                        catch (err) {
                            this.logger.error('Messenger Channel Handler : Something went wrong while handling events', err);
                        }
                    });
                });
                return res.status(200).json({ success: true });
            });
        });
    }
    _textFormat(message, _options) {
        return {
            text: message.text,
        };
    }
    _quickRepliesFormat(message, _options) {
        return {
            text: message.text,
            quick_replies: message.quickReplies,
        };
    }
    _buttonsFormat(message, _options) {
        const payload = {
            template_type: types_1.Messenger.TemplateType.button,
            text: message.text,
            buttons: message.buttons,
        };
        return this._formatTemplate(payload);
    }
    toAttachmentType(fileType) {
        const mapping = {
            [attachment_1.FileType.image]: types_1.Messenger.AttachmentType.image,
            [attachment_1.FileType.video]: types_1.Messenger.AttachmentType.video,
            [attachment_1.FileType.audio]: types_1.Messenger.AttachmentType.audio,
            [attachment_1.FileType.file]: types_1.Messenger.AttachmentType.file,
            [attachment_1.FileType.unknown]: types_1.Messenger.AttachmentType.file,
        };
        return mapping[fileType];
    }
    async _attachmentFormat(message, _options) {
        const payload = {
            attachment: {
                type: this.toAttachmentType(message.attachment.type),
                payload: {
                    url: await this.getPublicUrl(message.attachment.payload),
                    is_reusable: false,
                },
            },
        };
        if (message.quickReplies && message.quickReplies.length > 0) {
            payload.quick_replies = message.quickReplies;
        }
        return payload;
    }
    async _formatElements(data, options) {
        if (!options.content || !options.content.fields) {
            throw new Error('Content options are missing the fields');
        }
        const fields = options.content.fields;
        const buttons = options.content.buttons;
        const result = [];
        for (const item of data) {
            const element = {
                title: item[fields.title],
                buttons: item.buttons || [],
            };
            if (fields.subtitle && item[fields.subtitle]) {
                element.subtitle = item[fields.subtitle];
            }
            if (fields.image_url && item[fields.image_url]) {
                const attachmentRef = typeof item[fields.image_url] === 'string'
                    ? { url: item[fields.image_url] }
                    : item[fields.image_url].payload;
                element.image_url = await this.getPublicUrl(attachmentRef);
            }
            buttons.forEach((button, index) => {
                const btn = { ...button };
                if (btn.type === button_1.ButtonType.web_url) {
                    const urlField = fields.url;
                    btn.url =
                        urlField && item[urlField] ? item[urlField] : content_schema_1.Content.getUrl(item);
                    if (!btn.url.startsWith('http')) {
                        btn.url = 'https://' + btn.url;
                    }
                    if (!element.default_action) {
                        const { title: _title, ...rest } = btn;
                        element.default_action = rest;
                    }
                }
                else {
                    const postback = content_schema_1.Content.getPayload(item);
                    btn.payload = btn.title + ':' + postback;
                }
                if (index === 0 && fields.action_title && item[fields.action_title]) {
                    btn.title = item[fields.action_title];
                }
                element.buttons?.push(btn);
            });
            if (Array.isArray(element.buttons) && element.buttons.length === 0) {
                delete element.buttons;
            }
            result.push(element);
        }
        return result;
    }
    async _listFormat(message, options) {
        const data = message.elements || [];
        if (data.length === 0 || data.length > 9) {
            throw new Error('Invalid content count for list (0 < count <= 9)');
        }
        const elements = await this._formatElements(data, options);
        const pagination = message.pagination;
        if (pagination.total - pagination.skip - pagination.limit > 0) {
            elements.push({
                title: this.i18n.t('More'),
                subtitle: this.i18n.t('Click on the button below to view more of the content'),
                buttons: [
                    {
                        type: button_1.ButtonType.postback,
                        title: this.i18n.t('View More'),
                        payload: constants_1.VIEW_MORE_PAYLOAD,
                    },
                ],
            });
        }
        const payload = {
            template_type: types_1.Messenger.TemplateType.generic,
            elements,
        };
        return this._formatTemplate(payload);
    }
    async _carouselFormat(message, options) {
        const data = message.elements || [];
        let elements = [];
        if (data.length === 0 || data.length > 10) {
            throw new Error('Invalid content count for carousel (0 < count <= 10)');
        }
        elements = await this._formatElements(data, options);
        const payload = {
            template_type: types_1.Messenger.TemplateType.generic,
            elements,
        };
        return this._formatTemplate(payload);
    }
    _formatTemplate(payload) {
        return {
            attachment: {
                type: types_1.Messenger.TemplateType.template,
                payload,
            },
        };
    }
    async _formatMessage(envelope, options) {
        switch (envelope.format) {
            case message_1.OutgoingMessageFormat.attachment:
                return await this._attachmentFormat(envelope.message, options);
            case message_1.OutgoingMessageFormat.buttons:
                return this._buttonsFormat(envelope.message, options);
            case message_1.OutgoingMessageFormat.carousel:
                return await this._carouselFormat(envelope.message, options);
            case message_1.OutgoingMessageFormat.list:
                return await this._listFormat(envelope.message, options);
            case message_1.OutgoingMessageFormat.quickReplies:
                return this._quickRepliesFormat(envelope.message, options);
            case message_1.OutgoingMessageFormat.text:
                return this._textFormat(envelope.message, options);
            default:
                throw new Error('Unknown message format');
        }
    }
    async sendMessage(event, envelope, options, _context) {
        const handler = this;
        const message = await handler._formatMessage(envelope, options);
        const req = async function () {
            try {
                const res = await handler.api.send.call({
                    recipient: {
                        id: event.getSenderForeignId(),
                    },
                    message,
                });
                return { mid: res.message_id || '' };
            }
            catch (err) {
                throw err;
            }
        };
        if (options && options.typing) {
            const autoTimeout = message && message.text ? message.text.length * 10 : 1000;
            const timeout = typeof options.typing === 'number' ? options.typing : autoTimeout;
            try {
                await handler.sendTypingIndicator(event.getSenderForeignId(), timeout);
                return await req();
            }
            catch (err) {
                this.logger.error('Messenger Channel Handler : Failed in sendTypingIndicator ', err);
                throw err;
            }
        }
        return await req();
    }
    async sendTypingIndicator(recipientId, timeout) {
        if (timeout > 20000) {
            timeout = 20000;
            this.logger.warn('Messenger Channel Handler : Typing Indicator max milliseconds value is 20000 (20 seconds)');
        }
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.send.sendSenderAction({
                    recipient: { id: recipientId },
                    sender_action: types_1.Messenger.ActionType.typing_on,
                });
                setTimeout(async () => {
                    try {
                        const json = await this.api.send.sendSenderAction({
                            recipient: { id: recipientId },
                            sender_action: types_1.Messenger.ActionType.typing_off,
                        });
                        resolve(json);
                    }
                    catch (err) {
                        reject(err);
                    }
                }, timeout);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    async getSubscriberAvatar(event) {
        const profile = event.getProfile();
        if (profile?.profile_pic) {
            const response = await this.httpService.axiosRef.get(profile.profile_pic, {
                responseType: 'stream',
            });
            return {
                file: response.data,
                type: response.headers['content-type'],
                size: parseInt(response.headers['content-length']),
            };
        }
        return undefined;
    }
    async getSubscriberData(event) {
        const handler = this;
        const defaultUserFields = 'first_name,last_name,profile_pic,locale,timezone,gender';
        const settings = await this.getSettings();
        const userFields = settings.user_fields || defaultUserFields;
        const profile = await handler.api.profile.getUserProfile(event.getSenderForeignId(), userFields);
        event.setProfile(profile);
        const defautLanguage = await this.languageService.getDefaultLanguage();
        return {
            foreign_id: event.getSenderForeignId(),
            first_name: profile.first_name,
            last_name: profile.last_name,
            gender: profile.gender,
            channel: {
                name: handler.getName(),
            },
            assignedAt: null,
            assignedTo: null,
            labels: [],
            locale: profile.locale,
            language: defautLanguage.code,
            timezone: profile.timezone,
            country: '',
            lastvisit: new Date(),
            retainedFrom: new Date(),
        };
    }
    async updateUserLabels(subscriberForeignId, oldLabels, newLabels) {
        const deleted = oldLabels
            .filter((l) => !newLabels.includes(l))
            .map((labelId) => {
            return this.api.customLabels.removePsidfromCustomLabel(subscriberForeignId, labelId);
        });
        const added = newLabels
            .filter((l) => !oldLabels.includes(l))
            .map((labelId) => {
            return this.api.customLabels.addPsidtoCustomLabel(subscriberForeignId, labelId);
        });
        this.logger.debug('Messenger Channel Handler : Sync user labels with API ... ');
        return await Promise.all([...deleted, ...added]);
    }
    async _setGreetingText(text) {
        const greeting = typeof text !== 'string'
            ? text
            : [
                {
                    locale: 'default',
                    text,
                },
            ];
        this.logger.debug('Messenger Channel Handler : Setting greeting text ...', text);
        return await this.api.profile.setMessengerProfile({
            greeting,
        });
    }
    async _setGetStartedButton() {
        return await this.api.profile.setMessengerProfile({
            get_started: {
                payload: 'GET_STARTED',
            },
        });
    }
    async _deleteGetStartedButton() {
        return await this.api.profile.deleteMessengerProfile(['get_started']);
    }
    formatMenu(tree) {
        return tree.map(({ id: _id, createdAt: _createdAt, updatedAt: _updatedAt, call_to_actions, ...rest }) => ({
            ...rest,
            call_to_actions: call_to_actions
                ? this.formatMenu(call_to_actions)
                : undefined,
        }));
    }
    async _setPersistentMenu(composer_input_disabled) {
        const handler = this;
        try {
            const menuTree = await this.menuService.getTree();
            const menu = this.formatMenu(menuTree);
            if (menu.length === 0) {
                return await handler._deletePersistentMenu();
            }
            else {
                const settings = await this.getSettings();
                composer_input_disabled =
                    typeof composer_input_disabled !== 'undefined'
                        ? composer_input_disabled
                        : settings.composer_input_disabled || false;
                return await handler.api.profile.setMessengerProfile({
                    persistent_menu: [
                        {
                            locale: 'default',
                            composer_input_disabled: !!composer_input_disabled,
                            call_to_actions: menu,
                        },
                    ],
                });
            }
        }
        catch (err) {
            this.logger.error('Messenger Channel Handler : Unable to update menu ...', err);
        }
    }
    async _deletePersistentMenu() {
        return await this.api.profile.deleteMessengerProfile(['persistent_menu']);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('hook:label:create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], MessengerHandler.prototype, "onLabelCreate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:label:delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], MessengerHandler.prototype, "onLabelDelete", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:subscriber:preUpdate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessengerHandler.prototype, "handleSubscriberUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:messenger_channel:greeting_text'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessengerHandler.prototype, "onGreetingTextUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:messenger_channel:get_started_button'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessengerHandler.prototype, "onToggleGetStartedButton", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:messenger_channel:access_token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setting_schema_1.Setting]),
    __metadata("design:returntype", Promise)
], MessengerHandler.prototype, "onAccessTokenUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:messenger_channel:composer_input_disabled'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessengerHandler.prototype, "onToggleComposerInput", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:menu:*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessengerHandler.prototype, "onMenuUpdate", null);
MessengerHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [setting_service_1.SettingService,
        channel_service_1.ChannelService,
        logger_service_1.LoggerService,
        event_emitter_1.EventEmitter2,
        i18n_service_1.I18nService,
        language_service_1.LanguageService,
        subscriber_service_1.SubscriberService,
        attachment_service_1.AttachmentService,
        message_service_1.MessageService,
        menu_service_1.MenuService,
        label_service_1.LabelService,
        axios_1.HttpService])
], MessengerHandler);
exports.default = MessengerHandler;
//# sourceMappingURL=index.channel.js.map