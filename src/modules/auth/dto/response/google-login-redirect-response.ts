import { Expose } from 'class-transformer';

export class GoogleLoginRedirectResponse {
  @Expose()
  url: string;
}
