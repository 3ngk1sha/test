/// <reference types="node" />
/// <reference types="node" />
/// <reference types="multer" />
import { Readable, Stream } from 'stream';
import { OnModuleInit, StreamableFile } from '@nestjs/common';
import { AttachmentCreateDto, AttachmentMetadataDto } from '@/attachment/dto/attachment.dto';
import { Attachment } from '@/attachment/schemas/attachment.schema';
import { HelperService } from '@/helper/helper.service';
import BaseStorageHelper from '@/helper/lib/base-storage-helper';
import { LoggerService } from '@/logger/logger.service';
import { SettingService } from '@/setting/services/setting.service';
import { LOCAL_STORAGE_HELPER_NAME } from './settings';
export default class LocalStorageHelper extends BaseStorageHelper<typeof LOCAL_STORAGE_HELPER_NAME> implements OnModuleInit {
    constructor(settingService: SettingService, helperService: HelperService, logger: LoggerService);
    getPath(): string;
    private getRootDirByResourceRef;
    store(file: Buffer | Stream | Readable | Express.Multer.File, metadata: AttachmentMetadataDto): Promise<AttachmentCreateDto>;
    download(attachment: Attachment): Promise<StreamableFile>;
    readAsBuffer(attachment: Attachment): Promise<Buffer | undefined>;
    readAsStream(attachment: Attachment): Promise<Stream | undefined>;
}
