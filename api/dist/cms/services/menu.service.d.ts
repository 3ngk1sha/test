import { Cache } from 'cache-manager';
import { BaseService } from '@/utils/generics/base-service';
import { MenuCreateDto, MenuDto } from '../dto/menu.dto';
import { MenuRepository } from '../repositories/menu.repository';
import { Menu, MenuFull, MenuPopulate } from '../schemas/menu.schema';
import { MenuTree } from '../schemas/types/menu';
export declare class MenuService extends BaseService<Menu, MenuPopulate, MenuFull, MenuDto> {
    readonly repository: MenuRepository;
    private readonly cacheManager;
    private RootSymbol;
    constructor(repository: MenuRepository, cacheManager: Cache);
    create(dto: MenuCreateDto): Promise<Menu>;
    deepDelete(id: string): any;
    private groupByParents;
    private buildTree;
    handleMenuUpdateEvent(): Promise<void>;
    getTree(): Promise<MenuTree>;
}
