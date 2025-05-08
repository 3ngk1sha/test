import { DtoConfig } from '@/utils/types/dto.types';
export declare class RoleCreateDto {
    name: string;
    active?: boolean;
}
declare const RoleUpdateDto_base: import("@nestjs/common").Type<Partial<RoleCreateDto>>;
export declare class RoleUpdateDto extends RoleUpdateDto_base {
}
export type RoleDto = DtoConfig<{
    create: RoleCreateDto;
}>;
export {};
