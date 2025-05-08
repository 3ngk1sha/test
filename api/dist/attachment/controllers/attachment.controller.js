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
exports.AttachmentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const multer_1 = require("multer");
const config_1 = require("../../config");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const roles_decorator_1 = require("../../utils/decorators/roles.decorator");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const attachment_dto_1 = require("../dto/attachment.dto");
const attachment_ability_guard_1 = require("../guards/attachment-ability.guard");
const attachment_service_1 = require("../services/attachment.service");
const types_1 = require("../types");
let AttachmentController = class AttachmentController extends base_controller_1.BaseController {
    constructor(attachmentService) {
        super(attachmentService);
        this.attachmentService = attachmentService;
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findOne(id) {
        const doc = await this.attachmentService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find Attachment by id ${id}`);
            throw new common_1.NotFoundException(`Attachment with ID ${id} not found`);
        }
        return doc;
    }
    async findPage(pageQuery, filters) {
        return await this.attachmentService.find(filters, pageQuery);
    }
    async uploadFile(files, req, { resourceRef, access = types_1.AttachmentAccess.Public, }) {
        if (!files || !Array.isArray(files?.file) || files.file.length === 0) {
            throw new common_1.BadRequestException('No file was selected');
        }
        const userId = req.session?.passport?.user?.id;
        if (!userId) {
            throw new common_1.ForbiddenException('Unexpected Error: Only authenticated users are allowed to upload');
        }
        const attachments = [];
        for (const file of files.file) {
            const attachment = await this.attachmentService.store(file, {
                name: file.originalname,
                size: file.size,
                type: file.mimetype,
                resourceRef,
                access,
                createdBy: userId,
                createdByRef: types_1.AttachmentCreatedByRef.User,
            });
            if (attachment) {
                attachments.push(attachment);
            }
        }
        return attachments;
    }
    async download(params) {
        const attachment = await this.attachmentService.findOne(params.id);
        if (!attachment) {
            throw new common_1.NotFoundException('Attachment not found');
        }
        return await this.attachmentService.download(attachment);
    }
    async deleteOne(id) {
        const result = await this.attachmentService.deleteOne(id);
        if (result.deletedCount === 0) {
            this.logger.warn(`Unable to delete attachment by id ${id}`);
            throw new common_1.NotFoundException(`Attachment with ID ${id} not found`);
        }
        return result;
    }
};
exports.AttachmentController = AttachmentController;
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['name', 'type', 'resourceRef'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['name', 'type', 'resourceRef'],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "findPage", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'file' }], {
        limits: {
            fileSize: config_1.config.parameters.maxUploadSize,
        },
        storage: (() => {
            if (config_1.config.parameters.storageMode === 'memory') {
                return (0, multer_1.memoryStorage)();
            }
            else {
                return (0, multer_1.diskStorage)({});
            }
        })(),
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, attachment_dto_1.AttachmentContextParamDto]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "uploadFile", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)('download/:id/:filename?'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attachment_dto_1.AttachmentDownloadDto]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "download", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttachmentController.prototype, "deleteOne", null);
exports.AttachmentController = AttachmentController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('attachment'),
    (0, common_1.UseGuards)(attachment_ability_guard_1.AttachmentGuard),
    __metadata("design:paramtypes", [attachment_service_1.AttachmentService])
], AttachmentController);
//# sourceMappingURL=attachment.controller.js.map