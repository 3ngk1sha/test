import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { Subscriber } from './subscriber.schema';
export declare class LabelStub extends BaseSchema {
    title: string;
    name: string;
    label_id?: Record<string, any>;
    description: string;
    builtin: boolean;
}
export declare class Label extends LabelStub {
    users?: never;
}
export declare class LabelFull extends LabelStub {
    users?: Subscriber[];
}
export type LabelDocument = THydratedDocument<Label>;
export declare const LabelModel: ModelDefinition;
declare const _default: any;
export default _default;
export type LabelPopulate = keyof TFilterPopulateFields<Label, LabelStub>;
export declare const LABEL_POPULATE: LabelPopulate[];
