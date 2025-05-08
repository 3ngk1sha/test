"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockOptionsSchema = exports.contentOptionsSchema = void 0;
const zod_1 = require("zod");
const button_1 = require("./button");
exports.contentOptionsSchema = zod_1.z.object({
    display: zod_1.z.enum(['list', 'carousel']),
    fields: zod_1.z.object({
        title: zod_1.z.string(),
        subtitle: zod_1.z.string().nullable(),
        image_url: zod_1.z.string().nullable(),
        url: zod_1.z.string().optional(),
        action_title: zod_1.z.string().optional(),
        action_payload: zod_1.z.string().optional(),
    }),
    buttons: zod_1.z.array(button_1.buttonSchema),
    limit: zod_1.z.number().finite(),
    query: zod_1.z.any().optional(),
    entity: zod_1.z.union([zod_1.z.string(), zod_1.z.number().finite()]).optional(),
    top_element_style: zod_1.z.enum(['large', 'compact']).optional(),
});
exports.BlockOptionsSchema = zod_1.z.object({
    typing: zod_1.z.number().optional(),
    content: exports.contentOptionsSchema.optional(),
    fallback: zod_1.z
        .object({
        active: zod_1.z.boolean(),
        message: zod_1.z.array(zod_1.z.string()),
        max_attempts: zod_1.z.number().finite(),
    })
        .optional(),
    assignTo: zod_1.z.string().optional(),
    effects: zod_1.z.array(zod_1.z.string()).optional(),
});
//# sourceMappingURL=options.js.map