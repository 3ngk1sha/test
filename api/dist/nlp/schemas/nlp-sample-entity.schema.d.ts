import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { NlpEntity } from './nlp-entity.schema';
import { NlpSample } from './nlp-sample.schema';
import { NlpValue } from './nlp-value.schema';
export declare class NlpSampleEntityStub extends BaseSchema {
    start?: number;
    end?: number;
    entity: unknown;
    value: unknown;
    sample: unknown;
}
export declare class NlpSampleEntity extends NlpSampleEntityStub {
    start?: number;
    end?: number;
    entity: string;
    value: string;
    sample: string;
}
export declare class NlpSampleEntityFull extends NlpSampleEntityStub {
    start?: number;
    end?: number;
    entity: NlpEntity;
    value: NlpValue;
    sample: NlpSample;
}
export type NlpSampleEntityDocument = THydratedDocument<NlpSampleEntity>;
export declare const NlpSampleEntityModel: ModelDefinition;
declare const _default: any;
export default _default;
export type NlpSampleEntityPopulate = keyof TFilterPopulateFields<NlpSampleEntity, NlpSampleEntityStub>;
export declare const NLP_SAMPLE_ENTITY_POPULATE: NlpSampleEntityPopulate[];
