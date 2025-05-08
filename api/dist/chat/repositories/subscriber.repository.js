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
exports.SubscriberRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bot_stats_schema_1 = require("../../analytics/schemas/bot-stats.schema");
const base_repository_1 = require("../../utils/generics/base-repository");
const subscriber_schema_1 = require("../schemas/subscriber.schema");
let SubscriberRepository = class SubscriberRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model, subscriber_schema_1.Subscriber, subscriber_schema_1.SUBSCRIBER_POPULATE, subscriber_schema_1.SubscriberFull);
        this.model = model;
    }
    async postCreate(created) {
        this.eventEmitter.emit('hook:stats:entry', bot_stats_schema_1.BotStatsType.new_users, 'New users', created);
    }
    async preUpdate(_query, criteria, updates) {
        const subscriberUpdates = updates?.['$set'];
        if ('assignedTo' in subscriberUpdates) {
            const oldSubscriber = await this.findOne(criteria);
            if (!oldSubscriber) {
                throw new Error('Something went wrong: subscriber does not exist');
            }
            if (subscriberUpdates.assignedTo !== oldSubscriber?.assignedTo) {
                this.eventEmitter.emit('hook:subscriber:assign', subscriberUpdates, oldSubscriber);
                if (!(subscriberUpdates.assignedTo && oldSubscriber?.assignedTo)) {
                    this.eventEmitter.emit('hook:analytics:passation', oldSubscriber, !!subscriberUpdates?.assignedTo);
                    subscriberUpdates.assignedAt = new Date();
                }
            }
        }
    }
    findByForeignIdQuery(id) {
        return this.findQuery({ foreign_id: id }, { skip: 0, limit: 1, sort: ['lastvisit', 'desc'] });
    }
    async findOneByForeignId(id) {
        const query = this.findByForeignIdQuery(id);
        const [result] = await this.execute(query, subscriber_schema_1.Subscriber);
        return result || null;
    }
    async findOneByForeignIdAndPopulate(id) {
        const query = this.findByForeignIdQuery(id).populate(this.populate);
        const [result] = await this.execute(query, subscriber_schema_1.SubscriberFull);
        return result;
    }
    async updateOneByForeignIdQuery(id, updates) {
        return await this.updateOne({ foreign_id: id }, updates);
    }
    async handBackByForeignIdQuery(foreignId) {
        return await this.updateOne({
            foreign_id: foreignId,
            assignedTo: { $ne: null },
        }, {
            assignedTo: null,
        });
    }
    async handOverByForeignIdQuery(foreignId, userId) {
        return await this.updateOne({
            foreign_id: foreignId,
            assignedTo: { $ne: userId },
        }, {
            assignedTo: userId,
        });
    }
};
exports.SubscriberRepository = SubscriberRepository;
exports.SubscriberRepository = SubscriberRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscriber_schema_1.Subscriber.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubscriberRepository);
//# sourceMappingURL=subscriber.repository.js.map