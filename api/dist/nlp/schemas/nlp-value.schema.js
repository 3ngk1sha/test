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
exports.NLP_VALUE_POPULATE = exports.NlpValueModel = exports.NlpValueFullWithCount = exports.NlpValueWithCount = exports.NlpValueFull = exports.NlpValue = exports.NlpValueStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const nlp_entity_schema_1 = require("./nlp-entity.schema");
let NlpValueStub = class NlpValueStub extends base_schema_1.BaseSchema {
    static getValuesFromEntities(entities) {
        return entities.reduce((acc, curr) => {
            return acc.concat(curr.values);
        }, []);
    }
    static getValueMap(values) {
        return values.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
    }
};
exports.NlpValueStub = NlpValueStub;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false, unique: false }),
    __metadata("design:type", String)
], NlpValueStub.prototype, "foreign_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], NlpValueStub.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], NlpValueStub.prototype, "expressions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: JSON, default: {} }),
    __metadata("design:type", Object)
], NlpValueStub.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], NlpValueStub.prototype, "doc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NlpValueStub.prototype, "builtin", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'NlpEntity',
        required: true,
    }),
    __metadata("design:type", Object)
], NlpValueStub.prototype, "entity", void 0);
exports.NlpValueStub = NlpValueStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpValueStub);
let NlpValue = class NlpValue extends NlpValueStub {
};
exports.NlpValue = NlpValue;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.entity.toString()),
    __metadata("design:type", String)
], NlpValue.prototype, "entity", void 0);
exports.NlpValue = NlpValue = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpValue);
let NlpValueFull = class NlpValueFull extends NlpValueStub {
};
exports.NlpValueFull = NlpValueFull;
__decorate([
    (0, class_transformer_1.Type)(() => nlp_entity_schema_1.NlpEntity),
    __metadata("design:type", nlp_entity_schema_1.NlpEntity)
], NlpValueFull.prototype, "entity", void 0);
exports.NlpValueFull = NlpValueFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NlpValueFull);
class NlpValueWithCount extends NlpValue {
}
exports.NlpValueWithCount = NlpValueWithCount;
class NlpValueFullWithCount extends NlpValueFull {
}
exports.NlpValueFullWithCount = NlpValueFullWithCount;
exports.NlpValueModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: NlpValue.name,
    schema: mongoose_1.SchemaFactory.createForClass(NlpValueStub),
});
exports.default = exports.NlpValueModel.schema;
exports.NLP_VALUE_POPULATE = ['entity'];
//# sourceMappingURL=nlp-value.schema.js.map