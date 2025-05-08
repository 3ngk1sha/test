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
exports.CategoryModel = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
let Category = class Category extends base_schema_1.BaseSchema {
};
exports.Category = Category;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        required: true,
    }),
    __metadata("design:type", String)
], Category.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Category.prototype, "builtin", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 100,
    }),
    __metadata("design:type", Number)
], Category.prototype, "zoom", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [Number, Number],
        default: [0, 0],
    }),
    __metadata("design:type", Array)
], Category.prototype, "offset", void 0);
exports.Category = Category = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Category);
exports.CategoryModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Category.name,
    schema: mongoose_1.SchemaFactory.createForClass(Category),
});
exports.default = exports.CategoryModel.schema;
//# sourceMappingURL=category.schema.js.map