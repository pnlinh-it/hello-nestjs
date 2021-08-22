import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// The name field in option constraint name.
@ValidatorConstraint({ name: 'isNotBlank', async: false })
export class IsNotBlank implements ValidatorConstraintInterface {
  /**
   * for async validations you must return a Promise<boolean> here
   */
  validate(text: string, args: ValidationArguments) {
    return text != null && typeof text === 'string' && text.trim().length > 0;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '$property is required!';
  }
}
