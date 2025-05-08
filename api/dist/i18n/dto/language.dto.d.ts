import { DtoConfig } from '@/utils/types/dto.types';
export declare class LanguageCreateDto {
    title: string;
    code: string;
    isRTL: boolean;
    isDefault?: boolean;
}
declare const LanguageUpdateDto_base: import("@nestjs/mapped-types").MappedType<Partial<LanguageCreateDto>>;
export declare class LanguageUpdateDto extends LanguageUpdateDto_base {
}
export type LanguageDto = DtoConfig<{
    create: LanguageCreateDto;
}>;
export {};
