import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { TFilterQuery } from '@/utils/types/filter.types';
import { TFilterNestedKeysOfType, TSearchFilterValue } from '../types/filter.types';
export declare class SearchFilterPipe<T> implements PipeTransform<TSearchFilterValue<T>, Promise<TFilterQuery<T>>> {
    private readonly props;
    constructor(props: {
        allowedFields: TFilterNestedKeysOfType<T, null | undefined | string | string[]>[];
    });
    private getNullableValue;
    private getRegexValue;
    private isAllowedField;
    private transformField;
    transform(value: TSearchFilterValue<T>, _metadata: ArgumentMetadata): Promise<TFilterQuery<T>>;
}
