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
exports.SettingUpdateDto = exports.SettingCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const types_1 = require("../schemas/types");
class SettingCreateDto {
}
exports.SettingCreateDto = SettingCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Setting group', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SettingCreateDto.prototype, "group", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Setting subgroup', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SettingCreateDto.prototype, "subgroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Setting label (system name)', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SettingCreateDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Setting type',
        enum: [
            'text',
            'multiple_text',
            'checkbox',
            'select',
            'number',
            'attachment',
            'multiple_attachment',
        ],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(types_1.SettingType)),
    __metadata("design:type", String)
], SettingCreateDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Setting value' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SettingCreateDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Setting options (required when type is select)',
        isArray: true,
        type: Array,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SettingCreateDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Defines the display order of the setting in the user interface',
        type: Number,
    }),
    __metadata("design:type", Number)
], SettingCreateDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Indicates whether this setting supports translation',
        type: Boolean,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SettingCreateDto.prototype, "translatable", void 0);
class SettingUpdateDto {
}
exports.SettingUpdateDto = SettingUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'value of the setting' }),
    __metadata("design:type", Object)
], SettingUpdateDto.prototype, "value", void 0);
//# sourceMappingURL=setting.dto.js.map