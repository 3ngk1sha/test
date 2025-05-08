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
exports.BotStatsFindDatumDto = exports.BotStatsFindDto = exports.BotStatsCreateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const bot_stats_schema_1 = require("../schemas/bot-stats.schema");
const is_less_than_date_1 = require("../validation-rules/is-less-than-date");
class BotStatsCreateDto {
}
exports.BotStatsCreateDto = BotStatsCreateDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BotStatsCreateDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], BotStatsCreateDto.prototype, "day", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BotStatsCreateDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BotStatsCreateDto.prototype, "name", void 0);
class BotStatsFindDto {
}
exports.BotStatsFindDto = BotStatsFindDto;
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    (0, is_less_than_date_1.IsLessThanDate)('to', {
        message: 'From date must be less than or equal to To date',
    }),
    __metadata("design:type", Date)
], BotStatsFindDto.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], BotStatsFindDto.prototype, "to", void 0);
class BotStatsFindDatumDto extends BotStatsFindDto {
}
exports.BotStatsFindDatumDto = BotStatsFindDatumDto;
__decorate([
    (0, class_validator_1.IsEnum)(bot_stats_schema_1.BotStatsType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BotStatsFindDatumDto.prototype, "type", void 0);
//# sourceMappingURL=bot-stats.dto.js.map