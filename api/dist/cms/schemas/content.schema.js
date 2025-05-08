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
exports.CONTENT_POPULATE = exports.ContentModel = exports.ContentFull = exports.Content = exports.ContentStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = __importDefault(require("mongoose"));
const config_1 = require("../../config");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const content_type_schema_1 = require("./content-type.schema");
let ContentStub = class ContentStub extends base_schema_1.BaseSchema {
    static getUrl(item) {
        return new URL('/content/view/' + item.id, config_1.config.apiBaseUrl).toString();
    }
    static getPayload(item) {
        return 'postback' in item ? item.postback : item.title;
    }
};
exports.ContentStub = ContentStub;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'ContentType',
    }),
    __metadata("design:type", Object)
], ContentStub.prototype, "entity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ContentStub.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], ContentStub.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Mixed, default: {} }),
    __metadata("design:type", Object)
], ContentStub.prototype, "dynamicFields", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], ContentStub.prototype, "rag", void 0);
exports.ContentStub = ContentStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, strict: false })
], ContentStub);
let Content = class Content extends ContentStub {
    static toElement(content) {
        return {
            id: content.id,
            title: content.title,
            ...content.dynamicFields,
        };
    }
};
exports.Content = Content;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.entity.toString()),
    __metadata("design:type", String)
], Content.prototype, "entity", void 0);
exports.Content = Content = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Content);
let ContentFull = class ContentFull extends ContentStub {
};
exports.ContentFull = ContentFull;
__decorate([
    (0, class_transformer_1.Type)(() => content_type_schema_1.ContentType),
    __metadata("design:type", content_type_schema_1.ContentType)
], ContentFull.prototype, "entity", void 0);
exports.ContentFull = ContentFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ContentFull);
const ContentSchema = mongoose_1.SchemaFactory.createForClass(ContentStub);
ContentSchema.index({
    title: 'text',
    rag: 'text',
}, {
    weights: {
        title: 2,
        rag: 1,
    },
    background: false,
});
exports.ContentModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Content.name,
    schema: ContentSchema,
});
exports.default = exports.ContentModel.schema;
exports.CONTENT_POPULATE = ['entity'];
//# sourceMappingURL=content.schema.js.map