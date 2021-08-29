// export enum MailDriver {
//   MailTrap = 'mailtrap',
//   MailGun = 'mailgun',
//   SendGrid = 'sendgrid',
// }

import { MailService } from './mail-service';

export type MailDriver = 'mailtrap' | 'mailgun' | 'sendgrid';
export class Mail {
  driver: MailDriver;
  port: number;
  fromName: string;
  fromAddress: string;

  services: Record<MailDriver, MailService>;
}
