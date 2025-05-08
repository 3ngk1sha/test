/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { Request } from 'express';
import { BaseController } from '@/utils/generics/base-controller';
import { DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { AttachmentContextParamDto, AttachmentDownloadDto } from '../dto/attachment.dto';
import { Attachment } from '../schemas/attachment.schema';
import { AttachmentService } from '../services/attachment.service';
export declare class AttachmentController extends BaseController<Attachment> {
    private readonly attachmentService;
    constructor(attachmentService: AttachmentService);
    filterCount(filters?: TFilterQuery<Attachment>): Promise<{
        count: number;
    }>;
    findOne(id: string): Promise<Attachment>;
    findPage(pageQuery: PageQueryDto<Attachment>, filters: TFilterQuery<Attachment>): Promise<Attachment[]>;
    uploadFile(files: {
        file: Express.Multer.File[];
    }, req: Request, { resourceRef, access, }: AttachmentContextParamDto): Promise<Attachment[]>;
    download(params: AttachmentDownloadDto): Promise<StreamableFile>;
    deleteOne(id: string): Promise<DeleteResult>;
}
