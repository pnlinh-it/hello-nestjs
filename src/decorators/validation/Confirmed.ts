import {
  buildMessage,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function Confirmed(property: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Confirmed',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        // you can return a Promise<boolean> here as well, if you want to make async validation
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' && typeof relatedValue === 'string' && value === relatedValue
          );
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$constraint1 confirmation does not match.',
          validationOptions,
        ),
      },
    });
  };
}
