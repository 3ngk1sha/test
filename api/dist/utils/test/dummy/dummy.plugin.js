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
exports.DummyPlugin = void 0;
const common_1 = require("@nestjs/common");
const message_1 = require("../../../chat/schemas/types/message");
const logger_service_1 = require("../../../logger/logger.service");
const base_block_plugin_1 = require("../../../plugins/base-block-plugin");
const plugins_service_1 = require("../../../plugins/plugins.service");
let DummyPlugin = class DummyPlugin extends base_block_plugin_1.BaseBlockPlugin {
    constructor(pluginService, logger) {
        super('dummy-plugin', pluginService);
        this.logger = logger;
        this.template = { name: 'Dummy Plugin' };
        this.effects = {
            onStoreContextData: () => { },
        };
    }
    getPath() {
        return __dirname;
    }
    async process() {
        const envelope = {
            format: message_1.OutgoingMessageFormat.text,
            message: {
                text: 'Hello world !',
            },
        };
        return envelope;
    }
};
exports.DummyPlugin = DummyPlugin;
exports.DummyPlugin = DummyPlugin = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [plugins_service_1.PluginService,
        logger_service_1.LoggerService])
], DummyPlugin);
//# sourceMappingURL=dummy.plugin.js.map