import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { Lookup } from '../dto/nlp-entity.dto';
import { NlpValue } from './nlp-value.schema';
import { NlpEntityMap } from './types';
export declare class NlpEntityStub extends BaseSchema {
    foreign_id?: string;
    name: string;
    lookups: Lookup[];
    doc?: string;
    builtin: boolean;
    static getEntityMap<T extends NlpEntityStub>(entities: T[]): NlpEntityMap<T>;
}
export declare class NlpEntity extends NlpEntityStub {
    values?: never;
}
export declare class NlpEntityFull extends NlpEntityStub {
    values: NlpValue[];
}
export type NlpEntityDocument = THydratedDocument<NlpEntity>;
export declare const NlpEntityModel: ModelDefinition;
declare const _default: any;
export default _default;
export type NlpEntityPopulate = keyof TFilterPopulateFields<NlpEntity, NlpEntityStub>;
export declare const NLP_ENTITY_POPULATE: NlpEntityPopulate[];
