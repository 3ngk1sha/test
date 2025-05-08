"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeInMongodConnection = exports.rootMongooseTestModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_2 = __importDefault(require("mongoose"));
let mongod;
const rootMongooseTestModule = (fixturesFn, options = {}) => mongoose_1.MongooseModule.forRootAsync({
    useFactory: async () => {
        const dbName = 'test';
        mongod = await mongodb_memory_server_1.MongoMemoryServer.create({
            instance: { dbName },
        });
        const uri = mongod.getUri();
        await mongoose_2.default.connect(`${uri}`);
        await fixturesFn({ uri, dbName });
        return {
            uri,
            ...options,
        };
    },
});
exports.rootMongooseTestModule = rootMongooseTestModule;
const closeInMongodConnection = async () => {
    try {
        await mongoose_2.default.disconnect();
        if (mongod)
            await mongod.stop();
    }
    catch (err) {
        console.warn('Unable to close MongoDB connection', err);
    }
};
exports.closeInMongodConnection = closeInMongodConnection;
//# sourceMappingURL=test.js.map