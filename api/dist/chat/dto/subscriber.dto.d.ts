import { ChannelName } from '@/channel/types';
import { DtoConfig } from '@/utils/types/dto.types';
import { SubscriberChannelData } from '../schemas/types/channel';
export declare class SubscriberCreateDto {
    first_name: string;
    last_name: string;
    locale?: string;
    timezone?: number;
    language: string;
    gender?: string;
    country?: string;
    foreign_id?: string;
    labels: string[];
    assignedTo?: string | null;
    assignedAt?: Date | null;
    lastvisit?: Date;
    retainedFrom?: Date;
    channel: SubscriberChannelData<ChannelName>;
    avatar?: string | null;
}
declare const SubscriberUpdateDto_base: import("@nestjs/common").Type<Partial<SubscriberCreateDto>>;
export declare class SubscriberUpdateDto extends SubscriberUpdateDto_base {
}
export type SubscriberDto = DtoConfig<{
    create: SubscriberCreateDto;
}>;
export {};
