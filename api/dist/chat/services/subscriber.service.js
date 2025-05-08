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
exports.SubscriberService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const attachment_service_1 = require("../../attachment/services/attachment.service");
const config_1 = require("../../config");
const base_service_1 = require("../../utils/generics/base-service");
const socket_method_decorator_1 = require("../../websocket/decorators/socket-method.decorator");
const socket_req_decorator_1 = require("../../websocket/decorators/socket-req.decorator");
const socket_res_decorator_1 = require("../../websocket/decorators/socket-res.decorator");
const types_1 = require("../../websocket/types");
const socket_request_1 = require("../../websocket/utils/socket-request");
const socket_response_1 = require("../../websocket/utils/socket-response");
const websocket_gateway_1 = require("../../websocket/websocket.gateway");
const subscriber_repository_1 = require("../repositories/subscriber.repository");
const subscriber_schema_1 = require("../schemas/subscriber.schema");
let SubscriberService = class SubscriberService extends base_service_1.BaseService {
    constructor(repository, attachmentService, gateway) {
        super(repository);
        this.repository = repository;
        this.attachmentService = attachmentService;
        if (gateway)
            this.gateway = gateway;
    }
    subscribe(req, res) {
        try {
            this.gateway.io.socketsJoin(types_1.Room.SUBSCRIBER);
            return res.json({
                success: true,
                subscribe: types_1.Room.SUBSCRIBER,
            });
        }
        catch (e) {
            this.logger.error('Websocket subscription');
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async findOneByForeignId(id) {
        return await this.repository.findOneByForeignId(id);
    }
    async findOneByForeignIdAndPopulate(id) {
        return await this.repository.findOneByForeignIdAndPopulate(id);
    }
    async updateOneByForeignId(id, updates) {
        return await this.repository.updateOneByForeignIdQuery(id, updates);
    }
    async handBackByForeignId(foreignId) {
        return await this.repository.handBackByForeignIdQuery(foreignId);
    }
    async handOverByForeignId(foreignId, userId) {
        return await this.repository.handOverByForeignIdQuery(foreignId, userId);
    }
    async applyUpdates(profile, labels, assignTo) {
        try {
            const updates = {};
            if (labels.length > 0) {
                let userLabels = profile.labels ? profile.labels : [];
                userLabels = [...new Set(userLabels.concat(labels))];
                updates.labels = userLabels;
            }
            if (assignTo) {
                updates.assignedTo = assignTo;
            }
            const updated = await this.updateOne(profile.id, updates);
            this.logger.debug('Block updates has been applied!', updates);
            return updated;
        }
        catch (err) {
            this.logger.error('Unable to perform block updates!', err);
            throw err;
        }
    }
    async handleLastVisit(subscriber) {
        if (subscriber.lastvisit) {
            try {
                const user = await this.updateOne(subscriber.id, {
                    retainedFrom: +new Date() - +subscriber.lastvisit >
                        config_1.config.analytics.thresholds.retentionReset
                        ? new Date()
                        : subscriber.retainedFrom,
                    lastvisit: new Date(),
                });
                this.logger.debug('lastVisit Hook : user retainedFrom/lastvisit updated !', JSON.stringify(user));
            }
            catch (err) {
                this.logger.error(err);
            }
        }
    }
    async handleLabelDelete(labels) {
        const subscribers = await this.find({
            labels: { $in: labels.map((l) => l.id) },
        });
        for (const subscriber of subscribers) {
            const updatedLabels = subscriber.labels.filter((label) => !labels.find((l) => l.id === label));
            await this.updateOne(subscriber.id, { labels: updatedLabels });
        }
    }
};
exports.SubscriberService = SubscriberService;
__decorate([
    (0, socket_method_decorator_1.SocketGet)('/subscriber/subscribe/'),
    (0, socket_method_decorator_1.SocketPost)('/subscriber/subscribe/'),
    __param(0, (0, socket_req_decorator_1.SocketReq)()),
    __param(1, (0, socket_res_decorator_1.SocketRes)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_request_1.SocketRequest, socket_response_1.SocketResponse]),
    __metadata("design:returntype", void 0)
], SubscriberService.prototype, "subscribe", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:user:lastvisit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscriber_schema_1.Subscriber]),
    __metadata("design:returntype", Promise)
], SubscriberService.prototype, "handleLastVisit", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:label:delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SubscriberService.prototype, "handleLabelDelete", null);
exports.SubscriberService = SubscriberService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [subscriber_repository_1.SubscriberRepository,
        attachment_service_1.AttachmentService,
        websocket_gateway_1.WebsocketGateway])
], SubscriberService);
//# sourceMappingURL=subscriber.service.js.map