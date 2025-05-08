"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const lodash_1 = require("lodash");
const mongoose_2 = __importStar(require("mongoose"));
const mongoose_lean_defaults_1 = __importDefault(require("mongoose-lean-defaults"));
const mongoose_lean_getters_1 = __importDefault(require("mongoose-lean-getters"));
const mongoose_lean_virtuals_1 = __importDefault(require("mongoose-lean-virtuals"));
const attachment_service_1 = require("../attachment/services/attachment.service");
const config_1 = require("../config");
const logger_service_1 = require("../logger/logger.service");
const metadata_service_1 = require("../setting/services/metadata.service");
const id_plugin_1 = __importDefault(require("../utils/schema-plugin/id.plugin"));
const migration_schema_1 = require("./migration.schema");
const types_1 = require("./types");
const INITIAL_DB_VERSION = 'v2.1.9';
let MigrationService = class MigrationService {
    constructor(moduleRef, logger, metadataService, httpService, attachmentService, migrationModel) {
        this.moduleRef = moduleRef;
        this.logger = logger;
        this.metadataService = metadataService;
        this.httpService = httpService;
        this.attachmentService = attachmentService;
        this.migrationModel = migrationModel;
    }
    async onApplicationBootstrap() {
        await this.ensureMigrationPathExists();
        if (mongoose_2.default.connection.readyState !== 1) {
            await this.connect();
        }
        this.logger.log('Mongoose connection established!');
        if (!this.isCLI && config_1.config.mongo.autoMigrate) {
            this.logger.log('Executing migrations ...');
            await this.run({
                action: types_1.MigrationAction.UP,
                isAutoMigrate: true,
            });
        }
    }
    exit() {
        process.exit(0);
    }
    get migrationFilePath() {
        return this.moduleRef.get('MONGO_MIGRATION_DIR');
    }
    get isCLI() {
        return Boolean(process.env.HEXABOT_CLI);
    }
    isValidVersion(version) {
        const regex = /^v(\d+)\.(\d+)\.(\d+)$/;
        return regex.test(version);
    }
    async ensureMigrationPathExists() {
        if (config_1.config.env !== 'test' && !fs_1.default.existsSync(this.migrationFilePath)) {
            await fs_1.default.promises.mkdir(this.migrationFilePath, {
                recursive: true,
            });
        }
    }
    create(version) {
        const name = (0, lodash_1.kebabCase)(version);
        const files = this.getMigrationFiles();
        const exist = files.some((file) => {
            const migrationName = this.getMigrationName(file);
            return migrationName === name;
        });
        if (exist) {
            this.logger.error(`Migration file for "${version}" already exists`);
            this.exit();
        }
        const migrationFileName = `${Date.now()}-${name}.migration.ts`;
        const filePath = (0, path_1.join)(this.migrationFilePath, migrationFileName);
        const template = this.getMigrationTemplate();
        try {
            fs_1.default.writeFileSync(filePath, template);
            this.logger.log(`Migration file for "${version}" created: ${migrationFileName}`);
        }
        catch (e) {
            this.logger.error(e.stack);
        }
        finally {
            this.exit();
        }
    }
    getMigrationTemplate() {
        return `import mongoose from 'mongoose';

import { MigrationServices } from '../types';

module.exports = {
  async up(services: MigrationServices) {
    // Migration logic
    return false;
  },
  async down(services: MigrationServices) {
    // Rollback logic
    return false;
  },
};`;
    }
    async connect() {
        if (config_1.config.env === 'test') {
            return;
        }
        try {
            const connection = await mongoose_2.default.connect(config_1.config.mongo.uri, {
                dbName: config_1.config.mongo.dbName,
            });
            connection.plugin(id_plugin_1.default);
            connection.plugin(mongoose_lean_virtuals_1.default);
            connection.plugin(mongoose_lean_getters_1.default);
            connection.plugin(mongoose_lean_defaults_1.default);
        }
        catch (err) {
            this.logger.error('Failed to connect to MongoDB');
            throw err;
        }
    }
    async run({ action, version, isAutoMigrate }) {
        if (!this.isCLI) {
            if (isAutoMigrate) {
                const metadata = await this.metadataService.findOne({
                    name: 'db-version',
                });
                const version = metadata ? metadata.value : INITIAL_DB_VERSION;
                await this.runUpgrades(action, version);
            }
            else {
                return;
            }
        }
        else {
            if (!version) {
                await this.runAll(action);
            }
            else {
                await this.runOne({ action, version });
            }
            this.exit();
        }
    }
    async runOne({ version, action }) {
        const { exist, migrationDocument } = await this.verifyStatus({
            version,
            action,
        });
        if (exist) {
            return false;
        }
        try {
            const migration = await this.loadMigrationFile(version);
            const result = await migration[action]({
                logger: this.logger,
                http: this.httpService,
                attachmentService: this.attachmentService,
            });
            if (result) {
                await this.successCallback({
                    version,
                    action,
                    migrationDocument,
                });
            }
            return result;
        }
        catch (e) {
            this.failureCallback({
                version,
                action,
            });
            this.logger.log(e.stack);
            return false;
        }
    }
    isNewerVersion(version1, version2) {
        const v1Parts = version1.replace('v', '').split('.').map(Number);
        const v2Parts = version2.replace('v', '').split('.').map(Number);
        for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
            const v1Part = v1Parts[i] || 0;
            const v2Part = v2Parts[i] || 0;
            if (v1Part > v2Part) {
                return true;
            }
            else if (v1Part < v2Part) {
                return false;
            }
        }
        return false;
    }
    async runUpgrades(action, version) {
        const versions = this.getAvailableUpgradeVersions();
        const filteredVersions = versions.filter((v) => this.isNewerVersion(v, version));
        if (!filteredVersions.length) {
            this.logger.log('No migrations to execute ...');
            return version;
        }
        let lastVersion = version;
        for (const version of filteredVersions) {
            await this.runOne({ version, action });
            lastVersion = version;
        }
        return lastVersion;
    }
    async runAll(action) {
        const versions = this.getAvailableUpgradeVersions();
        let lastVersion = INITIAL_DB_VERSION;
        for (const version of versions) {
            await this.runOne({ version, action });
            lastVersion = version;
        }
        return lastVersion;
    }
    async verifyStatus({ version, action }) {
        let exist = false;
        const migrationDocument = await this.migrationModel.findOne({
            version,
        });
        if (migrationDocument) {
            exist = Boolean(migrationDocument.status === action);
            if (exist) {
                this.logger.warn(`Cannot proceed migration "${version}" is already in "${action}" state`);
            }
        }
        return { exist, migrationDocument };
    }
    getMigrationFiles() {
        const files = fs_1.default.readdirSync(this.migrationFilePath);
        return files.filter((file) => /\.migration\.(js|ts)$/.test(file));
    }
    getMigrationName(filename) {
        const [, ...migrationNameParts] = filename.split('-');
        const migrationName = migrationNameParts.join('-');
        return migrationName.replace(/\.migration\.(js|ts)/, '');
    }
    getAvailableUpgradeVersions() {
        const filenames = this.getMigrationFiles();
        return filenames
            .map((filename) => this.getMigrationName(filename))
            .map((name) => {
            const [, ...migrationVersion] = name.split('-');
            return `v${migrationVersion.join('.')}`;
        })
            .filter((value, index, self) => self.indexOf(value) === index);
    }
    findMigrationFileByVersion(version) {
        const files = this.getMigrationFiles();
        const migrationName = (0, lodash_1.kebabCase)(version);
        return (files.find((file) => {
            const name = this.getMigrationName(file);
            return migrationName === name;
        }) || null);
    }
    async loadMigrationFile(version) {
        try {
            const fileName = this.findMigrationFileByVersion(version);
            if (!fileName) {
                this.logger.error(`Migration file for "${version}" not found.`);
                process.exit(1);
            }
            const filePath = (0, path_1.join)(this.migrationFilePath, fileName);
            const migration = await Promise.resolve(`${filePath}`).then(s => __importStar(require(s)));
            if (!migration ||
                typeof migration.up !== 'function' ||
                typeof migration.down !== 'function') {
                throw new Error(`Migration file "${version}" must export an object with "up" and "down" methods.`);
            }
            return migration;
        }
        catch (e) {
            throw new Error(`Failed to load migration "${version}".\n${e.message}`);
        }
    }
    async updateStatus({ version, action, migrationDocument, }) {
        const document = migrationDocument ||
            new this.migrationModel({
                version,
            });
        document.status = action;
        await document.save();
    }
    async successCallback({ version, action, migrationDocument, }) {
        await this.updateStatus({ version, action, migrationDocument });
        const migrationDisplayName = `${version} [${action}]`;
        this.logger.log(`"${migrationDisplayName}" migration done`);
        await this.metadataService.updateOne({ name: 'db-version' }, {
            value: version,
        }, {
            upsert: true,
            new: true,
        });
        this.logger.log(`db-version metadata "${version}"`);
    }
    failureCallback({ version, action }) {
        const migrationDisplayName = `${version} [${action}]`;
        this.logger.error(`"${migrationDisplayName}" migration failed`);
    }
};
exports.MigrationService = MigrationService;
exports.MigrationService = MigrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, mongoose_1.InjectModel)(migration_schema_1.Migration.name)),
    __metadata("design:paramtypes", [core_1.ModuleRef,
        logger_service_1.LoggerService,
        metadata_service_1.MetadataService,
        axios_1.HttpService,
        attachment_service_1.AttachmentService,
        mongoose_2.Model])
], MigrationService);
//# sourceMappingURL=migration.service.js.map