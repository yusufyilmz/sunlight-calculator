import { ValidationOptions, ValidationArguments, registerDecorator } from 'class-validator';

export function isNonPrimitiveArray(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'IsNonPrimitiveArray',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return Array.isArray(value) &&
          value.reduce((a, b) => a && typeof b === 'object' && !Array.isArray(b), true);
        },
      },
    });
  };
}
