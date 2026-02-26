import { config } from './app.config';

export type AppConfig = ReturnType<typeof config>;
export type ConfigType = { app: AppConfig };

export enum nodeEnvs {
  Development = 'development',
  Production = 'production',
}
