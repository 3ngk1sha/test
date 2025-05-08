import { DtoConfig } from '@/utils/types/dto.types';
export declare class NlpValueCreateDto {
    value: string;
    expressions?: string[];
    metadata?: Record<string, any>;
    doc?: string;
    builtin?: boolean;
    entity: string | null;
}
export declare class NlpValueUpdateDto {
    foreign_id?: string;
    value?: string;
    expressions?: string[];
    entity?: string | null;
    doc?: string;
    builtin?: boolean;
}
export type NlpValueDto = DtoConfig<{
    create: NlpValueCreateDto;
    update: NlpValueUpdateDto;
}>;
