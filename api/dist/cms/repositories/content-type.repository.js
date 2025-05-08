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
exports.ContentTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const block_service_1 = require("../../chat/services/block.service");
const base_repository_1 = require("../../utils/generics/base-repository");
const content_type_schema_1 = require("../schemas/content-type.schema");
const content_schema_1 = require("../schemas/content.schema");
let ContentTypeRepository = class ContentTypeRepository extends base_repository_1.BaseRepository {
    constructor(model, contentModel, blockService) {
        super(model, content_type_schema_1.ContentType);
        this.model = model;
        this.contentModel = contentModel;
        this.blockService = blockService;
    }
    async preDelete(_query, criteria) {
        const entityId = criteria._id;
        const associatedBlocks = await this.blockService?.findOne({
            'options.content.entity': entityId,
        });
        if (associatedBlocks) {
            throw new common_1.ForbiddenException(`Content type have blocks associated to it`);
        }
        if (criteria._id) {
            await this.contentModel.deleteMany({ entity: criteria._id });
        }
        else {
            throw new Error('Attempted to delete content type using unknown criteria');
        }
    }
};
exports.ContentTypeRepository = ContentTypeRepository;
exports.ContentTypeRepository = ContentTypeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(content_type_schema_1.ContentType.name)),
    __param(1, (0, mongoose_1.InjectModel)(content_schema_1.Content.name)),
    __param(2, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        block_service_1.BlockService])
], ContentTypeRepository);
//# sourceMappingURL=content-type.repository.js.map