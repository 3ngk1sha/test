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
exports.BlockUpdateDto = exports.BlockCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_object_id_1 = require("../../utils/validation-rules/is-object-id");
const is_message_1 = require("../validation-rules/is-message");
const is_pattern_list_1 = require("../validation-rules/is-pattern-list");
const is_position_1 = require("../validation-rules/is-position");
const is_valid_capture_1 = require("../validation-rules/is-valid-capture");
class BlockCreateDto {
    constructor() {
        this.patterns = [];
        this.outcomes = [];
        this.trigger_labels = [];
        this.assign_labels = [];
        this.trigger_channels = [];
    }
}
exports.BlockCreateDto = BlockCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Block name', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BlockCreateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Block patterns', type: Array }),
    (0, class_validator_1.IsOptional)(),
    (0, is_pattern_list_1.IsPatternList)({ message: 'Patterns list is invalid' }),
    __metadata("design:type", Array)
], BlockCreateDto.prototype, "patterns", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Block's outcomes",
        type: Array,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Outcomes are invalid' }),
    __metadata("design:type", Array)
], BlockCreateDto.prototype, "outcomes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Block trigger labels', type: Array }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, is_object_id_1.IsObjectId)({ each: true, message: 'Trigger label must be a valid objectId' }),
    __metadata("design:type", Array)
], BlockCreateDto.prototype, "trigger_labels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Block assign labels', type: Array }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, is_object_id_1.IsObjectId)({ each: true, message: 'Assign label must be a valid objectId' }),
    __metadata("design:type", Array)
], BlockCreateDto.prototype, "assign_labels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Block trigger channels', type: Array }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], BlockCreateDto.prototype, "trigger_channels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Block options', type: Object }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], BlockCreateDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Block message', type: Object }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_message_1.IsMessage)({ message: 'Message is invalid' }),
    __metadata("design:type", Object)
], BlockCreateDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'next blocks', type: Array }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, is_object_id_1.IsObjectId)({ each: true, message: 'Next block must be a valid objectId' }),
    __metadata("design:type", Array)
], BlockCreateDto.prototype, "nextBlocks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'attached blocks', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({
        message: 'Attached block must be a valid objectId',
    }),
    __metadata("design:type", Object)
], BlockCreateDto.prototype, "attachedBlock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Block category', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, is_object_id_1.IsObjectId)({ message: 'Category must be a valid objectId' }),
    __metadata("design:type", Object)
], BlockCreateDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Block has started conversation',
        type: Boolean,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], BlockCreateDto.prototype, "starts_conversation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Block capture vars',
        type: Array,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, is_valid_capture_1.IsVarCapture)({ message: 'Capture vars are invalid' }),
    __metadata("design:type", Array)
], BlockCreateDto.prototype, "capture_vars", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Block position',
        type: Object,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_position_1.IsPosition)({ message: 'Position is invalid' }),
    __metadata("design:type", Object)
], BlockCreateDto.prototype, "position", void 0);
class BlockUpdateDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(BlockCreateDto, [
    'patterns',
    'outcomes',
    'trigger_labels',
    'assign_labels',
    'trigger_channels',
])) {
}
exports.BlockUpdateDto = BlockUpdateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Block patterns', type: Array }),
    (0, class_validator_1.IsOptional)(),
    (0, is_pattern_list_1.IsPatternList)({ message: 'Patterns list is invalid' }),
    __metadata("design:type", Array)
], BlockUpdateDto.prototype, "patterns", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Block's outcomes",
        type: Array,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Outcomes are invalid' }),
    __metadata("design:type", Array)
], BlockUpdateDto.prototype, "outcomes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Block trigger labels', type: Array }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, is_object_id_1.IsObjectId)({ each: true, message: 'Trigger label must be a valid objectId' }),
    __metadata("design:type", Array)
], BlockUpdateDto.prototype, "trigger_labels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Block assign labels', type: Array }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, is_object_id_1.IsObjectId)({ each: true, message: 'Assign label must be a valid objectId' }),
    __metadata("design:type", Array)
], BlockUpdateDto.prototype, "assign_labels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Block trigger channels', type: Array }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BlockUpdateDto.prototype, "trigger_channels", void 0);
//# sourceMappingURL=block.dto.js.map