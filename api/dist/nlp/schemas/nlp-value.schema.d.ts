import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { TStubOrFull } from '@/utils/types/format.types';
import { NlpEntity, NlpEntityFull } from './nlp-entity.schema';
import { NlpValueMap } from './types';
export declare class NlpValueStub extends BaseSchema {
    foreign_id?: string;
    value: string;
    expressions: string[];
    metadata: Record<string, any>;
    doc?: string;
    builtin: boolean;
    entity: unknown;
    static getValuesFromEntities(entities: NlpEntityFull[]): NlpValue[];
    static getValueMap<T extends NlpValueStub>(values: T[]): NlpValueMap<T>;
}
export declare class NlpValue extends NlpValueStub {
    entity: string;
}
export declare class NlpValueFull extends NlpValueStub {
    entity: NlpEntity;
}
export declare class NlpValueWithCount extends NlpValue {
    nlpSamplesCount: number;
}
export declare class NlpValueFullWithCount extends NlpValueFull {
    nlpSamplesCount: number;
}
export type NlpValueDocument = THydratedDocument<NlpValue>;
export declare const NlpValueModel: ModelDefinition;
declare const _default: any;
export default _default;
export type NlpValuePopulate = keyof TFilterPopulateFields<NlpValue, NlpValueStub>;
export declare const NLP_VALUE_POPULATE: NlpValuePopulate[];
export type TNlpValueCount<T> = TStubOrFull<T, NlpValueWithCount, NlpValueFullWithCount>;
