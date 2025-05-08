"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("@nestjs/mongoose");
const attachment_module_1 = require("../attachment/attachment.module");
const attachment_repository_1 = require("../attachment/repositories/attachment.repository");
const attachment_schema_1 = require("../attachment/schemas/attachment.schema");
const attachment_service_1 = require("../attachment/services/attachment.service");
const channel_module_1 = require("../channel/channel.module");
const cms_module_1 = require("../cms/cms.module");
const user_module_1 = require("../user/user.module");
const block_controller_1 = require("./controllers/block.controller");
const category_controller_1 = require("./controllers/category.controller");
const context_var_controller_1 = require("./controllers/context-var.controller");
const label_controller_1 = require("./controllers/label.controller");
const message_controller_1 = require("./controllers/message.controller");
const subscriber_controller_1 = require("./controllers/subscriber.controller");
const block_repository_1 = require("./repositories/block.repository");
const category_repository_1 = require("./repositories/category.repository");
const context_var_repository_1 = require("./repositories/context-var.repository");
const conversation_repository_1 = require("./repositories/conversation.repository");
const label_repository_1 = require("./repositories/label.repository");
const message_repository_1 = require("./repositories/message.repository");
const subscriber_repository_1 = require("./repositories/subscriber.repository");
const block_schema_1 = require("./schemas/block.schema");
const category_schema_1 = require("./schemas/category.schema");
const context_var_schema_1 = require("./schemas/context-var.schema");
const conversation_schema_1 = require("./schemas/conversation.schema");
const label_schema_1 = require("./schemas/label.schema");
const message_schema_1 = require("./schemas/message.schema");
const subscriber_schema_1 = require("./schemas/subscriber.schema");
const category_seed_1 = require("./seeds/category.seed");
const context_var_seed_1 = require("./seeds/context-var.seed");
const block_service_1 = require("./services/block.service");
const bot_service_1 = require("./services/bot.service");
const category_service_1 = require("./services/category.service");
const chat_service_1 = require("./services/chat.service");
const context_var_service_1 = require("./services/context-var.service");
const conversation_service_1 = require("./services/conversation.service");
const label_service_1 = require("./services/label.service");
const message_service_1 = require("./services/message.service");
const subscriber_service_1 = require("./services/subscriber.service");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                category_schema_1.CategoryModel,
                context_var_schema_1.ContextVarModel,
                label_schema_1.LabelModel,
                block_schema_1.BlockModel,
                message_schema_1.MessageModel,
                subscriber_schema_1.SubscriberModel,
                conversation_schema_1.ConversationModel,
                subscriber_schema_1.SubscriberModel,
                attachment_schema_1.AttachmentModel,
            ]),
            (0, common_1.forwardRef)(() => channel_module_1.ChannelModule),
            cms_module_1.CmsModule,
            attachment_module_1.AttachmentModule,
            event_emitter_1.EventEmitter2,
            user_module_1.UserModule,
        ],
        controllers: [
            category_controller_1.CategoryController,
            context_var_controller_1.ContextVarController,
            label_controller_1.LabelController,
            block_controller_1.BlockController,
            message_controller_1.MessageController,
            subscriber_controller_1.SubscriberController,
        ],
        providers: [
            category_repository_1.CategoryRepository,
            context_var_repository_1.ContextVarRepository,
            label_repository_1.LabelRepository,
            block_repository_1.BlockRepository,
            message_repository_1.MessageRepository,
            subscriber_repository_1.SubscriberRepository,
            conversation_repository_1.ConversationRepository,
            category_service_1.CategoryService,
            context_var_service_1.ContextVarService,
            label_service_1.LabelService,
            block_service_1.BlockService,
            message_service_1.MessageService,
            subscriber_service_1.SubscriberService,
            category_seed_1.CategorySeeder,
            context_var_seed_1.ContextVarSeeder,
            conversation_service_1.ConversationService,
            chat_service_1.ChatService,
            bot_service_1.BotService,
            attachment_service_1.AttachmentService,
            attachment_repository_1.AttachmentRepository,
        ],
        exports: [
            subscriber_service_1.SubscriberService,
            message_service_1.MessageService,
            label_service_1.LabelService,
            block_service_1.BlockService,
            conversation_service_1.ConversationService,
        ],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map