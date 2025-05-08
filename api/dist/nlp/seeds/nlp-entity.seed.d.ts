import { BaseSeeder } from '@/utils/generics/base-seeder';
import { NlpEntityDto } from '../dto/nlp-entity.dto';
import { NlpEntityRepository } from '../repositories/nlp-entity.repository';
import { NlpEntity, NlpEntityFull, NlpEntityPopulate } from '../schemas/nlp-entity.schema';
export declare class NlpEntitySeeder extends BaseSeeder<NlpEntity, NlpEntityPopulate, NlpEntityFull, NlpEntityDto> {
    constructor(nlpEntityRepository: NlpEntityRepository);
}
