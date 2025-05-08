import { BaseSeeder } from '@/utils/generics/base-seeder';
import { NlpValueCreateDto, NlpValueDto } from '../dto/nlp-value.dto';
import { NlpEntityRepository } from '../repositories/nlp-entity.repository';
import { NlpValueRepository } from '../repositories/nlp-value.repository';
import { NlpValue, NlpValueFull, NlpValuePopulate } from '../schemas/nlp-value.schema';
export declare class NlpValueSeeder extends BaseSeeder<NlpValue, NlpValuePopulate, NlpValueFull, NlpValueDto> {
    private readonly nlpEntityRepository;
    constructor(nlpValueRepository: NlpValueRepository, nlpEntityRepository: NlpEntityRepository);
    seed(models: NlpValueCreateDto[]): Promise<boolean>;
}
