"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsObjectId = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const IsObjectId = (validationOptions) => (object, propertyName) => (0, class_validator_1.registerDecorator)({
    target: object.constructor,
    propertyName,
    options: validationOptions,
    validator: {
        validate(value) {
            return mongoose_1.Types.ObjectId.isValid(value) ? value : '';
        },
    },
});
exports.IsObjectId = IsObjectId;
//# sourceMappingURL=is-object-id.js.map