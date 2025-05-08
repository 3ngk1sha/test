import { Cache } from 'cache-manager';
import { BaseService } from '@/utils/generics/base-service';
import { LanguageDto } from '../dto/language.dto';
import { LanguageRepository } from '../repositories/language.repository';
import { Language } from '../schemas/language.schema';
export declare class LanguageService extends BaseService<Language, never, never, LanguageDto> {
    readonly repository: LanguageRepository;
    private readonly cacheManager;
    constructor(repository: LanguageRepository, cacheManager: Cache);
    getLanguages(): Promise<{}>;
    getDefaultLanguage(): Promise<Language>;
    getLanguageByCode(code: string): Promise<Language>;
}
