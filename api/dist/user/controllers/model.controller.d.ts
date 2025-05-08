import { BaseController } from '@/utils/generics/base-controller';
import { TFilterQuery } from '@/utils/types/filter.types';
import { Model, ModelFull, ModelPopulate, ModelStub } from '../schemas/model.schema';
import { ModelService } from '../services/model.service';
export declare class ModelController extends BaseController<Model, ModelStub, ModelPopulate, ModelFull> {
    private readonly modelService;
    constructor(modelService: ModelService);
    find(populate: string[], filters: TFilterQuery<Model>): Promise<ModelFull[] | Model[]>;
}
