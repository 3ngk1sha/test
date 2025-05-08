import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { THydratedDocument } from '@/utils/types/filter.types';
export declare class Translation extends BaseSchema {
    str: string;
    translations: Record<string, string>;
}
export declare const TranslationModel: ModelDefinition;
export type TranslationDocument = THydratedDocument<Translation>;
declare const _default: any;
export default _default;
