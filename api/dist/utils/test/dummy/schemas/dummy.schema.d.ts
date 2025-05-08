import { BaseSchema } from '@/utils/generics/base-schema';
import { THydratedDocument } from '@/utils/types/filter.types';
export declare class Dummy extends BaseSchema {
    dummy: string;
}
export type DummyDocument = THydratedDocument<Dummy>;
export declare const DummyModel: import("@nestjs/mongoose").ModelDefinition;
