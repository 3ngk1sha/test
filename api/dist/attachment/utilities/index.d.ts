import { StreamableFile } from '@nestjs/common';
import { StreamableFileOptions } from '@nestjs/common/file-stream/interfaces/streamable-options.interface';
import { AttachmentResourceRef } from '../types';
export declare const MIME_REGEX: RegExp;
export declare const isMime: (type: string) => boolean;
export declare const fileExists: (filePath: string) => boolean;
export declare const getStreamableFile: ({ path, options, }: {
    path: string;
    options?: StreamableFileOptions | undefined;
}) => StreamableFile;
export declare const generateUniqueFilename: (originalname: string) => string;
export declare const isAttachmentResourceRef: (resourceRef: any) => resourceRef is AttachmentResourceRef;
export declare const isAttachmentResourceRefArray: (refList: any) => refList is AttachmentResourceRef[];
