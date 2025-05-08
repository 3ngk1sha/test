import { OnApplicationBootstrap } from '@nestjs/common';
import { AnyMessage } from '@/chat/schemas/types/message';
import { HelperService } from '@/helper/helper.service';
import BaseLlmHelper from '@/helper/lib/base-llm-helper';
import { LLM } from '@/helper/types';
import { LoggerService } from '@/logger/logger.service';
import { Setting } from '@/setting/schemas/setting.schema';
import { SettingService } from '@/setting/services/setting.service';
import { GEMINI_HELPER_NAME } from './settings';
type GeminiGenerationSettings = Omit<Settings['gemini_helper'], 'token' | 'model'>;
export default class GeminiLlmHelper extends BaseLlmHelper<typeof GEMINI_HELPER_NAME> implements OnApplicationBootstrap {
    protected readonly logger: LoggerService;
    private client;
    constructor(settingService: SettingService, helperService: HelperService, logger: LoggerService);
    getPath(): string;
    onApplicationBootstrap(): Promise<void>;
    handleApiUrlChange(setting: Setting): void;
    private toCamelCase;
    private buildGenerationConfig;
    generateResponse(prompt: string, model: string, systemInstruction?: string, options?: Partial<GeminiGenerationSettings>): Promise<string>;
    generateStructuredResponse<T>(prompt: string, model: string, systemInstruction: string, schema: LLM.ResponseSchema, options?: Partial<GeminiGenerationSettings>): Promise<T>;
    private ensureFirstMessageFromUser;
    private formatMessages;
    generateChatCompletion(prompt: string, model?: string, systemInstruction?: string, history?: AnyMessage[], options?: Partial<GeminiGenerationSettings>): Promise<string>;
}
export {};
