import { AnyMessage } from '@/chat/schemas/types/message';
import { LoggerService } from '@/logger/logger.service';
import { SettingService } from '@/setting/services/setting.service';
import { HelperService } from '../helper.service';
import { HelperName, HelperType, LLM } from '../types';
import BaseHelper from './base-helper';
export default abstract class BaseLlmHelper<N extends HelperName = HelperName> extends BaseHelper<N> {
    protected readonly type: HelperType;
    constructor(name: N, settingService: SettingService, helperService: HelperService, logger: LoggerService);
    abstract generateResponse(prompt: string, model: string, systemPrompt: string, extra?: any): Promise<string>;
    generateStructuredResponse?<T>(prompt: string, model: string, systemPrompt: string, schema: LLM.ResponseSchema, extra?: any): Promise<T>;
    abstract generateChatCompletion(prompt: string, model: string, systemPrompt?: string, history?: AnyMessage[], extra?: any): Promise<string>;
}
