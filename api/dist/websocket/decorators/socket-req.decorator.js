"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketReq = void 0;
const common_1 = require("@nestjs/common");
exports.SocketReq = (0, common_1.createParamDecorator)((data, ctx) => {
    const client = ctx.switchToWs().getClient();
    return client.request;
});
//# sourceMappingURL=socket-req.decorator.js.map