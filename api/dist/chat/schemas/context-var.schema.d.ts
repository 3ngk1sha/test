import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { THydratedDocument } from '@/utils/types/filter.types';
export declare class ContextVar extends BaseSchema {
    label: string;
    name: string;
    permanent: boolean;
}
export declare const ContextVarModel: ModelDefinition;
export type ContextVarDocument = THydratedDocument<ContextVar>;
declare const _default: any;
export default _default;
