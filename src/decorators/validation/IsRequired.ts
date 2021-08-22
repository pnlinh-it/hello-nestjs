import {
  buildMessage,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsRequired(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsRequired',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // you can return a Promise<boolean> here as well, if you want to make async validation
          if (value == null) {
            return false;
          }

          const type = typeof value;

          if (type === 'string') {
            return value.trim().length > 0;
          }

          if (type === 'object') {
            return Object.keys(value).length > 0;
          }

          return true;
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property is required.',
          validationOptions,
        ),
      },
    });
  };
}
