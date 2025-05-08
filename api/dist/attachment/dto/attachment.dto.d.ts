import { ChannelName } from '@/channel/types';
import { ObjectIdDto } from '@/utils/dto/object-id.dto';
import { AttachmentAccess, AttachmentCreatedByRef, AttachmentResourceRef } from '../types';
export declare class AttachmentMetadataDto {
    name: string;
    size: number;
    type: string;
    channel?: Partial<Record<ChannelName, any>>;
    resourceRef: AttachmentResourceRef;
    createdByRef: AttachmentCreatedByRef;
    access: AttachmentAccess;
    createdBy: string;
}
export declare class AttachmentCreateDto extends AttachmentMetadataDto {
    location: string;
}
export declare class AttachmentDownloadDto extends ObjectIdDto {
    filename?: string;
}
export declare class AttachmentContextParamDto {
    resourceRef: AttachmentResourceRef;
    access?: AttachmentAccess;
}
