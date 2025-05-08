import { ContentTypeCreateDto } from '@/cms/dto/contentType.dto';
import { ContentType } from '@/cms/schemas/content-type.schema';
import { FixturesTypeBuilder } from '../types';
type TContentTypeFixtures = FixturesTypeBuilder<ContentType, ContentTypeCreateDto>;
export declare const contentTypeDefaultValues: TContentTypeFixtures['defaultValues'];
export declare const contentTypeFixtures: import("../types").TFixtures<import("../types").OptionalProperties<ContentType, "createdAt" | "fields">>[];
export declare const installContentTypeFixtures: () => Promise<any[]>;
export {};
