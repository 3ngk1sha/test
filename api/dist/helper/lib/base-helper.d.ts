import { OnModuleInit } from '@nestjs/common';
import { LoggerService } from '@/logger/logger.service';
import { SettingService } from '@/setting/services/setting.service';
import { Extension } from '@/utils/generics/extension';
import { HyphenToUnderscore } from '@/utils/types/extension';
import { HelperService } from '../helper.service';
import { HelperName, HelperSetting, HelperType } from '../types';
export default abstract class BaseHelper<N extends HelperName = HelperName> extends Extension implements OnModuleInit {
    protected readonly settingService: SettingService;
    protected readonly helperService: HelperService;
    protected readonly logger: LoggerService;
    protected readonly settings: HelperSetting<N>[];
    protected abstract type: HelperType;
    constructor(name: N, settingService: SettingService, helperService: HelperService, logger: LoggerService);
    onModuleInit(): Promise<void>;
    setup(): Promise<void>;
    getType(): HelperType;
    getSettings<S extends string = HyphenToUnderscore<N>>(): Promise<Settings[S]>;
}
