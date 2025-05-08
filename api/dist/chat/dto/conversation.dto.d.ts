import { DtoConfig } from '@/utils/types/dto.types';
import { Context } from './../schemas/types/context';
export declare class ConversationCreateDto {
    sender: string;
    active?: boolean;
    context?: Context;
    current?: string | null;
    next?: string[];
}
export type ConversationDto = DtoConfig<{
    create: ConversationCreateDto;
}>;
