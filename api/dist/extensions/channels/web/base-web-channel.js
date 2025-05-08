"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importStar(require("multer"));
const socket_io_1 = require("socket.io");
const uuid_1 = require("uuid");
const attachment_schema_1 = require("../../../attachment/schemas/attachment.schema");
const attachment_service_1 = require("../../../attachment/services/attachment.service");
const types_1 = require("../../../attachment/types");
const channel_service_1 = require("../../../channel/channel.service");
const Handler_1 = __importDefault(require("../../../channel/lib/Handler"));
const constants_1 = require("../../../chat/helpers/constants");
const subscriber_schema_1 = require("../../../chat/schemas/subscriber.schema");
const button_1 = require("../../../chat/schemas/types/button");
const message_1 = require("../../../chat/schemas/types/message");
const message_service_1 = require("../../../chat/services/message.service");
const subscriber_service_1 = require("../../../chat/services/subscriber.service");
const content_schema_1 = require("../../../cms/schemas/content.schema");
const menu_service_1 = require("../../../cms/services/menu.service");
const config_1 = require("../../../config");
const i18n_service_1 = require("../../../i18n/services/i18n.service");
const logger_service_1 = require("../../../logger/logger.service");
const setting_service_1 = require("../../../setting/services/setting.service");
const websocket_gateway_1 = require("../../../websocket/websocket.gateway");
const types_2 = require("./types");
const wrapper_1 = __importDefault(require("./wrapper"));
const upload = (0, multer_1.default)({
    limits: {
        fileSize: config_1.config.parameters.maxUploadSize,
    },
    storage: (() => {
        if (config_1.config.parameters.storageMode === 'memory') {
            return (0, multer_1.memoryStorage)();
        }
        else {
            return (0, multer_1.diskStorage)({});
        }
    })(),
}).single('file');
let BaseWebChannelHandler = class BaseWebChannelHandler extends Handler_1.default {
    constructor(name, settingService, channelService, logger, eventEmitter, i18n, subscriberService, attachmentService, messageService, menuService, websocketGateway) {
        super(name, settingService, channelService, logger);
        this.eventEmitter = eventEmitter;
        this.i18n = i18n;
        this.subscriberService = subscriberService;
        this.attachmentService = attachmentService;
        this.messageService = messageService;
        this.menuService = menuService;
        this.websocketGateway = websocketGateway;
    }
    init() {
        this.logger.debug('initialization ...');
    }
    async onWebSocketConnection(client) {
        try {
            const settings = await this.getSettings();
            const handshake = client.handshake;
            const { channel } = handshake.query;
            if (channel !== this.getName()) {
                return;
            }
            this.logger.debug('WS connected .. sending settings');
            try {
                const menu = await this.menuService.getTree();
                return client.emit('settings', { menu, ...settings });
            }
            catch (err) {
                this.logger.warn('Unable to retrieve menu ', err);
                return client.emit('settings', settings);
            }
        }
        catch (err) {
            this.logger.error('Unable to initiate websocket connection', err);
            client.disconnect();
        }
    }
    async formatIncomingHistoryMessage(incoming) {
        if ('type' in incoming.message) {
            if (incoming.message.type === button_1.PayloadType.location) {
                const coordinates = incoming.message.coordinates;
                return {
                    type: types_2.Web.IncomingMessageType.location,
                    data: {
                        coordinates: {
                            lat: coordinates.lat,
                            lng: coordinates.lon,
                        },
                    },
                };
            }
            else {
                const attachmentPayload = Array.isArray(incoming.message.attachment)
                    ? incoming.message.attachment[0]
                    : incoming.message.attachment;
                return {
                    type: types_2.Web.IncomingMessageType.file,
                    data: {
                        type: attachmentPayload.type,
                        url: await this.getPublicUrl(attachmentPayload.payload),
                    },
                };
            }
        }
        else {
            return {
                type: types_2.Web.IncomingMessageType.text,
                data: incoming.message,
            };
        }
    }
    async formatOutgoingHistoryMessage(outgoing) {
        if ('buttons' in outgoing.message) {
            return this._buttonsFormat(outgoing.message);
        }
        else if ('attachment' in outgoing.message) {
            return this._attachmentFormat(outgoing.message);
        }
        else if ('quickReplies' in outgoing.message) {
            return this._quickRepliesFormat(outgoing.message);
        }
        else if ('options' in outgoing.message) {
            if (outgoing.message.options.display === 'carousel') {
                return await this._carouselFormat(outgoing.message, {
                    content: outgoing.message.options,
                });
            }
            else {
                return await this._listFormat(outgoing.message, {
                    content: outgoing.message.options,
                });
            }
        }
        else {
            return this._textFormat(outgoing.message);
        }
    }
    isIncomingMessage(message) {
        return 'sender' in message && !!message.sender;
    }
    async formatMessages(messages) {
        const formattedMessages = [];
        for (const anyMessage of messages) {
            if (this.isIncomingMessage(anyMessage)) {
                const message = await this.formatIncomingHistoryMessage(anyMessage);
                formattedMessages.push({
                    ...message,
                    author: anyMessage.sender,
                    read: true,
                    mid: anyMessage.mid,
                    createdAt: anyMessage.createdAt,
                });
            }
            else {
                const message = await this.formatOutgoingHistoryMessage(anyMessage);
                formattedMessages.push({
                    ...message,
                    author: 'chatbot',
                    read: true,
                    mid: anyMessage.mid || this.generateId(),
                    handover: !!anyMessage.handover,
                    createdAt: anyMessage.createdAt,
                });
            }
        }
        return formattedMessages;
    }
    async fetchHistory(req, until = new Date(), n = 30) {
        const profile = req.session?.web?.profile;
        if (profile) {
            const messages = await this.messageService.findHistoryUntilDate(profile, until, n);
            return await this.formatMessages(messages.reverse());
        }
        return [];
    }
    async pollMessages(req, since = new Date(10e14), n = 30) {
        const profile = req.session?.web?.profile;
        if (profile) {
            const messages = await this.messageService.findHistorySinceDate(profile, since, n);
            return await this.formatMessages(messages);
        }
        return [];
    }
    async validateCors(req, res) {
        const settings = await this.getSettings();
        if (!req.headers?.origin) {
            this.logger.debug('No origin ', req.headers);
            throw new Error('CORS - No origin provided!');
        }
        const originUrl = new URL(req.headers.origin);
        const allowedProtocols = new Set(['http:', 'https:']);
        if (!allowedProtocols.has(originUrl.protocol)) {
            throw new Error('CORS - Invalid origin!');
        }
        const origins = settings.allowed_domains.split(',');
        const foundOrigin = origins
            .filter((origin) => origin.trim() !== '*')
            .map((origin) => {
            try {
                return new URL(origin.trim()).origin;
            }
            catch (error) {
                this.logger.error(`Invalid URL in allowed domains: ${origin}`, error);
                return null;
            }
        })
            .filter((normalizedOrigin) => normalizedOrigin !== null)
            .some((origin) => {
            return origin === originUrl.origin;
        });
        if (!foundOrigin && !origins.includes('*')) {
            res.set('Access-Control-Allow-Origin', '');
            this.logger.debug('No origin found ', req.headers.origin);
            throw new Error('CORS - Domain not allowed!');
        }
        else {
            res.set('Access-Control-Allow-Origin', originUrl.origin);
        }
        res.set('Access-Control-Allow-Credentials', 'true');
        res.set('Access-Control-Expose-Headers', '');
        if (req.method == 'OPTIONS') {
            res.set('Access-Control-Allow-Methods', 'GET, POST');
            res.set('Access-Control-Allow-Headers', 'content-type');
        }
    }
    validateSession(req, res, next) {
        if (!req.session?.web?.profile?.id) {
            this.logger.warn('No session ID to be found!', req.session);
            return res
                .status(403)
                .json({ err: 'Web Channel Handler : Unauthorized!' });
        }
        else if ((this.isSocketRequest(req) &&
            !!req.isSocket !== req.session.web.isSocket) ||
            !Array.isArray(req.session.web.messageQueue)) {
            this.logger.warn('Mixed channel request or invalid session data!', req.session);
            return res
                .status(403)
                .json({ err: 'Web Channel Handler : Unauthorized!' });
        }
        next(req.session?.web?.profile);
    }
    async checkRequest(req, res) {
        try {
            await this.validateCors(req, res);
        }
        catch (err) {
            this.logger.warn('Attempt to access from an unauthorized origin', err);
            throw new Error('Unauthorized, invalid origin !');
        }
    }
    async getOrCreateSession(req) {
        const data = req.query;
        const sessionProfile = req.session?.web?.profile;
        if (sessionProfile) {
            const subscriber = await this.subscriberService.findOneAndPopulate(sessionProfile.id);
            if (!subscriber || !req.session.web) {
                throw new Error('Subscriber session was not persisted in DB');
            }
            req.session.web.profile = subscriber;
            return subscriber;
        }
        const newProfile = {
            foreign_id: this.generateId(),
            first_name: data.first_name ? data.first_name.toString() : 'Anon.',
            last_name: data.last_name ? data.last_name.toString() : 'Web User',
            assignedTo: null,
            assignedAt: null,
            lastvisit: new Date(),
            retainedFrom: new Date(),
            channel: {
                name: this.getName(),
                ...this.getChannelAttributes(req),
            },
            language: '',
            locale: '',
            timezone: 0,
            gender: 'male',
            country: '',
            labels: [],
        };
        const subscriber = await this.subscriberService.create(newProfile);
        const profile = {
            ...subscriber,
            labels: [],
            assignedTo: null,
            avatar: null,
        };
        req.session.web = {
            profile,
            isSocket: this.isSocketRequest(req),
            messageQueue: [],
            polling: false,
        };
        return profile;
    }
    getMessageQueue(req, res) {
        if (this.isSocketRequest(req)) {
            this.logger.warn('Polling not authorized when using websockets');
            return res
                .status(403)
                .json({ err: 'Polling not authorized when using websockets' });
        }
        if (!(req.session && req.session.web && req.session.web.profile.id)) {
            this.logger.warn('Must be connected to poll messages');
            return res
                .status(403)
                .json({ err: 'Polling not authorized : Must be connected' });
        }
        if (req.session && req.session.web && req.session.web.polling) {
            this.logger.warn('Poll rejected ... already requested');
            return res
                .status(403)
                .json({ err: 'Poll rejected ... already requested' });
        }
        req.session.web.polling = true;
        const fetchMessages = async (req, res, retrials = 1) => {
            try {
                if (!req.query.since)
                    throw new common_1.BadRequestException(`QueryParam 'since' is missing`);
                const since = new Date(req.query.since.toString());
                const messages = await this.pollMessages(req, since);
                if (messages.length === 0 && retrials <= 5) {
                    setTimeout(async () => {
                        await fetchMessages(req, res, retrials * 2);
                    }, retrials * 1000);
                }
                else if (req.session.web) {
                    req.session.web.polling = false;
                    return res.status(200).json(messages.map((msg) => ['message', msg]));
                }
                else {
                    this.logger.error('Polling failed .. no session data');
                    return res.status(500).json({ err: 'No session data' });
                }
            }
            catch (err) {
                if (req.session.web) {
                    req.session.web.polling = false;
                }
                this.logger.error('Polling failed', err);
                return res.status(500).json({ err: 'Polling failed' });
            }
        };
        fetchMessages(req, res);
    }
    async subscribe(req, res) {
        this.logger.debug('subscribe (isSocket=' + this.isSocketRequest(req) + ')');
        try {
            const profile = await this.getOrCreateSession(req);
            if (this.isSocketRequest(req)) {
                try {
                    await req.socket.join(profile.foreign_id);
                }
                catch (err) {
                    this.logger.error('Unable to subscribe via websocket', err);
                }
            }
            const criteria = 'since' in req.query
                ? req.query.since
                : req.body?.since || undefined;
            const messages = await this.fetchHistory(req, criteria);
            return res.status(200).json({ profile, messages });
        }
        catch (err) {
            this.logger.warn('Unable to subscribe ', err);
            return res.status(500).json({ err: 'Unable to subscribe' });
        }
    }
    async handleWsUpload(req) {
        try {
            const { type, data } = req.body;
            if (!req.session?.web?.profile?.id) {
                this.logger.debug('No session');
                return null;
            }
            if (type !== 'file' || !('file' in data) || !data.file) {
                this.logger.debug('No files provided');
                return null;
            }
            const size = Buffer.byteLength(data.file);
            if (size > config_1.config.parameters.maxUploadSize) {
                throw new Error('Max upload size has been exceeded');
            }
            return await this.attachmentService.store(data.file, {
                name: data.name,
                size: Buffer.byteLength(data.file),
                type: data.type,
                resourceRef: types_1.AttachmentResourceRef.MessageAttachment,
                access: types_1.AttachmentAccess.Private,
                createdByRef: types_1.AttachmentCreatedByRef.Subscriber,
                createdBy: req.session?.web?.profile?.id,
            });
        }
        catch (err) {
            this.logger.error('Unable to store uploaded file', err);
            throw new Error('Unable to upload file!');
        }
    }
    async handleWebUpload(req, _res) {
        try {
            if (!req.file) {
                this.logger.debug('No files provided');
                return null;
            }
            return await this.attachmentService.store(req.file, {
                name: req.file.originalname,
                size: req.file.size,
                type: req.file.mimetype,
                resourceRef: types_1.AttachmentResourceRef.MessageAttachment,
                access: types_1.AttachmentAccess.Private,
                createdByRef: types_1.AttachmentCreatedByRef.Subscriber,
                createdBy: req.session.web.profile?.id,
            });
        }
        catch (err) {
            this.logger.error('Unable to store uploaded file', err);
            throw err;
        }
    }
    async handleUpload(req, res) {
        if (!req.session.web) {
            this.logger.debug('No session provided');
            return null;
        }
        if (this.isSocketRequest(req)) {
            return this.handleWsUpload(req);
        }
        else {
            return this.handleWebUpload(req, res);
        }
    }
    getIpAddress(req) {
        if (this.isSocketRequest(req)) {
            return req.socket.handshake.address;
        }
        else if (Array.isArray(req.ips) && req.ips.length > 0) {
            return req.ips.join(',');
        }
        else {
            return req.ip || '0.0.0.0';
        }
    }
    getChannelAttributes(req) {
        return {
            isSocket: this.isSocketRequest(req),
            ipAddress: this.getIpAddress(req),
            agent: req.headers['user-agent'] || 'browser',
        };
    }
    _handleEvent(req, res) {
        if (!req.body) {
            this.logger.debug('Empty body');
            res.status(400).json({ err: 'Web Channel Handler : Bad Request!' });
            return;
        }
        else {
            req.body.data =
                typeof req.body.data === 'string'
                    ? JSON.parse(req.body.data)
                    : req.body.data;
        }
        this.validateSession(req, res, async (profile) => {
            const body = req.body;
            const channelAttrs = this.getChannelAttributes(req);
            const event = new wrapper_1.default(this, body, channelAttrs);
            if (event._adapter.eventType === message_1.StdEventType.message) {
                if (event._adapter.messageType === message_1.IncomingMessageType.attachments) {
                    try {
                        const attachment = await this.handleUpload(req, res);
                        if (attachment) {
                            event._adapter.attachment = attachment;
                            event._adapter.raw.data = {
                                type: attachment_schema_1.Attachment.getTypeByMime(attachment.type),
                                url: await this.getPublicUrl(attachment),
                            };
                        }
                    }
                    catch (err) {
                        this.logger.warn('Unable to upload file ', err);
                        return res
                            .status(403)
                            .json({ err: 'Web Channel Handler : File upload failed!' });
                    }
                }
                if (body.sync && body.author === 'chatbot') {
                    const sentMessage = {
                        mid: event.getId(),
                        message: event.getMessage(),
                        recipient: profile.id,
                        read: true,
                        delivery: true,
                    };
                    this.eventEmitter.emit('hook:chatbot:sent', sentMessage, event);
                    return res.status(200).json(event._adapter.raw);
                }
                else {
                    event._adapter.raw.mid = this.generateId();
                    event._adapter.raw.author = profile.foreign_id;
                }
            }
            event.setSender(profile);
            const type = event.getEventType();
            if (type) {
                this.broadcast(profile, type, event._adapter.raw);
                this.eventEmitter.emit(`hook:chatbot:${type}`, event);
            }
            else {
                this.logger.error('Webhook received unknown event ', event);
            }
            res.status(200).json(event._adapter.raw);
        });
    }
    isSocketRequest(req) {
        return 'isSocket' in req && req.isSocket;
    }
    async handle(req, res) {
        const settings = await this.getSettings();
        try {
            await this.checkRequest(req, res);
            if (req.method === 'GET') {
                if (!this.isSocketRequest(req) && req.query._get) {
                    switch (req.query._get) {
                        case 'settings':
                            this.logger.debug('connected .. sending settings');
                            try {
                                const menu = await this.menuService.getTree();
                                return res.status(200).json({
                                    menu,
                                    server_date: new Date().toISOString(),
                                    ...settings,
                                });
                            }
                            catch (err) {
                                this.logger.warn('Unable to retrieve menu ', err);
                                return res.status(500).json({ err: 'Unable to retrieve menu' });
                            }
                        case 'polling':
                            return this.getMessageQueue(req, res);
                        default:
                            this.logger.error('Webhook received unknown command');
                            return res
                                .status(500)
                                .json({ err: 'Webhook received unknown command' });
                    }
                }
                else if (req.query._disconnect) {
                    req.session.web = undefined;
                    return res.status(200).json({ _disconnect: true });
                }
                else {
                    return await this.subscribe(req, res);
                }
            }
            else {
                return this._handleEvent(req, res);
            }
        }
        catch (err) {
            this.logger.warn('Request check failed', err);
            return res
                .status(403)
                .json({ err: 'Web Channel Handler : Unauthorized!' });
        }
    }
    generateId() {
        return 'web-' + (0, uuid_1.v4)();
    }
    _textFormat(message, _options) {
        return {
            type: types_2.Web.OutgoingMessageType.text,
            data: message,
        };
    }
    _quickRepliesFormat(message, _options) {
        return {
            type: types_2.Web.OutgoingMessageType.quick_replies,
            data: {
                text: message.text,
                quick_replies: message.quickReplies,
            },
        };
    }
    _buttonsFormat(message, _options) {
        return {
            type: types_2.Web.OutgoingMessageType.buttons,
            data: {
                text: message.text,
                buttons: message.buttons,
            },
        };
    }
    async _attachmentFormat(message, _options) {
        const payload = {
            type: types_2.Web.OutgoingMessageType.file,
            data: {
                type: message.attachment.type,
                url: await this.getPublicUrl(message.attachment.payload),
            },
        };
        if (message.quickReplies && message.quickReplies.length > 0) {
            return {
                ...payload,
                data: {
                    ...payload.data,
                    quick_replies: message.quickReplies,
                },
            };
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
                        const { title: _title, ...defaultAction } = btn;
                        element.default_action = defaultAction;
                    }
                }
                else {
                    if ('action_payload' in fields &&
                        fields.action_payload &&
                        fields.action_payload in item) {
                        btn.payload = btn.title + ':' + item[fields.action_payload];
                    }
                    else {
                        const postback = content_schema_1.Content.getPayload(item);
                        btn.payload = btn.title + ':' + postback;
                    }
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
        const pagination = message.pagination;
        let buttons = [], elements = [];
        if (!data.length) {
            this.logger.error('Unsufficient content count (must be >= 0 for list)');
            throw new Error('Unsufficient content count (list >= 0)');
        }
        if (pagination.total - pagination.skip - pagination.limit > 0) {
            buttons = [
                {
                    type: button_1.ButtonType.postback,
                    title: this.i18n.t('View More'),
                    payload: constants_1.VIEW_MORE_PAYLOAD,
                },
            ];
        }
        elements = await this._formatElements(data, options);
        const topElementStyle = options.content?.top_element_style
            ? {
                top_element_style: options.content?.top_element_style,
            }
            : {};
        return {
            type: types_2.Web.OutgoingMessageType.list,
            data: {
                elements,
                buttons,
                ...topElementStyle,
            },
        };
    }
    async _carouselFormat(message, options) {
        const data = message.elements || [];
        if (data.length === 0) {
            this.logger.error('Unsufficient content count (must be > 0 for carousel)');
            throw new Error('Unsufficient content count (carousel > 0)');
        }
        const elements = await this._formatElements(data, options);
        return {
            type: types_2.Web.OutgoingMessageType.carousel,
            data: {
                elements,
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
    broadcast(subscriber, type, content) {
        const channelData = subscriber_schema_1.Subscriber.getChannelData(subscriber);
        if (channelData.isSocket) {
            this.websocketGateway.broadcast(subscriber, type, content);
        }
        else {
        }
    }
    async sendMessage(event, envelope, options, _context) {
        const messageBase = await this._formatMessage(envelope, options);
        const subscriber = event.getSender();
        const message = {
            ...messageBase,
            mid: this.generateId(),
            author: 'chatbot',
            createdAt: new Date(),
            handover: !!(options && options.assignTo),
        };
        const next = async () => {
            this.broadcast(subscriber, message_1.StdEventType.message, message);
            return { mid: message.mid };
        };
        if (options && options.typing) {
            const autoTimeout = message && message.data && 'text' in message.data
                ? message.data.text.length * 10
                : 1000;
            const timeout = typeof options.typing === 'number' ? options.typing : autoTimeout;
            try {
                await this.sendTypingIndicator(subscriber, timeout);
                return next();
            }
            catch (err) {
                this.logger.error('Failed in sending typing indicator ', err);
            }
        }
        return next();
    }
    async sendTypingIndicator(recipient, timeout) {
        return new Promise((resolve, reject) => {
            try {
                this.broadcast(recipient, message_1.StdEventType.typing, true);
                setTimeout(() => {
                    this.broadcast(recipient, message_1.StdEventType.typing, false);
                    return resolve();
                }, timeout);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    async getSubscriberData(event) {
        const sender = event.getSender();
        const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = sender;
        const subscriber = {
            ...rest,
            channel: subscriber_schema_1.Subscriber.getChannelData(sender),
        };
        return subscriber;
    }
    async hasDownloadAccess(attachment, req) {
        const subscriberId = req.session?.web?.profile?.id;
        if (attachment.access === types_1.AttachmentAccess.Public) {
            return true;
        }
        else if (!subscriberId) {
            this.logger.warn(`Unauthorized access attempt to attachment ${attachment.id}`);
            return false;
        }
        else if (attachment.createdByRef === types_1.AttachmentCreatedByRef.Subscriber &&
            subscriberId === attachment.createdBy) {
            return true;
        }
        else {
            const message = await this.messageService.findOne({
                ['recipient']: subscriberId,
                $or: [
                    { 'message.attachment.payload.id': attachment.id },
                    {
                        'message.attachment': {
                            $elemMatch: { 'payload.id': attachment.id },
                        },
                    },
                ],
            });
            return !!message;
        }
    }
    async middleware(req, res, next) {
        if (!this.isSocketRequest(req)) {
            if (req.headers['content-type']?.includes('multipart/form-data')) {
                return upload(req, res, next);
            }
            else if (req.headers['content-type']?.includes('text/plain')) {
                const textParser = body_parser_1.default.text({ type: 'text/plain' });
                return textParser(req, res, () => {
                    try {
                        req.body =
                            typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
                        next();
                    }
                    catch (err) {
                        next(err);
                    }
                });
            }
        }
        next();
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('hook:websocket:connection', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], BaseWebChannelHandler.prototype, "onWebSocketConnection", null);
BaseWebChannelHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, setting_service_1.SettingService,
        channel_service_1.ChannelService,
        logger_service_1.LoggerService,
        event_emitter_1.EventEmitter2,
        i18n_service_1.I18nService,
        subscriber_service_1.SubscriberService,
        attachment_service_1.AttachmentService,
        message_service_1.MessageService,
        menu_service_1.MenuService,
        websocket_gateway_1.WebsocketGateway])
], BaseWebChannelHandler);
exports.default = BaseWebChannelHandler;
//# sourceMappingURL=base-web-channel.js.map