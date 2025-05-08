import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { Position } from '../schemas/types/position';
export declare function isPosition(position: Position): boolean;
export declare class PositionValidator implements ValidatorConstraintInterface {
    validate(position: Position): boolean;
}
export declare function IsPosition(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
