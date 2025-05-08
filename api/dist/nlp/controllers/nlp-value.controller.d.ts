import { BaseController } from '@/utils/generics/base-controller';
import { DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { NlpValueCreateDto, NlpValueUpdateDto } from '../dto/nlp-value.dto';
import { NlpValue, NlpValueFull, NlpValuePopulate, NlpValueStub } from '../schemas/nlp-value.schema';
import { NlpEntityService } from '../services/nlp-entity.service';
import { NlpValueService } from '../services/nlp-value.service';
export declare class NlpValueController extends BaseController<NlpValue, NlpValueStub, NlpValuePopulate, NlpValueFull> {
    private readonly nlpValueService;
    private readonly nlpEntityService;
    constructor(nlpValueService: NlpValueService, nlpEntityService: NlpEntityService);
    create(createNlpValueDto: NlpValueCreateDto): Promise<NlpValue>;
    filterCount(filters?: TFilterQuery<NlpValue>): Promise<{
        count: number;
    }>;
    findOne(id: string, populate: string[]): Promise<NlpValue | NlpValueFull>;
    findWithCount(pageQuery: PageQueryDto<NlpValue>, populate: string[], filters: TFilterQuery<NlpValue>): Promise<(import("../schemas/nlp-value.schema").NlpValueWithCount | import("../schemas/nlp-value.schema").NlpValueFullWithCount)[]>;
    updateOne(id: string, updateNlpValueDto: NlpValueUpdateDto): Promise<NlpValue>;
    deleteOne(id: string): Promise<DeleteResult>;
    deleteMany(ids?: string[]): Promise<DeleteResult>;
}
