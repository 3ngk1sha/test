import { DtoConfig } from '@/utils/types/dto.types';
export declare class ContentCreateDto {
    entity: string;
    title: string;
    status?: boolean;
    dynamicFields: Record<string, any>;
}
declare const ContentUpdateDto_base: import("@nestjs/common").Type<Partial<ContentCreateDto>>;
export declare class ContentUpdateDto extends ContentUpdateDto_base {
}
export type ContentDto = DtoConfig<{
    create: ContentCreateDto;
}>;
export {};
