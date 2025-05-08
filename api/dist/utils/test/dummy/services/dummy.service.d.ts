import { BaseService } from '@/utils/generics/base-service';
import { DummyRepository } from '../repositories/dummy.repository';
import { Dummy } from '../schemas/dummy.schema';
export declare class DummyService extends BaseService<Dummy> {
    readonly repository: DummyRepository;
    constructor(repository: DummyRepository);
}
