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
exports.SettingController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const setting_service_1 = require("../services/setting.service");
let SettingController = class SettingController extends base_controller_1.BaseController {
    constructor(settingService) {
        super(settingService);
        this.settingService = settingService;
    }
    async find(filters, pageQuery) {
        return await this.settingService.find(filters, pageQuery);
    }
    async updateOne(id, settingUpdateDto) {
        return await this.settingService.updateOne(id, settingUpdateDto);
    }
};
exports.SettingController = SettingController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({
        allowedFields: ['group'],
    }))),
    __param(1, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "find", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateOne", null);
exports.SettingController = SettingController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('setting'),
    __metadata("design:paramtypes", [setting_service_1.SettingService])
], SettingController);
//# sourceMappingURL=setting.controller.js.map