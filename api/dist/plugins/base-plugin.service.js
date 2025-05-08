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
exports.BasePlugin = void 0;
const common_1 = require("@nestjs/common");
const extension_1 = require("../utils/generics/extension");
const plugins_service_1 = require("./plugins.service");
let BasePlugin = class BasePlugin extends extension_1.Extension {
    constructor(name, pluginService) {
        super(name);
        this.name = name;
        this.pluginService = pluginService;
    }
    async onModuleInit() {
        await super.onModuleInit();
        this.pluginService.setPlugin(this.type, this.name, this);
    }
};
exports.BasePlugin = BasePlugin;
exports.BasePlugin = BasePlugin = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, plugins_service_1.PluginService])
], BasePlugin);
//# sourceMappingURL=base-plugin.service.js.map