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
exports.AttachmentContextParamDto = exports.AttachmentDownloadDto = exports.AttachmentCreateDto = exports.AttachmentMetadataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const object_id_dto_1 = require("../../utils/dto/object-id.dto");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
const types_1 = require("../types");
class AttachmentMetadataDto {
}
exports.AttachmentMetadataDto = AttachmentMetadataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment original file name', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachmentMetadataDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment size in bytes', type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttachmentMetadataDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment MIME type', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMimeType)(),
    __metadata("design:type", String)
], AttachmentMetadataDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Attachment channel', type: Object }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], AttachmentMetadataDto.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Attachment Resource Ref',
        enum: Object.values(types_1.AttachmentResourceRef),
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(types_1.AttachmentResourceRef)),
    __metadata("design:type", String)
], AttachmentMetadataDto.prototype, "resourceRef", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Attachment Owner Type',
        enum: Object.values(types_1.AttachmentCreatedByRef),
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(types_1.AttachmentCreatedByRef)),
    __metadata("design:type", String)
], AttachmentMetadataDto.prototype, "createdByRef", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Attachment Access',
        enum: Object.values(types_1.AttachmentAccess),
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(types_1.AttachmentAccess)),
    __metadata("design:type", String)
], AttachmentMetadataDto.prototype, "access", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Attachment Owner : Subscriber / User ID',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Owner must be a valid ObjectId' }),
    __metadata("design:type", String)
], AttachmentMetadataDto.prototype, "createdBy", void 0);
class AttachmentCreateDto extends AttachmentMetadataDto {
}
exports.AttachmentCreateDto = AttachmentCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment location', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachmentCreateDto.prototype, "location", void 0);
class AttachmentDownloadDto extends object_id_dto_1.ObjectIdDto {
}
exports.AttachmentDownloadDto = AttachmentDownloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Attachment download filename',
        type: String,
    }),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AttachmentDownloadDto.prototype, "filename", void 0);
class AttachmentContextParamDto {
}
exports.AttachmentContextParamDto = AttachmentContextParamDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Attachment Resource Reference',
        enum: Object.values(types_1.AttachmentResourceRef),
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(Object.values(types_1.AttachmentResourceRef)),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachmentContextParamDto.prototype, "resourceRef", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Attachment Access',
        enum: Object.values(types_1.AttachmentAccess),
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(Object.values(types_1.AttachmentAccess)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AttachmentContextParamDto.prototype, "access", void 0);
//# sourceMappingURL=attachment.dto.js.map