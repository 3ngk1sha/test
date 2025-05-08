import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { THydratedDocument } from '@/utils/types/filter.types';
export declare class Language extends BaseSchema {
    title: string;
    code: string;
    isDefault: boolean;
    isRTL: boolean;
}
export declare const LanguageModel: ModelDefinition;
export type LanguageDocument = THydratedDocument<Language>;
declare const _default: any;
export default _default;
