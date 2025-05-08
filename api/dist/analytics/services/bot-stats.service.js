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
exports.BotStatsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const subscriber_schema_1 = require("../../chat/schemas/subscriber.schema");
const config_1 = require("../../config");
const base_service_1 = require("../../utils/generics/base-service");
const bot_stats_repository_1 = require("../repositories/bot-stats.repository");
const bot_stats_schema_1 = require("../schemas/bot-stats.schema");
let BotStatsService = class BotStatsService extends base_service_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async findMessages(from, to, types) {
        return await this.repository.findMessages(from, to, types);
    }
    async findPopularBlocks(from, to) {
        return await this.repository.findPopularBlocks(from, to);
    }
    handleLastVisit(subscriber) {
        const now = +new Date();
        if (subscriber.lastvisit) {
            if (now - +subscriber.lastvisit > config_1.config.analytics.thresholds.loyalty) {
                this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.returning_users, 'Loyalty', subscriber);
            }
            if (now - +subscriber.lastvisit > config_1.config.analytics.thresholds.returning) {
                this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.returning_users, 'Returning users', subscriber);
            }
        }
        if (subscriber.retainedFrom &&
            now - +subscriber.retainedFrom > config_1.config.analytics.thresholds.retention) {
            this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.retention, 'Retentioned users', subscriber);
        }
    }
    async handleStatEntry(type, name, _subscriber) {
        const day = new Date();
        day.setMilliseconds(0);
        day.setSeconds(0);
        day.setMinutes(0);
        day.setHours(0);
        try {
            const insight = await this.findOneOrCreate({ day: { $lte: day, $gte: day }, type, name }, { day, type, name, value: 0 });
            try {
                await this.updateOne(insight.id, { value: insight.value + 1 });
            }
            catch (err) {
                this.logger.error('Unable to update insight', err);
            }
        }
        catch (err) {
            this.logger.error('Unable to find or create insight', err);
        }
    }
};
exports.BotStatsService = BotStatsService;
__decorate([
    (0, event_emitter_1.OnEvent)('hook:user:lastvisit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscriber_schema_1.Subscriber]),
    __metadata("design:returntype", void 0)
], BotStatsService.prototype, "handleLastVisit", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:stats:entry'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, subscriber_schema_1.Subscriber]),
    __metadata("design:returntype", Promise)
], BotStatsService.prototype, "handleStatEntry", null);
exports.BotStatsService = BotStatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bot_stats_repository_1.BotStatsRepository])
], BotStatsService);
//# sourceMappingURL=bot-stats.service.js.map