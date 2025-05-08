import { BaseController } from '@/utils/generics/base-controller';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { MenuCreateDto, MenuQueryDto } from '../dto/menu.dto';
import { Menu, MenuFull, MenuPopulate, MenuStub } from '../schemas/menu.schema';
import { MenuService } from '../services/menu.service';
export declare class MenuController extends BaseController<Menu, MenuStub, MenuPopulate, MenuFull> {
    private readonly menuService;
    constructor(menuService: MenuService);
    filterCount(filters: TFilterQuery<Menu>): Promise<{
        count: number;
    }>;
    findPage(pageQuery: PageQueryDto<Menu>, filters: TFilterQuery<Menu>): Promise<Menu[]>;
    create(body: MenuCreateDto): Promise<Menu>;
    findAll(query?: MenuQueryDto): Promise<Menu[]>;
    getTree(): Promise<import("../schemas/types/menu").MenuTree>;
    findOne(id: string): Promise<Menu>;
    updateOne(body: MenuCreateDto, id: string): Promise<Menu>;
    delete(id: string): Promise<string>;
}
