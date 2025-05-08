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
exports.ExtensionModule = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../logger/logger.service");
const cleanup_service_1 = require("./cleanup.service");
let ExtensionModule = class ExtensionModule {
    constructor(loggerService, cleanupService) {
        this.loggerService = loggerService;
        this.cleanupService = cleanupService;
    }
    async onApplicationBootstrap() {
        try {
            await this.cleanupService.pruneExtensionSettings();
        }
        catch (error) {
            this.loggerService.error('Unable to delete unused settings', error);
        }
    }
};
exports.ExtensionModule = ExtensionModule;
exports.ExtensionModule = ExtensionModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [cleanup_service_1.CleanupService],
        exports: [cleanup_service_1.CleanupService],
    }),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        cleanup_service_1.CleanupService])
], ExtensionModule);
//# sourceMappingURL=extension.module.js.map