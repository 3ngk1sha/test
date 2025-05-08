"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAttachmentResourceRefArray = exports.isAttachmentResourceRef = exports.generateUniqueFilename = exports.getStreamableFile = exports.fileExists = exports.isMime = exports.MIME_REGEX = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const config_1 = require("../../config");
const types_1 = require("../types");
exports.MIME_REGEX = /^[a-z-]+\/[0-9a-z\-.]+$/gm;
const isMime = (type) => {
    return exports.MIME_REGEX.test(type);
};
exports.isMime = isMime;
const fileExists = (filePath) => {
    if (config_1.config.env === 'test') {
        return true;
    }
    try {
        return (0, fs_1.existsSync)(filePath);
    }
    catch (e) {
        new common_1.Logger(`Attachment Model : Unable to locate file: ${filePath}`);
        return false;
    }
};
exports.fileExists = fileExists;
const getStreamableFile = ({ path, options, }) => {
    if (config_1.config.env === 'test') {
        return new common_1.StreamableFile(Buffer.from(''), options);
    }
    const fileReadStream = (0, fs_1.createReadStream)(path);
    return new common_1.StreamableFile(fileReadStream, options);
};
exports.getStreamableFile = getStreamableFile;
const generateUniqueFilename = (originalname) => {
    const extension = (0, path_1.extname)(originalname);
    const name = originalname.slice(0, -extension.length);
    return `${name}-${(0, uuid_1.v4)()}${extension}`;
};
exports.generateUniqueFilename = generateUniqueFilename;
const isAttachmentResourceRef = (resourceRef) => {
    return Object.values(types_1.AttachmentResourceRef).includes(resourceRef);
};
exports.isAttachmentResourceRef = isAttachmentResourceRef;
types_1.AttachmentResourceRef;
const isAttachmentResourceRefArray = (refList) => {
    return (Array.isArray(refList) &&
        refList.length > 0 &&
        refList.every(exports.isAttachmentResourceRef));
};
exports.isAttachmentResourceRefArray = isAttachmentResourceRefArray;
//# sourceMappingURL=index.js.map