import { OnModuleInit } from '@nestjs/common';
import { HelperService } from '@/helper/helper.service';
import BaseNlpHelper from '@/helper/lib/base-nlp-helper';
import { NLU } from '@/helper/types';
import { LanguageService } from '@/i18n/services/language.service';
import { LoggerService } from '@/logger/logger.service';
import { NlpEntityService } from '@/nlp/services/nlp-entity.service';
import { SettingService } from '@/setting/services/setting.service';
import { LLM_NLU_HELPER_NAME } from './settings';
export default class LlmNluHelper extends BaseNlpHelper<typeof LLM_NLU_HELPER_NAME> implements OnModuleInit {
    private readonly languageService;
    private readonly nlpEntityService;
    private languageClassifierPrompt;
    private traitClassifierPrompts;
    constructor(settingService: SettingService, helperService: HelperService, logger: LoggerService, languageService: LanguageService, nlpEntityService: NlpEntityService);
    getPath(): string;
    buildLanguageClassifierPrompt(): Promise<void>;
    buildClassifiersPrompt(): Promise<void>;
    onModuleInit(): Promise<void>;
    private findKeywordEntities;
    predict(text: string): Promise<NLU.ParseEntities>;
}
