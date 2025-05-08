"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexabotModule = void 0;
const path_1 = __importDefault(require("path"));
const cache_manager_1 = require("@nestjs/cache-manager");
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("@nestjs/mongoose");
const mjml_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/mjml.adapter");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const nestjs_i18n_1 = require("nestjs-i18n");
const smtp_transport_1 = __importDefault(require("nodemailer/lib/smtp-transport"));
const analytics_module_1 = require("./analytics/analytics.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const attachment_module_1 = require("./attachment/attachment.module");
const channel_module_1 = require("./channel/channel.module");
const chat_module_1 = require("./chat/chat.module");
const cms_module_1 = require("./cms/cms.module");
const config_1 = require("./config");
const extension_module_1 = require("./extension/extension.module");
const extra_1 = __importDefault(require("./extra"));
const helper_module_1 = require("./helper/helper.module");
const i18n_module_1 = require("./i18n/i18n.module");
const logger_module_1 = require("./logger/logger.module");
const migration_module_1 = require("./migration/migration.module");
const nlp_module_1 = require("./nlp/nlp.module");
const plugins_module_1 = require("./plugins/plugins.module");
const setting_module_1 = require("./setting/setting.module");
const ability_guard_1 = require("./user/guards/ability.guard");
const user_module_1 = require("./user/user.module");
const id_plugin_1 = __importDefault(require("./utils/schema-plugin/id.plugin"));
const websocket_module_1 = require("./websocket/websocket.module");
const i18nOptions = {
    fallbackLanguage: 'en',
    loaderOptions: {
        path: path_1.default.join(__dirname, '/config/i18n/'),
        watch: true,
    },
    resolvers: [
        { use: nestjs_i18n_1.QueryResolver, options: ['lang'] },
        nestjs_i18n_1.AcceptLanguageResolver,
    ],
};
let HexabotModule = class HexabotModule {
};
exports.HexabotModule = HexabotModule;
exports.HexabotModule = HexabotModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ...(config_1.config.emails.isEnabled
                ? [
                    mailer_1.MailerModule.forRoot({
                        transport: new smtp_transport_1.default({
                            ...config_1.config.emails.smtp,
                            logger: true,
                            debug: false,
                        }),
                        template: {
                            adapter: new mjml_adapter_1.MjmlAdapter('handlebars', {
                                inlineCssEnabled: false,
                            }, {
                                handlebar: {},
                            }),
                            dir: path_1.default.join(process.cwd(), 'dist', 'templates'),
                            options: {
                                context: {
                                    appName: config_1.config.parameters.appName,
                                    appUrl: config_1.config.uiBaseUrl,
                                },
                            },
                        },
                        defaults: { from: config_1.config.emails.from },
                    }),
                ]
                : []),
            mongoose_1.MongooseModule.forRoot(config_1.config.mongo.uri, {
                dbName: config_1.config.mongo.dbName,
                connectionFactory: (connection) => {
                    connection.plugin(id_plugin_1.default);
                    connection.plugin(require('mongoose-lean-virtuals'));
                    connection.plugin(require('mongoose-lean-getters'));
                    connection.plugin(require('mongoose-lean-defaults').default);
                    return connection;
                },
            }),
            nlp_module_1.NlpModule,
            cms_module_1.CmsModule,
            user_module_1.UserModule,
            setting_module_1.SettingModule,
            attachment_module_1.AttachmentModule,
            analytics_module_1.AnalyticsModule,
            chat_module_1.ChatModule,
            channel_module_1.ChannelModule,
            plugins_module_1.PluginsModule,
            helper_module_1.HelperModule,
            logger_module_1.LoggerModule,
            websocket_module_1.WebsocketModule,
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
                delimiter: ':',
                newListener: false,
                removeListener: false,
                maxListeners: 10,
                verboseMemoryLeak: false,
                ignoreErrors: false,
            }),
            nestjs_csrf_1.CsrfModule,
            i18n_module_1.I18nModule.forRoot(i18nOptions),
            config_1.config.cache.type === 'redis'
                ? cache_manager_1.CacheModule.register({
                    isGlobal: true,
                    store: cache_manager_redis_yet_1.redisStore,
                    socket: {
                        host: config_1.config.cache.host,
                        port: config_1.config.cache.port,
                    },
                    ttl: config_1.config.cache.ttl,
                    max: config_1.config.cache.max,
                })
                : cache_manager_1.CacheModule.register({
                    isGlobal: true,
                    ttl: config_1.config.cache.ttl,
                    max: config_1.config.cache.max,
                }),
            migration_module_1.MigrationModule,
            extension_module_1.ExtensionModule,
            ...extra_1.default,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: ability_guard_1.Ability },
            { provide: core_1.APP_GUARD, useClass: nestjs_csrf_1.CsrfGuard },
            app_service_1.AppService,
        ],
    })
], HexabotModule);
//# sourceMappingURL=app.module.js.map