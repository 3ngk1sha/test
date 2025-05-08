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
import mongoose from 'mongoose';
import { BlockCreateDto } from '@/chat/dto/block.dto';
import { Block } from '@/chat/schemas/block.schema';
import { FixturesTypeBuilder } from '../types';
type TBlockFixtures = FixturesTypeBuilder<Block, BlockCreateDto>;
export declare const blockDefaultValues: TBlockFixtures['defaultValues'];
export declare const blocks: TBlockFixtures['values'][];
export declare const blockFixtures: import("../types").TFixtures<import("../types").OptionalProperties<Block, "createdAt" | "options" | "builtin" | "trigger_labels" | "assign_labels" | "nextBlocks" | "attachedBlock" | "previousBlocks" | "attachedToBlock" | "patterns" | "outcomes" | "trigger_channels" | "starts_conversation" | "capture_vars">>[];
export declare const installBlockFixtures: () => Promise<mongoose.UpdateWriteOpResult>;
export {};
