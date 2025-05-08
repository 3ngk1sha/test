"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketHead = exports.SocketOptions = exports.SocketDelete = exports.SocketPatch = exports.SocketPut = exports.SocketPost = exports.SocketGet = void 0;
const socket_event_metadata_storage_1 = require("../storage/socket-event-metadata.storage");
const SocketGet = (path) => {
    return (target, propertyKey, descriptor) => {
        socket_event_metadata_storage_1.SocketEventMetadataStorage.addEventMetadata(target, propertyKey, {
            socketMethod: 'get',
            path,
            method: descriptor.value,
        });
    };
};
exports.SocketGet = SocketGet;
const SocketPost = (path) => {
    return (target, propertyKey, descriptor) => {
        socket_event_metadata_storage_1.SocketEventMetadataStorage.addEventMetadata(target, propertyKey, {
            socketMethod: 'post',
            path,
            method: descriptor.value,
        });
    };
};
exports.SocketPost = SocketPost;
const SocketPut = (path) => {
    return (target, propertyKey, descriptor) => {
        socket_event_metadata_storage_1.SocketEventMetadataStorage.addEventMetadata(target, propertyKey, {
            socketMethod: 'put',
            path,
            method: descriptor.value,
        });
    };
};
exports.SocketPut = SocketPut;
const SocketPatch = (path) => {
    return (target, propertyKey, descriptor) => {
        socket_event_metadata_storage_1.SocketEventMetadataStorage.addEventMetadata(target, propertyKey, {
            socketMethod: 'patch',
            path,
            method: descriptor.value,
        });
    };
};
exports.SocketPatch = SocketPatch;
const SocketDelete = (path) => {
    return (target, propertyKey, descriptor) => {
        socket_event_metadata_storage_1.SocketEventMetadataStorage.addEventMetadata(target, propertyKey, {
            socketMethod: 'delete',
            path,
            method: descriptor.value,
        });
    };
};
exports.SocketDelete = SocketDelete;
const SocketOptions = (path) => {
    return (target, propertyKey, descriptor) => {
        socket_event_metadata_storage_1.SocketEventMetadataStorage.addEventMetadata(target, propertyKey, {
            socketMethod: 'options',
            path,
            method: descriptor.value,
        });
    };
};
exports.SocketOptions = SocketOptions;
const SocketHead = (path) => {
    return (target, propertyKey, descriptor) => {
        socket_event_metadata_storage_1.SocketEventMetadataStorage.addEventMetadata(target, propertyKey, {
            socketMethod: 'head',
            path,
            method: descriptor.value,
        });
    };
};
exports.SocketHead = SocketHead;
//# sourceMappingURL=socket-method.decorator.js.map