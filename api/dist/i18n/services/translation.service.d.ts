import { I18nService } from '@/i18n/services/i18n.service';
import { PluginService } from '@/plugins/plugins.service';
import { SettingService } from '@/setting/services/setting.service';
import { BaseService } from '@/utils/generics/base-service';
import { Block } from '../../chat/schemas/block.schema';
import { BlockService } from '../../chat/services/block.service';
import { TranslationRepository } from '../repositories/translation.repository';
import { Translation } from '../schemas/translation.schema';
export declare class TranslationService extends BaseService<Translation> {
    readonly repository: TranslationRepository;
    private readonly blockService;
    private readonly settingService;
    private readonly pluginService;
    private readonly i18n;
    constructor(repository: TranslationRepository, blockService: BlockService, settingService: SettingService, pluginService: PluginService, i18n: I18nService);
    resetI18nTranslations(): Promise<void>;
    getBlockStrings(block: Block): Promise<string[]>;
    getAllBlockStrings(): Promise<string[]>;
    getSettingStrings(): Promise<string[]>;
    handleTranslationsUpdate(): void;
}
