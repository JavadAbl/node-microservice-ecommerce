import { registerAs } from '@nestjs/config';
import { nodeEnvs } from './config.type';

export const config = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  HTTP_PORT: parseInt(process.env.HTTP_PORT || '0'),
  HTTP_HOST: process.env.HTTP_HOST!,
  DATABASE_HOST: process.env.DATABASE_HOST!,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT || '0'),
  DATABASE_USERNAME: process.env.DATABASE_USERNAME!,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD!,
  DATABASE_NAME: process.env.DATABASE_NAME!,
  RABBITMQ_URL: process.env.RABBITMQ_URL!,
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '0'),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
});

export const appConfig = registerAs('app', config);
export const env = process.env.NODE_ENV;
export const isDev = env === nodeEnvs.Development;
