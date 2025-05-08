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
exports.MessageRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const message_schema_1 = require("../schemas/message.schema");
let MessageRepository = class MessageRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model, message_schema_1.Message, message_schema_1.MESSAGE_POPULATE, message_schema_1.MessageFull);
        this.model = model;
    }
    async preCreate(_doc) {
        if (_doc) {
            if (!('sender' in _doc) && !('recipient' in _doc)) {
                throw new Error('Either sender or recipient must be provided!');
            }
        }
    }
    async findHistoryUntilDate(subscriber, until = new Date(), limit = 30) {
        return await this.find({
            $or: [{ recipient: subscriber.id }, { sender: subscriber.id }],
            createdAt: { $lt: until },
        }, { skip: 0, limit, sort: ['createdAt', 'desc'] });
    }
    async findHistorySinceDate(subscriber, since = new Date(), limit = 30) {
        return await this.find({
            $or: [{ recipient: subscriber.id }, { sender: subscriber.id }],
            createdAt: { $gt: since },
        }, { skip: 0, limit, sort: ['createdAt', 'asc'] });
    }
};
exports.MessageRepository = MessageRepository;
exports.MessageRepository = MessageRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessageRepository);
//# sourceMappingURL=message.repository.js.map