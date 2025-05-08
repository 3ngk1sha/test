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
exports.NlpSampleUpdateDto = exports.NlpSampleDto = exports.NlpSampleCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
const types_1 = require("../schemas/types");
class NlpSampleCreateDto {
}
exports.NlpSampleCreateDto = NlpSampleCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'NLP sample text', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NlpSampleCreateDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'If NLP sample is trained',
        type: Boolean,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], NlpSampleCreateDto.prototype, "trained", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'NLP sample type',
        enum: Object.values(types_1.NlpSampleState),
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(Object.values(types_1.NlpSampleState)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], NlpSampleCreateDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'NLP sample language id', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Language must be a valid ObjectId' }),
    __metadata("design:type", String)
], NlpSampleCreateDto.prototype, "language", void 0);
class NlpSampleDto extends NlpSampleCreateDto {
}
exports.NlpSampleDto = NlpSampleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'nlp sample entities',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], NlpSampleDto.prototype, "entities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'NLP sample language code', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NlpSampleDto.prototype, "language", void 0);
class NlpSampleUpdateDto extends (0, swagger_1.PartialType)(NlpSampleCreateDto) {
}
exports.NlpSampleUpdateDto = NlpSampleUpdateDto;
//# sourceMappingURL=nlp-sample.dto.js.map