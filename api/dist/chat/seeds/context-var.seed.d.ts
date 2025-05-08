import { BaseSeeder } from '@/utils/generics/base-seeder';
import { ContextVarDto } from '../dto/context-var.dto';
import { ContextVarRepository } from '../repositories/context-var.repository';
import { ContextVar } from '../schemas/context-var.schema';
export declare class ContextVarSeeder extends BaseSeeder<ContextVar, never, never, ContextVarDto> {
    private readonly contextVarRepository;
    constructor(contextVarRepository: ContextVarRepository);
}
