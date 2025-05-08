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
exports.ContextVarModel = exports.ContextVar = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
let ContextVar = class ContextVar extends base_schema_1.BaseSchema {
};
exports.ContextVar = ContextVar;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        required: true,
    }),
    __metadata("design:type", String)
], ContextVar.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        required: true,
        match: /^[a-z_0-9]+$/,
    }),
    __metadata("design:type", String)
], ContextVar.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], ContextVar.prototype, "permanent", void 0);
exports.ContextVar = ContextVar = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ContextVar);
exports.ContextVarModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: ContextVar.name,
    schema: mongoose_1.SchemaFactory.createForClass(ContextVar),
});
exports.default = exports.ContextVarModel.schema;
//# sourceMappingURL=context-var.schema.js.map