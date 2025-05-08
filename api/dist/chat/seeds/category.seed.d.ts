import { BaseSeeder } from '@/utils/generics/base-seeder';
import { CategoryDto } from '../dto/category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../schemas/category.schema';
export declare class CategorySeeder extends BaseSeeder<Category, never, never, CategoryDto> {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
}
