"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsChannelData = exports.ChannelDataValidator = exports.isChannelData = void 0;
const class_validator_1 = require("class-validator");
const channel_1 = require("../schemas/types/channel");
function isChannelData(channel) {
    return channel_1.channelDataSchema.safeParse(channel).success;
}
exports.isChannelData = isChannelData;
let ChannelDataValidator = class ChannelDataValidator {
    validate(channel) {
        return isChannelData(channel);
    }
};
exports.ChannelDataValidator = ChannelDataValidator;
exports.ChannelDataValidator = ChannelDataValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], ChannelDataValidator);
function IsChannelData(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: ChannelDataValidator,
        });
    };
}
exports.IsChannelData = IsChannelData;
//# sourceMappingURL=is-channel-data.js.map