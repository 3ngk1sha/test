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
exports.NLP_SAMPLE_ENTITY_POPULATE = exports.NlpSampleEntityModel = exports.NlpSampleEntityFull = exports.NlpSampleEntity = exports.NlpSampleEntityStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const nlp_entity_schema_1 = require("./nlp-entity.schema");
const nlp_sample_schema_1 = require("./nlp-sample.schema");
const nlp_value_schema_1 = require("./nlp-value.schema");
let NlpSampleEntityStub = class NlpSampleEntityStub extends base_schema_1.BaseSchema {
};
exports.NlpSampleEntityStub = NlpSampleEntityStub;
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], NlpSampleEntityStub.prototype, "start", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], NlpSampleEntityStub.prototype, "end", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'NlpEntity',
        required: true,
    }),
    __metadata("design:type", Object)
], NlpSampleEntityStub.prototype, "entity", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'NlpValue',
        required: true,
    }),
    __metadata("design:type", Object)
], NlpSampleEntityStub.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'NlpSample',
        required: true,
    }),
    __metadata("design:type", Object)
], NlpSampleEntityStub.prototype, "sample", void 0);
exports.NlpSampleEntityStub = NlpSampleEntityStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpSampleEntityStub);
let NlpSampleEntity = class NlpSampleEntity extends NlpSampleEntityStub {
};
exports.NlpSampleEntity = NlpSampleEntity;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => (obj.start > -1 ? obj.start : undefined)),
    __metadata("design:type", Number)
], NlpSampleEntity.prototype, "start", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => (obj.end > -1 ? obj.end : undefined)),
    __metadata("design:type", Number)
], NlpSampleEntity.prototype, "end", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.entity.toString()),
    __metadata("design:type", String)
], NlpSampleEntity.prototype, "entity", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.value.toString()),
    __metadata("design:type", String)
], NlpSampleEntity.prototype, "value", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.sample.toString()),
    __metadata("design:type", String)
], NlpSampleEntity.prototype, "sample", void 0);
exports.NlpSampleEntity = NlpSampleEntity = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpSampleEntity);
let NlpSampleEntityFull = class NlpSampleEntityFull extends NlpSampleEntityStub {
};
exports.NlpSampleEntityFull = NlpSampleEntityFull;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => (obj.start > -1 ? obj.start : undefined)),
    __metadata("design:type", Number)
], NlpSampleEntityFull.prototype, "start", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => (obj.end > -1 ? obj.end : undefined)),
    __metadata("design:type", Number)
], NlpSampleEntityFull.prototype, "end", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => nlp_entity_schema_1.NlpEntity),
    __metadata("design:type", nlp_entity_schema_1.NlpEntity)
], NlpSampleEntityFull.prototype, "entity", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => nlp_value_schema_1.NlpValue),
    __metadata("design:type", nlp_value_schema_1.NlpValue)
], NlpSampleEntityFull.prototype, "value", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => nlp_sample_schema_1.NlpSample),
    __metadata("design:type", nlp_sample_schema_1.NlpSample)
], NlpSampleEntityFull.prototype, "sample", void 0);
exports.NlpSampleEntityFull = NlpSampleEntityFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpSampleEntityFull);
exports.NlpSampleEntityModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: NlpSampleEntity.name,
    schema: mongoose_1.SchemaFactory.createForClass(NlpSampleEntityStub),
});
exports.default = exports.NlpSampleEntityModel.schema;
exports.NLP_SAMPLE_ENTITY_POPULATE = [
    'entity',
    'value',
    'sample',
];
//# sourceMappingURL=nlp-sample-entity.schema.js.map