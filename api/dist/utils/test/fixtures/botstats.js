"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installBotStatsFixtures = exports.botstatsFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bot_stats_schema_1 = require("../../../analytics/schemas/bot-stats.schema");
exports.botstatsFixtures = [
    {
        day: new Date('2023-11-01T23:00:00.000Z'),
        type: bot_stats_schema_1.BotStatsType.all_messages,
        name: 'All Messages',
        value: 1580,
    },
    {
        day: new Date('2023-11-02T23:00:00.000Z'),
        type: bot_stats_schema_1.BotStatsType.new_users,
        name: 'New users',
        value: 76,
    },
    {
        day: new Date('2023-11-03T22:00:00.000Z'),
        type: bot_stats_schema_1.BotStatsType.popular,
        name: 'Global Fallback',
        value: 34,
    },
    {
        day: new Date('2023-11-04T23:00:00.000Z'),
        type: bot_stats_schema_1.BotStatsType.new_conversations,
        name: 'New conversations',
        value: 492,
    },
    {
        day: new Date('2023-11-05T23:00:00.000Z'),
        type: bot_stats_schema_1.BotStatsType.incoming,
        name: 'Incoming',
        value: 886,
    },
    {
        day: new Date('2023-11-07T23:00:00.000Z'),
        type: bot_stats_schema_1.BotStatsType.outgoing,
        name: 'outgoing',
        value: 199,
    },
    {
        day: new Date('2023-11-03T23:00:00.000Z'),
        type: bot_stats_schema_1.BotStatsType.popular,
        name: 'Global Fallback',
        value: 34,
    },
];
const installBotStatsFixtures = async () => {
    const BotStats = mongoose_1.default.model(bot_stats_schema_1.BotStatsModel.name, bot_stats_schema_1.BotStatsModel.schema);
    return await BotStats.insertMany(exports.botstatsFixtures);
};
exports.installBotStatsFixtures = installBotStatsFixtures;
//# sourceMappingURL=botstats.js.map