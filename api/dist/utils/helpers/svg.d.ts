type UIAvatarSvgParams = {
    text?: string;
    round?: boolean;
    size?: number;
    bgColor?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
};
export declare function generateUIAvatarSvg({ text, round, size, bgColor, textColor, fontFamily, fontSize, fontWeight, }: UIAvatarSvgParams): string;
export declare function generateBotAvatarSvg({ size, bgColor, textColor, }: UIAvatarSvgParams): string;
export {};
