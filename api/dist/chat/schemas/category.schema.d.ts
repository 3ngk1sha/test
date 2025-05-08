import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { THydratedDocument } from '@/utils/types/filter.types';
export declare class Category extends BaseSchema {
    label: string;
    builtin: boolean;
    zoom: number;
    offset: [number, number];
}
export declare const CategoryModel: ModelDefinition;
export type CategoryDocument = THydratedDocument<Category>;
declare const _default: any;
export default _default;
