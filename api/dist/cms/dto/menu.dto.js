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
exports.MenuQueryDto = exports.MenuCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
const menu_1 = require("../schemas/types/menu");
class MenuCreateDto {
}
exports.MenuCreateDto = MenuCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Menu title', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MenuCreateDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Menu parent', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({
        message: 'Parent must be a valid objectId',
    }),
    __metadata("design:type", String)
], MenuCreateDto.prototype, "parent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Menu type', enum: menu_1.MenuType, type: menu_1.MenuType }),
    (0, class_validator_1.IsEnum)(menu_1.MenuType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MenuCreateDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Menu payload', type: String }),
    (0, class_validator_1.ValidateIf)((o) => o.type == menu_1.MenuType.postback),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MenuCreateDto.prototype, "payload", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Menu url', type: String }),
    (0, class_validator_1.ValidateIf)((o) => o.type == menu_1.MenuType.web_url),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], MenuCreateDto.prototype, "url", void 0);
class MenuQueryDto extends (0, swagger_1.PartialType)(MenuCreateDto) {
}
exports.MenuQueryDto = MenuQueryDto;
//# sourceMappingURL=menu.dto.js.map