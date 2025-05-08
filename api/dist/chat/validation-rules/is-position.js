"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPosition = exports.PositionValidator = exports.isPosition = void 0;
const class_validator_1 = require("class-validator");
const position_1 = require("../schemas/types/position");
function isPosition(position) {
    return position_1.positionSchema.safeParse(position).success;
}
exports.isPosition = isPosition;
let PositionValidator = class PositionValidator {
    validate(position) {
        return isPosition(position);
    }
};
exports.PositionValidator = PositionValidator;
exports.PositionValidator = PositionValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], PositionValidator);
function IsPosition(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: PositionValidator,
        });
    };
}
exports.IsPosition = IsPosition;
//# sourceMappingURL=is-position.js.map