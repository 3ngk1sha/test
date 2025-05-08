import { ContextVarCreateDto } from '@/chat/dto/context-var.dto';
import { ContextVar } from '@/chat/schemas/context-var.schema';
import { FixturesTypeBuilder } from '../types';
type TContentVarFixtures = FixturesTypeBuilder<ContextVar, ContextVarCreateDto>;
export declare const contentVarDefaultValues: TContentVarFixtures['defaultValues'];
export declare const contextVarFixtures: import("../types").TFixtures<import("../types").OptionalProperties<ContextVar, "createdAt" | "permanent">>[];
export declare const installContextVarFixtures: () => Promise<any[]>;
export {};
