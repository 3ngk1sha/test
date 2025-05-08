import { PageQueryDto } from '../pagination/pagination-query.dto';
export declare const getPageQuery: <T>(props?: Partial<PageQueryDto<T>> | undefined) => PageQueryDto<T>;
