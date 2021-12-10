import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { EVENT_EXCEPTION, EVENT_SEND_MESSAGE } from './events';
import { WsUser as AuthUser } from '../../decorators/auth/ws-user.decorator';
import { User } from '../users/entities/user.entity';

@WebSocketGateway(4001, {
  // If we don't specify path, path will be /socket.io
  // path: '/custom-path',
  cors: {
    origin: '*',
    credentials: true,
  },
  transports: ['websocket'],
  rejectUnauthorized: true,
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  server: Server;

  private logger = new Logger(WebsocketGateway.name);

  private static disconnectWithException(socket: Socket, error: Error) {
    socket.emit(EVENT_EXCEPTION, error);
    return socket.disconnect();
  }

  // Guard, Exception filter will not work here
  // Don't throw exception here it will stop server
  async handleConnection(socket: Socket, ...args: any[]) {
    try {
      const token = socket.handshake.auth.token;
      const user = await this.authService.findUserByJwt(token);
      if (!user) {
        return WebsocketGateway.disconnectWithException(socket, new UnauthorizedException());
      }
      socket.data.user = user;
    } catch (exception) {
      return WebsocketGateway.disconnectWithException(socket, new UnauthorizedException());
    }
  }

  // @Auth(StrategyEnum.WebsocketJwt)
  // @UseGuards(WebsocketGuard)
  @SubscribeMessage(EVENT_SEND_MESSAGE)
  listenForMessages(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: string,
    @AuthUser() user: User,
  ) {
    console.log(user);
    socket.emit('user', user);

    // Will emit 'exception' event
    // throw new WsException('Unauthorized');
  }

  handleDisconnect(client: any): any {}

  onModuleInit(): any {}
}
