import { ChannelService } from '@/channel/channel.service';
import { HelperService } from '@/helper/helper.service';
import { LoggerService } from '@/logger/logger.service';
import { SettingService } from '@/setting/services/setting.service';
import { TExtractNamespace } from './types';
export declare class CleanupService {
    private readonly helperService;
    private readonly loggerService;
    private readonly settingService;
    private readonly channelService;
    constructor(helperService: HelperService, loggerService: LoggerService, settingService: SettingService, channelService: ChannelService);
    private deleteManyBySuffixAndNamespaces;
    getChannelNamespaces(): TExtractNamespace<'channel'>[];
    getHelperNamespaces(): TExtractNamespace<'helper'>[];
    pruneExtensionSettings(): Promise<void>;
}
