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
exports.ATTACHMENT_POPULATE = exports.AttachmentModel = exports.SubscriberAttachmentFull = exports.UserAttachmentFull = exports.Attachment = exports.AttachmentStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const subscriber_schema_1 = require("../../chat/schemas/subscriber.schema");
const attachment_1 = require("../../chat/schemas/types/attachment");
const config_1 = require("../../config");
const user_schema_1 = require("../../user/schemas/user.schema");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const URL_1 = require("../../utils/helpers/URL");
const types_1 = require("../types");
const utilities_1 = require("../utilities");
let AttachmentStub = class AttachmentStub extends base_schema_1.BaseSchema {
    static getAttachmentUrl(attachmentId, attachmentName = '') {
        return (0, URL_1.buildURL)(config_1.config.apiBaseUrl, `/attachment/download/${attachmentId}/${attachmentName}`);
    }
    static getTypeByMime(mimeType) {
        if (mimeType.startsWith(attachment_1.FileType.image)) {
            return attachment_1.FileType.image;
        }
        else if (mimeType.startsWith(attachment_1.FileType.audio)) {
            return attachment_1.FileType.audio;
        }
        else if (mimeType.startsWith(attachment_1.FileType.video)) {
            return attachment_1.FileType.video;
        }
        else {
            return attachment_1.FileType.file;
        }
    }
};
exports.AttachmentStub = AttachmentStub;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], AttachmentStub.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        match: utilities_1.MIME_REGEX,
    }),
    __metadata("design:type", String)
], AttachmentStub.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        min: 0,
        max: config_1.config.parameters.maxUploadSize,
    }),
    __metadata("design:type", Number)
], AttachmentStub.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
    }),
    __metadata("design:type", String)
], AttachmentStub.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: JSON }),
    __metadata("design:type", Object)
], AttachmentStub.prototype, "channel", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        refPath: 'createdByRef',
        default: null,
    }),
    __metadata("design:type", Object)
], AttachmentStub.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(types_1.AttachmentCreatedByRef) }),
    __metadata("design:type", String)
], AttachmentStub.prototype, "createdByRef", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(types_1.AttachmentResourceRef) }),
    __metadata("design:type", String)
], AttachmentStub.prototype, "resourceRef", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(types_1.AttachmentAccess) }),
    __metadata("design:type", String)
], AttachmentStub.prototype, "access", void 0);
exports.AttachmentStub = AttachmentStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AttachmentStub);
let Attachment = class Attachment extends AttachmentStub {
};
exports.Attachment = Attachment;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.createdBy?.toString() || null),
    __metadata("design:type", Object)
], Attachment.prototype, "createdBy", void 0);
exports.Attachment = Attachment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Attachment);
let UserAttachmentFull = class UserAttachmentFull extends AttachmentStub {
};
exports.UserAttachmentFull = UserAttachmentFull;
__decorate([
    (0, class_transformer_1.Type)(() => user_schema_1.User),
    __metadata("design:type", Object)
], UserAttachmentFull.prototype, "createdBy", void 0);
exports.UserAttachmentFull = UserAttachmentFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserAttachmentFull);
let SubscriberAttachmentFull = class SubscriberAttachmentFull extends AttachmentStub {
};
exports.SubscriberAttachmentFull = SubscriberAttachmentFull;
__decorate([
    (0, class_transformer_1.Type)(() => subscriber_schema_1.Subscriber),
    __metadata("design:type", Object)
], SubscriberAttachmentFull.prototype, "createdBy", void 0);
exports.SubscriberAttachmentFull = SubscriberAttachmentFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SubscriberAttachmentFull);
exports.AttachmentModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Attachment.name,
    schema: mongoose_1.SchemaFactory.createForClass(Attachment),
});
exports.AttachmentModel.schema.virtual('url').get(function () {
    if (this._id && this.name)
        return (0, URL_1.buildURL)(config_1.config.apiBaseUrl, `/attachment/download/${this._id}/${this.name}`);
    return '';
});
exports.default = exports.AttachmentModel.schema;
exports.ATTACHMENT_POPULATE = ['createdBy'];
//# sourceMappingURL=attachment.schema.js.map