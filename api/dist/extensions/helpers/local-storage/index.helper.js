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
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = require("path");
const stream_1 = require("stream");
const common_1 = require("@nestjs/common");
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
const types_1 = require("../../../attachment/types");
const utilities_1 = require("../../../attachment/utilities");
const config_1 = require("../../../config");
const helper_service_1 = require("../../../helper/helper.service");
const base_storage_helper_1 = __importDefault(require("../../../helper/lib/base-storage-helper"));
const logger_service_1 = require("../../../logger/logger.service");
const setting_service_1 = require("../../../setting/services/setting.service");
const settings_1 = require("./settings");
let LocalStorageHelper = class LocalStorageHelper extends base_storage_helper_1.default {
    constructor(settingService, helperService, logger) {
        super(settings_1.LOCAL_STORAGE_HELPER_NAME, settingService, helperService, logger);
    }
    getPath() {
        return __dirname;
    }
    getRootDirByResourceRef(ref) {
        return ref === types_1.AttachmentResourceRef.SubscriberAvatar ||
            ref === types_1.AttachmentResourceRef.UserAvatar
            ? config_1.config.parameters.avatarDir
            : config_1.config.parameters.uploadDir;
    }
    async store(file, metadata) {
        const rootDir = this.getRootDirByResourceRef(metadata.resourceRef);
        const uniqueFilename = (0, utilities_1.generateUniqueFilename)(metadata.name);
        const filePath = (0, path_1.resolve)((0, path_1.join)(rootDir, (0, sanitize_filename_1.default)(uniqueFilename)));
        if (Buffer.isBuffer(file)) {
            await fs_1.default.promises.writeFile(filePath, file);
        }
        else if (file instanceof stream_1.Readable || file instanceof stream_1.Stream) {
            await new Promise((resolve, reject) => {
                const writeStream = fs_1.default.createWriteStream(filePath);
                file.pipe(writeStream);
                writeStream.on('finish', resolve);
                writeStream.on('error', reject);
            });
        }
        else {
            if (file.path) {
                const srcFilePath = fs_1.default.realpathSync((0, path_1.resolve)(file.path));
                const tempDir = os_1.default.tmpdir();
                const normalizedTempDir = (0, path_1.normalize)(tempDir);
                if (!srcFilePath.startsWith(normalizedTempDir)) {
                    throw new Error('Invalid file path');
                }
                await fs_1.default.promises.copyFile(srcFilePath, filePath);
                await fs_1.default.promises.unlink(srcFilePath);
            }
            else {
                await fs_1.default.promises.writeFile(filePath, file.buffer);
            }
        }
        const location = filePath.replace(rootDir, '');
        return {
            ...metadata,
            location,
        };
    }
    async download(attachment) {
        const rootDir = this.getRootDirByResourceRef(attachment.resourceRef);
        const path = (0, path_1.resolve)((0, path_1.join)(rootDir, attachment.location));
        if (!(0, utilities_1.fileExists)(path)) {
            throw new common_1.NotFoundException('No file was found');
        }
        const disposition = `attachment; filename="${encodeURIComponent(attachment.name)}"`;
        return (0, utilities_1.getStreamableFile)({
            path,
            options: {
                type: attachment.type,
                length: attachment.size,
                disposition,
            },
        });
    }
    async readAsBuffer(attachment) {
        const path = (0, path_1.resolve)((0, path_1.join)(this.getRootDirByResourceRef(attachment.resourceRef), attachment.location));
        if (!(0, utilities_1.fileExists)(path)) {
            throw new common_1.NotFoundException('No file was found');
        }
        return await fs_1.default.promises.readFile(path);
    }
    async readAsStream(attachment) {
        const path = (0, path_1.resolve)((0, path_1.join)(this.getRootDirByResourceRef(attachment.resourceRef), attachment.location));
        if (!(0, utilities_1.fileExists)(path)) {
            throw new common_1.NotFoundException('No file was found');
        }
        return fs_1.default.createReadStream(path);
    }
};
LocalStorageHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [setting_service_1.SettingService,
        helper_service_1.HelperService,
        logger_service_1.LoggerService])
], LocalStorageHelper);
exports.default = LocalStorageHelper;
//# sourceMappingURL=index.helper.js.map