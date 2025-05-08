import { BaseController } from '@/utils/generics/base-controller';
import { DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { LanguageCreateDto, LanguageUpdateDto } from '../dto/language.dto';
import { Language } from '../schemas/language.schema';
import { LanguageService } from '../services/language.service';
export declare class LanguageController extends BaseController<Language> {
    private readonly languageService;
    constructor(languageService: LanguageService);
    findPage(pageQuery: PageQueryDto<Language>, filters: TFilterQuery<Language>): Promise<Language[]>;
    filterCount(filters?: TFilterQuery<Language>): Promise<{
        count: number;
    }>;
    findOne(id: string): Promise<Language>;
    create(language: LanguageCreateDto): Promise<Language>;
    updateOne(id: string, languageUpdate: LanguageUpdateDto): Promise<Language>;
    deleteOne(id: string): Promise<DeleteResult>;
}
