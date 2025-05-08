import { DtoConfig } from '@/utils/types/dto.types';
import { CaptureVar } from '../schemas/types/capture-var';
import { BlockMessage } from '../schemas/types/message';
import { BlockOptions } from '../schemas/types/options';
import { Pattern } from '../schemas/types/pattern';
import { Position } from '../schemas/types/position';
export declare class BlockCreateDto {
    name: string;
    patterns?: Pattern[];
    outcomes?: string[];
    trigger_labels?: string[];
    assign_labels?: string[];
    trigger_channels?: string[];
    options?: BlockOptions;
    message: BlockMessage;
    nextBlocks?: string[];
    attachedBlock?: string | null;
    category: string | null;
    starts_conversation?: boolean;
    capture_vars?: CaptureVar[];
    position: Position;
}
declare const BlockUpdateDto_base: import("@nestjs/common").Type<Partial<Omit<BlockCreateDto, "trigger_labels" | "assign_labels" | "patterns" | "outcomes" | "trigger_channels">>>;
export declare class BlockUpdateDto extends BlockUpdateDto_base {
    patterns?: Pattern[];
    outcomes?: string[];
    trigger_labels?: string[];
    assign_labels?: string[];
    trigger_channels?: string[];
}
export type BlockDto = DtoConfig<{
    create: BlockCreateDto;
}>;
export {};
