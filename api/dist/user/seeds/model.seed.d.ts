import { BaseSeeder } from '@/utils/generics/base-seeder';
import { ModelRepository } from '../repositories/model.repository';
import { Model, ModelFull, ModelPopulate } from '../schemas/model.schema';
export declare class ModelSeeder extends BaseSeeder<Model, ModelPopulate, ModelFull> {
    private readonly modelRepository;
    constructor(modelRepository: ModelRepository);
}
