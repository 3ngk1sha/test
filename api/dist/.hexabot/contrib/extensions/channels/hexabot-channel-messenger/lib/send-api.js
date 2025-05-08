"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendAPI = void 0;
class SendAPI {
    constructor(graphRequest) {
        this.graphRequest = graphRequest;
    }
    async sendSenderAction(payload) {
        return await this.call(payload);
    }
    async call(payload) {
        return await this.graphRequest.sendRequest({
            path: '/me/messages',
            payload,
        });
    }
}
exports.SendAPI = SendAPI;
exports.default = SendAPI;
//# sourceMappingURL=send-api.js.map