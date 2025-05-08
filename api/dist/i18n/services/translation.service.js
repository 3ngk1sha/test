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
exports.TranslationService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const i18n_service_1 = require("./i18n.service");
const plugins_service_1 = require("../../plugins/plugins.service");
const types_1 = require("../../plugins/types");
const types_2 = require("../../setting/schemas/types");
const setting_service_1 = require("../../setting/services/setting.service");
const base_service_1 = require("../../utils/generics/base-service");
const block_service_1 = require("../../chat/services/block.service");
const translation_repository_1 = require("../repositories/translation.repository");
let TranslationService = class TranslationService extends base_service_1.BaseService {
    constructor(repository, blockService, settingService, pluginService, i18n) {
        super(repository);
        this.repository = repository;
        this.blockService = blockService;
        this.settingService = settingService;
        this.pluginService = pluginService;
        this.i18n = i18n;
        this.resetI18nTranslations();
    }
    async resetI18nTranslations() {
        const translations = await this.findAll();
        this.i18n.refreshDynamicTranslations(translations);
    }
    async getBlockStrings(block) {
        let strings = [];
        if (Array.isArray(block.message)) {
            strings = strings.concat(block.message);
        }
        else if (typeof block.message === 'object') {
            if ('plugin' in block.message) {
                const plugin = this.pluginService.getPlugin(types_1.PluginType.block, block.message.plugin);
                const defaultSettings = (await plugin?.getDefaultSettings()) || [];
                const filteredSettings = defaultSettings.filter(({ translatable, type }) => [
                    types_2.SettingType.text,
                    types_2.SettingType.textarea,
                    types_2.SettingType.multiple_text,
                ].includes(type) &&
                    (translatable === undefined || translatable === true));
                const settingTypeMap = new Map(filteredSettings.map((setting) => [setting.label, setting.type]));
                for (const [key, value] of Object.entries(block.message.args)) {
                    const settingType = settingTypeMap.get(key);
                    switch (settingType) {
                        case types_2.SettingType.multiple_text:
                            strings = strings.concat(value);
                            break;
                        case types_2.SettingType.text:
                        case types_2.SettingType.textarea:
                            strings.push(value);
                            break;
                        default:
                            break;
                    }
                }
            }
            else if ('text' in block.message && Array.isArray(block.message.text)) {
                strings = strings.concat(block.message.text);
            }
            else if ('text' in block.message &&
                typeof block.message.text === 'string') {
                strings.push(block.message.text);
            }
            if ('quickReplies' in block.message &&
                Array.isArray(block.message.quickReplies) &&
                block.message.quickReplies.length > 0) {
                strings = strings.concat(block.message.quickReplies.map((qr) => qr.title));
            }
            else if ('buttons' in block.message &&
                Array.isArray(block.message.buttons) &&
                block.message.buttons.length > 0) {
                strings = strings.concat(block.message.buttons.map((btn) => btn.title));
            }
        }
        if (block.options &&
            'fallback' in block.options &&
            block.options.fallback &&
            'message' in block.options.fallback &&
            Array.isArray(block.options.fallback.message)) {
            strings = strings.concat(block.options.fallback.message);
        }
        return strings;
    }
    async getAllBlockStrings() {
        const blocks = await this.blockService.find({});
        if (blocks.length === 0) {
            return [];
        }
        const allStrings = [];
        for (const block of blocks) {
            const strings = await this.getBlockStrings(block);
            allStrings.push(...strings);
        }
        return allStrings;
    }
    async getSettingStrings() {
        const translatableSettings = await this.settingService.find({
            translatable: true,
        });
        const settings = await this.settingService.getSettings();
        return Object.values(settings)
            .map((group) => Object.entries(group))
            .flat()
            .filter(([l]) => {
            return translatableSettings.find(({ label }) => label === l);
        })
            .map(([, v]) => v)
            .flat();
    }
    handleTranslationsUpdate() {
        this.resetI18nTranslations();
    }
};
exports.TranslationService = TranslationService;
__decorate([
    (0, event_emitter_1.OnEvent)('hook:translation:*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TranslationService.prototype, "handleTranslationsUpdate", null);
exports.TranslationService = TranslationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [translation_repository_1.TranslationRepository,
        block_service_1.BlockService,
        setting_service_1.SettingService,
        plugins_service_1.PluginService,
        i18n_service_1.I18nService])
], TranslationService);
//# sourceMappingURL=translation.service.js.map