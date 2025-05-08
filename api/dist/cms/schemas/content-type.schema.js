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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTypeModel = exports.ContentType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const types_1 = require("../../setting/schemas/types");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
let ContentType = class ContentType extends base_schema_1.BaseSchema {
};
exports.ContentType = ContentType;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], ContentType.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.Mixed,
        default: [
            {
                name: 'title',
                label: 'Title',
                type: types_1.FieldType.text,
            },
            {
                name: 'status',
                label: 'Status',
                type: types_1.FieldType.checkbox,
            },
        ],
    }),
    __metadata("design:type", Array)
], ContentType.prototype, "fields", void 0);
exports.ContentType = ContentType = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ContentType);
exports.ContentTypeModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: ContentType.name,
    schema: mongoose_1.SchemaFactory.createForClass(ContentType),
});
exports.default = exports.ContentTypeModel.schema;
//# sourceMappingURL=content-type.schema.js.map