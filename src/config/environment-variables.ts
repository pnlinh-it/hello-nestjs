import { DatabaseConfig } from './database.config';

export interface EnvironmentVariables {
  appName: string;
  appUrl: string;
  port: number;
  database: DatabaseConfig;
}
