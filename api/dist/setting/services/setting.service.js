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
exports.SettingService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const config_1 = require("../../config");
const cache_1 = require("../../utils/constants/cache");
const cacheable_decorator_1 = require("../../utils/decorators/cacheable.decorator");
const base_service_1 = require("../../utils/generics/base-service");
const setting_repository_1 = require("../repositories/setting.repository");
const setting_seed_1 = require("../seeds/setting.seed");
let SettingService = class SettingService extends base_service_1.BaseService {
    constructor(repository, cacheManager, seeder) {
        super(repository);
        this.repository = repository;
        this.cacheManager = cacheManager;
        this.seeder = seeder;
    }
    async seedIfNotExist(group, data) {
        const count = await this.count({ group });
        if (count === 0) {
            await this.seeder.seed(data);
        }
    }
    async load() {
        const settings = await this.findAll(['weight', 'asc']);
        return this.group(settings);
    }
    buildTree(settings) {
        return settings.reduce((acc, s) => {
            const groupKey = s.group || 'undefinedGroup';
            acc[groupKey] = acc[groupKey] || {};
            acc[groupKey][s.label] = s.value;
            return acc;
        }, {});
    }
    group(settings) {
        return (settings?.reduce((acc, curr) => {
            const group = acc[curr.group] || [];
            group.push(curr);
            acc[curr.group] = group;
            return acc;
        }, {}) || {});
    }
    getConfig() {
        return config_1.config;
    }
    async clearCache() {
        this.cacheManager.del(cache_1.SETTING_CACHE_KEY);
        this.cacheManager.del(cache_1.ALLOWED_ORIGINS_CACHE_KEY);
    }
    async handleSettingUpdateEvent() {
        this.clearCache();
    }
    async getAllowedOrigins() {
        const settings = (await this.find({
            label: 'allowed_domains',
        }));
        const allowedDomains = settings.flatMap((setting) => setting.value.split(',').filter((o) => !!o));
        const uniqueOrigins = new Set([
            ...config_1.config.security.cors.allowOrigins,
            ...config_1.config.sockets.onlyAllowOrigins,
            ...allowedDomains,
        ]);
        return Array.from(uniqueOrigins);
    }
    async getSettings() {
        const settings = await this.findAll();
        return this.buildTree(settings);
    }
};
exports.SettingService = SettingService;
__decorate([
    (0, event_emitter_1.OnEvent)('hook:setting:*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingService.prototype, "handleSettingUpdateEvent", null);
__decorate([
    (0, cacheable_decorator_1.Cacheable)(cache_1.ALLOWED_ORIGINS_CACHE_KEY),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingService.prototype, "getAllowedOrigins", null);
__decorate([
    (0, cacheable_decorator_1.Cacheable)(cache_1.SETTING_CACHE_KEY),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingService.prototype, "getSettings", null);
exports.SettingService = SettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [setting_repository_1.SettingRepository, Object, setting_seed_1.SettingSeeder])
], SettingService);
//# sourceMappingURL=setting.service.js.map