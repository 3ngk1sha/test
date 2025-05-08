import { BaseController } from '@/utils/generics/base-controller';
import { DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { CategoryCreateDto, CategoryUpdateDto } from '../dto/category.dto';
import { Category } from '../schemas/category.schema';
import { CategoryService } from '../services/category.service';
export declare class CategoryController extends BaseController<Category> {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findPage(pageQuery: PageQueryDto<Category>, filters: TFilterQuery<Category>): Promise<Category[]>;
    filterCount(filters?: TFilterQuery<Category>): Promise<{
        count: number;
    }>;
    findOne(id: string): Promise<Category>;
    create(category: CategoryCreateDto): Promise<Category>;
    updateOne(id: string, categoryUpdate: CategoryUpdateDto): Promise<Category>;
    deleteOne(id: string): Promise<DeleteResult>;
    deleteMany(ids?: string[]): Promise<DeleteResult>;
}
