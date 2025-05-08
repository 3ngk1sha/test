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
exports.MESSAGE_POPULATE = exports.MessageModel = exports.MessageFull = exports.Message = exports.MessageStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const subscriber_schema_1 = require("./subscriber.schema");
let MessageStub = class MessageStub extends base_schema_1.BaseSchema {
};
exports.MessageStub = MessageStub;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
    }),
    __metadata("design:type", String)
], MessageStub.prototype, "mid", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        required: false,
        ref: 'Subscriber',
    }),
    __metadata("design:type", Object)
], MessageStub.prototype, "sender", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        required: false,
        ref: 'Subscriber',
    }),
    __metadata("design:type", Object)
], MessageStub.prototype, "recipient", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    }),
    __metadata("design:type", Object)
], MessageStub.prototype, "sentBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        required: true,
    }),
    __metadata("design:type", Object)
], MessageStub.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], MessageStub.prototype, "read", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], MessageStub.prototype, "delivery", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], MessageStub.prototype, "handover", void 0);
exports.MessageStub = MessageStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], MessageStub);
let Message = class Message extends MessageStub {
};
exports.Message = Message;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.sender?.toString()),
    __metadata("design:type", String)
], Message.prototype, "sender", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.recipient?.toString()),
    __metadata("design:type", String)
], Message.prototype, "recipient", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.sentBy?.toString()),
    __metadata("design:type", String)
], Message.prototype, "sentBy", void 0);
exports.Message = Message = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Message);
let MessageFull = class MessageFull extends MessageStub {
};
exports.MessageFull = MessageFull;
__decorate([
    (0, class_transformer_1.Type)(() => subscriber_schema_1.Subscriber),
    __metadata("design:type", subscriber_schema_1.Subscriber)
], MessageFull.prototype, "sender", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => subscriber_schema_1.Subscriber),
    __metadata("design:type", subscriber_schema_1.Subscriber)
], MessageFull.prototype, "recipient", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.sentBy?.toString()),
    __metadata("design:type", String)
], MessageFull.prototype, "sentBy", void 0);
exports.MessageFull = MessageFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], MessageFull);
exports.MessageModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Message.name,
    schema: mongoose_1.SchemaFactory.createForClass(MessageStub),
});
exports.default = exports.MessageModel.schema;
exports.MESSAGE_POPULATE = ['sender', 'recipient'];
//# sourceMappingURL=message.schema.js.map