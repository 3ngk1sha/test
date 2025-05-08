"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTypeUpdateDto = exports.ContentTypeCreateDto = exports.ContentField = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const types_1 = require("../../setting/schemas/types");
const validate_required_fields_validator_1 = require("../validators/validate-required-fields.validator");
class ContentField {
}
exports.ContentField = ContentField;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[a-z][a-z_0-9]*$/),
    __metadata("design:type", String)
], ContentField.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ContentField.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(types_1.FieldType, {
        message: "type must be one of the following values: 'text', 'url', 'textarea', 'checkbox', 'file', 'html'",
    }),
    __metadata("design:type", String)
], ContentField.prototype, "type", void 0);
class ContentTypeCreateDto {
}
exports.ContentTypeCreateDto = ContentTypeCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content type name', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ContentTypeCreateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Content type fields',
        type: ContentField,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.Validate)(validate_required_fields_validator_1.ValidateRequiredFields),
    (0, class_transformer_1.Type)(() => ContentField),
    __metadata("design:type", Array)
], ContentTypeCreateDto.prototype, "fields", void 0);
class ContentTypeUpdateDto extends (0, swagger_1.PartialType)(ContentTypeCreateDto) {
}
exports.ContentTypeUpdateDto = ContentTypeUpdateDto;
//# sourceMappingURL=contentType.dto.js.map