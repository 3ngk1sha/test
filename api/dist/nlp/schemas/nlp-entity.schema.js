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
exports.NLP_ENTITY_POPULATE = exports.NlpEntityModel = exports.NlpEntityFull = exports.NlpEntity = exports.NlpEntityStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const nlp_value_schema_1 = require("./nlp-value.schema");
let NlpEntityStub = class NlpEntityStub extends base_schema_1.BaseSchema {
    static getEntityMap(entities) {
        return entities.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
    }
};
exports.NlpEntityStub = NlpEntityStub;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false, unique: false }),
    __metadata("design:type", String)
], NlpEntityStub.prototype, "foreign_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_]+$/,
    }),
    __metadata("design:type", String)
], NlpEntityStub.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: ['keywords'] }),
    __metadata("design:type", Array)
], NlpEntityStub.prototype, "lookups", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], NlpEntityStub.prototype, "doc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NlpEntityStub.prototype, "builtin", void 0);
exports.NlpEntityStub = NlpEntityStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpEntityStub);
let NlpEntity = class NlpEntity extends NlpEntityStub {
};
exports.NlpEntity = NlpEntity;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", void 0)
], NlpEntity.prototype, "values", void 0);
exports.NlpEntity = NlpEntity = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpEntity);
let NlpEntityFull = class NlpEntityFull extends NlpEntityStub {
};
exports.NlpEntityFull = NlpEntityFull;
__decorate([
    (0, class_transformer_1.Type)(() => nlp_value_schema_1.NlpValue),
    __metadata("design:type", Array)
], NlpEntityFull.prototype, "values", void 0);
exports.NlpEntityFull = NlpEntityFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpEntityFull);
exports.NlpEntityModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: NlpEntity.name,
    schema: mongoose_1.SchemaFactory.createForClass(NlpEntityStub),
});
exports.NlpEntityModel.schema.virtual('values', {
    ref: 'NlpValue',
    localField: '_id',
    foreignField: 'entity',
});
exports.default = exports.NlpEntityModel.schema;
exports.NLP_ENTITY_POPULATE = ['values'];
//# sourceMappingURL=nlp-entity.schema.js.map