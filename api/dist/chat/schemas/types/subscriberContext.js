"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberContextSchema = void 0;
const zod_1 = require("zod");
exports.subscriberContextSchema = zod_1.z.object({
    vars: zod_1.z.record(zod_1.z.any()).optional(),
});
//# sourceMappingURL=subscriberContext.js.map