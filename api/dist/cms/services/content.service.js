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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const papaparse_1 = __importDefault(require("papaparse"));
const base_service_1 = require("../../utils/generics/base-service");
const content_repository_1 = require("../repositories/content.repository");
const content_schema_1 = require("../schemas/content.schema");
let ContentService = class ContentService extends base_service_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async textSearch(query) {
        return await this.repository.textSearch(query);
    }
    async getContent(options, skip) {
        let query = { status: true };
        const limit = options.limit;
        if (options.query) {
            query = { ...query, ...options.query };
        }
        if (typeof options.entity === 'string') {
            query = { ...query, entity: options.entity };
        }
        try {
            const total = await this.count(query);
            if (total === 0) {
                this.logger.warn('No content found', query);
                throw new Error('No content found');
            }
            try {
                const contents = await this.find(query, {
                    skip,
                    limit,
                    sort: ['createdAt', 'desc'],
                });
                const elements = contents.map(content_schema_1.Content.toElement);
                return {
                    elements,
                    pagination: {
                        total,
                        skip,
                        limit,
                    },
                };
            }
            catch (err) {
                this.logger.error('Unable to retrieve content', err, query);
                throw err;
            }
        }
        catch (err) {
            this.logger.error('Unable to count content', err, query);
            throw err;
        }
    }
    async parseAndSaveDataset(data, targetContentType, contentType) {
        const result = papaparse_1.default.parse(data, {
            header: true,
            skipEmptyLines: true,
        });
        if (result.errors && result.errors.length > 0) {
            this.logger.warn(`Errors parsing the file: ${JSON.stringify(result.errors)}`);
            throw new common_1.BadRequestException(result.errors, {
                cause: result.errors,
                description: 'Error while parsing CSV',
            });
        }
        if (!result.data.every((row) => row.title && row.status)) {
            throw new common_1.BadRequestException('Missing required fields: "title" or "status"', {
                cause: 'Invalid CSV data',
                description: 'CSV must include "title" and "status" columns',
            });
        }
        const contentsDto = result.data.reduce((acc, { title, status, ...rest }) => [
            ...acc,
            {
                title: String(title),
                status: status.trim().toLowerCase() === 'true',
                entity: targetContentType,
                dynamicFields: Object.keys(rest)
                    .filter((key) => contentType.fields?.map((field) => field.name).includes(key))
                    .reduce((filtered, key) => ({ ...filtered, [key]: rest[key] }), {}),
            },
        ], []);
        this.logger.log(`Parsed ${result.data.length} rows from CSV.`);
        try {
            return await this.createMany(contentsDto);
        }
        catch (err) {
            this.logger.error('Error occurred when extracting data. ', err);
        }
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [content_repository_1.ContentRepository])
], ContentService);
//# sourceMappingURL=content.service.js.map