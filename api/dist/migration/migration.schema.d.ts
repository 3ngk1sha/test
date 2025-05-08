import { ModelDefinition } from '@nestjs/mongoose';
import { THydratedDocument } from '@/utils/types/filter.types';
import { MigrationAction, MigrationVersion } from './types';
export declare class Migration {
    version: MigrationVersion;
    status: MigrationAction;
}
export declare const MigrationModel: ModelDefinition;
declare const _default: any;
export default _default;
export type MigrationDocument = THydratedDocument<Migration>;
