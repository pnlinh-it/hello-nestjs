import { AppConfig } from './app-config';
import { MailDriver } from './types/mail';

const config: () => AppConfig = () => {
  return {
    appName: process.env.APP_NAME || 'Hello NestJS',
    appUrl: process.env.APP_URL || 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    jwtKey: process.env.JWT_SECRET,
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    auth: {
      passwordThrottle: parseInt(process.env.PASSWORD_RESET_THROTTLE),
    },
    mail: {
      driver: process.env.MAIL_DRIVER as MailDriver,
      port: parseInt(process.env.MAIL_DRIVER) || 587,
      fromName: process.env.MAIL_FROM_NAME,
      fromAddress: process.env.MAIL_FROM_ADDRESS,
      services: {
        mailtrap: {
          host: process.env.MAILTRAP_HOST,
          user: process.env.MAILTRAP_USER,
          password: process.env.MAILTRAP_PASSWORD,
        },

        mailgun: {
          host: process.env.MAILGUN_HOST,
          user: process.env.MAILGUN_USER,
          password: process.env.MAILGUN_PASSWORD,
        },

        sendgrid: {
          host: process.env.SENDGRID_HOST,
          user: process.env.SENDGRID_USER,
          password: process.env.SENDGRID_PASSWORD,
        },
      },
    },
  };
};

export default config;
