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
exports.NlpService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const helper_service_1 = require("../../helper/helper.service");
const logger_service_1 = require("../../logger/logger.service");
const nlp_entity_schema_1 = require("../schemas/nlp-entity.schema");
const nlp_value_schema_1 = require("../schemas/nlp-value.schema");
const nlp_entity_service_1 = require("./nlp-entity.service");
const nlp_sample_service_1 = require("./nlp-sample.service");
const nlp_value_service_1 = require("./nlp-value.service");
let NlpService = class NlpService {
    constructor(logger, nlpSampleService, nlpEntityService, nlpValueService, helperService) {
        this.logger = logger;
        this.nlpSampleService = nlpSampleService;
        this.nlpEntityService = nlpEntityService;
        this.nlpValueService = nlpValueService;
        this.helperService = helperService;
    }
    async handleEntityCreate(entity) {
        try {
            const helper = await this.helperService.getDefaultNluHelper();
            const foreignId = await helper.addEntity(entity);
            this.logger.debug('New entity successfully synced!', foreignId);
            return await this.nlpEntityService.updateOne({ _id: entity._id }, {
                foreign_id: foreignId,
            });
        }
        catch (err) {
            this.logger.error('Unable to sync a new entity', err);
            return entity;
        }
    }
    async handleEntityUpdate(entity) {
        try {
            const helper = await this.helperService.getDefaultNluHelper();
            await helper.updateEntity(entity);
            this.logger.debug('Updated entity successfully synced!', entity);
        }
        catch (err) {
            this.logger.error('Unable to sync updated entity', err);
        }
    }
    async handleEntityDelete(entity) {
        try {
            if (entity.foreign_id) {
                const helper = await this.helperService.getDefaultNluHelper();
                await helper.deleteEntity(entity.foreign_id);
                this.logger.debug('Deleted entity successfully synced!', entity);
            }
            else {
                this.logger.error(`Entity ${entity} is missing foreign_id`);
                throw new common_1.NotFoundException(`Entity ${entity} is missing foreign_id`);
            }
        }
        catch (err) {
            this.logger.error('Unable to sync deleted entity', err);
        }
    }
    async handleValueCreate(value) {
        try {
            const helper = await this.helperService.getDefaultNluHelper();
            const foreignId = await helper.addValue(value);
            this.logger.debug('New value successfully synced!', foreignId);
            return await this.nlpValueService.updateOne({ _id: value._id }, {
                foreign_id: foreignId,
            });
        }
        catch (err) {
            this.logger.error('Unable to sync a new value', err);
            return value;
        }
    }
    async handleValueUpdate(value) {
        try {
            const helper = await this.helperService.getDefaultNluHelper();
            await helper.updateValue(value);
            this.logger.debug('Updated value successfully synced!', value);
        }
        catch (err) {
            this.logger.error('Unable to sync updated value', err);
        }
    }
    async handleValueDelete(value) {
        try {
            const helper = await this.helperService.getDefaultNluHelper();
            const populatedValue = await this.nlpValueService.findOneAndPopulate(value.id);
            if (populatedValue) {
                await helper.deleteValue(populatedValue);
                this.logger.debug('Deleted value successfully synced!', value);
            }
        }
        catch (err) {
            this.logger.error('Unable to sync deleted value', err);
        }
    }
};
exports.NlpService = NlpService;
__decorate([
    (0, event_emitter_1.OnEvent)('hook:nlpEntity:create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NlpService.prototype, "handleEntityCreate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:nlpEntity:update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nlp_entity_schema_1.NlpEntity]),
    __metadata("design:returntype", Promise)
], NlpService.prototype, "handleEntityUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:nlpEntity:delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nlp_entity_schema_1.NlpEntity]),
    __metadata("design:returntype", Promise)
], NlpService.prototype, "handleEntityDelete", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:nlpValue:create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NlpService.prototype, "handleValueCreate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:nlpValue:update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nlp_value_schema_1.NlpValue]),
    __metadata("design:returntype", Promise)
], NlpService.prototype, "handleValueUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('hook:nlpValue:delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nlp_value_schema_1.NlpValue]),
    __metadata("design:returntype", Promise)
], NlpService.prototype, "handleValueDelete", null);
exports.NlpService = NlpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        nlp_sample_service_1.NlpSampleService,
        nlp_entity_service_1.NlpEntityService,
        nlp_value_service_1.NlpValueService,
        helper_service_1.HelperService])
], NlpService);
//# sourceMappingURL=nlp.service.js.map