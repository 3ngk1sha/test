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
exports.BLOCK_POPULATE = exports.BlockModel = exports.BlockFull = exports.Block = exports.BlockStub = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const zod_1 = require("zod");
const base_schema_1 = require("../../utils/generics/base-schema");
const lifecycle_hook_manager_1 = require("../../utils/generics/lifecycle-hook-manager");
const zod_validation_1 = require("../../utils/helpers/zod-validation");
const category_schema_1 = require("./category.schema");
const label_schema_1 = require("./label.schema");
const capture_var_1 = require("./types/capture-var");
const message_1 = require("./types/message");
const pattern_1 = require("./types/pattern");
const position_1 = require("./types/position");
let BlockStub = class BlockStub extends base_schema_1.BaseSchema {
};
exports.BlockStub = BlockStub;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], BlockStub.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        validate: (0, zod_validation_1.buildZodSchemaValidator)(zod_1.z.array(pattern_1.patternSchema)),
        default: [],
    }),
    __metadata("design:type", Array)
], BlockStub.prototype, "patterns", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        default: [],
    }),
    __metadata("design:type", Array)
], BlockStub.prototype, "outcomes", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'Label',
            default: [],
        },
    ]),
    __metadata("design:type", Object)
], BlockStub.prototype, "trigger_labels", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'Label',
            default: [],
        },
    ]),
    __metadata("design:type", Object)
], BlockStub.prototype, "assign_labels", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        default: [],
    }),
    __metadata("design:type", Array)
], BlockStub.prototype, "trigger_channels", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        default: {},
    }),
    __metadata("design:type", Object)
], BlockStub.prototype, "options", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        validate: (0, zod_validation_1.buildZodSchemaValidator)(message_1.blockMessageObjectSchema),
    }),
    __metadata("design:type", Object)
], BlockStub.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'Block',
            default: [],
        },
    ]),
    __metadata("design:type", Object)
], BlockStub.prototype, "nextBlocks", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Block',
    }),
    __metadata("design:type", Object)
], BlockStub.prototype, "attachedBlock", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Category',
    }),
    __metadata("design:type", Object)
], BlockStub.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], BlockStub.prototype, "starts_conversation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        validate: (0, zod_validation_1.buildZodSchemaValidator)(zod_1.z.array(capture_var_1.captureVarSchema)),
        default: [],
    }),
    __metadata("design:type", Array)
], BlockStub.prototype, "capture_vars", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        validate: (0, zod_validation_1.buildZodSchemaValidator)(position_1.positionSchema),
    }),
    __metadata("design:type", Object)
], BlockStub.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], BlockStub.prototype, "builtin", void 0);
exports.BlockStub = BlockStub = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BlockStub);
let Block = class Block extends BlockStub {
};
exports.Block = Block;
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.trigger_labels.map((elem) => elem.toString())),
    __metadata("design:type", Array)
], Block.prototype, "trigger_labels", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.assign_labels.map((elem) => elem.toString())),
    __metadata("design:type", Array)
], Block.prototype, "assign_labels", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.nextBlocks.map((elem) => elem.toString())),
    __metadata("design:type", Array)
], Block.prototype, "nextBlocks", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj.attachedBlock ? obj.attachedBlock.toString() : null),
    __metadata("design:type", Object)
], Block.prototype, "attachedBlock", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => (obj.category ? obj.category.toString() : null)),
    __metadata("design:type", Object)
], Block.prototype, "category", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", void 0)
], Block.prototype, "previousBlocks", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", void 0)
], Block.prototype, "attachedToBlock", void 0);
exports.Block = Block = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Block);
let BlockFull = class BlockFull extends BlockStub {
};
exports.BlockFull = BlockFull;
__decorate([
    (0, class_transformer_1.Type)(() => label_schema_1.Label),
    __metadata("design:type", Array)
], BlockFull.prototype, "trigger_labels", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => label_schema_1.Label),
    __metadata("design:type", Array)
], BlockFull.prototype, "assign_labels", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Block),
    __metadata("design:type", Array)
], BlockFull.prototype, "nextBlocks", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Block),
    __metadata("design:type", Object)
], BlockFull.prototype, "attachedBlock", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => category_schema_1.Category),
    __metadata("design:type", Object)
], BlockFull.prototype, "category", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Block),
    __metadata("design:type", Array)
], BlockFull.prototype, "previousBlocks", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Block),
    __metadata("design:type", Block)
], BlockFull.prototype, "attachedToBlock", void 0);
exports.BlockFull = BlockFull = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BlockFull);
exports.BlockModel = lifecycle_hook_manager_1.LifecycleHookManager.attach({
    name: Block.name,
    schema: mongoose_1.SchemaFactory.createForClass(BlockStub),
});
exports.BlockModel.schema.virtual('previousBlocks', {
    ref: 'Block',
    localField: '_id',
    foreignField: 'nextBlocks',
    justOne: false,
});
exports.BlockModel.schema.virtual('attachedToBlock', {
    ref: 'Block',
    localField: '_id',
    foreignField: 'attachedBlock',
    justOne: true,
});
exports.default = exports.BlockModel.schema;
exports.BLOCK_POPULATE = [
    'trigger_labels',
    'assign_labels',
    'nextBlocks',
    'attachedBlock',
    'category',
    'previousBlocks',
    'attachedToBlock',
];
//# sourceMappingURL=block.schema.js.map