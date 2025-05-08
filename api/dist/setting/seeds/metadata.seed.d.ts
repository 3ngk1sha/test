import { BaseSeeder } from '@/utils/generics/base-seeder';
import { MetadataRepository } from '../repositories/metadata.repository';
import { Metadata } from '../schemas/metadata.schema';
export declare class MetadataSeeder extends BaseSeeder<Metadata> {
    private readonly metadataRepository;
    constructor(metadataRepository: MetadataRepository);
}
