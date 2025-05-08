import { NlpEntityStub } from './nlp-entity.schema';
import { NlpValueStub } from './nlp-value.schema';
export interface NlpSampleEntityValue {
    entity: string;
    value: string;
    start?: number;
    end?: number;
}
export type NlpEntityMap<T extends NlpEntityStub> = {
    [entityId: string]: T;
};
export type NlpValueMap<T extends NlpValueStub> = {
    [valueId: string]: T;
};
export declare enum NlpSampleState {
    train = "train",
    test = "test",
    inbox = "inbox"
}
