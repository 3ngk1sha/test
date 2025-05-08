/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Document, Model, Query, Types, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { BaseRepository, DeleteResult } from '@/utils/generics/base-repository';
import { TFilterQuery } from '@/utils/types/filter.types';
import { BlockCreateDto, BlockDto, BlockUpdateDto } from '../dto/block.dto';
import { Block, BlockFull, BlockPopulate } from '../schemas/block.schema';
export declare class BlockRepository extends BaseRepository<Block, BlockPopulate, BlockFull, BlockDto> {
    readonly model: Model<Block>;
    constructor(model: Model<Block>);
    checkDeprecatedAttachmentUrl(block: BlockCreateDto | BlockUpdateDto): void;
    preCreate(_doc: Document<unknown, object, Block> & Block & {
        _id: Types.ObjectId;
    }): Promise<void>;
    preUpdate(_query: Query<Document<Block, any, any>, Document<Block, any, any>, unknown, Block, 'findOneAndUpdate'>, criteria: TFilterQuery<Block>, updates: UpdateWithAggregationPipeline | UpdateQuery<Document<Block, any, any>>): Promise<void>;
    preUpdateMany(_query: Query<Document<Block, any, any>, Document<Block, any, any>, unknown, Block, 'updateMany', Record<string, never>>, criteria: TFilterQuery<Block>, updates: UpdateQuery<Document<Block, any, any>>): Promise<void>;
    prepareBlocksInCategoryUpdateScope(category: string, ids: string[]): Promise<void>;
    prepareBlocksOutOfCategoryUpdateScope(otherBlocks: Block[], ids: string[]): Promise<void>;
    postDelete(_query: Query<DeleteResult, Document<Block, any, any>, unknown, Block, 'deleteOne' | 'deleteMany'>, result: DeleteResult): Promise<void>;
    preDelete(_query: Query<DeleteResult, Document<Block, any, any>, unknown, Block, 'deleteOne' | 'deleteMany'>, criteria: TFilterQuery<Block>): Promise<void>;
}
