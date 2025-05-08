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
exports.MessageUpdateDto = exports.MessageCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
const is_valid_message_text_1 = require("../validation-rules/is-valid-message-text");
class MessageCreateDto {
}
exports.MessageCreateDto = MessageCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message id', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MessageCreateDto.prototype, "mid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reply to Message id', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MessageCreateDto.prototype, "inReplyTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Message sender', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Sender must be a valid ObjectId' }),
    __metadata("design:type", String)
], MessageCreateDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Message recipient', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Recipient must be a valid ObjectId' }),
    __metadata("design:type", String)
], MessageCreateDto.prototype, "recipient", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Message sent by', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, is_object_id_1.IsObjectId)({ message: 'SentBy must be a valid ObjectId' }),
    __metadata("design:type", String)
], MessageCreateDto.prototype, "sentBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message', type: Object }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_valid_message_text_1.IsValidMessageText)({ message: 'Message should have text property' }),
    __metadata("design:type", Object)
], MessageCreateDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Message is read', type: Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MessageCreateDto.prototype, "read", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Message is delivered', type: Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MessageCreateDto.prototype, "delivery", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Message is handed over', type: Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MessageCreateDto.prototype, "handover", void 0);
class MessageUpdateDto extends (0, swagger_1.PartialType)(MessageCreateDto) {
}
exports.MessageUpdateDto = MessageUpdateDto;
//# sourceMappingURL=message.dto.js.map