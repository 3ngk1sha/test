"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const config_1 = require("../../config");
let I18nService = class I18nService extends nestjs_i18n_1.I18nService {
    constructor() {
        super(...arguments);
        this.dynamicTranslations = {};
    }
    t(key, options) {
        options = {
            ...options,
            lang: options?.lang || this.i18nOptions.fallbackLanguage,
            defaultValue: options?.defaultValue || key,
        };
        let { lang } = options;
        lang = this.resolveLanguage(lang);
        if (lang in this.dynamicTranslations) {
            if (key in this.dynamicTranslations[lang]) {
                if (this.dynamicTranslations[lang][key]) {
                    return this.dynamicTranslations[lang][key];
                }
                return options.defaultValue;
            }
        }
        key = `${config_1.config.i18n.translationFilename}.${key}`;
        return super.t(key, options);
    }
    refreshDynamicTranslations(translations) {
        this.dynamicTranslations = translations.reduce((acc, curr) => {
            const { str, translations } = curr;
            Object.entries(translations).forEach(([lang, t]) => {
                acc[lang] = acc[lang] || {};
                acc[lang][str] = t;
            });
            return acc;
        }, this.dynamicTranslations);
    }
};
exports.I18nService = I18nService;
exports.I18nService = I18nService = __decorate([
    (0, common_1.Injectable)()
], I18nService);
//# sourceMappingURL=i18n.service.js.map