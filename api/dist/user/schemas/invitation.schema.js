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
exports.INVITATION_POPULATE = exports.InvitationModel = exports.InvitationFull = exports.Invitation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const is_email_1 = require("../../utils/validation-rules/is-email");
const role_schema_1 = require("./role.schema");
let InvitationStub = class InvitationStub extends base_schema_1.BaseSchema {
};
__decorate([
    (0, mongoose_1.Prop)([
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'Role',
        },
    ]),
    __metadata("design:type", Object)
], InvitationStub.prototype, "roles", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        validate: {
            validator: is_email_1.isEmail,
            message: (props) => `${props.value} is not a valid email!`,
        },
    }),
    __metadata("design:type", String)
], InvitationStub.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], InvitationStub.prototype, "token", void 0);
InvitationStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], InvitationStub);
let Invitation = class Invitation extends InvitationStub {
};
exports.Invitation = Invitation;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.roles.map((role) => role.toString())),
    __metadata("design:type", Array)
], Invitation.prototype, "roles", void 0);
exports.Invitation = Invitation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Invitation);
let InvitationFull = class InvitationFull extends InvitationStub {
};
exports.InvitationFull = InvitationFull;
__decorate([
    (0, class_transformer_1.Type)(() => role_schema_1.Role),
    __metadata("design:type", Array)
], InvitationFull.prototype, "roles", void 0);
exports.InvitationFull = InvitationFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], InvitationFull);
exports.InvitationModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Invitation.name,
    schema: mongoose_1.SchemaFactory.createForClass(Invitation),
});
exports.default = exports.InvitationModel.schema;
exports.INVITATION_POPULATE = ['roles'];
//# sourceMappingURL=invitation.schema.js.map