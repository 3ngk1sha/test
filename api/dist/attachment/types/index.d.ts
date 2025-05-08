/// <reference types="node" />
/// <reference types="node" />
/// <reference types="multer" />
import { Readable, Stream } from 'stream';
export declare enum AttachmentCreatedByRef {
    User = "User",
    Subscriber = "Subscriber"
}
export declare enum AttachmentResourceRef {
    SettingAttachment = "Setting",
    UserAvatar = "User",
    SubscriberAvatar = "Subscriber",
    BlockAttachment = "Block",
    ContentAttachment = "Content",
    MessageAttachment = "Message"
}
export declare enum AttachmentAccess {
    Public = "public",
    Private = "private"
}
export declare class AttachmentFile {
    file: Buffer | Stream | Readable | Express.Multer.File;
    name?: string;
    size: number;
    type: string;
}
