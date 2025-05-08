/// <reference types="node" />
/// <reference types="node" />
/// <reference types="multer" />
import { Readable, Stream } from 'stream';
import { StreamableFile } from '@nestjs/common';
import { HelperService } from '@/helper/helper.service';
import { BaseService } from '@/utils/generics/base-service';
import { AttachmentMetadataDto } from '../dto/attachment.dto';
import { AttachmentRepository } from '../repositories/attachment.repository';
import { Attachment } from '../schemas/attachment.schema';
export declare class AttachmentService extends BaseService<Attachment> {
    readonly repository: AttachmentRepository;
    private readonly helperService;
    constructor(repository: AttachmentRepository, helperService: HelperService);
    store(file: Buffer | Stream | Readable | Express.Multer.File, metadata: AttachmentMetadataDto): Promise<Attachment>;
    download(attachment: Attachment): Promise<StreamableFile>;
    readAsBuffer(attachment: Attachment): Promise<Buffer | undefined>;
    readAsStream(attachment: Attachment): Promise<Stream | undefined>;
}
