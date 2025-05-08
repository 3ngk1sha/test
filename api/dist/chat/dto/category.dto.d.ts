import { DtoConfig } from '@/utils/types/dto.types';
export declare class CategoryCreateDto {
    label: string;
    builtin?: boolean;
    zoom?: number;
    offset?: [number, number];
}
declare const CategoryUpdateDto_base: import("@nestjs/common").Type<Partial<CategoryCreateDto>>;
export declare class CategoryUpdateDto extends CategoryUpdateDto_base {
}
export type CategoryDto = DtoConfig<{
    create: CategoryCreateDto;
}>;
export {};
