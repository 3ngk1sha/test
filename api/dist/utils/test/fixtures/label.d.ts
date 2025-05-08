import { LabelCreateDto } from '@/chat/dto/label.dto';
import { Label } from '@/chat/schemas/label.schema';
import { FixturesTypeBuilder } from '../types';
type TLabelFixtures = FixturesTypeBuilder<Label, LabelCreateDto>;
export declare const contentLabelDefaultValues: TLabelFixtures['defaultValues'];
export declare const labels: TLabelFixtures['values'][];
export declare const labelFixtures: import("../types").TFixtures<import("../types").OptionalProperties<Label, "createdAt" | "description" | "users" | "label_id" | "builtin">>[];
export declare const installLabelFixtures: () => Promise<any[]>;
export {};
