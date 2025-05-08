"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionStore = void 0;
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const config_1 = require("../../config");
let sessionStore = null;
const getSessionStore = () => {
    if (!sessionStore) {
        sessionStore = connect_mongo_1.default.create({
            mongoUrl: config_1.config.mongo.uri,
            dbName: config_1.config.mongo.dbName,
            collectionName: 'sessions',
        });
    }
    return sessionStore;
};
exports.getSessionStore = getSessionStore;
//# sourceMappingURL=session-store.js.map