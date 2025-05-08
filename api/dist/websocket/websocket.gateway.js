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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGateway = void 0;
const event_emitter_1 = require("@nestjs/event-emitter");
const websockets_1 = require("@nestjs/websockets");
const cookie_1 = __importDefault(require("cookie"));
const cookieParser = __importStar(require("cookie-parser"));
const cookie_signature_1 = __importDefault(require("cookie-signature"));
const express_session_1 = require("express-session");
const socket_io_1 = require("socket.io");
const uid_safe_1 = require("uid-safe");
const config_1 = require("../config");
const logger_service_1 = require("../logger/logger.service");
const session_store_1 = require("../utils/constants/session-store");
const io_message_pipe_1 = require("./pipes/io-message.pipe");
const socket_event_dispatcher_service_1 = require("./services/socket-event-dispatcher.service");
const types_1 = require("./types");
const gateway_options_1 = require("./utils/gateway-options");
const socket_request_1 = require("./utils/socket-request");
const socket_response_1 = require("./utils/socket-response");
let WebsocketGateway = class WebsocketGateway {
    constructor(logger, eventEmitter, socketEventDispatcherService) {
        this.logger = logger;
        this.eventEmitter = eventEmitter;
        this.socketEventDispatcherService = socketEventDispatcherService;
    }
    broadcastMessageSent(message) {
        this.io.to(types_1.Room.MESSAGE).emit('message', {
            op: 'messageSent',
            speakerId: message.recipient,
            msg: message,
        });
    }
    broadcastMessageReceived(message, subscriber) {
        this.io.to(types_1.Room.MESSAGE).emit('message', {
            op: 'messageReceived',
            speakerId: subscriber.id,
            msg: message,
        });
    }
    broadcastMessageDelivered(deliveredMessages, subscriber) {
        this.io.to(types_1.Room.MESSAGE).emit('message', {
            op: 'messageDelivered',
            speakerId: subscriber.id,
            mids: deliveredMessages,
        });
    }
    broadcastMessageRead(watermark, subscriber) {
        this.io.to(types_1.Room.MESSAGE).emit('message', {
            op: 'messageRead',
            speakerId: subscriber.id,
            watermark,
        });
    }
    broadcastSubscriberNew(subscriber) {
        this.io.to(types_1.Room.SUBSCRIBER).emit('subscriber', {
            op: 'newSubscriber',
            profile: subscriber,
        });
    }
    broadcastSubscriberUpdate(subscriber) {
        this.io.to(types_1.Room.SUBSCRIBER).emit('subscriber', {
            op: 'updateSubscriber',
            profile: subscriber,
        });
    }
    broadcast(subscriber, type, content) {
        this.io.to(subscriber.foreign_id).emit(type, content);
    }
    createAndStoreSession(client, next) {
        const sid = (0, uid_safe_1.sync)(24);
        const signedSid = 's:' + cookie_signature_1.default.sign(sid, config_1.config.session.secret);
        const cookies = cookie_1.default.serialize(config_1.config.session.name, signedSid, config_1.config.session.cookie);
        const newSession = {
            cookie: {
                httpOnly: true,
                path: '/',
                originalMaxAge: config_1.config.session.cookie.maxAge,
            },
            passport: { user: {} },
        };
        (0, session_store_1.getSessionStore)().set(sid, newSession, (err) => {
            if (err) {
                this.logger.error('Error saving session:', err);
                return next(new Error('Unable to establish a new socket session'));
            }
            client.emit('set-cookie', cookies);
            client.handshake.headers.cookie = cookies;
            client.data.session = newSession;
            this.logger.verbose(`
        Could not fetch session, since connecting socket has no cookie in its handshake.
        Generated a one-time-use cookie:
        ${client.handshake.headers.cookie}
        and saved it on the socket handshake.

        > This means the socket started off with an empty session, i.e. (req.session === {})
        > That "anonymous" session will only last until the socket is disconnected. To work around this,
        > make sure the socket sends a 'cookie' header or query param when it initially connects.
        > (This usually arises due to using a non-browser client such as a native iOS/Android app,
        > React Native, a Node.js script, or some other connected device. It can also arise when
        > attempting to connect a cross-origin socket in the browser, particularly for Safari users.
        > To work around this, either supply a cookie manually, or ignore this message and use an
        > approach other than sessions-- e.g. an auth token.)
      `);
            return next();
        });
    }
    saveSession(client) {
        const { sessionID, session } = client.data;
        if (!sessionID || !session) {
            this.logger.warn('No socket session found ...');
            return;
        }
        this.loadSession(sessionID, (err, oldSession) => {
            if (err || !oldSession) {
                this.logger.debug('Unable to save websocket session, probably the user logged out ...');
                return;
            }
            (0, session_store_1.getSessionStore)().set(sessionID, session, (err) => {
                if (err) {
                    this.logger.error('Error saving session in `config.sockets.afterDisconnect`:', err);
                    throw err;
                }
            });
        });
    }
    loadSession(sessionID, next) {
        (0, session_store_1.getSessionStore)().get(sessionID, (err, session) => {
            this.logger.verbose('Retrieved socket session', err || session);
            return next(err, session);
        });
    }
    afterInit() {
        this.logger.log('Initialized websocket gateway');
        this.io.use((client, next) => {
            this.logger.verbose('Client connected, attempting to load session.');
            try {
                const { searchParams } = new URL(`ws://localhost${client.request.url}`);
                if (client.request.headers.cookie) {
                    const cookies = cookie_1.default.parse(client.request.headers.cookie);
                    if (cookies && config_1.config.session.name in cookies) {
                        const sessionID = cookieParser.signedCookie(cookies[config_1.config.session.name], config_1.config.session.secret);
                        if (sessionID) {
                            return this.loadSession(sessionID, (err, session) => {
                                if (err || !session) {
                                    this.logger.warn('Unable to load session, creating a new one ...', err);
                                    if (searchParams.get('channel') !== 'console-channel') {
                                        return this.createAndStoreSession(client, next);
                                    }
                                    else {
                                        return next(new Error('Unauthorized: Unknown session ID'));
                                    }
                                }
                                client.data.session = session;
                                client.data.sessionID = sessionID;
                                next();
                            });
                        }
                        else {
                            return next(new Error('Unable to parse session ID from cookie'));
                        }
                    }
                }
                else if (searchParams.get('channel') === 'web-channel') {
                    return this.createAndStoreSession(client, next);
                }
                else {
                    return next(new Error('Unauthorized to connect to WS'));
                }
            }
            catch (e) {
                this.logger.warn('Something unexpected happening');
                return next(e);
            }
        });
    }
    handleConnection(client, ..._args) {
        const { sockets } = this.io.sockets;
        this.logger.log(`Client id: ${client.id} connected`);
        this.logger.debug(`Number of connected clients: ${sockets?.size}`);
        this.eventEmitter.emit(`hook:websocket:connection`, client);
    }
    disconnectSockets({ id }) {
        for (const [, socket] of this.io.sockets.sockets) {
            if (socket.data['sessionID'] === id) {
                socket.disconnect(true);
            }
        }
    }
    async handleDisconnect(client) {
        this.logger.log(`Client id:${client.id} disconnected`);
        if (!config_1.config.sockets.afterDisconnect) {
            return;
        }
        try {
            await config_1.config.sockets.afterDisconnect(client);
            this.saveSession(client);
        }
        catch (e) {
            this.logger.error('Error in `config.sockets.afterDisconnect` lifecycle callback:', e);
        }
    }
    handleHealthCheck() {
        return { event: 'event', data: 'OK' };
    }
    handleGet(payload, client) {
        const request = new socket_request_1.SocketRequest(client, 'get', payload);
        const response = new socket_response_1.SocketResponse();
        this.socketEventDispatcherService.handleEvent('get', payload.url, request, response);
        return response.getPromise();
    }
    handlePost(payload, client) {
        const request = new socket_request_1.SocketRequest(client, 'post', payload);
        const response = new socket_response_1.SocketResponse();
        this.socketEventDispatcherService.handleEvent('post', payload.url, request, response);
        return response.getPromise();
    }
    handlePut(payload, client) {
        const request = new socket_request_1.SocketRequest(client, 'put', payload);
        const response = new socket_response_1.SocketResponse();
        this.socketEventDispatcherService.handleEvent('put', payload.url, request, response);
        return response.getPromise();
    }
    handlePatch(payload, client) {
        const request = new socket_request_1.SocketRequest(client, 'patch', payload);
        const response = new socket_response_1.SocketResponse();
        this.socketEventDispatcherService.handleEvent('patch', payload.url, request, response);
        return response.getPromise();
    }
    handleDelete(payload, client) {
        const request = new socket_request_1.SocketRequest(client, 'delete', payload);
        const response = new socket_response_1.SocketResponse();
        this.socketEventDispatcherService.handleEvent('delete', payload.url, request, response);
        return response.getPromise();
    }
    handleOptions(payload, client) {
        const request = new socket_request_1.SocketRequest(client, 'options', payload);
        const response = new socket_response_1.SocketResponse();
        this.socketEventDispatcherService.handleEvent('options', payload.url, request, response);
        return response.getPromise();
    }
    handleHead(payload, client) {
        const request = new socket_request_1.SocketRequest(client, 'head', payload);
        const response = new socket_response_1.SocketResponse();
        this.socketEventDispatcherService.handleEvent('head', payload.url, request, response);
        return response.getPromise();
    }
};
exports.WebsocketGateway = WebsocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketGateway.prototype, "io", void 0);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:user:logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [express_session_1.Session]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "disconnectSockets", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('healthcheck'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleHealthCheck", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('get'),
    __param(0, (0, websockets_1.MessageBody)(new io_message_pipe_1.IOMessagePipe())),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleGet", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('post'),
    __param(0, (0, websockets_1.MessageBody)(new io_message_pipe_1.IOMessagePipe())),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handlePost", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('put'),
    __param(0, (0, websockets_1.MessageBody)(new io_message_pipe_1.IOMessagePipe())),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handlePut", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('patch'),
    __param(0, (0, websockets_1.MessageBody)(new io_message_pipe_1.IOMessagePipe())),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handlePatch", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('delete'),
    __param(0, (0, websockets_1.MessageBody)(new io_message_pipe_1.IOMessagePipe())),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleDelete", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('options'),
    __param(0, (0, websockets_1.MessageBody)(new io_message_pipe_1.IOMessagePipe())),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleOptions", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('head'),
    __param(0, (0, websockets_1.MessageBody)(new io_message_pipe_1.IOMessagePipe())),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleHead", null);
exports.WebsocketGateway = WebsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)((0, gateway_options_1.buildWebSocketGatewayOptions)()),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        event_emitter_1.EventEmitter2,
        socket_event_dispatcher_service_1.SocketEventDispatcherService])
], WebsocketGateway);
//# sourceMappingURL=websocket.gateway.js.map