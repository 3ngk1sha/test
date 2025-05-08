import { BaseController } from '@/utils/generics/base-controller';
import { DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { NlpEntityCreateDto } from '../dto/nlp-entity.dto';
import { NlpEntity, NlpEntityFull, NlpEntityPopulate, NlpEntityStub } from '../schemas/nlp-entity.schema';
import { NlpEntityService } from '../services/nlp-entity.service';
export declare class NlpEntityController extends BaseController<NlpEntity, NlpEntityStub, NlpEntityPopulate, NlpEntityFull> {
    private readonly nlpEntityService;
    constructor(nlpEntityService: NlpEntityService);
    create(createNlpEntityDto: NlpEntityCreateDto): Promise<NlpEntity>;
    filterCount(filters?: TFilterQuery<NlpEntity>): Promise<{
        count: number;
    }>;
    findOne(id: string, populate: string[]): Promise<NlpEntity | NlpEntityFull>;
    findPage(pageQuery: PageQueryDto<NlpEntity>, populate: string[], filters: TFilterQuery<NlpEntity>): Promise<NlpEntityFull[] | NlpEntity[]>;
    updateOne(id: string, updateNlpEntityDto: NlpEntityCreateDto): Promise<NlpEntity>;
    deleteOne(id: string): Promise<DeleteResult>;
    deleteMany(ids?: string[]): Promise<DeleteResult>;
}
