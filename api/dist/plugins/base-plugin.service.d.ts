import { OnModuleInit } from '@nestjs/common';
import { Extension } from '@/utils/generics/extension';
import { PluginService } from './plugins.service';
import { PluginName, PluginType } from './types';
export declare abstract class BasePlugin extends Extension implements OnModuleInit {
    readonly name: PluginName;
    private pluginService;
    readonly type: PluginType;
    constructor(name: PluginName, pluginService: PluginService<BasePlugin>);
    onModuleInit(): Promise<void>;
}
