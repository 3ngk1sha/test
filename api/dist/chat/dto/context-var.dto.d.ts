import { DtoConfig } from '@/utils/types/dto.types';
export declare class ContextVarCreateDto {
    label: string;
    name: string;
    permanent?: boolean;
}
declare const ContextVarUpdateDto_base: import("@nestjs/common").Type<Partial<ContextVarCreateDto>>;
export declare class ContextVarUpdateDto extends ContextVarUpdateDto_base {
}
export type ContextVarDto = DtoConfig<{
    create: ContextVarCreateDto;
}>;
export {};
