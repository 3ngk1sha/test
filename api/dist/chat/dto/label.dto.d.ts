import { DtoConfig } from '@/utils/types/dto.types';
export declare class LabelCreateDto {
    title: string;
    name: string;
    description?: string;
    label_id?: Record<string, any>;
}
declare const LabelUpdateDto_base: import("@nestjs/common").Type<Partial<LabelCreateDto>>;
export declare class LabelUpdateDto extends LabelUpdateDto_base {
}
export type LabelDto = DtoConfig<{
    create: LabelCreateDto;
}>;
export {};
