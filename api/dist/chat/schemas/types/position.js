"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionSchema = void 0;
const zod_1 = require("zod");
exports.positionSchema = zod_1.z.object({
    x: zod_1.z.number(),
    y: zod_1.z.number(),
});
//# sourceMappingURL=position.js.map