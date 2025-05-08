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
exports.TranslationUpdateDto = exports.TranslationCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TranslationCreateDto {
}
exports.TranslationCreateDto = TranslationCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Translation str', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TranslationCreateDto.prototype, "str", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Translations', type: Object }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], TranslationCreateDto.prototype, "translations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Translated', type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TranslationCreateDto.prototype, "translated", void 0);
class TranslationUpdateDto {
}
exports.TranslationUpdateDto = TranslationUpdateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Translation str', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TranslationUpdateDto.prototype, "str", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Translations', type: Object }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], TranslationUpdateDto.prototype, "translations", void 0);
//# sourceMappingURL=translation.dto.js.map