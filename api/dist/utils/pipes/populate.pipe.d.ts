import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class PopulatePipe implements PipeTransform<string, string[]> {
    transform(value: any, _metadata: ArgumentMetadata): string[];
}
