import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { MenuType } from './types/menu';
export declare class MenuStub extends BaseSchema {
    title: string;
    parent?: unknown;
    type: MenuType;
    payload?: string;
    url?: string;
}
export declare class Menu extends MenuStub {
    parent?: string;
}
export declare class MenuFull extends MenuStub {
    parent: Menu;
}
export type MenuDocument = THydratedDocument<Menu>;
export declare const MenuModel: ModelDefinition;
declare const _default: any;
export default _default;
export type MenuPopulate = keyof TFilterPopulateFields<Menu, MenuStub>;
export declare const MENU_POPULATE: MenuPopulate[];
