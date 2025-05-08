import { LoggerService } from '@/logger/logger.service';
import { TFilterQuery } from '@/utils/types/filter.types';
import { DtoConfig } from '../types/dto.types';
import { TValidateProps } from '../types/filter.types';
import { BaseSchema } from './base-schema';
import { BaseService } from './base-service';
export declare abstract class BaseController<T extends BaseSchema, TStub = never, P extends string = never, TFull extends Omit<T, P> = never, Dto extends DtoConfig = object> {
    protected readonly service: BaseService<T, P, TFull, Dto>;
    eventEmitter: typeof this.service.eventEmitter;
    readonly logger: LoggerService;
    constructor(service: BaseService<T, P, TFull, Dto>);
    protected canPopulate(populate: string[]): boolean;
    protected validate({ dto, allowedIds }: TValidateProps<T, TStub>): void;
    count(filters?: TFilterQuery<T>): Promise<{
        count: number;
    }>;
}
