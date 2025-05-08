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
exports.CleanupService = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("../channel/channel.service");
const helper_service_1 = require("../helper/helper.service");
const logger_service_1 = require("../logger/logger.service");
const setting_service_1 = require("../setting/services/setting.service");
let CleanupService = class CleanupService {
    constructor(helperService, loggerService, settingService, channelService) {
        this.helperService = helperService;
        this.loggerService = loggerService;
        this.settingService = settingService;
        this.channelService = channelService;
    }
    async deleteManyBySuffixAndNamespaces(criteria) {
        return await this.settingService.deleteMany({
            $or: criteria.map(({ suffix, namespaces }) => ({
                group: { $regex: new RegExp(`${suffix}$`), $nin: namespaces },
            })),
        });
    }
    getChannelNamespaces() {
        return this.channelService
            .getAll()
            .map((channel) => channel.getNamespace());
    }
    getHelperNamespaces() {
        return this.helperService
            .getAll()
            .map((helper) => helper.getNamespace());
    }
    async pruneExtensionSettings() {
        const channels = this.getChannelNamespaces();
        const helpers = this.getHelperNamespaces();
        const { deletedCount } = await this.deleteManyBySuffixAndNamespaces([
            { suffix: '_channel', namespaces: channels },
            { suffix: '_helper', namespaces: helpers },
        ]);
        if (deletedCount > 0) {
            this.loggerService.log(`${deletedCount} unused setting${deletedCount === 1 ? '' : 's'} ${deletedCount === 1 ? 'is' : 'are'} successfully deleted!`);
        }
    }
};
exports.CleanupService = CleanupService;
exports.CleanupService = CleanupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [helper_service_1.HelperService,
        logger_service_1.LoggerService,
        setting_service_1.SettingService,
        channel_service_1.ChannelService])
], CleanupService);
//# sourceMappingURL=cleanup.service.js.map