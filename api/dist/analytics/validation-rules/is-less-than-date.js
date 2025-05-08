"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsLessThanDate = void 0;
const class_validator_1 = require("class-validator");
function IsLessThanDate(property, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    if (relatedValue) {
                        return value <= relatedValue;
                    }
                    return true;
                },
            },
        });
    };
}
exports.IsLessThanDate = IsLessThanDate;
//# sourceMappingURL=is-less-than-date.js.map