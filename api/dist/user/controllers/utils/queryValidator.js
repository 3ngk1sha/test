"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booleanQueryValidator = void 0;
function booleanQueryValidator(booleanQueryAsString) {
    switch (booleanQueryAsString) {
        case 'true':
            return true;
        default:
            return false;
    }
}
exports.booleanQueryValidator = booleanQueryValidator;
//# sourceMappingURL=queryValidator.js.map