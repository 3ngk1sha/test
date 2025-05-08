import { BaseService } from '@/utils/generics/base-service';
import { MetadataRepository } from '../repositories/metadata.repository';
import { Metadata } from '../schemas/metadata.schema';
export declare class MetadataService extends BaseService<Metadata> {
    readonly repository: MetadataRepository;
    constructor(repository: MetadataRepository);
}
