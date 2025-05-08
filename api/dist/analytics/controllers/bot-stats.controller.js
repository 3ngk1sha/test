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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotStatsController = void 0;
const common_1 = require("@nestjs/common");
const bot_stats_dto_1 = require("../dto/bot-stats.dto");
const bot_stats_schema_1 = require("../schemas/bot-stats.schema");
const bot_stats_service_1 = require("../services/bot-stats.service");
const utilities_1 = require("../utilities");
let BotStatsController = class BotStatsController {
    constructor(botStatsService) {
        this.botStatsService = botStatsService;
    }
    async findMessages(dto) {
        const { from = (0, utilities_1.aMonthAgo)(), to = new Date() } = dto;
        const types = [
            bot_stats_schema_1.BotStatsType.all_messages,
            bot_stats_schema_1.BotStatsType.incoming,
            bot_stats_schema_1.BotStatsType.outgoing,
        ];
        const result = await this.botStatsService.findMessages(from, to, types);
        return bot_stats_schema_1.BotStats.toLines(result, types);
    }
    async datum(dto) {
        const { from = (0, utilities_1.aMonthAgo)(), to = new Date(), type } = dto;
        const result = await this.botStatsService.findMessages(from, to, [type]);
        return bot_stats_schema_1.BotStats.toLines(result, [type]);
    }
    async conversation(dto) {
        const { from = (0, utilities_1.aMonthAgo)(), to = new Date() } = dto;
        const types = [
            bot_stats_schema_1.BotStatsType.new_conversations,
            bot_stats_schema_1.BotStatsType.existing_conversations,
        ];
        const result = await this.botStatsService.findMessages(from, to, types);
        return bot_stats_schema_1.BotStats.toLines(result, types);
    }
    async audiance(dto) {
        const { from = (0, utilities_1.aMonthAgo)(), to = new Date() } = dto;
        const types = [
            bot_stats_schema_1.BotStatsType.new_users,
            bot_stats_schema_1.BotStatsType.returning_users,
            bot_stats_schema_1.BotStatsType.retention,
        ];
        const result = await this.botStatsService.findMessages(from, to, types);
        return bot_stats_schema_1.BotStats.toLines(result, types);
    }
    async popularBlocks(dto) {
        const { from = (0, utilities_1.aMonthAgo)(), to = new Date() } = dto;
        const results = await this.botStatsService.findPopularBlocks(from, to);
        return bot_stats_schema_1.BotStats.toBars(results);
    }
};
exports.BotStatsController = BotStatsController;
__decorate([
    (0, common_1.Get)('messages'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bot_stats_dto_1.BotStatsFindDto]),
    __metadata("design:returntype", Promise)
], BotStatsController.prototype, "findMessages", null);
__decorate([
    (0, common_1.Get)('datum'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bot_stats_dto_1.BotStatsFindDatumDto]),
    __metadata("design:returntype", Promise)
], BotStatsController.prototype, "datum", null);
__decorate([
    (0, common_1.Get)('conversation'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bot_stats_dto_1.BotStatsFindDto]),
    __metadata("design:returntype", Promise)
], BotStatsController.prototype, "conversation", null);
__decorate([
    (0, common_1.Get)('audiance'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bot_stats_dto_1.BotStatsFindDto]),
    __metadata("design:returntype", Promise)
], BotStatsController.prototype, "audiance", null);
__decorate([
    (0, common_1.Get)('popularBlocks'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bot_stats_dto_1.BotStatsFindDto]),
    __metadata("design:returntype", Promise)
], BotStatsController.prototype, "popularBlocks", null);
exports.BotStatsController = BotStatsController = __decorate([
    (0, common_1.Controller)('botstats'),
    __metadata("design:paramtypes", [bot_stats_service_1.BotStatsService])
], BotStatsController);
//# sourceMappingURL=bot-stats.controller.js.map