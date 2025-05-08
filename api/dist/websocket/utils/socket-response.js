"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketResponse = void 0;
class SocketResponse {
    constructor(sendResponseHeaders = true, sendStatusCode = true) {
        this.statusCode = 200;
        this.headers = {};
        this.init = (resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        };
        this.sendResponseHeaders = sendResponseHeaders;
        this.sendStatusCode = sendStatusCode;
        this.promise = new Promise(this.init.bind(this));
    }
    status(code) {
        this.statusCode = code;
        return this;
    }
    set(key, value) {
        this.headers[key] = value;
        return this;
    }
    setHeaders(headers) {
        this.headers = headers;
        return this;
    }
    send(body) {
        const response = { body };
        if (this.sendResponseHeaders) {
            response.headers = { ...this.headers };
        }
        if (this.sendStatusCode) {
            response.statusCode = this.statusCode;
        }
        this.resolve(response);
        return response;
    }
    json(data) {
        this.set('Content-Type', 'application/json');
        return this.send(data);
    }
    getPromise() {
        return this.promise;
    }
}
exports.SocketResponse = SocketResponse;
//# sourceMappingURL=socket-response.js.map