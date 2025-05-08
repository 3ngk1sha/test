/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { HttpService } from '@nestjs/axios';
import { OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Model } from 'mongoose';
import { AttachmentService } from '@/attachment/services/attachment.service';
import { LoggerService } from '@/logger/logger.service';
import { MetadataService } from '@/setting/services/metadata.service';
import { Migration } from './migration.schema';
import { MigrationRunParams, MigrationSuccessCallback, MigrationVersion } from './types';
export declare class MigrationService implements OnApplicationBootstrap {
    private moduleRef;
    private readonly logger;
    private readonly metadataService;
    private readonly httpService;
    private readonly attachmentService;
    private readonly migrationModel;
    constructor(moduleRef: ModuleRef, logger: LoggerService, metadataService: MetadataService, httpService: HttpService, attachmentService: AttachmentService, migrationModel: Model<Migration>);
    onApplicationBootstrap(): Promise<void>;
    exit(): void;
    get migrationFilePath(): any;
    get isCLI(): boolean;
    isValidVersion(version: string): version is MigrationVersion;
    private ensureMigrationPathExists;
    create(version: MigrationVersion): void;
    private getMigrationTemplate;
    private connect;
    run({ action, version, isAutoMigrate }: MigrationRunParams): Promise<void>;
    private runOne;
    private isNewerVersion;
    private runUpgrades;
    private runAll;
    private verifyStatus;
    getMigrationFiles(): string[];
    private getMigrationName;
    private getAvailableUpgradeVersions;
    findMigrationFileByVersion(version: MigrationVersion): string | null;
    private loadMigrationFile;
    updateStatus({ version, action, migrationDocument, }: Omit<MigrationSuccessCallback, 'terminal'>): Promise<void>;
    private successCallback;
    private failureCallback;
}
