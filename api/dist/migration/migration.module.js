"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationModule = void 0;
const path_1 = require("path");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const attachment_module_1 = require("../attachment/attachment.module");
const logger_module_1 = require("../logger/logger.module");
const migration_command_1 = require("./migration.command");
const migration_schema_1 = require("./migration.schema");
const migration_service_1 = require("./migration.service");
let MigrationModule = class MigrationModule {
};
exports.MigrationModule = MigrationModule;
exports.MigrationModule = MigrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([migration_schema_1.MigrationModel]),
            logger_module_1.LoggerModule,
            axios_1.HttpModule,
            attachment_module_1.AttachmentModule,
        ],
        providers: [
            migration_service_1.MigrationService,
            migration_command_1.MigrationCommand,
            {
                provide: 'MONGO_MIGRATION_DIR',
                useValue: (0, path_1.join)(__dirname, 'migrations'),
            },
        ],
        exports: [migration_service_1.MigrationService],
    })
], MigrationModule);
//# sourceMappingURL=migration.module.js.map