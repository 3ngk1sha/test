"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelDataSchema = void 0;
const zod_1 = require("zod");
exports.channelDataSchema = zod_1.z
    .object({
    name: zod_1.z.string().regex(/-channel$/),
})
    .passthrough();
//# sourceMappingURL=channel.js.map