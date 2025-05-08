import { ContentCreateDto } from '@/cms/dto/content.dto';
import { Content } from '@/cms/schemas/content.schema';
import { FixturesTypeBuilder } from '../types';
type TContentFixtures = FixturesTypeBuilder<Content, ContentCreateDto>;
export declare const contentDefaultValues: TContentFixtures['defaultValues'];
export declare const contentFixtures: import("../types").TFixtures<import("../types").OptionalProperties<Content, "createdAt" | "status" | "rag">>[];
export declare const installContentFixtures: () => Promise<any[]>;
export {};
