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
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const logger_service_1 = require("../../logger/logger.service");
class BaseService {
    constructor(repository) {
        this.repository = repository;
        this.eventEmitter = repository.eventEmitter;
    }
    getRepository() {
        return this.repository;
    }
    canPopulate(populate) {
        return this.repository.canPopulate(populate);
    }
    async findOne(criteria, options, projection) {
        return await this.repository.findOne(criteria, options, projection);
    }
    async findOneAndPopulate(criteria, projection) {
        return await this.repository.findOneAndPopulate(criteria, projection);
    }
    async find(filter, pageQuery, projection) {
        if (Array.isArray(pageQuery))
            return await this.repository.find(filter, pageQuery, projection);
        return await this.repository.find(filter, pageQuery, projection);
    }
    async findAndPopulate(filters, pageQuery, projection) {
        if (Array.isArray(pageQuery))
            return await this.repository.findAndPopulate(filters, pageQuery, projection);
        return await this.repository.findAndPopulate(filters, pageQuery, projection);
    }
    async findAll(sort) {
        return await this.repository.findAll(sort);
    }
    async findAllAndPopulate(sort) {
        return await this.repository.findAllAndPopulate(sort);
    }
    async findPage(filters, pageQueryDto) {
        return await this.repository.findPage(filters, pageQueryDto);
    }
    async findPageAndPopulate(filters, pageQueryDto) {
        return await this.repository.findPageAndPopulate(filters, pageQueryDto);
    }
    async countAll() {
        return await this.repository.countAll();
    }
    async count(criteria) {
        return await this.repository.count(criteria);
    }
    async create(dto) {
        try {
            return await this.repository.create(dto);
        }
        catch (error) {
            if (error instanceof mongodb_1.MongoError && error.code === 11000) {
                throw new common_1.ConflictException('Duplicate key error: element already exists');
            }
            throw error;
        }
    }
    async findOneOrCreate(criteria, dto) {
        const result = await this.findOne(criteria);
        if (!result) {
            return await this.create(dto);
        }
        return result;
    }
    async createMany(dtoArray) {
        return await this.repository.createMany(dtoArray);
    }
    async updateOne(criteria, dto, options) {
        return await this.repository.updateOne(criteria, dto, options);
    }
    async updateMany(filter, dto) {
        return await this.repository.updateMany(filter, dto);
    }
    async deleteOne(criteria) {
        return await this.repository.deleteOne(criteria);
    }
    async deleteMany(filter) {
        return await this.repository.deleteMany(filter);
    }
}
exports.BaseService = BaseService;
__decorate([
    (0, common_1.Inject)(logger_service_1.LoggerService),
    __metadata("design:type", logger_service_1.LoggerService)
], BaseService.prototype, "logger", void 0);
//# sourceMappingURL=base-service.js.map