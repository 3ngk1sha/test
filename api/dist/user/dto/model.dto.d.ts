import { TRelation } from '../types/index.type';
import { TModel } from '../types/model.type';
export declare class ModelCreateDto {
    name: string;
    identity: TModel;
    attributes: object;
    relation?: TRelation;
}
