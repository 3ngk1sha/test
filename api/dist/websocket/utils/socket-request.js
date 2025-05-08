"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketRequest = void 0;
const config_1 = require("../../config");
class SocketRequest {
    get session() {
        return this._session;
    }
    set session(data) {
        this._session = data;
        this.socket.data.session = data;
    }
    constructor(socket, method, incomingMessage) {
        this.transport = 'socket.io';
        this.protocol = 'ws';
        this.isSocket = true;
        this.port = null;
        this.ip = socket.handshake.address;
        this.ips =
            'ips' in socket.handshake
                ? socket.handshake.ips
                : [this.ip];
        this.socket = socket;
        this.url = incomingMessage.url;
        const urlObj = new URL(this.url.startsWith('http')
            ? this.url
            : `${config_1.config.apiBaseUrl}${this.url}`);
        this.path = urlObj.pathname || '/';
        const urlQuery = Array.from(urlObj.searchParams).reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
        this.query = {
            ...socket.handshake.query,
            ...urlQuery,
        };
        this.method = method.toUpperCase();
        this.body = Array.isArray(incomingMessage.data)
            ? incomingMessage.data
            : { ...(incomingMessage.params || {}), ...(incomingMessage.data || {}) };
        this.headers = {
            host: urlObj.host,
            cookie: socket.handshake.headers.cookie || undefined,
            nosession: socket.handshake.headers.nosession ? true : undefined,
            origin: socket.handshake.headers.origin || undefined,
            ...incomingMessage.headers,
        };
        this.sessionID = socket.data.sessionID;
        this.session = socket.data.session;
    }
}
exports.SocketRequest = SocketRequest;
//# sourceMappingURL=socket-request.js.map