import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { SettingType } from './types';
export declare class Setting extends BaseSchema {
    group: string;
    subgroup?: string;
    label: string;
    type: SettingType;
    value: any;
    options?: string[];
    config?: Record<string, any>;
    weight?: number;
    translatable?: boolean;
}
export declare const SettingModel: ModelDefinition;
declare const _default: any;
export default _default;
