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
import { ModelDefinition } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ContentElement } from '@/chat/schemas/types/message';
import { BaseSchema } from '@/utils/generics/base-schema';
import { TFilterPopulateFields } from '@/utils/types/filter.types';
import { ContentType } from './content-type.schema';
export type ContentDocument = Document<Content>;
export declare class ContentStub extends BaseSchema {
    entity: unknown;
    title: string;
    status: boolean;
    dynamicFields: Record<string, any>;
    rag?: string;
    static getUrl(item: ContentElement): string;
    static getPayload(item: ContentElement): string;
}
export declare class Content extends ContentStub {
    entity: string;
    static toElement(content: Content): ContentElement;
}
export declare class ContentFull extends ContentStub {
    entity: ContentType;
}
export declare const ContentModel: ModelDefinition;
declare const _default: any;
export default _default;
export type ContentPopulate = keyof TFilterPopulateFields<Content, ContentStub>;
export declare const CONTENT_POPULATE: ContentPopulate[];
