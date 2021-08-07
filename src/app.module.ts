import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Module2Module } from './module2/module2.module';
import { M1Service } from './module1/m1.service';

@Module({
  imports: [UsersModule, Module2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly m1Servive: M1Service) {}
}
