"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = require("path");
exports.config = {
    i18n: {
        translationFilename: process.env.I18N_TRANSLATION_FILENAME || 'messages',
    },
    appPath: process.cwd(),
    apiBaseUrl: process.env.API_ORIGIN || 'http://localhost:4000',
    uiBaseUrl: process.env.FRONTEND_BASE_URL
        ? process.env.FRONTEND_BASE_URL
        : 'http://localhost:8080',
    security: {
        httpsEnabled: process.env.HTTPS_ENABLED === 'true',
        trustProxy: process.env.HTTPS_ENABLED === 'true',
        cors: {
            allRoutes: true,
            headers: 'content-type,x-xsrf-token,x-csrf-token',
            methods: ['GET', 'PATCH', 'POST', 'DELETE', 'OPTIONS', 'HEAD'],
            allowOrigins: process.env.FRONTEND_ORIGIN
                ? process.env.FRONTEND_ORIGIN.split(',').map((origin) => origin.trim())
                : ['*'],
            allowCredentials: true,
        },
        csrf: true,
    },
    sockets: {
        path: '/socket.io',
        transports: ['websocket'],
        beforeConnect(_handshake) {
            return true;
        },
        async afterDisconnect(_socket) {
            return;
        },
        serveClient: false,
        pingTimeout: 3000,
        pingInterval: 10000,
        maxHttpBufferSize: 10e7,
        allowUpgrades: true,
        cookie: false,
        sendResponseHeaders: true,
        sendStatusCode: true,
        grant3rdPartyCookie: true,
        onlyAllowOrigins: process.env.FRONTEND_ORIGIN
            ? process.env.FRONTEND_ORIGIN.split(',').map((origin) => origin.trim())
            : [],
    },
    session: {
        secret: process.env.SESSION_SECRET || 'changeme',
        name: process.env.SESSION_NAME || 'hex.sid',
        adapter: 'connect-mongo',
        url: 'mongodb://localhost:27017/hexabot',
        collection: 'sessions',
        auto_reconnect: false,
        ssl: false,
        stringify: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    },
    emails: {
        isEnabled: process.env.EMAIL_SMTP_ENABLED === 'true' || false,
        smtp: {
            port: process.env.EMAIL_SMTP_PORT
                ? parseInt(process.env.EMAIL_SMTP_PORT)
                : 25,
            host: process.env.EMAIL_SMTP_HOST || 'localhost',
            ignoreTLS: false,
            secure: process.env.EMAIL_SMTP_SECURE === 'true' || false,
            auth: {
                user: process.env.EMAIL_SMTP_USER || '',
                pass: process.env.EMAIL_SMTP_PASS || '',
            },
        },
        from: process.env.EMAIL_SMTP_FROM || 'noreply@example.com',
    },
    parameters: {
        uploadDir: (0, path_1.join)(process.cwd(), process.env.UPLOAD_DIR || '/uploads'),
        avatarDir: (0, path_1.join)(process.cwd(), process.env.UPLOAD_DIR || '/uploads', '/avatars'),
        storageMode: process.env.STORAGE_MODE || 'disk',
        maxUploadSize: process.env.UPLOAD_MAX_SIZE_IN_BYTES
            ? Number(process.env.UPLOAD_MAX_SIZE_IN_BYTES)
            : 50 * 1024 * 1024,
        appName: 'Hexabot.ai',
        signedUrl: {
            salt: parseInt(process.env.SALT_LENGTH || '12'),
            secret: process.env.SIGNED_URL_SECRET || 'DEFAULT_SIGNED_URL_SECRET',
            expiresIn: process.env.SIGNED_URL_EXPIRES_IN || '24H',
        },
    },
    pagination: {
        limit: 10,
    },
    chatbot: {
        messages: {
            track_delivery: false,
            track_read: false,
        },
        logEvents: false,
    },
    log: {
        level: 'verbose',
    },
    cache: {
        type: process.env.REDIS_ENABLED === 'true' ? 'redis' : 'memory',
        ttl: 60 * 1000,
        max: 100,
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    mongo: {
        user: process.env.MONGO_USER || 'dev_only',
        password: process.env.MONGO_PASSWORD || 'dev_only',
        uri: process.env.MONGO_URI || 'mongodb://dev_only:dev_only@localhost:27017/',
        dbName: process.env.MONGO_DB || 'hexabot',
        autoMigrate: (process.env.MONGO_AUTO_MIGRATE === 'true' &&
            (process.env.API_IS_PRIMARY_NODE || 'true') === 'true') ||
            !(process.env.NODE_ENV || 'development').toLowerCase().includes('prod'),
    },
    env: process.env.NODE_ENV || 'development',
    authentication: {
        jwtOptions: {
            salt: parseInt(process.env.SALT_LENGTH || '12'),
            secret: process.env.JWT_SECRET || 'DEFAULT_AUTH_SECRET',
            expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        },
    },
    invitation: {
        jwtOptions: {
            salt: parseInt(process.env.SALT_LENGTH || '12'),
            secret: process.env.INVITATION_JWT_SECRET || 'DEFAULT_INVITATION_SECRET',
            expiresIn: process.env.INVITATION_EXPIRES_IN || '24h',
        },
    },
    password_reset: {
        jwtOptions: {
            salt: parseInt(process.env.SALT_LENGTH || '12'),
            secret: process.env.PASSWORD_RESET_SECRET || 'DEFAULT_PASSWORD_RESET_SECRET',
            expiresIn: process.env.PASSWORD_RESET_EXPIRES_IN || '1H',
        },
    },
    confirm_account: {
        jwtOptions: {
            salt: parseInt(process.env.SALT_LENGTH || '12'),
            secret: process.env.CONFIRM_ACCOUNT_SECRET || 'DEFAULT_CONFIRM_ACCOUNT_SECRET',
            expiresIn: process.env.CONFIRM_ACCOUNT_EXPIRES_IN || '1H',
        },
    },
    analytics: {
        thresholds: {
            loyalty: 5 * 24 * 60 * 60 * 1000,
            returning: 20 * 60 * 60 * 1000,
            retention: 3 * 24 * 60 * 60 * 1000,
            retentionReset: 24 * 60 * 60 * 1000,
        },
    },
};
//# sourceMappingURL=index.js.map