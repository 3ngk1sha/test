import { ModelDefinition } from '@nestjs/mongoose';
import { Language } from '@/i18n/schemas/language.schema';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { NlpSampleEntity } from './nlp-sample-entity.schema';
import { NlpSampleState } from './types';
export declare class NlpSampleStub extends BaseSchema {
    text: string;
    trained: boolean;
    type: keyof typeof NlpSampleState;
    language: unknown | null;
}
export declare class NlpSample extends NlpSampleStub {
    language: string | null;
    entities?: never;
}
export declare class NlpSampleFull extends NlpSampleStub {
    language: Language | null;
    entities: NlpSampleEntity[];
}
export type NlpSampleDocument = THydratedDocument<NlpSample>;
export declare const NlpSampleModel: ModelDefinition;
declare const _default: any;
export default _default;
export type NlpSamplePopulate = keyof TFilterPopulateFields<NlpSample, NlpSampleStub>;
export declare const NLP_SAMPLE_POPULATE: NlpSamplePopulate[];
