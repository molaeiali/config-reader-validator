import { Transform, type TransformFnParams } from 'class-transformer';
import { toConstantCase } from '../utils/strings/to-constant-case.util.js';

export const Env = (envKey?: string) => {
  return Transform((params: TransformFnParams) => {
    return process.env[envKey ?? toConstantCase(params.key)];
  });
};
