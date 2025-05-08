import { ChannelName } from '@/channel/types';
import { HelperName } from '@/helper/types';
import { PluginName } from '@/plugins/types';
export type ExtensionName = ChannelName | HelperName | PluginName;
export type HyphenToUnderscore<S extends string> = S extends `${infer P}-${infer Q}` ? `${P}_${HyphenToUnderscore<Q>}` : S;
