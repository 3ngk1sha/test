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
exports.ConversationCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
class ConversationCreateDto {
}
exports.ConversationCreateDto = ConversationCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Conversation sender', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({
        message: 'Sender must be a valid objectId',
    }),
    __metadata("design:type", String)
], ConversationCreateDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Conversation is active', type: Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ConversationCreateDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Conversation context', type: Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ConversationCreateDto.prototype, "context", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current conversation', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({
        message: 'Current must be a valid objectId',
    }),
    __metadata("design:type", Object)
], ConversationCreateDto.prototype, "current", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'next conversation', type: Array }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, is_object_id_1.IsObjectId)({
        each: true,
        message: 'next must be a valid objectId',
    }),
    __metadata("design:type", Array)
], ConversationCreateDto.prototype, "next", void 0);
//# sourceMappingURL=conversation.dto.js.map