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
exports.SUBSCRIBER_POPULATE = exports.SubscriberModel = exports.SubscriberFull = exports.Subscriber = exports.SubscriberStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const attachment_schema_1 = require("../../attachment/schemas/attachment.schema");
const user_schema_1 = require("../../user/schemas/user.schema");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const label_schema_1 = require("./label.schema");
let SubscriberStub = class SubscriberStub extends base_schema_1.BaseSchema {
    static getChannelData(subscriber) {
        return subscriber.channel;
    }
};
exports.SubscriberStub = SubscriberStub;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], SubscriberStub.prototype, "first_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], SubscriberStub.prototype, "last_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], SubscriberStub.prototype, "locale", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], SubscriberStub.prototype, "timezone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], SubscriberStub.prototype, "language", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], SubscriberStub.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], SubscriberStub.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], SubscriberStub.prototype, "foreign_id", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        { type: mongoose_2.Schema.Types.ObjectId, required: false, ref: 'Label' },
    ]),
    __metadata("design:type", Object)
], SubscriberStub.prototype, "labels", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
        default: null,
    }),
    __metadata("design:type", Object)
], SubscriberStub.prototype, "assignedTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: null,
    }),
    __metadata("design:type", Object)
], SubscriberStub.prototype, "assignedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
    }),
    __metadata("design:type", Date)
], SubscriberStub.prototype, "lastvisit", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
    }),
    __metadata("design:type", Date)
], SubscriberStub.prototype, "retainedFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
    }),
    __metadata("design:type", Object)
], SubscriberStub.prototype, "channel", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Attachment',
        default: null,
    }),
    __metadata("design:type", Object)
], SubscriberStub.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        default: { vars: {} },
    }),
    __metadata("design:type", Object)
], SubscriberStub.prototype, "context", void 0);
exports.SubscriberStub = SubscriberStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SubscriberStub);
let Subscriber = class Subscriber extends SubscriberStub {
};
exports.Subscriber = Subscriber;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.labels.map((label) => label.toString())),
    __metadata("design:type", Array)
], Subscriber.prototype, "labels", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.assignedTo?.toString() || null),
    __metadata("design:type", Object)
], Subscriber.prototype, "assignedTo", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.avatar?.toString() || null),
    __metadata("design:type", Object)
], Subscriber.prototype, "avatar", void 0);
exports.Subscriber = Subscriber = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Subscriber);
let SubscriberFull = class SubscriberFull extends SubscriberStub {
};
exports.SubscriberFull = SubscriberFull;
__decorate([
    (0, class_transformer_1.Type)(() => label_schema_1.Label),
    __metadata("design:type", Array)
], SubscriberFull.prototype, "labels", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => user_schema_1.User),
    __metadata("design:type", Object)
], SubscriberFull.prototype, "assignedTo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => attachment_schema_1.Attachment),
    __metadata("design:type", Object)
], SubscriberFull.prototype, "avatar", void 0);
exports.SubscriberFull = SubscriberFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SubscriberFull);
exports.SubscriberModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Subscriber.name,
    schema: mongoose_1.SchemaFactory.createForClass(SubscriberStub),
});
exports.default = exports.SubscriberModel.schema;
exports.SUBSCRIBER_POPULATE = [
    'labels',
    'assignedTo',
    'avatar',
];
//# sourceMappingURL=subscriber.schema.js.map