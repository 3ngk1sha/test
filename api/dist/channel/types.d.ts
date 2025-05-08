import { SettingCreateDto } from '@/setting/dto/setting.dto';
import { HyphenToUnderscore } from '@/utils/types/extension';
export type ChannelName = `${string}-channel`;
export type ChannelSetting<N extends string = string> = Omit<SettingCreateDto, 'group' | 'weight'> & {
    group: HyphenToUnderscore<N>;
};
