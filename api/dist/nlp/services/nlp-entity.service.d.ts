import { BaseService } from '@/utils/generics/base-service';
import { Lookup, NlpEntityDto } from '../dto/nlp-entity.dto';
import { NlpEntityRepository } from '../repositories/nlp-entity.repository';
import { NlpEntity, NlpEntityFull, NlpEntityPopulate } from '../schemas/nlp-entity.schema';
import { NlpSampleEntityValue } from '../schemas/types';
import { NlpValueService } from './nlp-value.service';
export declare class NlpEntityService extends BaseService<NlpEntity, NlpEntityPopulate, NlpEntityFull, NlpEntityDto> {
    readonly repository: NlpEntityRepository;
    private readonly nlpValueService;
    constructor(repository: NlpEntityRepository, nlpValueService: NlpValueService);
    deleteCascadeOne(id: string): Promise<import("../../utils/generics/base-repository").DeleteResult>;
    storeNewEntities(sampleText: string, sampleEntities: NlpSampleEntityValue[], lookups?: Lookup[]): Promise<NlpSampleEntityValue[]>;
    storeEntities(sampleEntities: NlpSampleEntityValue[]): Promise<NlpEntity[]>;
}
