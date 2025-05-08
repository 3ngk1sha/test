import { BasePlugin } from './base-plugin.service';
import { PluginInstance } from './map-types';
import { PluginName, PluginType } from './types';
export declare class PluginService<T extends BasePlugin = BasePlugin> {
    private registry;
    constructor();
    setPlugin(type: PluginType, name: PluginName, plugin: T): void;
    getAllByType<PT extends PluginType>(type: PT): PluginInstance<PT>[];
    getAll(): T[];
    getPlugin<PT extends PluginType>(type: PT, name: PluginName): PluginInstance<PT> | undefined;
    findPlugin<PT extends PluginType>(type: PT, name: PluginName): PluginInstance<PT> | undefined;
}
