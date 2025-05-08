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
exports.CONVERSATION_POPULATE = exports.ConversationModel = exports.ConversationFull = exports.Conversation = exports.getDefaultConversationContext = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const block_schema_1 = require("./block.schema");
const subscriber_schema_1 = require("./subscriber.schema");
function getDefaultConversationContext() {
    return {
        vars: {},
        user: {
            first_name: '',
            last_name: '',
        },
        user_location: {
            lat: 0.0,
            lon: 0.0,
        },
        skip: {},
        attempt: 0,
    };
}
exports.getDefaultConversationContext = getDefaultConversationContext;
let ConversationStub = class ConversationStub extends base_schema_1.BaseSchema {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        required: true,
        ref: 'Subscriber',
    }),
    __metadata("design:type", Object)
], ConversationStub.prototype, "sender", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
    }),
    __metadata("design:type", Boolean)
], ConversationStub.prototype, "active", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        default: getDefaultConversationContext(),
    }),
    __metadata("design:type", Object)
], ConversationStub.prototype, "context", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Block',
    }),
    __metadata("design:type", Object)
], ConversationStub.prototype, "current", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'Block',
            default: [],
        },
    ]),
    __metadata("design:type", Object)
], ConversationStub.prototype, "next", void 0);
ConversationStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, minimize: false })
], ConversationStub);
let Conversation = class Conversation extends ConversationStub {
};
exports.Conversation = Conversation;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.sender.toString()),
    __metadata("design:type", String)
], Conversation.prototype, "sender", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => (obj.current ? obj.current.toString() : null)),
    __metadata("design:type", Object)
], Conversation.prototype, "current", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.next.map((elem) => elem.toString())),
    __metadata("design:type", Array)
], Conversation.prototype, "next", void 0);
exports.Conversation = Conversation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Conversation);
let ConversationFull = class ConversationFull extends ConversationStub {
};
exports.ConversationFull = ConversationFull;
__decorate([
    (0, class_transformer_1.Type)(() => subscriber_schema_1.Subscriber),
    __metadata("design:type", subscriber_schema_1.Subscriber)
], ConversationFull.prototype, "sender", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => block_schema_1.Block),
    __metadata("design:type", block_schema_1.Block)
], ConversationFull.prototype, "current", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => block_schema_1.Block),
    __metadata("design:type", Array)
], ConversationFull.prototype, "next", void 0);
exports.ConversationFull = ConversationFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ConversationFull);
exports.ConversationModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Conversation.name,
    schema: mongoose_1.SchemaFactory.createForClass(ConversationStub),
});
exports.default = exports.ConversationModel.schema;
exports.CONVERSATION_POPULATE = [
    'sender',
    'current',
    'next',
];
//# sourceMappingURL=conversation.schema.js.map