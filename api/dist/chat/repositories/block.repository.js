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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const block_schema_1 = require("../schemas/block.schema");
let BlockRepository = class BlockRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model, block_schema_1.Block, block_schema_1.BLOCK_POPULATE, block_schema_1.BlockFull);
        this.model = model;
    }
    checkDeprecatedAttachmentUrl(block) {
        if (block.message &&
            'attachment' in block.message &&
            block.message.attachment.payload &&
            'url' in block.message.attachment.payload) {
            this.logger?.error('NOTE: `url` payload has been deprecated in favor of `id`', block.name);
        }
    }
    async preCreate(_doc) {
        if (_doc)
            this.checkDeprecatedAttachmentUrl(_doc);
    }
    async preUpdate(_query, criteria, updates) {
        const update = updates?.['$set'];
        if (update?.category) {
            const movedBlock = await this.findOne(criteria);
            if (!movedBlock) {
                return;
            }
            await this.updateMany({ nextBlocks: movedBlock.id }, { $pull: { nextBlocks: movedBlock.id } });
            await this.updateMany({ attachedBlock: movedBlock.id }, { $set: { attachedBlock: null } });
        }
        this.checkDeprecatedAttachmentUrl(update);
    }
    async preUpdateMany(_query, criteria, updates) {
        const categoryId = updates.$set.category;
        if (categoryId) {
            const movedBlocks = await this.find(criteria);
            if (movedBlocks.length) {
                const ids = movedBlocks.map(({ id }) => id);
                const objIds = ids.map((id) => new mongoose_2.Types.ObjectId(id));
                const objCategoryId = new mongoose_2.Types.ObjectId(categoryId);
                const otherBlocks = await this.find({
                    _id: { $nin: objIds },
                    category: { $ne: objCategoryId },
                    $or: [
                        { attachedBlock: { $in: objIds } },
                        { nextBlocks: { $in: objIds } },
                    ],
                });
                await this.prepareBlocksInCategoryUpdateScope(categoryId, ids);
                await this.prepareBlocksOutOfCategoryUpdateScope(otherBlocks, ids);
            }
        }
    }
    async prepareBlocksInCategoryUpdateScope(category, ids) {
        const blocks = await this.find({
            _id: { $in: ids },
            category: { $ne: category },
        });
        for (const { id, nextBlocks, attachedBlock } of blocks) {
            const updatedNextBlocks = nextBlocks.filter((nextBlock) => ids.includes(nextBlock));
            const updatedAttachedBlock = ids.includes(attachedBlock || '')
                ? attachedBlock
                : null;
            await this.updateOne(id, {
                nextBlocks: updatedNextBlocks,
                attachedBlock: updatedAttachedBlock,
            });
        }
    }
    async prepareBlocksOutOfCategoryUpdateScope(otherBlocks, ids) {
        for (const block of otherBlocks) {
            if (block.attachedBlock && ids.includes(block.attachedBlock)) {
                await this.updateOne(block.id, { attachedBlock: null });
            }
            const nextBlocks = block.nextBlocks?.filter((nextBlock) => !ids.includes(nextBlock));
            if (nextBlocks?.length) {
                await this.updateOne(block.id, { nextBlocks });
            }
        }
    }
    async postDelete(_query, result) {
        if (result.deletedCount > 0) {
        }
    }
    async preDelete(_query, criteria) {
        const docsToDelete = await this.model.find(criteria);
        const idsToDelete = docsToDelete.map(({ id }) => id);
        if (idsToDelete.length > 0) {
            await this.model.updateMany({ attachedBlock: { $in: idsToDelete } }, {
                $set: {
                    attachedBlock: null,
                },
            });
            await this.model.updateMany({ nextBlocks: { $in: idsToDelete } }, {
                $pull: {
                    nextBlocks: { $in: idsToDelete },
                },
            });
        }
    }
};
exports.BlockRepository = BlockRepository;
exports.BlockRepository = BlockRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(block_schema_1.Block.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlockRepository);
//# sourceMappingURL=block.repository.js.map