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
exports.UserRequestResetDto = exports.UserResetPasswordDto = exports.UserUpdateStateAndRolesDto = exports.UserEditProfileDto = exports.UserCreateDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
class UserCreateDto {
    constructor() {
        this.avatar = null;
    }
}
exports.UserCreateDto = UserCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User username', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User first name', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User last name', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User email', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User password', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User roles', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, is_object_id_1.IsObjectId)({ each: true, message: 'Role must be a valid ObjectId' }),
    __metadata("design:type", Array)
], UserCreateDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Avatar', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Avatar must be a valid ObjectId' }),
    __metadata("design:type", Object)
], UserCreateDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User state',
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserCreateDto.prototype, "state", void 0);
class UserEditProfileDto extends (0, swagger_1.OmitType)((0, swagger_1.PartialType)(UserCreateDto), [
    'username',
    'roles',
    'avatar',
    'state',
]) {
}
exports.UserEditProfileDto = UserEditProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User language', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserEditProfileDto.prototype, "language", void 0);
class UserUpdateStateAndRolesDto {
}
exports.UserUpdateStateAndRolesDto = UserUpdateStateAndRolesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User state',
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserUpdateStateAndRolesDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User roles',
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, is_object_id_1.IsObjectId)({ each: true, message: 'Role must be a valid ObjectId' }),
    __metadata("design:type", Array)
], UserUpdateStateAndRolesDto.prototype, "roles", void 0);
class UserResetPasswordDto extends (0, mapped_types_1.PickType)(UserCreateDto, [
    'password',
]) {
}
exports.UserResetPasswordDto = UserResetPasswordDto;
class UserRequestResetDto extends (0, mapped_types_1.PickType)(UserCreateDto, ['email']) {
}
exports.UserRequestResetDto = UserRequestResetDto;
//# sourceMappingURL=user.dto.js.map