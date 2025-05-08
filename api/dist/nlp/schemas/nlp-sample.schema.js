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
exports.NLP_SAMPLE_POPULATE = exports.NlpSampleModel = exports.NlpSampleFull = exports.NlpSample = exports.NlpSampleStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const language_schema_1 = require("../../i18n/schemas/language.schema");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const nlp_sample_entity_schema_1 = require("./nlp-sample-entity.schema");
const types_1 = require("./types");
let NlpSampleStub = class NlpSampleStub extends base_schema_1.BaseSchema {
};
exports.NlpSampleStub = NlpSampleStub;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], NlpSampleStub.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NlpSampleStub.prototype, "trained", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(types_1.NlpSampleState),
        default: types_1.NlpSampleState.train,
    }),
    __metadata("design:type", Object)
], NlpSampleStub.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Language',
        required: false,
    }),
    __metadata("design:type", Object)
], NlpSampleStub.prototype, "language", void 0);
exports.NlpSampleStub = NlpSampleStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpSampleStub);
let NlpSample = class NlpSample extends NlpSampleStub {
};
exports.NlpSample = NlpSample;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.language.toString()),
    __metadata("design:type", Object)
], NlpSample.prototype, "language", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", void 0)
], NlpSample.prototype, "entities", void 0);
exports.NlpSample = NlpSample = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpSample);
let NlpSampleFull = class NlpSampleFull extends NlpSampleStub {
};
exports.NlpSampleFull = NlpSampleFull;
__decorate([
    (0, class_transformer_1.Type)(() => language_schema_1.Language),
    __metadata("design:type", Object)
], NlpSampleFull.prototype, "language", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => nlp_sample_entity_schema_1.NlpSampleEntity),
    __metadata("design:type", Array)
], NlpSampleFull.prototype, "entities", void 0);
exports.NlpSampleFull = NlpSampleFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpSampleFull);
exports.NlpSampleModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: NlpSample.name,
    schema: mongoose_1.SchemaFactory.createForClass(NlpSampleStub),
});
exports.NlpSampleModel.schema.virtual('entities', {
    ref: 'NlpSampleEntity',
    localField: '_id',
    foreignField: 'sample',
});
exports.default = exports.NlpSampleModel.schema;
exports.NLP_SAMPLE_POPULATE = [
    'language',
    'entities',
];
//# sourceMappingURL=nlp-sample.schema.js.map