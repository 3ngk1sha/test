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
exports.AttachmentService = void 0;
const common_1 = require("@nestjs/common");
const helper_service_1 = require("../../helper/helper.service");
const types_1 = require("../../helper/types");
const base_service_1 = require("../../utils/generics/base-service");
const attachment_repository_1 = require("../repositories/attachment.repository");
let AttachmentService = class AttachmentService extends base_service_1.BaseService {
    constructor(repository, helperService) {
        super(repository);
        this.repository = repository;
        this.helperService = helperService;
    }
    async store(file, metadata) {
        const storageHelper = await this.helperService.getDefaultHelper(types_1.HelperType.STORAGE);
        const dto = await storageHelper.store(file, metadata);
        return await this.create(dto);
    }
    async download(attachment) {
        const storageHelper = await this.helperService.getDefaultHelper(types_1.HelperType.STORAGE);
        return await storageHelper.download(attachment);
    }
    async readAsBuffer(attachment) {
        const storageHelper = await this.helperService.getDefaultHelper(types_1.HelperType.STORAGE);
        return await storageHelper.readAsBuffer(attachment);
    }
    async readAsStream(attachment) {
        const storageHelper = await this.helperService.getDefaultHelper(types_1.HelperType.STORAGE);
        return await storageHelper.readAsStream(attachment);
    }
};
exports.AttachmentService = AttachmentService;
exports.AttachmentService = AttachmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [attachment_repository_1.AttachmentRepository,
        helper_service_1.HelperService])
], AttachmentService);
//# sourceMappingURL=attachment.service.js.map