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
exports.ContentUpdateDto = exports.ContentCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
class ContentCreateDto {
}
exports.ContentCreateDto = ContentCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content entity', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Entity must be a valid ObjectId' }),
    __metadata("design:type", String)
], ContentCreateDto.prototype, "entity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content title', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentCreateDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Content status', type: Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ContentCreateDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Content dynamic fields', type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ContentCreateDto.prototype, "dynamicFields", void 0);
class ContentUpdateDto extends (0, swagger_1.PartialType)(ContentCreateDto) {
}
exports.ContentUpdateDto = ContentUpdateDto;
//# sourceMappingURL=content.dto.js.map