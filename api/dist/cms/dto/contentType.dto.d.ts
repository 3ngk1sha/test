import { FieldType } from '@/setting/schemas/types';
import { DtoConfig } from '@/utils/types/dto.types';
export declare class ContentField {
    name: string;
    label: string;
    type: `${FieldType}`;
}
export declare class ContentTypeCreateDto {
    name: string;
    fields?: ContentField[];
}
declare const ContentTypeUpdateDto_base: import("@nestjs/common").Type<Partial<ContentTypeCreateDto>>;
export declare class ContentTypeUpdateDto extends ContentTypeUpdateDto_base {
}
export type ContentTypeDto = DtoConfig<{
    create: ContentTypeCreateDto;
}>;
export {};
