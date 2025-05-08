"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const setting_controller_1 = require("./controllers/setting.controller");
const metadata_repository_1 = require("./repositories/metadata.repository");
const setting_repository_1 = require("./repositories/setting.repository");
const metadata_schema_1 = require("./schemas/metadata.schema");
const setting_schema_1 = require("./schemas/setting.schema");
const metadata_seed_1 = require("./seeds/metadata.seed");
const setting_seed_1 = require("./seeds/setting.seed");
const metadata_service_1 = require("./services/metadata.service");
const setting_service_1 = require("./services/setting.service");
let SettingModule = class SettingModule {
};
exports.SettingModule = SettingModule;
exports.SettingModule = SettingModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([setting_schema_1.SettingModel, metadata_schema_1.MetadataModel]),
            passport_1.PassportModule.register({
                session: true,
            }),
        ],
        providers: [
            setting_repository_1.SettingRepository,
            metadata_repository_1.MetadataRepository,
            setting_seed_1.SettingSeeder,
            metadata_seed_1.MetadataSeeder,
            setting_service_1.SettingService,
            metadata_service_1.MetadataService,
        ],
        controllers: [setting_controller_1.SettingController],
        exports: [setting_service_1.SettingService, metadata_service_1.MetadataService],
    })
], SettingModule);
//# sourceMappingURL=setting.module.js.map