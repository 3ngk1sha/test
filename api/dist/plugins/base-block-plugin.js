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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseBlockPlugin = void 0;
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const base_plugin_service_1 = require("./base-plugin.service");
const plugins_service_1 = require("./plugins.service");
const types_1 = require("./types");
let BaseBlockPlugin = class BaseBlockPlugin extends base_plugin_service_1.BasePlugin {
    constructor(name, pluginService) {
        super(name, pluginService);
        this.type = types_1.PluginType.block;
        this.settings = require(path_1.default.join(this.getPath(), 'settings')).default;
    }
    getDefaultSettings() {
        return this.settings;
    }
    getArguments(block) {
        if ('args' in block.message) {
            return (Object.entries(block.message.args)
                .filter(([argKey]) => this.settings.findIndex(({ label }) => label === argKey) !== -1)
                .reduce((acc, [k, v]) => ({
                ...acc,
                [k]: v,
            }), {}));
        }
        throw new Error(`Block ${block.name} does not have any arguments.`);
    }
};
exports.BaseBlockPlugin = BaseBlockPlugin;
exports.BaseBlockPlugin = BaseBlockPlugin = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, plugins_service_1.PluginService])
], BaseBlockPlugin);
//# sourceMappingURL=base-block-plugin.js.map