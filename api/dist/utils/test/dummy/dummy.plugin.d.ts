import { OutgoingMessageFormat } from '@/chat/schemas/types/message';
import { LoggerService } from '@/logger/logger.service';
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginBlockTemplate, PluginSetting } from '@/plugins/types';
export declare class DummyPlugin extends BaseBlockPlugin<PluginSetting[]> {
    private logger;
    template: PluginBlockTemplate;
    constructor(pluginService: PluginService, logger: LoggerService);
    getPath(): string;
    process(): Promise<{
        format: OutgoingMessageFormat.text;
        message: {
            text: string;
        };
    }>;
}
