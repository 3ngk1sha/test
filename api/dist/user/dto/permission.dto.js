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
exports.PermissionCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
const action_type_1 = require("../types/action.type");
class PermissionCreateDto {
}
exports.PermissionCreateDto = PermissionCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id of the model', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Model must be a valid ObjectId' }),
    __metadata("design:type", String)
], PermissionCreateDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Action to perform on the model', enum: action_type_1.Action }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(action_type_1.Action),
    __metadata("design:type", String)
], PermissionCreateDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Id of the role', type: String }),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Role must be a valid ObjectId' }),
    __metadata("design:type", String)
], PermissionCreateDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'relation of the permission',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PermissionCreateDto.prototype, "relation", void 0);
//# sourceMappingURL=permission.dto.js.map