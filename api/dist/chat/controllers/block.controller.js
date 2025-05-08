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
exports.BlockController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const plugins_service_1 = require("../../plugins/plugins.service");
const types_1 = require("../../plugins/types");
const user_service_1 = require("../../user/services/user.service");
const base_controller_1 = require("../../utils/generics/base-controller");
const pagination_query_pipe_1 = require("../../utils/pagination/pagination-query.pipe");
const populate_pipe_1 = require("../../utils/pipes/populate.pipe");
const search_filter_pipe_1 = require("../../utils/pipes/search-filter.pipe");
const block_dto_1 = require("../dto/block.dto");
const block_service_1 = require("../services/block.service");
const category_service_1 = require("../services/category.service");
const label_service_1 = require("../services/label.service");
let BlockController = class BlockController extends base_controller_1.BaseController {
    constructor(blockService, categoryService, labelService, userService, pluginsService) {
        super(blockService);
        this.blockService = blockService;
        this.categoryService = categoryService;
        this.labelService = labelService;
        this.userService = userService;
        this.pluginsService = pluginsService;
    }
    async find(populate, filters, pageQuery) {
        return this.canPopulate(populate)
            ? await this.blockService.findAndPopulate(filters, pageQuery)
            : await this.blockService.find(filters, pageQuery);
    }
    async findSettings(pluginName) {
        try {
            if (!pluginName) {
                throw new common_1.BadRequestException('Plugin name must be supplied as a query param');
            }
            const plugin = this.pluginsService.getPlugin(types_1.PluginType.block, pluginName);
            if (!plugin) {
                throw new common_1.NotFoundException('Plugin Not Found');
            }
            return await plugin.getDefaultSettings();
        }
        catch (e) {
            this.logger.error('Unable to fetch plugin settings', e);
            throw e;
        }
    }
    async findAll() {
        try {
            const plugins = this.pluginsService
                .getAllByType(types_1.PluginType.block)
                .map(async (p) => {
                const defaultSettings = await p.getDefaultSettings();
                return {
                    id: p.getName(),
                    namespace: p.getNamespace(),
                    template: {
                        ...p.template,
                        message: {
                            plugin: p.name,
                            args: defaultSettings.reduce((acc, setting) => {
                                acc[setting.label] = setting.value;
                                return acc;
                            }, {}),
                        },
                    },
                    effects: typeof p.effects === 'object' ? Object.keys(p.effects) : [],
                };
            });
            return await Promise.all(plugins);
        }
        catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
    findEffects() {
        try {
            const plugins = this.pluginsService.getAllByType(types_1.PluginType.block);
            const effects = Object.keys(plugins)
                .filter((plugin) => typeof plugins[plugin].effects === 'object' &&
                Object.keys(plugins[plugin].effects).length > 0)
                .map((plugin) => ({
                name: plugin,
                title: plugins[plugin].title,
            }));
            return effects;
        }
        catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
    async findOne(id, populate) {
        const doc = this.canPopulate(populate)
            ? await this.blockService.findOneAndPopulate(id)
            : await this.blockService.findOne(id);
        if (!doc) {
            this.logger.warn(`Unable to find Block by id ${id}`);
            throw new common_1.NotFoundException(`Block with ID ${id} not found`);
        }
        return doc;
    }
    async create(block) {
        this.validate({
            dto: block,
            allowedIds: {
                category: block.category
                    ? (await this.categoryService.findOne(block.category))?.id
                    : null,
                attachedBlock: block.attachedBlock
                    ? (await this.blockService.findOne(block.attachedBlock))?.id
                    : null,
                nextBlocks: (await this.blockService.find({
                    _id: {
                        $in: block.nextBlocks,
                    },
                })).map(({ id }) => id),
                assign_labels: (await this.labelService.find({
                    _id: {
                        $in: block.assign_labels,
                    },
                })).map(({ id }) => id),
                trigger_labels: (await this.labelService.find({
                    _id: {
                        $in: block.trigger_labels,
                    },
                })).map(({ id }) => id),
            },
        });
        if (block.options?.assignTo) {
            const user = await this.userService.findOne(block.options.assignTo);
            if (!user) {
                throw new common_1.BadRequestException(`options.assignTo with ID ${block.options.assignTo} not found`);
            }
        }
        return await this.blockService.create(block);
    }
    async updateMany(body) {
        if (!body.ids || body.ids.length === 0) {
            throw new common_1.BadRequestException('No IDs provided  to perform the update');
        }
        const updates = await this.blockService.updateMany({
            _id: { $in: body.ids },
        }, body.payload);
        return updates;
    }
    async updateOne(id, blockUpdate) {
        return await this.blockService.updateOne(id, blockUpdate);
    }
    async deleteOne(id) {
        const result = await this.blockService.deleteOne(id);
        if (result.deletedCount === 0) {
            this.logger.warn(`Unable to delete Block by id ${id}`);
            throw new common_1.NotFoundException(`Block with ID ${id} not found`);
        }
        return result;
    }
    async deleteMany(ids) {
        if (!ids?.length) {
            throw new common_1.BadRequestException('No IDs provided for deletion.');
        }
        const deleteResult = await this.blockService.deleteMany({
            _id: { $in: ids },
        });
        if (deleteResult.deletedCount === 0) {
            this.logger.warn(`Unable to delete blocks with provided IDs: ${ids}`);
            throw new common_1.NotFoundException('Blocks with provided IDs not found');
        }
        this.logger.log(`Successfully deleted blocks with IDs: ${ids}`);
        return deleteResult;
    }
};
exports.BlockController = BlockController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __param(1, (0, common_1.Query)(new search_filter_pipe_1.SearchFilterPipe({ allowedFields: ['category'] }))),
    __param(2, (0, common_1.Query)(pagination_query_pipe_1.PageQueryPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "find", null);
__decorate([
    (0, common_1.Get)('customBlocks/settings'),
    __param(0, (0, common_1.Query)('plugin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "findSettings", null);
__decorate([
    (0, common_1.Get)('customBlocks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('effects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], BlockController.prototype, "findEffects", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "findOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [block_dto_1.BlockCreateDto]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "create", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "updateMany", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, block_dto_1.BlockUpdateDto]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "updateOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "deleteOne", null);
__decorate([
    (0, nestjs_csrf_1.CsrfCheck)(true),
    (0, common_1.Delete)(''),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "deleteMany", null);
exports.BlockController = BlockController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('Block'),
    __metadata("design:paramtypes", [block_service_1.BlockService,
        category_service_1.CategoryService,
        label_service_1.LabelService,
        user_service_1.UserService,
        plugins_service_1.PluginService])
], BlockController);
//# sourceMappingURL=block.controller.js.map