import { DtoConfig } from '@/utils/types/dto.types';
export type Lookup = 'keywords' | 'trait' | 'free-text';
export declare class NlpEntityCreateDto {
    name: string;
    lookups?: Lookup[];
    doc?: string;
    builtin?: boolean;
}
export type NlpEntityDto = DtoConfig<{
    create: NlpEntityCreateDto;
}>;
