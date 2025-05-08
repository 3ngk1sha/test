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
exports.LABEL_POPULATE = exports.LabelModel = exports.LabelFull = exports.Label = exports.LabelStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const subscriber_schema_1 = require("./subscriber.schema");
let LabelStub = class LabelStub extends base_schema_1.BaseSchema {
};
exports.LabelStub = LabelStub;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        required: true,
    }),
    __metadata("design:type", String)
], LabelStub.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        required: true,
        match: /^[A-Z_0-9]+$/,
    }),
    __metadata("design:type", String)
], LabelStub.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
    }),
    __metadata("design:type", Object)
], LabelStub.prototype, "label_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], LabelStub.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], LabelStub.prototype, "builtin", void 0);
exports.LabelStub = LabelStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LabelStub);
let Label = class Label extends LabelStub {
};
exports.Label = Label;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", void 0)
], Label.prototype, "users", void 0);
exports.Label = Label = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Label);
let LabelFull = class LabelFull extends LabelStub {
};
exports.LabelFull = LabelFull;
__decorate([
    (0, class_transformer_1.Type)(() => subscriber_schema_1.Subscriber),
    __metadata("design:type", Array)
], LabelFull.prototype, "users", void 0);
exports.LabelFull = LabelFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LabelFull);
exports.LabelModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Label.name,
    schema: mongoose_1.SchemaFactory.createForClass(LabelStub),
});
exports.LabelModel.schema.virtual('users', {
    ref: 'Subscriber',
    localField: '_id',
    foreignField: 'labels',
    justOne: false,
});
exports.default = exports.LabelModel.schema;
exports.LABEL_POPULATE = ['users'];
//# sourceMappingURL=label.schema.js.map