import { BaseSeeder } from '@/utils/generics/base-seeder';
import { TranslationRepository } from '../repositories/translation.repository';
import { Translation } from '../schemas/translation.schema';
export declare class TranslationSeeder extends BaseSeeder<Translation> {
    private readonly translationRepository;
    constructor(translationRepository: TranslationRepository);
}
