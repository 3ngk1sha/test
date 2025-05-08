import { Block } from '@/chat/schemas/block.schema';
import { Context } from '@/chat/schemas/types/context';
import { OutgoingMessageFormat } from '@/chat/schemas/types/message';
import { MessageService } from '@/chat/services/message.service';
import { ContentService } from '@/cms/services/content.service';
import { HelperService } from '@/helper/helper.service';
import { LoggerService } from '@/logger/logger.service';
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginBlockTemplate } from '@/plugins/types';
import GEMINI_PLUGIN_SETTINGS from './settings';
export declare class GeminiPlugin extends BaseBlockPlugin<typeof GEMINI_PLUGIN_SETTINGS> {
    private logger;
    private contentService;
    private messageService;
    private helperService;
    template: PluginBlockTemplate;
    constructor(pluginService: PluginService, logger: LoggerService, contentService: ContentService, messageService: MessageService, helperService: HelperService);
    getPath(): string;
    process(block: Block, ctx: Context, _convId: string): Promise<{
        format: OutgoingMessageFormat.text;
        message: {
            text: string;
        };
    }>;
}
