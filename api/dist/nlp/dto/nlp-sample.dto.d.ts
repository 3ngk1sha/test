import { DtoConfig } from '@/utils/types/dto.types';
import { NlpSampleEntityValue, NlpSampleState } from '../schemas/types';
export declare class NlpSampleCreateDto {
    text: string;
    trained?: boolean;
    type?: keyof typeof NlpSampleState;
    language: string;
}
export declare class NlpSampleDto extends NlpSampleCreateDto {
    entities?: NlpSampleEntityValue[];
    language: string;
}
declare const NlpSampleUpdateDto_base: import("@nestjs/common").Type<Partial<NlpSampleCreateDto>>;
export declare class NlpSampleUpdateDto extends NlpSampleUpdateDto_base {
}
export type TNlpSampleDto = DtoConfig<{
    create: NlpSampleCreateDto;
}>;
export {};
