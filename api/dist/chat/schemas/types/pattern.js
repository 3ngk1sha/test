"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patternSchema = exports.stringRegexPatternSchema = exports.nlpPatternSchema = exports.payloadPatternSchema = void 0;
const zod_1 = require("zod");
const button_1 = require("./button");
exports.payloadPatternSchema = zod_1.z.object({
    label: zod_1.z.string(),
    value: zod_1.z.string(),
    type: zod_1.z.nativeEnum(button_1.PayloadType).optional(),
});
exports.nlpPatternSchema = zod_1.z.discriminatedUnion('match', [
    zod_1.z.object({
        entity: zod_1.z.string(),
        match: zod_1.z.literal('entity'),
    }),
    zod_1.z.object({
        entity: zod_1.z.string(),
        match: zod_1.z.literal('value'),
        value: zod_1.z.string(),
    }),
]);
exports.stringRegexPatternSchema = zod_1.z.string().refine((value) => {
    if (value.startsWith('/') && value.endsWith('/')) {
        if (value.length === 2)
            return false;
        try {
            new RegExp(value.slice(1, -1), 'gi');
            return true;
        }
        catch (err) {
            return false;
        }
    }
    return value !== '';
}, {
    message: 'Invalid regex or empty string',
});
exports.patternSchema = zod_1.z.union([
    exports.stringRegexPatternSchema,
    exports.payloadPatternSchema,
    zod_1.z.array(exports.nlpPatternSchema),
]);
//# sourceMappingURL=pattern.js.map