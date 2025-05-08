import { BaseController } from '@/utils/generics/base-controller';
import { DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { ContextVarCreateDto, ContextVarUpdateDto } from '../dto/context-var.dto';
import { ContextVar } from '../schemas/context-var.schema';
import { ContextVarService } from '../services/context-var.service';
export declare class ContextVarController extends BaseController<ContextVar> {
    private readonly contextVarService;
    constructor(contextVarService: ContextVarService);
    findPage(pageQuery: PageQueryDto<ContextVar>, filters: TFilterQuery<ContextVar>): Promise<ContextVar[]>;
    filterCount(filters?: TFilterQuery<ContextVar>): Promise<{
        count: number;
    }>;
    findOne(id: string): Promise<ContextVar>;
    create(contextVar: ContextVarCreateDto): Promise<ContextVar>;
    updateOne(id: string, contextVarUpdate: ContextVarUpdateDto): Promise<ContextVar>;
    deleteOne(id: string): Promise<DeleteResult>;
    deleteMany(ids?: string[]): Promise<DeleteResult>;
}
