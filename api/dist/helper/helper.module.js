"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const nestjs_dynamic_providers_1 = require("nestjs-dynamic-providers");
const nlp_module_1 = require("../nlp/nlp.module");
const helper_controller_1 = require("./helper.controller");
const helper_service_1 = require("./helper.service");
let HelperModule = class HelperModule {
};
exports.HelperModule = HelperModule;
exports.HelperModule = HelperModule = __decorate([
    (0, common_1.Global)(),
    (0, nestjs_dynamic_providers_1.InjectDynamicProviders)('dist/extensions/**/*.helper.js', 'dist/.hexabot/contrib/extensions/helpers/**/*.helper.js', 'dist/.hexabot/custom/extensions/helpers/**/*.helper.js'),
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, nlp_module_1.NlpModule],
        controllers: [helper_controller_1.HelperController],
        providers: [helper_service_1.HelperService],
        exports: [helper_service_1.HelperService],
    })
], HelperModule);
//# sourceMappingURL=helper.module.js.map