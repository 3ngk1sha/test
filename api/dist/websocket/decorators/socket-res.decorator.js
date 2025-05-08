"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketRes = void 0;
const common_1 = require("@nestjs/common");
exports.SocketRes = (0, common_1.createParamDecorator)((data, ctx) => {
    const client = ctx.switchToWs().getClient();
    return client.response;
});
//# sourceMappingURL=socket-res.decorator.js.map