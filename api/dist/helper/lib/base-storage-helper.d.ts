/// <reference types="node" />
/// <reference types="node" />
/// <reference types="multer" />
import { Readable, Stream } from 'stream';
import { StreamableFile } from '@nestjs/common';
import { AttachmentCreateDto, AttachmentMetadataDto } from '@/attachment/dto/attachment.dto';
import { Attachment } from '@/attachment/schemas/attachment.schema';
import { LoggerService } from '@/logger/logger.service';
import { SettingService } from '@/setting/services/setting.service';
import { HelperService } from '../helper.service';
import { HelperName, HelperType } from '../types';
import BaseHelper from './base-helper';
export default abstract class BaseStorageHelper<N extends HelperName = HelperName> extends BaseHelper<N> {
    protected readonly type: HelperType;
    constructor(name: N, settingService: SettingService, helperService: HelperService, logger: LoggerService);
    abstract store(_file: Buffer | Stream | Readable | Express.Multer.File, _metadata: AttachmentMetadataDto): Promise<AttachmentCreateDto>;
    abstract download(attachment: Attachment): Promise<StreamableFile>;
    abstract readAsBuffer(attachment: Attachment): Promise<Buffer | undefined>;
    abstract readAsStream(attachment: Attachment): Promise<Stream | undefined>;
}
