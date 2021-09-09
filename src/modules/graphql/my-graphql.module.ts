import { Module } from '@nestjs/common';
import { GrpahQLConfigFactory } from './graphql-config.factory';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GrpahQLConfigFactory,
    }),
  ],
  providers: [GrpahQLConfigFactory],
})
export class MyGraphQLModule {}
