import { PipeTransform } from '@nestjs/common';
import { PageQueryDto } from './pagination-query.dto';
export type PageQueryParams = {
    skip?: string;
    limit?: string;
    sort?: string;
};
export declare class PageQueryPipe<T> implements PipeTransform<PageQueryParams, PageQueryDto<T>> {
    transform(value: PageQueryParams): PageQueryDto<T>;
}
