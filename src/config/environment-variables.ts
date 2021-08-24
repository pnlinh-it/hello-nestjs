import { DatabaseConfig } from './database.config';
import { Facebook } from './types/facebook';

export interface EnvironmentVariables {
  appName: string;
  appUrl: string;
  port: number;
  database: DatabaseConfig;
  jwtKey: string;
  facebook: Facebook;
}
