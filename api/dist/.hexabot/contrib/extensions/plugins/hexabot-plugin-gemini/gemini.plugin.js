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
exports.GeminiPlugin = void 0;
const common_1 = require("@nestjs/common");
const message_1 = require("../../../../../chat/schemas/types/message");
const message_service_1 = require("../../../../../chat/services/message.service");
const content_service_1 = require("../../../../../cms/services/content.service");
const index_helper_1 = __importDefault(require("../../helpers/hexabot-helper-gemini/index.helper"));
const helper_service_1 = require("../../../../../helper/helper.service");
const types_1 = require("../../../../../helper/types");
const logger_service_1 = require("../../../../../logger/logger.service");
const base_block_plugin_1 = require("../../../../../plugins/base-block-plugin");
const plugins_service_1 = require("../../../../../plugins/plugins.service");
let GeminiPlugin = class GeminiPlugin extends base_block_plugin_1.BaseBlockPlugin {
    constructor(pluginService, logger, contentService, messageService, helperService) {
        super('gemini-plugin', pluginService);
        this.logger = logger;
        this.contentService = contentService;
        this.messageService = messageService;
        this.helperService = helperService;
        this.template = { name: 'Gemini RAG Block' };
    }
    getPath() {
        return __dirname;
    }
    async process(block, ctx, _convId) {
        const ragContent = ctx.text
            ? await this.contentService.textSearch(ctx.text)
            : [];
        const { model, instructions, context, max_messages_ctx, ...options } = this.getArguments(block);
        const geminiHelper = this.helperService.use(types_1.HelperType.LLM, index_helper_1.default);
        const systemInstruction = [
            `CONTEXT: ${context}`,
            `DOCUMENTS:`,
            ...ragContent.map((curr, index) => `\tDOCUMENT ${index + 1} \n\t\tTitle: ${curr.title} \n\t\tData: ${curr.rag}`),
            `INSTRUCTIONS:`,
            instructions,
        ].join('\n');
        const history = await this.messageService.findLastMessages(ctx.user, max_messages_ctx);
        const text = ctx?.text
            ? await geminiHelper.generateChatCompletion(ctx.text, model, systemInstruction, history, options)
            : "";
        const envelope = {
            format: message_1.OutgoingMessageFormat.text,
            message: {
                text,
            },
        };
        return envelope;
    }
};
exports.GeminiPlugin = GeminiPlugin;
exports.GeminiPlugin = GeminiPlugin = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [plugins_service_1.PluginService,
        logger_service_1.LoggerService,
        content_service_1.ContentService,
        message_service_1.MessageService,
        helper_service_1.HelperService])
], GeminiPlugin);
//# sourceMappingURL=gemini.plugin.js.map