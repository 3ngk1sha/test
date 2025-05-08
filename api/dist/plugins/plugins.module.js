"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginsModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const nestjs_dynamic_providers_1 = require("nestjs-dynamic-providers");
const attachment_module_1 = require("../attachment/attachment.module");
const attachment_schema_1 = require("../attachment/schemas/attachment.schema");
const chat_module_1 = require("../chat/chat.module");
const block_schema_1 = require("../chat/schemas/block.schema");
const cms_module_1 = require("../cms/cms.module");
const content_type_schema_1 = require("../cms/schemas/content-type.schema");
const content_schema_1 = require("../cms/schemas/content.schema");
const nlp_module_1 = require("../nlp/nlp.module");
const plugins_service_1 = require("./plugins.service");
let PluginsModule = class PluginsModule {
};
exports.PluginsModule = PluginsModule;
exports.PluginsModule = PluginsModule = __decorate([
    (0, nestjs_dynamic_providers_1.InjectDynamicProviders)('dist/extensions/**/*.plugin.js', 'dist/.hexabot/contrib/extensions/plugins/**/*.plugin.js', 'dist/.hexabot/custom/extensions/plugins/**/*.plugin.js'),
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                block_schema_1.BlockModel,
                attachment_schema_1.AttachmentModel,
                content_schema_1.ContentModel,
                content_type_schema_1.ContentTypeModel,
            ]),
            cms_module_1.CmsModule,
            attachment_module_1.AttachmentModule,
            chat_module_1.ChatModule,
            axios_1.HttpModule,
            nlp_module_1.NlpModule,
        ],
        providers: [plugins_service_1.PluginService],
        exports: [plugins_service_1.PluginService],
    })
], PluginsModule);
//# sourceMappingURL=plugins.module.js.map