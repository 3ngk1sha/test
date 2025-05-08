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
exports.MENU_POPULATE = exports.MenuModel = exports.MenuFull = exports.Menu = exports.MenuStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const menu_1 = require("./types/menu");
let MenuStub = class MenuStub extends base_schema_1.BaseSchema {
};
exports.MenuStub = MenuStub;
__decorate([
    (0, mongoose_1.Prop)({ isRequired: true, type: String }),
    __metadata("design:type", String)
], MenuStub.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Menu',
        isRequired: false,
    }),
    __metadata("design:type", Object)
], MenuStub.prototype, "parent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(menu_1.MenuType), required: true }),
    __metadata("design:type", String)
], MenuStub.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], MenuStub.prototype, "payload", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, validate: (url) => !!new URL(url) }),
    __metadata("design:type", String)
], MenuStub.prototype, "url", void 0);
exports.MenuStub = MenuStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], MenuStub);
let Menu = class Menu extends MenuStub {
};
exports.Menu = Menu;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.parent?.toString()),
    __metadata("design:type", String)
], Menu.prototype, "parent", void 0);
exports.Menu = Menu = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Menu);
let MenuFull = class MenuFull extends MenuStub {
};
exports.MenuFull = MenuFull;
__decorate([
    (0, class_transformer_1.Type)(() => Menu),
    __metadata("design:type", Menu)
], MenuFull.prototype, "parent", void 0);
exports.MenuFull = MenuFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], MenuFull);
exports.MenuModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Menu.name,
    schema: mongoose_1.SchemaFactory.createForClass(MenuStub),
});
exports.default = exports.MenuModel.schema;
exports.MENU_POPULATE = ['parent'];
//# sourceMappingURL=menu.schema.js.map