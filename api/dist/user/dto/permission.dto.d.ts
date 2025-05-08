import { DtoConfig } from '@/utils/types/dto.types';
import { Action } from '../types/action.type';
import { TRelation } from '../types/index.type';
export declare class PermissionCreateDto {
    model: string;
    action: Action;
    role: string;
    relation?: TRelation;
}
export type PermissionDto = DtoConfig<{
    create: PermissionCreateDto;
}>;
