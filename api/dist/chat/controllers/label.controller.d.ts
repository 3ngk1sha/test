import { BaseController } from '@/utils/generics/base-controller';
import { DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { LabelCreateDto, LabelUpdateDto } from '../dto/label.dto';
import { Label, LabelFull, LabelPopulate, LabelStub } from '../schemas/label.schema';
import { LabelService } from '../services/label.service';
export declare class LabelController extends BaseController<Label, LabelStub, LabelPopulate, LabelFull> {
    private readonly labelService;
    constructor(labelService: LabelService);
    findPage(pageQuery: PageQueryDto<Label>, populate: string[], filters: TFilterQuery<Label>): Promise<LabelFull[]>;
    filterCount(filters?: TFilterQuery<Label>): Promise<{
        count: number;
    }>;
    findOne(id: string, populate: string[]): Promise<Label | LabelFull>;
    create(label: LabelCreateDto): Promise<Label>;
    updateOne(id: string, labelUpdate: LabelUpdateDto): Promise<Label>;
    deleteOne(id: string): Promise<DeleteResult>;
    deleteMany(ids?: string[]): Promise<DeleteResult>;
}
