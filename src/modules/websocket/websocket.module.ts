import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket-gateway';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
