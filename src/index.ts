import { configDotenv } from 'dotenv';
import type { ConfigValidatorOptions } from './options/config-validator.options.js';

export const configValidatorSetup = (config?: ConfigValidatorOptions) => {
  configDotenv(config?.dotEnvConfig);
};

export * from './decorators/index.js';
export * from './validate.js';
