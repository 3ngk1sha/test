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
exports.SubscriberUpdateDto = exports.SubscriberCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
const is_channel_data_1 = require("../validation-rules/is-channel-data");
class SubscriberCreateDto {
    constructor() {
        this.avatar = null;
    }
}
exports.SubscriberCreateDto = SubscriberCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subscriber first name', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubscriberCreateDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subscriber last name', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubscriberCreateDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Subscriber locale', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubscriberCreateDto.prototype, "locale", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Subscriber timezone', type: Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SubscriberCreateDto.prototype, "timezone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Subscriber language', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubscriberCreateDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Subscriber gender', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubscriberCreateDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Subscriber country', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubscriberCreateDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Subscriber foreign id', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubscriberCreateDto.prototype, "foreign_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subscriber labels', type: Array }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, is_object_id_1.IsObjectId)({ each: true, message: 'Label must be a valid ObjectId' }),
    __metadata("design:type", Array)
], SubscriberCreateDto.prototype, "labels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Subscriber assigned to',
        type: String,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({ message: 'AssignedTo must be a valid ObjectId' }),
    __metadata("design:type", Object)
], SubscriberCreateDto.prototype, "assignedTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Subscriber assigned at',
        type: Date,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], SubscriberCreateDto.prototype, "assignedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Subscriber last visit',
        type: Date,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SubscriberCreateDto.prototype, "lastvisit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Subscriber retained from',
        type: Date,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SubscriberCreateDto.prototype, "retainedFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscriber channel',
        type: Object,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_channel_data_1.IsChannelData)(),
    __metadata("design:type", Object)
], SubscriberCreateDto.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Subscriber Avatar',
        type: String,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Avatar Attachment ID must be a valid ObjectId' }),
    __metadata("design:type", Object)
], SubscriberCreateDto.prototype, "avatar", void 0);
class SubscriberUpdateDto extends (0, swagger_1.PartialType)(SubscriberCreateDto) {
}
exports.SubscriberUpdateDto = SubscriberUpdateDto;
//# sourceMappingURL=subscriber.dto.js.map