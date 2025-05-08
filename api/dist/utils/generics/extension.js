"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const nestjs_i18n_1 = require("nestjs-i18n");
class Extension {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getNamespace() {
        return this.name.replaceAll('-', '_');
    }
    async onModuleInit() {
        const i18nPath = path_1.default.join(this.getPath(), 'i18n');
        try {
            await fs_1.promises.access(i18nPath);
            const i18nLoader = new nestjs_i18n_1.I18nJsonLoader({ path: i18nPath });
            this.translations = await i18nLoader.load();
        }
        catch (error) {
        }
    }
    getTranslations() {
        return this.translations;
    }
}
exports.Extension = Extension;
//# sourceMappingURL=extension.js.map