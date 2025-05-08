"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequiredFields = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const types_1 = require("../../setting/schemas/types");
let ValidateRequiredFields = class ValidateRequiredFields {
    constructor() {
        this.REQUIRED_FIELDS = [
            {
                name: 'title',
                label: 'Title',
                type: types_1.FieldType.text,
            },
            {
                name: 'status',
                label: 'Status',
                type: types_1.FieldType.checkbox,
            },
        ];
    }
    validate(fields) {
        const errors = [];
        this.REQUIRED_FIELDS.forEach((requiredField, index) => {
            const field = fields[index];
            if (!field) {
                errors.push(`Field ${requiredField.name} is required.`);
                return;
            }
            Object.entries(requiredField).forEach(([key, value]) => {
                if (field[key] !== value) {
                    errors.push(`fields.${index}.${key} must be ${value}, but got ${field[key]}`);
                }
            });
        });
        if (errors.length > 0) {
            throw new common_1.BadRequestException({ message: errors });
        }
        return true;
    }
    defaultMessage() {
        return 'The fields must match the required structure.';
    }
};
exports.ValidateRequiredFields = ValidateRequiredFields;
exports.ValidateRequiredFields = ValidateRequiredFields = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'validateRequiredFields', async: false })
], ValidateRequiredFields);
//# sourceMappingURL=validate-required-fields.validator.js.map