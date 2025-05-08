"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const module_alias_1 = __importDefault(require("module-alias"));
const nestjs_dynamic_providers_1 = require("nestjs-dynamic-providers");
const passport_1 = __importDefault(require("passport"));
module_alias_1.default.addAliases({
    '@': __dirname,
});
const app_instance_1 = require("./app.instance");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
const logger_service_1 = require("./logger/logger.service");
const seeder_1 = require("./seeder");
const setting_service_1 = require("./setting/services/setting.service");
const swagger_1 = require("./swagger");
const session_store_1 = require("./utils/constants/session-store");
const object_id_pipe_1 = require("./utils/pipes/object-id.pipe");
const redis_io_adapter_1 = require("./websocket/adapters/redis-io.adapter");
async function bootstrap() {
    const isProduction = config_1.config.env.toLowerCase().includes('prod');
    await (0, nestjs_dynamic_providers_1.resolveDynamicProviders)();
    const app = await core_1.NestFactory.create(app_module_1.HexabotModule, {
        bodyParser: false,
    });
    app_instance_1.AppInstance.setApp(app);
    const rawBodyBuffer = (req, res, buf, encoding) => {
        if (buf?.length) {
            req.rawBody = buf.toString(encoding || 'utf8');
        }
    };
    app.use(body_parser_1.default.urlencoded({ verify: rawBodyBuffer, extended: true }));
    app.use(body_parser_1.default.json({ verify: rawBodyBuffer }));
    const settingService = app.get(setting_service_1.SettingService);
    app.enableCors({
        origin: async (origin, callback) => {
            await settingService
                .getAllowedOrigins()
                .then((allowedOrigins) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            })
                .catch(callback);
        },
        methods: config_1.config.security.cors.methods,
        credentials: config_1.config.security.cors.allowCredentials,
        allowedHeaders: config_1.config.security.cors.headers.split(','),
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }), new object_id_pipe_1.ObjectIdPipe());
    app.use((0, express_session_1.default)({
        name: config_1.config.session.name,
        secret: config_1.config.session.secret,
        proxy: config_1.config.security.trustProxy,
        resave: true,
        saveUninitialized: false,
        store: (0, session_store_1.getSessionStore)(),
        cookie: {
            httpOnly: true,
            secure: config_1.config.security.httpsEnabled,
            path: '/',
            maxAge: isProduction
                ? 1000 * 60 * 60 * 24
                : 1000 * 60 * 60,
        },
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    if (config_1.config.cache.type === 'redis') {
        const redisIoAdapter = new redis_io_adapter_1.RedisIoAdapter(app);
        await redisIoAdapter.connectToRedis();
        app.useWebSocketAdapter(redisIoAdapter);
    }
    process.on('uncaughtException', async (error) => {
        if (error.stack?.toLowerCase().includes('smtp')) {
            const logger = await app.resolve(logger_service_1.LoggerService);
            logger.error('SMTP error', error.stack);
        }
        else
            throw error;
    });
    if (true) {
        await (0, seeder_1.seedDatabase)(app);
        (0, swagger_1.swagger)(app);
    }
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map