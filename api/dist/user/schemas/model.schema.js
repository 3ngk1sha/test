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
exports.MODEL_POPULATE = exports.ModelModel = exports.ModelFull = exports.Model = exports.ModelStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const permission_schema_1 = require("./permission.schema");
let ModelStub = class ModelStub extends base_schema_1.BaseSchema {
};
exports.ModelStub = ModelStub;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], ModelStub.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], ModelStub.prototype, "identity", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        default: {},
    }),
    __metadata("design:type", Object)
], ModelStub.prototype, "attributes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: 'role',
    }),
    __metadata("design:type", String)
], ModelStub.prototype, "relation", void 0);
exports.ModelStub = ModelStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ModelStub);
let Model = class Model extends ModelStub {
};
exports.Model = Model;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", void 0)
], Model.prototype, "permissions", void 0);
exports.Model = Model = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Model);
let ModelFull = class ModelFull extends ModelStub {
};
exports.ModelFull = ModelFull;
__decorate([
    (0, class_transformer_1.Type)(() => permission_schema_1.Permission),
    __metadata("design:type", Array)
], ModelFull.prototype, "permissions", void 0);
exports.ModelFull = ModelFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ModelFull);
exports.ModelModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Model.name,
    schema: mongoose_1.SchemaFactory.createForClass(ModelStub),
});
exports.ModelModel.schema.virtual('permissions', {
    ref: 'Permission',
    localField: '_id',
    foreignField: 'model',
});
exports.default = exports.ModelModel.schema;
exports.MODEL_POPULATE = ['permissions'];
//# sourceMappingURL=model.schema.js.map