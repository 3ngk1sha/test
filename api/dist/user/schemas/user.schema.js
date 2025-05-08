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
exports.USER_POPULATE = exports.UserModel = exports.UserFull = exports.User = exports.UserStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const attachment_schema_1 = require("../../attachment/schemas/attachment.schema");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const role_schema_1 = require("./role.schema");
let UserStub = class UserStub extends base_schema_1.BaseSchema {
};
exports.UserStub = UserStub;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        required: true,
    }),
    __metadata("design:type", String)
], UserStub.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], UserStub.prototype, "first_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], UserStub.prototype, "last_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        required: true,
    }),
    __metadata("design:type", String)
], UserStub.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], UserStub.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Role' }]),
    __metadata("design:type", Object)
], UserStub.prototype, "roles", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Attachment',
        default: null,
    }),
    __metadata("design:type", Object)
], UserStub.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], UserStub.prototype, "sendEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
    }),
    __metadata("design:type", Boolean)
], UserStub.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        maxLength: 2,
        minLength: 2,
        default: 'en',
    }),
    __metadata("design:type", String)
], UserStub.prototype, "language", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        maxLength: 255,
        default: 'Europe/Berlin',
    }),
    __metadata("design:type", String)
], UserStub.prototype, "timezone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], UserStub.prototype, "resetCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: null,
    }),
    __metadata("design:type", Object)
], UserStub.prototype, "resetToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.Mixed,
        default: { strategy: 'local' },
    }),
    __metadata("design:type", Object)
], UserStub.prototype, "provider", void 0);
exports.UserStub = UserStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserStub);
let User = class User extends UserStub {
};
exports.User = User;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.roles.map((elem) => elem.toString())),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.avatar?.toString() || null),
    __metadata("design:type", Object)
], User.prototype, "avatar", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
let UserFull = class UserFull extends UserStub {
};
exports.UserFull = UserFull;
__decorate([
    (0, class_transformer_1.Type)(() => role_schema_1.Role),
    __metadata("design:type", Array)
], UserFull.prototype, "roles", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => attachment_schema_1.Attachment),
    __metadata("design:type", Object)
], UserFull.prototype, "avatar", void 0);
exports.UserFull = UserFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserFull);
exports.UserModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: User.name,
    schema: mongoose_1.SchemaFactory.createForClass(User),
});
exports.default = exports.UserModel.schema;
exports.USER_POPULATE = ['roles', 'avatar'];
//# sourceMappingURL=user.schema.js.map