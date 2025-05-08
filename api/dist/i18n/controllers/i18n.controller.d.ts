import { ChannelService } from '@/channel/channel.service';
import { HelperService } from '@/helper/helper.service';
import { PluginService } from '@/plugins/plugins.service';
export declare class I18nController {
    private readonly pluginService;
    private readonly helperService;
    private readonly channelService;
    constructor(pluginService: PluginService, helperService: HelperService, channelService: ChannelService);
    getTranslations(): {};
}
