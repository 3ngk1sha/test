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
exports.HelperService = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../logger/logger.service");
const setting_service_1 = require("../setting/services/setting.service");
const types_1 = require("./types");
let HelperService = class HelperService {
    constructor(settingService, logger) {
        this.settingService = settingService;
        this.logger = logger;
        this.registry = new Map();
        Object.values(types_1.HelperType).forEach((type) => {
            this.registry.set(type, new Map());
        });
    }
    register(helper) {
        const helpers = this.registry.get(helper.getType());
        if (helpers.has(helper.getName())) {
            throw new common_1.InternalServerErrorException(`Helper with Name ${helper.getName()} and Type ${helper.getType()} already exist`);
        }
        helpers.set(helper.getName(), helper);
        this.logger.log(`Helper "${helper.getName()}" has been registered!`);
    }
    get(type, name) {
        const helpers = this.registry.get(type);
        if (!helpers.has(name)) {
            throw new Error('Uknown type of helpers');
        }
        return helpers.get(name);
    }
    getAllByType(type) {
        const helpers = this.registry.get(type);
        return Array.from(helpers.values());
    }
    getAll() {
        return Array.from(this.registry.values())
            .flatMap((innerMap) => Array.from(innerMap.values()));
    }
    use(type, cls) {
        const helpers = this.getAllByType(type);
        const helper = helpers.find((h) => h instanceof cls);
        if (!helper) {
            throw new Error(`Unable to find the requested helper`);
        }
        return helper;
    }
    async getDefaultNluHelper() {
        const settings = await this.settingService.getSettings();
        const defaultHelper = this.get(types_1.HelperType.NLU, settings.chatbot_settings.default_nlu_helper);
        if (!defaultHelper) {
            throw new Error(`Unable to find default NLU helper`);
        }
        return defaultHelper;
    }
    async getDefaultLlmHelper() {
        const settings = await this.settingService.getSettings();
        const defaultHelper = this.get(types_1.HelperType.LLM, settings.chatbot_settings.default_llm_helper);
        if (!defaultHelper) {
            throw new Error(`Unable to find default LLM helper`);
        }
        return defaultHelper;
    }
    async getDefaultHelper(type) {
        if (type === types_1.HelperType.UTIL) {
            throw new Error(`Default helpers are not available for type: ${types_1.HelperType.UTIL}`);
        }
        const settings = await this.settingService.getSettings();
        const defaultHelperName = settings.chatbot_settings[`default_${type}_helper`];
        const defaultHelper = this.get(type, defaultHelperName);
        if (!defaultHelper) {
            throw new Error(`Unable to find default ${type.toUpperCase()} helper`);
        }
        return defaultHelper;
    }
};
exports.HelperService = HelperService;
exports.HelperService = HelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [setting_service_1.SettingService,
        logger_service_1.LoggerService])
], HelperService);
//# sourceMappingURL=helper.service.js.map