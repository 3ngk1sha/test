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
exports.SettingSeeder = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const cache_1 = require("../../utils/constants/cache");
const base_seeder_1 = require("../../utils/generics/base-seeder");
const setting_repository_1 = require("../repositories/setting.repository");
let SettingSeeder = class SettingSeeder extends base_seeder_1.BaseSeeder {
    constructor(settingRepository, cacheManager) {
        super(settingRepository);
        this.settingRepository = settingRepository;
        this.cacheManager = cacheManager;
    }
    async seed(models) {
        const grouppedModels = models.reduce((acc, model) => {
            if (!acc[model.group])
                acc[model.group] = [model];
            else
                acc[model.group].push(model);
            return acc;
        }, {});
        Object.entries(grouppedModels).forEach(async ([group, models]) => {
            if ((await this.repository.count({ group })) === 0)
                await this.repository.createMany(models);
        });
        await this.cacheManager.del(cache_1.SETTING_CACHE_KEY);
        return true;
    }
};
exports.SettingSeeder = SettingSeeder;
exports.SettingSeeder = SettingSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [setting_repository_1.SettingRepository, Object])
], SettingSeeder);
//# sourceMappingURL=setting.seed.js.map