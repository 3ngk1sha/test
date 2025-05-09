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
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const category_schema_1 = require("../schemas/category.schema");
const block_service_1 = require("../services/block.service");
let CategoryRepository = class CategoryRepository extends base_repository_1.BaseRepository {
    constructor(model, blockService) {
        super(model, category_schema_1.Category);
        this.model = model;
        this.blockService = blockService;
    }
    async preDelete(query, criteria) {
        criteria = query.getQuery();
        const ids = Array.isArray(criteria._id?.$in)
            ? criteria._id.$in
            : Array.isArray(criteria._id)
                ? criteria._id
                : [criteria._id];
        for (const id of ids) {
            const associatedBlocks = await this.blockService.findOne({
                category: id,
            });
            if (associatedBlocks) {
                const category = await this.findOne({ _id: id });
                throw new common_1.ForbiddenException(`Category ${category?.label || id} has blocks associated with it`);
            }
        }
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        block_service_1.BlockService])
], CategoryRepository);
//# sourceMappingURL=category.repository.js.map