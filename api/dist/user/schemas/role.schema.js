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
exports.ROLE_POPULATE = exports.RoleModel = exports.RoleFull = exports.Role = exports.RoleStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const permission_schema_1 = require("./permission.schema");
const user_schema_1 = require("./user.schema");
let RoleStub = class RoleStub extends base_schema_1.BaseSchema {
};
exports.RoleStub = RoleStub;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        required: true,
    }),
    __metadata("design:type", String)
], RoleStub.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], RoleStub.prototype, "active", void 0);
exports.RoleStub = RoleStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], RoleStub);
let Role = class Role extends RoleStub {
};
exports.Role = Role;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", void 0)
], Role.prototype, "permissions", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", void 0)
], Role.prototype, "users", void 0);
exports.Role = Role = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Role);
let RoleFull = class RoleFull extends RoleStub {
};
exports.RoleFull = RoleFull;
__decorate([
    (0, class_transformer_1.Type)(() => permission_schema_1.Permission),
    __metadata("design:type", Array)
], RoleFull.prototype, "permissions", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => user_schema_1.User),
    __metadata("design:type", Array)
], RoleFull.prototype, "users", void 0);
exports.RoleFull = RoleFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], RoleFull);
exports.RoleModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Role.name,
    schema: mongoose_1.SchemaFactory.createForClass(RoleStub),
});
exports.RoleModel.schema.virtual('permissions', {
    ref: 'Permission',
    localField: '_id',
    foreignField: 'role',
});
exports.RoleModel.schema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'roles',
});
exports.default = exports.RoleModel.schema;
exports.ROLE_POPULATE = ['permissions', 'users'];
//# sourceMappingURL=role.schema.js.map