import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ObjectIdPipe implements PipeTransform<string, Promise<string>> {
    getErrors(value: string): Promise<import("class-validator").ValidationError>;
    transform(value: string, { type, data }: ArgumentMetadata): Promise<string>;
}
