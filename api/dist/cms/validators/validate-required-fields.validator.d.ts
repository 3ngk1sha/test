import { ValidatorConstraintInterface } from 'class-validator';
import { ContentField } from '../dto/contentType.dto';
export declare class ValidateRequiredFields implements ValidatorConstraintInterface {
    private readonly REQUIRED_FIELDS;
    validate(fields: ContentField[]): boolean;
    defaultMessage(): string;
}
