import { Database } from './types/database';
import { Facebook } from './types/facebook';
import { Google } from './types/google';
import { Auth } from './types/auth';
import { Mail } from './types/mail';
import { Documentation } from './types/documentation';
import { Redis } from './types/redis';

export class AppConfig {
  appName: string;
  appUrl: string;
  port: number;
  database: Database;
  redis: Redis;
  jwtKey: string;
  facebook: Facebook;
  google: Google;
  auth: Auth;
  mail: Mail;
  documentation: Documentation;
}
