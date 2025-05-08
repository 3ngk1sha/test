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
exports.NlpValueUpdateDto = exports.NlpValueCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
class NlpValueCreateDto {
}
exports.NlpValueCreateDto = NlpValueCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nlp value', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NlpValueCreateDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nlp value expressions',
        isArray: true,
        type: Array,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NlpValueCreateDto.prototype, "expressions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nlp value metadata', type: Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], NlpValueCreateDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nlp Value Description', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NlpValueCreateDto.prototype, "doc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nlp value is builtin', type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NlpValueCreateDto.prototype, "builtin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nlp value entity', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Entity must be a valid ObjectId' }),
    __metadata("design:type", Object)
], NlpValueCreateDto.prototype, "entity", void 0);
class NlpValueUpdateDto {
}
exports.NlpValueUpdateDto = NlpValueUpdateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Foreign ID', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NlpValueUpdateDto.prototype, "foreign_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nlp value', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NlpValueUpdateDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nlp value expressions',
        isArray: true,
        type: Array,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NlpValueUpdateDto.prototype, "expressions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nlp value entity', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Entity must be a valid ObjectId' }),
    __metadata("design:type", Object)
], NlpValueUpdateDto.prototype, "entity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nlp Value Description', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NlpValueUpdateDto.prototype, "doc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nlp value is builtin', type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NlpValueUpdateDto.prototype, "builtin", void 0);
//# sourceMappingURL=nlp-value.dto.js.map