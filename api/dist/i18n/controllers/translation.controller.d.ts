import { BaseController } from '@/utils/generics/base-controller';
import { DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { TranslationUpdateDto } from '../dto/translation.dto';
import { Translation } from '../schemas/translation.schema';
import { LanguageService } from '../services/language.service';
import { TranslationService } from '../services/translation.service';
export declare class TranslationController extends BaseController<Translation> {
    private readonly languageService;
    private readonly translationService;
    constructor(languageService: LanguageService, translationService: TranslationService);
    findPage(pageQuery: PageQueryDto<Translation>, filters: TFilterQuery<Translation>): Promise<Translation[]>;
    filterCount(filters?: TFilterQuery<Translation>): Promise<{
        count: number;
    }>;
    findOne(id: string): Promise<Translation>;
    updateOne(id: string, translationUpdate: TranslationUpdateDto): Promise<Translation>;
    refresh(): Promise<any>;
    deleteOne(id: string): Promise<DeleteResult>;
}
