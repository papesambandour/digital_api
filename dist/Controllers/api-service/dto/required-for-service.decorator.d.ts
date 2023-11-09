import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class RequiredForServiceRule implements ValidatorConstraintInterface {
    constructor();
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function RequiredForService(servicesCode: string[], validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
