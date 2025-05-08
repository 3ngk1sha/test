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
exports.NlpValueRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const format_types_1 = require("../../utils/types/format.types");
const nlp_value_schema_1 = require("../schemas/nlp-value.schema");
const nlp_sample_entity_repository_1 = require("./nlp-sample-entity.repository");
let NlpValueRepository = class NlpValueRepository extends base_repository_1.BaseRepository {
    constructor(model, nlpSampleEntityRepository) {
        super(model, nlp_value_schema_1.NlpValue, nlp_value_schema_1.NLP_VALUE_POPULATE, nlp_value_schema_1.NlpValueFull);
        this.model = model;
        this.nlpSampleEntityRepository = nlpSampleEntityRepository;
    }
    async postCreate(created) {
        if (!created.builtin) {
            this.eventEmitter.emit('hook:nlpValue:create', created);
        }
    }
    async postUpdate(_query, updated) {
        if (!updated?.builtin) {
            this.eventEmitter.emit('hook:nlpValue:update', updated);
        }
    }
    async preDelete(_query, criteria) {
        if (criteria._id) {
            await this.nlpSampleEntityRepository.deleteMany({ value: criteria._id });
            const entities = await this.find(typeof criteria === 'string' ? { _id: criteria } : criteria);
            entities
                .filter((e) => !e.builtin)
                .map((e) => {
                this.eventEmitter.emit('hook:nlpValue:delete', e);
            });
        }
        else if (criteria.entity) {
        }
        else {
            throw new Error('Attempted to delete a NLP value using unknown criteria');
        }
    }
    getSortDirection(sortOrder) {
        return typeof sortOrder === 'number'
            ? sortOrder
            : sortOrder.toString().toLowerCase() === 'desc'
                ? -1
                : 1;
    }
    async aggregateWithCount(format, { limit = 10, skip = 0, sort = ['createdAt', 'desc'], }, { $and = [], ...rest }) {
        const pipeline = [
            {
                $match: {
                    ...rest,
                    ...($and.length
                        ? {
                            $and: $and.map(({ entity, ...rest }) => ({
                                ...rest,
                                ...(entity
                                    ? { entity: new mongoose_2.Types.ObjectId(String(entity)) }
                                    : {}),
                            })),
                        }
                        : {}),
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
            {
                $lookup: {
                    from: 'nlpsampleentities',
                    localField: '_id',
                    foreignField: 'value',
                    as: '_sampleEntities',
                },
            },
            {
                $unwind: {
                    path: '$_sampleEntities',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: '$_id',
                    _originalDoc: {
                        $first: {
                            $unsetField: { input: '$$ROOT', field: 'nlpSamplesCount' },
                        },
                    },
                    nlpSamplesCount: {
                        $sum: { $cond: [{ $ifNull: ['$_sampleEntities', false] }, 1, 0] },
                    },
                },
            },
            {
                $replaceWith: {
                    $mergeObjects: [
                        '$_originalDoc',
                        { nlpSamplesCount: '$nlpSamplesCount' },
                    ],
                },
            },
            ...(format === format_types_1.Format.FULL
                ? [
                    {
                        $lookup: {
                            from: 'nlpentities',
                            localField: 'entity',
                            foreignField: '_id',
                            as: 'entity',
                        },
                    },
                    {
                        $unwind: '$entity',
                    },
                ]
                : []),
            {
                $sort: {
                    [sort[0]]: this.getSortDirection(sort[1]),
                    _id: this.getSortDirection(sort[1]),
                },
            },
        ];
        return await this.model.aggregate(pipeline).exec();
    }
    async findWithCount(format, pageQuery, filterQuery) {
        try {
            const aggregatedResults = await this.aggregateWithCount(format, pageQuery, filterQuery);
            if (format === format_types_1.Format.FULL) {
                return (0, class_transformer_1.plainToInstance)(nlp_value_schema_1.NlpValueFullWithCount, aggregatedResults, {
                    excludePrefixes: ['_'],
                });
            }
            return (0, class_transformer_1.plainToInstance)(nlp_value_schema_1.NlpValueWithCount, aggregatedResults, {
                excludePrefixes: ['_'],
            });
        }
        catch (error) {
            this.logger.error(`Error in findWithCount: ${error.message}`, error);
            throw error;
        }
    }
};
exports.NlpValueRepository = NlpValueRepository;
exports.NlpValueRepository = NlpValueRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(nlp_value_schema_1.NlpValue.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        nlp_sample_entity_repository_1.NlpSampleEntityRepository])
], NlpValueRepository);
//# sourceMappingURL=nlp-value.repository.js.map