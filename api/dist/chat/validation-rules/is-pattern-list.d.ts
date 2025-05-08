import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { Pattern } from '../schemas/types/pattern';
export declare function isPatternList(patterns: Pattern[]): boolean;
export declare class PatternListValidator implements ValidatorConstraintInterface {
    validate(patterns: Pattern[]): boolean;
}
export declare function IsPatternList(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
