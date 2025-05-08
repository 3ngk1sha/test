"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildZodSchemaValidator = void 0;
function buildZodSchemaValidator(zodSchema) {
    return (data) => {
        return zodSchema.safeParse(data).success;
    };
}
exports.buildZodSchemaValidator = buildZodSchemaValidator;
//# sourceMappingURL=zod-validation.js.map