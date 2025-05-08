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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const menu_dto_1 = require("../dto/menu.dto");
const menu_service_1 = require("../services/menu.service");
let MenuController = class MenuController extends base_controller_1.BaseController {
    constructor(menuService) {
        super(menuService);
        this.menuService = menuService;
    }
    async filterCount(filters) {
        return await this.count(filters);
    }
    async findPage(pageQuery, filters) {
        return await this.menuService.find(filters, pageQuery);
    }
    async create(body) {
        this.validate({
            dto: body,
            allowedIds: {
                parent: body?.parent
                    ? (await this.menuService.findOne(body.parent))?.id
                    : undefined,
            },
        });
        return await this.menuService.create(body);
    }
    async findAll(query) {
        if (!query)
            return await this.menuService.findAll();
        return await this.menuService.find(query);
    }
    async getTree() {
        return await this.menuService.getTree();
    }
    async findOne(id) {
        try {
            const result = await this.menuService.findOne(id);
            if (!result) {
                this.logger.warn(`Unable to find menu with id: ${id}`);
                throw new common_1.NotFoundException(`Menu with id: ${id} not found`);
            }
            return result;
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateOne(body, id) {
        if (!id)
            return await this.create(body);
        return await this.menuService.updateOne(id, body);
    }
    async delete(id) {
        try {
            const deletedCount = await this.menuService.deepDelete(id);
            if (deletedCount == 0) {
                this.logger.warn(`Unable to delete menu with id: ${id}`);
                throw new common_1.NotFoundException();
            }
            return '';
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['parent'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "filterCount", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __param(1, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['parent'] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findPage", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.MenuCreateDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.MenuQueryDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('tree'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getTree", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.MenuCreateDto, String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "updateOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "delete", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map