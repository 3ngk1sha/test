"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsVarCapture = exports.CaptureVarValidator = exports.isValidVarCapture = void 0;
const class_validator_1 = require("class-validator");
const capture_var_1 = require("../schemas/types/capture-var");
function isValidVarCapture(vars) {
    if (!Array.isArray(vars)) {
        return false;
    }
    return vars.every((captureVar) => capture_var_1.captureVarSchema.safeParse(captureVar).success);
}
exports.isValidVarCapture = isValidVarCapture;
let CaptureVarValidator = class CaptureVarValidator {
    validate(vars) {
        return isValidVarCapture(vars);
    }
};
exports.CaptureVarValidator = CaptureVarValidator;
exports.CaptureVarValidator = CaptureVarValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], CaptureVarValidator);
function IsVarCapture(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: CaptureVarValidator,
        });
    };
}
exports.IsVarCapture = IsVarCapture;
//# sourceMappingURL=is-valid-capture.js.map