import { CategoryCreateDto } from '@/chat/dto/category.dto';
import { Category } from '@/chat/schemas/category.schema';
import { FixturesTypeBuilder } from '../types';
export type TCategoryFixtures = FixturesTypeBuilder<Category, CategoryCreateDto>;
export declare const categoryDefaultValues: TCategoryFixtures['defaultValues'];
export declare const categories: TCategoryFixtures['values'][];
export declare const categoryFixtures: import("../types").TFixtures<import("../types").OptionalProperties<Category, "createdAt" | "builtin" | "zoom" | "offset">>[];
export declare const installCategoryFixtures: () => Promise<any[]>;
