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
exports.LanguageUpdateDto = exports.LanguageCreateDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LanguageCreateDto {
}
exports.LanguageCreateDto = LanguageCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Language Title', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LanguageCreateDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Language Code', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LanguageCreateDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether Language is RTL', type: Boolean }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LanguageCreateDto.prototype, "isRTL", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Is Default Language ?', type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LanguageCreateDto.prototype, "isDefault", void 0);
class LanguageUpdateDto extends (0, mapped_types_1.PartialType)(LanguageCreateDto) {
}
exports.LanguageUpdateDto = LanguageUpdateDto;
//# sourceMappingURL=language.dto.js.map