import { StreamableFile } from '@nestjs/common';
export declare const generateAvatarSvg: (svg: string) => Promise<StreamableFile>;
export declare const generateInitialsAvatar: (name: {
    first_name: string;
    last_name: string;
}) => Promise<StreamableFile>;
export declare const getBotAvatar: (color: string) => Promise<StreamableFile>;
