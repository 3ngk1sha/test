"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEventMetadataStorage = void 0;
class SocketEventMetadataStorage {
    static addEventMetadata(target, propertyKey, metadata) {
        const key = target.constructor.name;
        if (!this.metadata.has(key)) {
            this.metadata.set(key, []);
        }
        this.metadata.get(key).push({ propertyKey, ...metadata });
    }
    static getMetadataFor(target) {
        return this.metadata.get(target.constructor.name) || [];
    }
}
exports.SocketEventMetadataStorage = SocketEventMetadataStorage;
SocketEventMetadataStorage.metadata = new Map();
//# sourceMappingURL=socket-event-metadata.storage.js.map