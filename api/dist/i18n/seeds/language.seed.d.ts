import { BaseSeeder } from '@/utils/generics/base-seeder';
import { LanguageDto } from '../dto/language.dto';
import { LanguageRepository } from '../repositories/language.repository';
import { Language } from '../schemas/language.schema';
export declare class LanguageSeeder extends BaseSeeder<Language, never, never, LanguageDto> {
    private readonly languageRepository;
    constructor(languageRepository: LanguageRepository);
}
