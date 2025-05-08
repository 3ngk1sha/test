import { Block, BlockFull } from '@/chat/schemas/block.schema';
import { Context } from '@/chat/schemas/types/context';
import { StdOutgoingEnvelope } from '@/chat/schemas/types/message';
import { BasePlugin } from './base-plugin.service';
import { PluginService } from './plugins.service';
import { PluginBlockTemplate, PluginEffects, PluginName, PluginSetting, PluginType } from './types';
export declare abstract class BaseBlockPlugin<T extends PluginSetting[]> extends BasePlugin {
    readonly type: PluginType;
    private readonly settings;
    constructor(name: PluginName, pluginService: PluginService<BasePlugin>);
    getDefaultSettings(): Promise<T> | T;
    abstract template: PluginBlockTemplate;
    effects?: PluginEffects;
    abstract process(block: Block | BlockFull, context: Context, convId?: string): Promise<StdOutgoingEnvelope>;
    protected getArguments(block: Block): SettingObject<T>;
}
