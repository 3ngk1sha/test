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
exports.MenuService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_1 = require("../../utils/constants/cache");
const cacheable_decorator_1 = require("../../utils/decorators/cacheable.decorator");
const base_service_1 = require("../../utils/generics/base-service");
const menu_repository_1 = require("../repositories/menu.repository");
const menu_1 = require("../schemas/types/menu");
let MenuService = class MenuService extends base_service_1.BaseService {
    constructor(repository, cacheManager) {
        super(repository);
        this.repository = repository;
        this.cacheManager = cacheManager;
        this.RootSymbol = Symbol('RootMenu');
    }
    async create(dto) {
        if (dto.parent) {
            const parent = await this.findOne(dto.parent);
            if (!parent)
                throw new common_1.NotFoundException('The parent of this object does not exist');
            if (parent.type !== menu_1.MenuType.nested)
                throw new common_1.ConflictException("Cant't nest non nested menu");
        }
        return super.create(dto);
    }
    async deepDelete(id) {
        const node = await this.findOne(id);
        if (node) {
            const children = await this.find({ parent: node.id });
            const count = (await Promise.all(children.map((child) => this.deepDelete(child.id)))).reduce((prev, curr) => prev + curr, 1);
            await this.deleteOne(id);
            return count;
        }
        else
            return 0;
    }
    groupByParents(menuItems) {
        const parents = new Map();
        parents.set(this.RootSymbol, []);
        menuItems.forEach((menuItem) => {
            const menuParent = menuItem.parent?.toString();
            if (!menuItem.parent) {
                parents.get(this.RootSymbol).push(menuItem);
                return;
            }
            if (menuParent) {
                if (parents.has(menuParent)) {
                    parents.get(menuParent).push(menuItem);
                    return;
                }
                parents.set(menuParent, [menuItem]);
            }
        });
        return parents;
    }
    buildTree(parents, parent = this.RootSymbol) {
        const item = parents.get(parent);
        if (!item) {
            return [];
        }
        const children = item.map((menu) => {
            return {
                ...menu,
                call_to_actions: menu.type === menu_1.MenuType.nested
                    ? this.buildTree(parents, menu.id) || []
                    : undefined,
            };
        });
        return children;
    }
    async handleMenuUpdateEvent() {
        await this.cacheManager.del(cache_1.MENU_CACHE_KEY);
    }
    async getTree() {
        const menuItems = (await this.findAll());
        const parents = this.groupByParents(menuItems);
        return this.buildTree(parents);
    }
};
exports.MenuService = MenuService;
__decorate([
    (0, event_emitter_1.OnEvent)('hook:menu:*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuService.prototype, "handleMenuUpdateEvent", null);
__decorate([
    (0, cacheable_decorator_1.Cacheable)(cache_1.MENU_CACHE_KEY),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuService.prototype, "getTree", null);
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [menu_repository_1.MenuRepository, Object])
], MenuService);
//# sourceMappingURL=menu.service.js.map