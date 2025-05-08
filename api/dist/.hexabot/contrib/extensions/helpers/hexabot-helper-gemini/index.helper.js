"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const helper_service_1 = require("../../../../../helper/helper.service");
const base_llm_helper_1 = __importDefault(require("../../../../../helper/lib/base-llm-helper"));
const logger_service_1 = require("../../../../../logger/logger.service");
const setting_schema_1 = require("../../../../../setting/schemas/setting.schema");
const setting_service_1 = require("../../../../../setting/services/setting.service");
let GeminiLlmHelper = class GeminiLlmHelper extends base_llm_helper_1.default {
    constructor(settingService, helperService, logger) {
        super('gemini-helper', settingService, helperService, logger);
        this.logger = logger;
    }
    getPath() {
        return __dirname;
    }
    async onApplicationBootstrap() {
        const settings = await this.getSettings();
        this.client = new generative_ai_1.GoogleGenerativeAI(settings.token);
    }
    handleApiUrlChange(setting) {
        this.client = new generative_ai_1.GoogleGenerativeAI(setting.value);
    }
    toCamelCase(key) {
        return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }
    buildGenerationConfig(obj) {
        return Object.keys(obj).reduce((acc, key) => {
            const camelCaseKey = this.toCamelCase(key);
            acc[camelCaseKey] = obj[key];
            return acc;
        }, {});
    }
    async generateResponse(prompt, model, systemInstruction, options = {}) {
        const { token: _t, model: globalModel, ...globalOptions } = await this.getSettings();
        const genModel = this.client.getGenerativeModel({
            model: model || globalModel,
            systemInstruction,
            generationConfig: {
                ...this.buildGenerationConfig({
                    ...globalOptions,
                    ...options,
                }),
                responseMimeType: 'text/plain',
            },
        });
        const completion = await genModel.generateContent(prompt);
        return completion.response.text();
    }
    async generateStructuredResponse(prompt, model, systemInstruction, schema, options = {}) {
        const { token: _t, model: globalModel, ...globalOptions } = await this.getSettings();
        const genModel = this.client.getGenerativeModel({
            model: model || globalModel,
            systemInstruction,
            generationConfig: {
                ...this.buildGenerationConfig({
                    ...globalOptions,
                    ...options,
                }),
                temperature: 0,
                responseMimeType: 'application/json',
                responseSchema: schema,
            },
        });
        const completion = await genModel.generateContent(prompt);
        return JSON.parse(completion.response.text());
    }
    ensureFirstMessageFromUser(messages) {
        while (messages.length > 0 && messages[0].role !== 'user') {
            messages.shift();
        }
        return messages;
    }
    formatMessages(messages) {
        const contents = messages.map((m) => {
            return {
                role: 'sender' in m && m.sender ? `user` : `model`,
                parts: [
                    {
                        text: 'text' in m.message && m.message.text
                            ? m.message.text
                            : JSON.stringify(m.message),
                    },
                ],
            };
        });
        return this.ensureFirstMessageFromUser(contents);
    }
    async generateChatCompletion(prompt, model, systemInstruction, history = [], options = {}) {
        const { token: _t, model: _m, ...globalOptions } = await this.getSettings();
        const genModel = this.client.getGenerativeModel({
            model: model || _m,
            systemInstruction,
            generationConfig: {
                ...this.buildGenerationConfig({
                    ...globalOptions,
                    ...options,
                }),
            },
        });
        const chat = genModel.startChat({
            history: this.formatMessages(history),
        });
        const completion = await chat.sendMessage(prompt);
        return completion.response.text();
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('hook:gemini_helper:token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setting_schema_1.Setting]),
    __metadata("design:returntype", void 0)
], GeminiLlmHelper.prototype, "handleApiUrlChange", null);
GeminiLlmHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [setting_service_1.SettingService,
        helper_service_1.HelperService,
        logger_service_1.LoggerService])
], GeminiLlmHelper);
exports.default = GeminiLlmHelper;
//# sourceMappingURL=index.helper.js.map