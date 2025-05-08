import { SettingCreateDto } from '@/setting/dto/setting.dto';
import { HyphenToUnderscore } from '@/utils/types/extension';
import BaseHelper from './lib/base-helper';
import BaseLlmHelper from './lib/base-llm-helper';
import BaseNlpHelper from './lib/base-nlp-helper';
import BaseStorageHelper from './lib/base-storage-helper';
export declare namespace NLU {
    interface ParseEntity {
        entity: string;
        value: string;
        confidence: number;
        start?: number;
        end?: number;
    }
    interface ParseEntities {
        entities: ParseEntity[];
    }
}
export declare namespace LLM {
    interface ResponseSchema {
        type?: ResponseSchemaType;
        format?: string;
        description?: string;
        nullable?: boolean;
        items?: ResponseSchema;
        enum?: string[];
        properties?: {
            [k: string]: ResponseSchema;
        };
        required?: string[];
        example?: unknown;
    }
    enum ResponseSchemaType {
        STRING = "string",
        NUMBER = "number",
        INTEGER = "integer",
        BOOLEAN = "boolean",
        ARRAY = "array",
        OBJECT = "object"
    }
}
export declare enum HelperType {
    NLU = "nlu",
    LLM = "llm",
    STORAGE = "storage",
    UTIL = "util"
}
export type HelperName = `${string}-helper`;
interface HelperTypeMap {
    [HelperType.NLU]: BaseNlpHelper<HelperName>;
    [HelperType.LLM]: BaseLlmHelper<HelperName>;
    [HelperType.STORAGE]: BaseStorageHelper<HelperName>;
    [HelperType.UTIL]: BaseHelper;
}
export type TypeOfHelper<T extends HelperType> = HelperTypeMap[T];
export type HelperRegistry<H extends BaseHelper = BaseHelper> = Map<HelperType, Map<string, H>>;
export type HelperSetting<N extends HelperName = HelperName> = Omit<SettingCreateDto, 'group' | 'weight'> & {
    group: HyphenToUnderscore<N>;
};
export {};
