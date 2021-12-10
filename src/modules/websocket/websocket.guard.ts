import { CanActivate, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class WebsocketGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: any): Promise<boolean> {
    const socket = context.switchToWs().getClient();
    const token = socket.handshake.auth.token;
    try {
      const user = await this.authService.findUserByJwt(token);
      if (!user) {
        return false;
      }
      socket.data.user = user;
      return true;
    } catch (ex) {
      return false;
    }
  }
}
