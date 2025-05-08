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
exports.PERMISSION_POPULATE = exports.PermissionModel = exports.PermissionFull = exports.Permission = exports.PermissionStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const action_type_1 = require("../types/action.type");
const model_schema_1 = require("./model.schema");
const role_schema_1 = require("./role.schema");
let PermissionStub = class PermissionStub extends base_schema_1.BaseSchema {
};
exports.PermissionStub = PermissionStub;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, required: true, ref: 'Model' }),
    __metadata("design:type", Object)
], PermissionStub.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: action_type_1.Action,
    }),
    __metadata("design:type", String)
], PermissionStub.prototype, "action", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, required: true, ref: 'Role' }),
    __metadata("design:type", Object)
], PermissionStub.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: 'role',
    }),
    __metadata("design:type", String)
], PermissionStub.prototype, "relation", void 0);
exports.PermissionStub = PermissionStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PermissionStub);
let Permission = class Permission extends PermissionStub {
};
exports.Permission = Permission;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.model.toString()),
    __metadata("design:type", String)
], Permission.prototype, "model", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.role.toString()),
    __metadata("design:type", String)
], Permission.prototype, "role", void 0);
exports.Permission = Permission = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Permission);
let PermissionFull = class PermissionFull extends PermissionStub {
};
exports.PermissionFull = PermissionFull;
__decorate([
    (0, class_transformer_1.Type)(() => model_schema_1.Model),
    __metadata("design:type", model_schema_1.Model)
], PermissionFull.prototype, "model", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => role_schema_1.Role),
    __metadata("design:type", role_schema_1.Role)
], PermissionFull.prototype, "role", void 0);
exports.PermissionFull = PermissionFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PermissionFull);
exports.PermissionModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Permission.name,
    schema: mongoose_1.SchemaFactory.createForClass(PermissionStub).index({ model: 1, action: 1, role: 1, relation: 1 }, { unique: true }),
});
exports.default = exports.PermissionModel.schema;
exports.PERMISSION_POPULATE = ['model', 'role'];
//# sourceMappingURL=permission.schema.js.map