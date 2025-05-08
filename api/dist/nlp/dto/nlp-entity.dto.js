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
exports.NlpEntityCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NlpEntityCreateDto {
}
exports.NlpEntityCreateDto = NlpEntityCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the nlp entity', type: String }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_]+$/, {
        message: 'Only alphanumeric characters and underscores are allowed.',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NlpEntityCreateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        isArray: true,
        enum: ['keywords', 'trait', 'free-text'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsIn)(['keywords', 'trait', 'free-text'], { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], NlpEntityCreateDto.prototype, "lookups", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NlpEntityCreateDto.prototype, "doc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nlp entity is builtin', type: Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], NlpEntityCreateDto.prototype, "builtin", void 0);
//# sourceMappingURL=nlp-entity.dto.js.map