import { BaseService } from '@/utils/generics/base-service';
import { NlpSampleEntityCreateDto } from '../dto/nlp-sample-entity.dto';
import { NlpSampleEntityRepository } from '../repositories/nlp-sample-entity.repository';
import { NlpSampleEntity, NlpSampleEntityFull, NlpSampleEntityPopulate } from '../schemas/nlp-sample-entity.schema';
import { NlpSample, NlpSampleStub } from '../schemas/nlp-sample.schema';
import { NlpValue } from '../schemas/nlp-value.schema';
import { NlpSampleEntityValue } from '../schemas/types';
import { NlpEntityService } from './nlp-entity.service';
import { NlpValueService } from './nlp-value.service';
export declare class NlpSampleEntityService extends BaseService<NlpSampleEntity, NlpSampleEntityPopulate, NlpSampleEntityFull> {
    readonly repository: NlpSampleEntityRepository;
    private readonly nlpEntityService;
    private readonly nlpValueService;
    constructor(repository: NlpSampleEntityRepository, nlpEntityService: NlpEntityService, nlpValueService: NlpValueService);
    storeSampleEntities(sample: NlpSample, entities: NlpSampleEntityValue[]): Promise<NlpSampleEntity[]>;
    extractKeywordEntities<S extends NlpSampleStub>(sample: S, value: NlpValue): NlpSampleEntityCreateDto[];
}
