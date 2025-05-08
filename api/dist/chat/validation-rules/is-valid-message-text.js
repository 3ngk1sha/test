"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidMessageText = void 0;
const class_validator_1 = require("class-validator");
const message_1 = require("../schemas/types/message");
function IsValidMessageText(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(message) {
                    return message_1.validMessageTextSchema.safeParse(message).success;
                },
            },
        });
    };
}
exports.IsValidMessageText = IsValidMessageText;
//# sourceMappingURL=is-valid-message-text.js.map