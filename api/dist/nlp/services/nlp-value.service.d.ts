import { DeleteResult } from '@/utils/generics/base-repository';
import { BaseService } from '@/utils/generics/base-service';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { Format } from '@/utils/types/format.types';
import { NlpValueDto } from '../dto/nlp-value.dto';
import { NlpValueRepository } from '../repositories/nlp-value.repository';
import { NlpEntity } from '../schemas/nlp-entity.schema';
import { NlpValue, NlpValueFull, NlpValuePopulate, TNlpValueCount } from '../schemas/nlp-value.schema';
import { NlpSampleEntityValue } from '../schemas/types';
import { NlpEntityService } from './nlp-entity.service';
export declare class NlpValueService extends BaseService<NlpValue, NlpValuePopulate, NlpValueFull, NlpValueDto> {
    readonly repository: NlpValueRepository;
    private readonly nlpEntityService;
    constructor(repository: NlpValueRepository, nlpEntityService: NlpEntityService);
    deleteCascadeOne(id: string): Promise<DeleteResult>;
    storeNewValues(sampleText: string, sampleEntities: NlpSampleEntityValue[], storedEntities: NlpEntity[]): Promise<NlpSampleEntityValue[]>;
    storeValues(sampleText: string, sampleEntities: NlpSampleEntityValue[]): Promise<NlpValue[]>;
    findWithCount<F extends Format>(format: F, pageQuery: PageQueryDto<NlpValue>, filters: TFilterQuery<NlpValue>): Promise<TNlpValueCount<F>[]>;
}
