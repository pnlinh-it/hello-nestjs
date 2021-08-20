import { registerAs } from '@nestjs/config';

// Use this way we cannot inject to dynamic module
// useFactory: (configService: ConfigServiceEnv)
export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
}));
