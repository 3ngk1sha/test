import { DtoConfig } from '@/utils/types/dto.types';
import { MenuType } from '../schemas/types/menu';
export declare class MenuCreateDto {
    title: string;
    parent?: string;
    type: MenuType;
    payload?: string;
    url?: string;
}
declare const MenuQueryDto_base: import("@nestjs/common").Type<Partial<MenuCreateDto>>;
export declare class MenuQueryDto extends MenuQueryDto_base {
}
export type MenuDto = DtoConfig<{
    create: MenuCreateDto;
}>;
export {};
