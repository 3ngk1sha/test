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
exports.I18nController = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("../../channel/channel.service");
const helper_service_1 = require("../../helper/helper.service");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const plugins_service_1 = require("../../plugins/plugins.service");
let I18nController = class I18nController {
    constructor(pluginService, helperService, channelService) {
        this.pluginService = pluginService;
        this.helperService = helperService;
        this.channelService = channelService;
    }
    getTranslations() {
        const plugins = this.pluginService.getAll();
        const helpers = this.helperService.getAll();
        const channels = this.channelService.getAll();
        return [...plugins, ...helpers, ...channels].reduce((acc, curr) => {
            acc[curr.getNamespace()] = curr.getTranslations();
            return acc;
        }, {});
    }
};
exports.I18nController = I18nController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], I18nController.prototype, "getTranslations", null);
exports.I18nController = I18nController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('i18n'),
    __metadata("design:paramtypes", [plugins_service_1.PluginService,
        helper_service_1.HelperService,
        channel_service_1.ChannelService])
], I18nController);
//# sourceMappingURL=i18n.controller.js.map