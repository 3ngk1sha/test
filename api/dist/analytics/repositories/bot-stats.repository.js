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
exports.BotStatsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const bot_stats_schema_1 = require("../schemas/bot-stats.schema");
let BotStatsRepository = class BotStatsRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model, bot_stats_schema_1.BotStats);
        this.model = model;
    }
    async findMessages(from, to, types) {
        const query = this.model.find({
            type: { $in: types },
            day: { $gte: from, $lte: to },
        });
        return await this.execute(query, bot_stats_schema_1.BotStats);
    }
    async findPopularBlocks(from, to, limit = 5) {
        return await this.model.aggregate([
            {
                $match: {
                    day: { $gte: from, $lte: to },
                    type: bot_stats_schema_1.BotStatsType.popular,
                },
            },
            {
                $group: {
                    _id: '$name',
                    id: { $sum: 1 },
                    value: { $sum: '$value' },
                },
            },
            {
                $sort: {
                    value: -1,
                },
            },
            {
                $limit: limit,
            },
            {
                $addFields: { id: '$_id' },
            },
            {
                $project: { _id: 0 },
            },
        ]);
    }
};
exports.BotStatsRepository = BotStatsRepository;
exports.BotStatsRepository = BotStatsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bot_stats_schema_1.BotStats.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BotStatsRepository);
//# sourceMappingURL=bot-stats.repository.js.map