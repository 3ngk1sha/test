import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { CaptureVar } from '../schemas/types/capture-var';
export declare function isValidVarCapture(vars: CaptureVar[]): boolean;
export declare class CaptureVarValidator implements ValidatorConstraintInterface {
    validate(vars: CaptureVar[]): boolean;
}
export declare function IsVarCapture(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
