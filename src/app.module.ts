import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Module2Module } from './module2/module2.module';
import { M1Service } from './module1/m1.service';
import { ConfigModule } from '@nestjs/config';
import { MyDynamicModule } from './dynamic/my-dynamic.module';
import { MyDynamicService } from './dynamic/my-dynamic.service';

const option = { password: 'awdawd' };

@Module({
  imports: [UsersModule, Module2Module, MyDynamicModule.register(option)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly m1Servive: M1Service,
    private readonly dynamicService: MyDynamicService,
  ) {}
}
