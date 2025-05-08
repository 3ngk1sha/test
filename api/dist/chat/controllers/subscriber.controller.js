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
exports.SubscriberController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const attachment_service_1 = require("../../attachment/services/attachment.service");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const avatar_1 = require("../../utils/helpers/avatar");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const populate_pipe_1 = require("../../utils/pipes/populate.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const subscriber_dto_1 = require("../dto/subscriber.dto");
const subscriber_service_1 = require("../services/subscriber.service");
let SubscriberController = class SubscriberController extends base_controller_1.BaseController {
    constructor(subscriberService, attachmentService) {
        super(subscriberService);
        this.subscriberService = subscriberService;
        this.attachmentService = attachmentService;
    }
    async findPage(pageQuery, populate, filters) {
        return this.canPopulate(populate)
            ? await this.subscriberService.findAndPopulate(filters, pageQuery)
            : await this.subscriberService.find(filters, pageQuery);
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id, populate) {
        const doc = this.canPopulate(populate)
            ? await this.subscriberService.findOneAndPopulate(id)
            : await this.subscriberService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find Subscriber by id ${id}`);
            throw new common_1.NotFoundException(`Subscriber with ID ${id} not found`);
        }
        return doc;
    }
    async getAvatar(id) {
        const subscriber = await this.subscriberService.findOneAndPopulate(id);
        if (!subscriber) {
            throw new common_1.NotFoundException(`Subscriber with ID ${id} not found`);
        }
        try {
            if (!subscriber.avatar) {
                throw new Error('User has no avatar');
            }
            return await this.attachmentService.download(subscriber.avatar);
        }
        catch (err) {
            this.logger.verbose('Subscriber has no avatar, generating initials avatar ...', err);
            return await (0, avatar_1.generateInitialsAvatar)(subscriber);
        }
    }
    async updateOne(id, subscriberUpdate) {
        return await this.subscriberService.updateOne(id, subscriberUpdate);
    }
};
exports.SubscriberController = SubscriberController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __param(2, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: [
            'first_name',
            'last_name',
            'assignedTo',
            'labels',
            'channel.name',
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], SubscriberController.prototype, "findPage", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: [
            'first_name',
            'last_name',
            'assignedTo',
            'labels',
            'channel.name',
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriberController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], SubscriberController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/profile_pic'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriberController.prototype, "getAvatar", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subscriber_dto_1.SubscriberUpdateDto]),
    __metadata("design:returntype", Promise)
], SubscriberController.prototype, "updateOne", null);
exports.SubscriberController = SubscriberController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('subscriber'),
    __metadata("design:paramtypes", [subscriber_service_1.SubscriberService,
        attachment_service_1.AttachmentService])
], SubscriberController);
//# sourceMappingURL=subscriber.controller.js.map