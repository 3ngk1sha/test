import { BaseService } from '@/utils/generics/base-service';
import { CategoryDto } from '../dto/category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../schemas/category.schema';
export declare class CategoryService extends BaseService<Category, never, never, CategoryDto> {
    readonly repository: CategoryRepository;
    constructor(repository: CategoryRepository);
}
