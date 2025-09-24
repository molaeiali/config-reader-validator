import { toSnakeCase } from './to-snake-case.util.js';

export const toConstantCase = (input: string) => {
  return toSnakeCase(input).toUpperCase();
};
