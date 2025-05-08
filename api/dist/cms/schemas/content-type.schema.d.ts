import { ModelDefinition } from '@nestjs/mongoose';
import { BaseSchema } from '@/utils/generics/base-schema';
import { ContentField } from '../dto/contentType.dto';
export declare class ContentType extends BaseSchema {
    name: string;
    fields: ContentField[];
}
export declare const ContentTypeModel: ModelDefinition;
declare const _default: any;
export default _default;
