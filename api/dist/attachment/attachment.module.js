"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentModule = void 0;
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const config_1 = require("../config");
const user_module_1 = require("../user/user.module");
const attachment_controller_1 = require("./controllers/attachment.controller");
const attachment_repository_1 = require("./repositories/attachment.repository");
const attachment_schema_1 = require("./schemas/attachment.schema");
const attachment_service_1 = require("./services/attachment.service");
let AttachmentModule = class AttachmentModule {
    onApplicationBootstrap() {
        if (!(0, fs_1.existsSync)(config_1.config.parameters.uploadDir)) {
            (0, fs_1.mkdirSync)(config_1.config.parameters.uploadDir, { recursive: true });
        }
        if (!(0, fs_1.existsSync)(config_1.config.parameters.avatarDir)) {
            (0, fs_1.mkdirSync)(config_1.config.parameters.avatarDir, { recursive: true });
        }
    }
};
exports.AttachmentModule = AttachmentModule;
exports.AttachmentModule = AttachmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([attachment_schema_1.AttachmentModel]),
            passport_1.PassportModule.register({
                session: true,
            }),
            user_module_1.UserModule,
        ],
        providers: [attachment_repository_1.AttachmentRepository, attachment_service_1.AttachmentService],
        controllers: [attachment_controller_1.AttachmentController],
        exports: [attachment_service_1.AttachmentService],
    })
], AttachmentModule);
//# sourceMappingURL=attachment.module.js.map