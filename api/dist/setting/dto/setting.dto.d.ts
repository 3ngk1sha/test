import { SettingType } from '../schemas/types';
export declare class SettingCreateDto {
    group: string;
    subgroup?: string;
    label: string;
    type: SettingType;
    value: any;
    options?: string[];
    config?: Record<string, any>;
    weight: number;
    translatable?: boolean;
}
export declare class SettingUpdateDto {
    value: null | string | number | boolean | string[] | Record<string, any>;
}
