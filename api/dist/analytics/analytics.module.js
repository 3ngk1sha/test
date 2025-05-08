"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("@nestjs/mongoose");
const bot_stats_controller_1 = require("./controllers/bot-stats.controller");
const bot_stats_repository_1 = require("./repositories/bot-stats.repository");
const bot_stats_schema_1 = require("./schemas/bot-stats.schema");
const bot_stats_service_1 = require("./services/bot-stats.service");
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([bot_stats_schema_1.BotStatsModel]), event_emitter_1.EventEmitter2],
        controllers: [bot_stats_controller_1.BotStatsController],
        providers: [bot_stats_service_1.BotStatsService, bot_stats_repository_1.BotStatsRepository],
    })
], AnalyticsModule);
//# sourceMappingURL=analytics.module.js.map