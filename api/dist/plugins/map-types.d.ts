import { BaseBlockPlugin } from './base-block-plugin';
import { BaseEventPlugin } from './base-event-plugin';
import { BasePlugin } from './base-plugin.service';
import { PluginType } from './types';
declare const PLUGIN_TYPE_MAP: {
    event: typeof BaseEventPlugin;
    block: typeof BaseBlockPlugin;
};
export type PluginTypeMap = typeof PLUGIN_TYPE_MAP;
export type PluginInstance<T extends PluginType> = InstanceType<PluginTypeMap[T]> & BasePlugin;
export {};
