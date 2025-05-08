import { BasePlugin } from './base-plugin.service';
import { PluginService } from './plugins.service';
import { PluginName, PluginType } from './types';
export declare abstract class BaseEventPlugin extends BasePlugin {
    readonly type: PluginType;
    constructor(name: PluginName, pluginService: PluginService<BasePlugin>);
}
