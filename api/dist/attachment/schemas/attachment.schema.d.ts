import { ModelDefinition } from '@nestjs/mongoose';
import { ChannelName } from '@/channel/types';
import { Subscriber } from '@/chat/schemas/subscriber.schema';
import { FileType } from '@/chat/schemas/types/attachment';
import { User } from '@/user/schemas/user.schema';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields, THydratedDocument } from '@/utils/types/filter.types';
import { AttachmentAccess, AttachmentCreatedByRef, AttachmentResourceRef } from '../types';
export declare class AttachmentStub extends BaseSchema {
    name: string;
    type: string;
    size: number;
    location: string;
    channel?: Partial<Record<ChannelName, any>>;
    createdBy: unknown;
    createdByRef: AttachmentCreatedByRef;
    resourceRef: AttachmentResourceRef;
    access: AttachmentAccess;
    url?: string;
    static getAttachmentUrl(attachmentId: string, attachmentName?: string): string;
    static getTypeByMime(mimeType: string): FileType;
}
export declare class Attachment extends AttachmentStub {
    createdBy: string | null;
}
export declare class UserAttachmentFull extends AttachmentStub {
    createdBy: User | undefined;
}
export declare class SubscriberAttachmentFull extends AttachmentStub {
    createdBy: Subscriber | undefined;
}
export type AttachmentDocument = THydratedDocument<Attachment>;
export declare const AttachmentModel: ModelDefinition;
declare const _default: any;
export default _default;
export type AttachmentPopulate = keyof TFilterPopulateFields<Attachment, AttachmentStub>;
export declare const ATTACHMENT_POPULATE: AttachmentPopulate[];
