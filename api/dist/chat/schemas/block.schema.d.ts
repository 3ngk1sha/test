import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { Category } from './category.schema';
import { Label } from './label.schema';
import { CaptureVar } from './types/capture-var';
import { BlockMessage } from './types/message';
import { BlockOptions } from './types/options';
import { Pattern } from './types/pattern';
import { Position } from './types/position';
export declare class BlockStub extends BaseSchema {
    name: string;
    patterns: Pattern[];
    outcomes: string[];
    trigger_labels: unknown;
    assign_labels: unknown;
    trigger_channels: string[];
    options: BlockOptions;
    message: BlockMessage;
    nextBlocks: unknown;
    attachedBlock: unknown;
    category: unknown;
    starts_conversation: boolean;
    capture_vars: CaptureVar[];
    position: Position;
    builtin: boolean;
}
export declare class Block extends BlockStub {
    trigger_labels: string[];
    assign_labels: string[];
    nextBlocks: string[];
    attachedBlock: string | null;
    category: string | null;
    previousBlocks?: never;
    attachedToBlock?: never;
}
export declare class BlockFull extends BlockStub {
    trigger_labels: Label[];
    assign_labels: Label[];
    nextBlocks: Block[];
    attachedBlock: Block | null;
    category: Category | null;
    previousBlocks?: Block[];
    attachedToBlock?: Block;
}
export type BlockDocument = THydratedDocument<Block>;
export declare const BlockModel: ModelDefinition;
declare const _default: any;
export default _default;
export type BlockPopulate = keyof TFilterPopulateFields<Block, BlockStub>;
export declare const BLOCK_POPULATE: BlockPopulate[];
