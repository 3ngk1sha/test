import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { Channel } from '../schemas/types/channel';
export declare function isChannelData(channel: Channel): boolean;
export declare class ChannelDataValidator implements ValidatorConstraintInterface {
    validate(channel: Channel): boolean;
}
export declare function IsChannelData(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
