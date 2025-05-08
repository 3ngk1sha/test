"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const chat_module_1 = require("../chat/chat.module");
const content_type_controller_1 = require("./controllers/content-type.controller");
const content_controller_1 = require("./controllers/content.controller");
const menu_controller_1 = require("./controllers/menu.controller");
const content_type_repository_1 = require("./repositories/content-type.repository");
const content_repository_1 = require("./repositories/content.repository");
const menu_repository_1 = require("./repositories/menu.repository");
const content_type_schema_1 = require("./schemas/content-type.schema");
const content_schema_1 = require("./schemas/content.schema");
const menu_schema_1 = require("./schemas/menu.schema");
const content_type_service_1 = require("./services/content-type.service");
const content_service_1 = require("./services/content.service");
const menu_service_1 = require("./services/menu.service");
let CmsModule = class CmsModule {
};
exports.CmsModule = CmsModule;
exports.CmsModule = CmsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([content_schema_1.ContentModel, content_type_schema_1.ContentTypeModel, menu_schema_1.MenuModel]),
            (0, common_1.forwardRef)(() => chat_module_1.ChatModule),
        ],
        controllers: [content_controller_1.ContentController, content_type_controller_1.ContentTypeController, menu_controller_1.MenuController],
        providers: [
            content_type_service_1.ContentTypeService,
            content_service_1.ContentService,
            content_type_repository_1.ContentTypeRepository,
            content_repository_1.ContentRepository,
            menu_repository_1.MenuRepository,
            menu_service_1.MenuService,
        ],
        exports: [menu_service_1.MenuService, content_service_1.ContentService, content_type_service_1.ContentTypeService],
    })
], CmsModule);
//# sourceMappingURL=cms.module.js.map