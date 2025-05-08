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
exports.PluginService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("./types");
let PluginService = class PluginService {
    constructor() {
        this.registry = new Map(Object.keys(types_1.PluginType).map((t) => [t, new Map()]));
    }
    setPlugin(type, name, plugin) {
        const registry = this.registry.get(type);
        if (registry.has(name)) {
            throw new common_1.InternalServerErrorException(`Unable to setPlugin() with name ${name} of type ${type} (possible duplicate)`);
        }
        registry.set(name, plugin);
    }
    getAllByType(type) {
        const registry = this.registry.get(type);
        return Array.from(registry.values());
    }
    getAll() {
        return Array.from(this.registry.values())
            .flatMap((innerMap) => Array.from(innerMap.values()));
    }
    getPlugin(type, name) {
        const registry = this.registry.get(type);
        const plugin = registry.get(name);
        return plugin ? plugin : undefined;
    }
    findPlugin(type, name) {
        return this.getAllByType(type).find((plugin) => {
            return plugin.name === name;
        });
    }
};
exports.PluginService = PluginService;
exports.PluginService = PluginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PluginService);
//# sourceMappingURL=plugins.service.js.map