"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureVarSchema = void 0;
const zod_1 = require("zod");
exports.captureVarSchema = zod_1.z.object({
    entity: zod_1.z.union([zod_1.z.number().min(-2).max(-1), zod_1.z.string()]),
    context_var: zod_1.z.string().regex(/^[a-z][a-z_0-9]*$/),
});
//# sourceMappingURL=capture-var.js.map