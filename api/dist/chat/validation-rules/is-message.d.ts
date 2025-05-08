import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { BlockMessage } from '../schemas/types/message';
export declare function isValidMessage(msg: any): boolean;
export declare class MessageValidator implements ValidatorConstraintInterface {
    validate(msg: BlockMessage): boolean;
}
export declare function IsMessage(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
