"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPatternList = exports.PatternListValidator = exports.isPatternList = void 0;
const class_validator_1 = require("class-validator");
const pattern_1 = require("../schemas/types/pattern");
function isPatternList(patterns) {
    if (!Array.isArray(patterns)) {
        return false;
    }
    return patterns.every((pattern) => pattern_1.patternSchema.safeParse(pattern).success);
}
exports.isPatternList = isPatternList;
let PatternListValidator = class PatternListValidator {
    validate(patterns) {
        return isPatternList(patterns);
    }
};
exports.PatternListValidator = PatternListValidator;
exports.PatternListValidator = PatternListValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], PatternListValidator);
function IsPatternList(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: PatternListValidator,
        });
    };
}
exports.IsPatternList = IsPatternList;
//# sourceMappingURL=is-pattern-list.js.map