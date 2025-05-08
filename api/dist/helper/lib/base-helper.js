"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const extension_1 = require("../../utils/generics/extension");
class BaseHelper extends extension_1.Extension {
    constructor(name, settingService, helperService, logger) {
        super(name);
        this.settingService = settingService;
        this.helperService = helperService;
        this.logger = logger;
        this.settings = [];
        this.settings = require(path_1.default.join(this.getPath(), 'settings')).default;
    }
    async onModuleInit() {
        await super.onModuleInit();
        this.helperService.register(this);
        this.setup();
    }
    async setup() {
        await this.settingService.seedIfNotExist(this.getName(), this.settings.map((s, i) => ({
            ...s,
            weight: i + 1,
        })));
    }
    getType() {
        return this.type;
    }
    async getSettings() {
        const settings = await this.settingService.getSettings();
        return settings[this.getNamespace()];
    }
}
exports.default = BaseHelper;
//# sourceMappingURL=base-helper.js.map