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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginName } from '@/plugins/types';
import { UserService } from '@/user/services/user.service';
import { BaseController } from '@/utils/generics/base-controller';
import { DeleteResult } from '@/utils/generics/base-repository';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { BlockCreateDto, BlockUpdateDto } from '../dto/block.dto';
import { Block, BlockFull, BlockPopulate, BlockStub } from '../schemas/block.schema';
import { BlockService } from '../services/block.service';
import { CategoryService } from '../services/category.service';
import { LabelService } from '../services/label.service';
export declare class BlockController extends BaseController<Block, BlockStub, BlockPopulate, BlockFull> {
    private readonly blockService;
    private readonly categoryService;
    private readonly labelService;
    private readonly userService;
    private pluginsService;
    constructor(blockService: BlockService, categoryService: CategoryService, labelService: LabelService, userService: UserService, pluginsService: PluginService<BaseBlockPlugin<any>>);
    find(populate: string[], filters: TFilterQuery<Block>, pageQuery?: PageQueryDto<Block>): Promise<Block[] | BlockFull[]>;
    findSettings(pluginName: PluginName): Promise<import("@/plugins/types").PluginSetting[]>;
    findAll(): Promise<{
        id: import("../../utils/types/extension").ExtensionName;
        namespace: `${string}_helper` | `${string}_channel` | `${string}_plugin`;
        template: {
            message: {
                plugin: `${string}-plugin`;
                args: {
                    [key: string]: any;
                };
            };
            name: string;
            options?: {
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
                        type: import("../schemas/types/button").ButtonType.postback;
                        title: string;
                        payload: string;
                    } | {
                        type: import("../schemas/types/button").ButtonType.web_url;
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
            } | undefined;
            category?: string | null | undefined;
            trigger_labels?: string[] | undefined;
            assign_labels?: string[] | undefined;
            nextBlocks?: string[] | undefined;
            patterns?: (string | {
                value: string;
                label: string;
                type?: import("../schemas/types/button").PayloadType | undefined;
            } | ({
                match: "entity";
                entity: string;
            } | {
                match: "value";
                value: string;
                entity: string;
            })[])[] | undefined;
            outcomes?: string[] | undefined;
            trigger_channels?: string[] | undefined;
            starts_conversation?: boolean | undefined;
            capture_vars?: {
                entity: string | number;
                context_var: string;
            }[] | undefined;
        };
        effects: string[];
    }[]>;
    findEffects(): {
        name: string;
        title: any;
    }[];
    findOne(id: string, populate: string[]): Promise<Block | BlockFull>;
    create(block: BlockCreateDto): Promise<Block>;
    updateMany(body: {
        ids: string[];
        payload: BlockUpdateDto;
    }): Promise<import("mongoose").UpdateWriteOpResult>;
    updateOne(id: string, blockUpdate: BlockUpdateDto): Promise<Block>;
    deleteOne(id: string): Promise<DeleteResult>;
    deleteMany(ids?: string[]): Promise<DeleteResult>;
}
