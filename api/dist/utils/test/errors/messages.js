"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateOneError = void 0;
const getUpdateOneError = (entity, id) => new Error(`Unable to update ${entity}${id ? ` with ID \"${id}\"` : ''}`);
exports.getUpdateOneError = getUpdateOneError;
//# sourceMappingURL=messages.js.map