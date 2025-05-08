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
exports.TranslationModel = exports.Translation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
let Translation = class Translation extends base_schema_1.BaseSchema {
};
exports.Translation = Translation;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], Translation.prototype, "str", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        required: true,
    }),
    __metadata("design:type", Object)
], Translation.prototype, "translations", void 0);
exports.Translation = Translation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Translation);
exports.TranslationModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Translation.name,
    schema: mongoose_1.SchemaFactory.createForClass(Translation),
});
exports.default = exports.TranslationModel.schema;
//# sourceMappingURL=translation.schema.js.map