import { Action } from './action.type';
import { TModel } from './model.type';
type ModelPermissionsPerRole = Record<TModel, Action[]>;
export type PermissionsTree = Record<string, ModelPermissionsPerRole>;
export {};
