import { NlpSampleCreateDto } from '@/nlp/dto/nlp-sample.dto';
import { NlpSample } from '@/nlp/schemas/nlp-sample.schema';
import { FixturesTypeBuilder } from '../types';
type TNlpSampleFixtures = FixturesTypeBuilder<NlpSample, NlpSampleCreateDto>;
export declare const nlpSampleDefaultValues: TNlpSampleFixtures['defaultValues'];
export declare const nlpSampleFixtures: import("../types").TFixtures<import("../types").OptionalProperties<NlpSample, "createdAt" | "type" | "entities" | "trained">>[];
export declare const installNlpSampleFixtures: () => Promise<any[]>;
export {};
