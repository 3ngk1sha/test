import { BaseService } from '@/utils/generics/base-service';
import { ModelRepository } from '../repositories/model.repository';
import { Model, ModelFull, ModelPopulate } from '../schemas/model.schema';
export declare class ModelService extends BaseService<Model, ModelPopulate, ModelFull> {
    readonly repository: ModelRepository;
    constructor(repository: ModelRepository);
}
