import { plainToInstance } from 'class-transformer';
import {
  validate,
  type ValidationError,
  type ValidationOptions,
} from 'class-validator';

export const validateConfig = async <T extends object>(
  object: T,
  validationOptions?: ValidationOptions
) => {
  const transformed = plainToInstance(
    object.constructor as new () => T,
    object
  );
  const errors = await validate(transformed, validationOptions);
  const strings = flattenValidationErrors(errors);
  if (strings.length > 0) throw new Error(strings.join(', \n'));
  return transformed;
};

const flattenValidationErrors = (
  validationErrors: ValidationError[]
): string[] => {
  return validationErrors
    .flatMap((error) => mapChildrenToValidationErrors(error))
    .filter((item) => item.constraints)
    .flatMap((item) => Object.values(item.constraints ?? []));
};

const mapChildrenToValidationErrors = (
  error: ValidationError,
  parentPath?: string
): ValidationError[] => {
  if (!(error.children && error.children.length)) {
    return [error];
  }
  const validationErrors: ValidationError[] = [];
  parentPath = parentPath ? `${parentPath}.${error.property}` : error.property;
  for (const item of error.children) {
    if (item.children && item.children.length) {
      validationErrors.push(...mapChildrenToValidationErrors(item, parentPath));
    }
    validationErrors.push(prependConstraintsWithParentProp(parentPath, item));
  }
  return validationErrors;
};

const prependConstraintsWithParentProp = (
  parentPath: string,
  error: ValidationError
): ValidationError => {
  const constraints: Record<string, string> = {};
  for (const key in error.constraints) {
    constraints[key] = `${parentPath}.${error.constraints[key]}`;
  }
  return {
    ...error,
    constraints,
  };
};
