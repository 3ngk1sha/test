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
exports.SettingModel = exports.Setting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const types_1 = require("./types");
let Setting = class Setting extends base_schema_1.BaseSchema {
};
exports.Setting = Setting;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Setting.prototype, "group", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: '',
    }),
    (0, class_transformer_1.Transform)(({ obj }) => obj.subgroup || undefined),
    __metadata("design:type", String)
], Setting.prototype, "subgroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Setting.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsIn)(Object.values(types_1.SettingType)),
    __metadata("design:type", String)
], Setting.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: JSON }),
    __metadata("design:type", Object)
], Setting.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, mongoose_1.Prop)({ type: JSON }),
    __metadata("design:type", Array)
], Setting.prototype, "options", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: JSON, default: {} }),
    __metadata("design:type", Object)
], Setting.prototype, "config", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], Setting.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Setting.prototype, "translatable", void 0);
exports.Setting = Setting = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Setting);
exports.SettingModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Setting.name,
    schema: mongoose_1.SchemaFactory.createForClass(Setting),
});
exports.default = exports.SettingModel.schema;
//# sourceMappingURL=setting.schema.js.map