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
exports.BotStatsModel = exports.BotStats = exports.BotStatsType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
var BotStatsType;
(function (BotStatsType) {
    BotStatsType["outgoing"] = "outgoing";
    BotStatsType["new_users"] = "new_users";
    BotStatsType["all_messages"] = "all_messages";
    BotStatsType["incoming"] = "incoming";
    BotStatsType["existing_conversations"] = "existing_conversations";
    BotStatsType["popular"] = "popular";
    BotStatsType["new_conversations"] = "new_conversations";
    BotStatsType["returning_users"] = "returning_users";
    BotStatsType["retention"] = "retention";
})(BotStatsType || (exports.BotStatsType = BotStatsType = {}));
let BotStats = class BotStats extends base_schema_1.BaseSchema {
    static toLines(stats, types) {
        const data = types.map((type, index) => {
            return {
                id: index + 1,
                name: type,
                values: [],
            };
        });
        const index = data.reduce((acc, curr, i) => {
            acc[curr.name] = i;
            return acc;
        }, {});
        const result = stats.reduce((acc, stat) => {
            stat.date = stat.day;
            acc[index[stat.type]].values.push(stat);
            return acc;
        }, data);
        return result;
    }
    static toBars(stats) {
        return stats.map((stat) => {
            return {
                ...stat,
                name: stat.id,
            };
        });
    }
};
exports.BotStats = BotStats;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], BotStats.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: true,
    }),
    __metadata("design:type", Date)
], BotStats.prototype, "day", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], BotStats.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], BotStats.prototype, "name", void 0);
exports.BotStats = BotStats = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BotStats);
exports.BotStatsModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: BotStats.name,
    schema: mongoose_1.SchemaFactory.createForClass(BotStats),
});
exports.default = exports.BotStatsModel.schema;
//# sourceMappingURL=bot-stats.schema.js.map