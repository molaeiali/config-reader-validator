# Config Reader Validator

A library that uses [class-validator](https://www.npmjs.com/package/class-validator) and [class-transformer](https://www.npmjs.com/package/class-transformer) to validate your config class in a nest DTO style, it also reads environment for you.

## Installation

pnpm:

```
pnpm add class-transformer class-validator dotenv reflect-metadata
```

npm:

```
npm i class-transformer class-validator dotenv reflect-metadata
```

## Features

### @Env(envKey?: string)

if added above a class property, it reads the property name in CONSTANT_CASE from the environment into the variable.

Optionally if an envKey is provided as an argument, it tries to read that from the environment and not the default CONSTANT_CASE name it expects.

## Usage

my-config.config.ts

```typescript
import { IsString, IsNotEmpty } from 'class-validator';
import { Env } from 'config-reader-validator';

class MyConfig {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Env('Property')
  readonly myProperty?: string;

  @IsNotEmpty()
  @IsString()
  @Env()
  readonly myEnvProperty!: string;
}
```

main.ts

```typescript
import {
  Env,
  configValidatorSetup,
  validateConfig,
} from 'config-reader-validator';
import { MyConfig } from './my-config.ts';

const main = async () => {
  configValidatorSetup();

  const validatedConfig = await validateConfig(new MyConfig());
  console.log(validatedConfig);
};

void main();
```

## Optional configuration

- **configValidatorSetup**: accepts an optional `dotEnvConfig?: DotenvConfigOptions` which is the default `dotenv` configuration
- **validateConfig**: receives an optional `validationOptions?: ValidationOptions` which is the default class-validator options

## Todos

- [ ] tests
