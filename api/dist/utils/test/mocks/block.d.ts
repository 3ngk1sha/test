import { BlockFull } from '@/chat/schemas/block.schema';
import { ButtonType } from '@/chat/schemas/types/button';
export declare const baseBlockInstance: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    trigger_labels: import("../../../chat/schemas/label.schema").Label[];
    assign_labels: import("../../../chat/schemas/label.schema").Label[];
    options: {
        content?: {
            limit: number;
            fields: {
                title: string;
                subtitle: string | null;
                image_url: string | null;
                url?: string | undefined;
                action_title?: string | undefined;
                action_payload?: string | undefined;
            };
            display: "list" | "carousel";
            buttons: ({
                type: ButtonType.postback;
                title: string;
                payload: string;
            } | {
                type: ButtonType.web_url;
                url: string;
                title: string;
                messenger_extensions?: boolean | undefined;
                webview_height_ratio?: "compact" | "tall" | "full" | undefined;
            })[];
            query?: any;
            entity?: string | number | undefined;
            top_element_style?: "compact" | "large" | undefined;
        } | undefined;
        typing?: number | undefined;
        fallback?: {
            message: string[];
            active: boolean;
            max_attempts: number;
        } | undefined;
        assignTo?: string | undefined;
        effects?: string[] | undefined;
    };
    starts_conversation: boolean;
    capture_vars: {
        entity: string | number;
        context_var: string;
    }[];
    position: {
        x: number;
        y: number;
    };
    builtin: boolean;
    attachedBlock: null;
    category: undefined;
    previousBlocks: never[];
    trigger_channels: never[];
    nextBlocks: never[];
};
export declare const blockEmpty: BlockFull;
export declare const textResult: string[];
export declare const textBlock: BlockFull;
export declare const quickRepliesResult: string[];
export declare const quickRepliesBlock: BlockFull;
export declare const buttonsResult: string[];
export declare const buttonsBlock: BlockFull;
export declare const attachmentBlock: BlockFull;
export declare const allBlocksStringsResult: string[];
export declare const blockGetStarted: BlockFull;
export declare const blockProductListMock: BlockFull;
export declare const blockCarouselMock: BlockFull;
export declare const blocks: BlockFull[];
