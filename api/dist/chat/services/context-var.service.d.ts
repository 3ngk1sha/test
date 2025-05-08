import { BaseService } from '@/utils/generics/base-service';
import { ContextVarDto } from '../dto/context-var.dto';
import { ContextVarRepository } from '../repositories/context-var.repository';
import { Block, BlockFull } from '../schemas/block.schema';
import { ContextVar } from '../schemas/context-var.schema';
export declare class ContextVarService extends BaseService<ContextVar, never, never, ContextVarDto> {
    readonly repository: ContextVarRepository;
    constructor(repository: ContextVarRepository);
    getContextVarsByBlock(block: Block | BlockFull): Promise<Record<string, ContextVar>>;
}
