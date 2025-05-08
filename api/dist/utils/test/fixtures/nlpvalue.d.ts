import { NlpValueCreateDto } from '@/nlp/dto/nlp-value.dto';
export declare const nlpValueFixtures: NlpValueCreateDto[];
export declare const installNlpValueFixtures: () => Promise<{
    nlpEntities: any[];
    nlpValues: any[];
}>;
