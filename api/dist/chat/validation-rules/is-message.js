"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMessage = exports.MessageValidator = exports.isValidMessage = void 0;
const class_validator_1 = require("class-validator");
const message_1 = require("../schemas/types/message");
function isValidMessage(msg) {
    return message_1.blockMessageObjectSchema.safeParse(msg).success;
}
exports.isValidMessage = isValidMessage;
let MessageValidator = class MessageValidator {
    validate(msg) {
        return isValidMessage(msg);
    }
};
exports.MessageValidator = MessageValidator;
exports.MessageValidator = MessageValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], MessageValidator);
function IsMessage(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: MessageValidator,
        });
    };
}
exports.IsMessage = IsMessage;
//# sourceMappingURL=is-message.js.map